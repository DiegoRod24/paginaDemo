import test from 'node:test';
import assert from 'node:assert/strict';
import { createPalmScrollState, updatePalmScroll, createScrollDriver, isPhysicalRightHand, palmDeltaToPixels } from '../src/architectureScroll.js';

test('unmirrored camera maps MediaPipe Left to physical right; uncertain hand is rejected', () => {
  assert.equal(isPhysicalRightHand({ label: 'Left', score: .95 }), true);
  for (const value of [undefined, { label: 'Right', score: .99 }, { label: 'Left', score: .5 }]) assert.equal(isPhysicalRightHand(value), false);
});

test('initial palm at any comfortable height and small tremor do not scroll', () => {
  for (const y of [.15, .5, .85]) {
    const s = createPalmScrollState();
    assert.equal(updatePalmScroll(s, .5, y, 0).delta, 0);
    for (let i = 1; i < 40; i++) assert.equal(updatePalmScroll(s, .5, y + (i % 2 ? .003 : -.003), i * 20).delta, 0);
  }
});

test('lowering/raising follows hand direction; holding away from initial center stops', () => {
  const s = createPalmScrollState();
  updatePalmScroll(s, .5, .5, 0);
  assert.ok(updatePalmScroll(s, .5, .55, 30).delta > 0);
  assert.equal(updatePalmScroll(s, .5, .55, 60).delta, 0);
  // Raise from .55 to .52: still BELOW the original .5 center, but must scroll UP.
  assert.ok(updatePalmScroll(s, .5, .52, 90).delta < 0);
  assert.equal(updatePalmScroll(s, .5, .52, 120).delta, 0);
});

test('displacement is independent of inference FPS with no repeated position scroll', () => {
  const distance = fps => {
    const s = createPalmScrollState(); let total = 0;
    for (let i = 0; i <= fps; i++) total += updatePalmScroll(s, .5, .4 + .2 * i / fps, i * 1000 / fps).delta;
    return total;
  };
  for (const fps of [15, 30, 60]) assert.ok(Math.abs(distance(fps) - .2) < .0041);
});

test('vertical axis blocks horizontal swipes until hand settles', () => {
  const s = createPalmScrollState(); updatePalmScroll(s, .5, .5, 0);
  updatePalmScroll(s, .5, .55, 30);
  assert.equal(updatePalmScroll(s, .6, .58, 60).horizontal, false);
  updatePalmScroll(s, .6, .58, 80); updatePalmScroll(s, .6, .58, 250);
  assert.equal(updatePalmScroll(s, .67, .58, 280).horizontal, true);
});

test('horizontal movement and diagonal ambiguity do not scroll vertically', () => {
  const s = createPalmScrollState(); updatePalmScroll(s, .5, .5, 0);
  assert.deepEqual(updatePalmScroll(s, .57, .51, 30), { delta: 0, horizontal: true });
  assert.equal(updatePalmScroll(s, .58, .56, 60).delta, 0);
  const diagonal = createPalmScrollState(); updatePalmScroll(diagonal, .5, .5, 0);
  assert.equal(updatePalmScroll(diagonal, .55, .55, 30).delta, 0);
});

test('stale detection, tracking jumps and gesture reset re-anchor without page jump', () => {
  const s = createPalmScrollState(); updatePalmScroll(s, .5, .5, 0);
  updatePalmScroll(s, .5, .54, 30);
  assert.equal(updatePalmScroll(s, .5, .8, 300).delta, 0);
  assert.equal(updatePalmScroll(s, .5, .5, 330).delta, 0);
  assert.equal(updatePalmScroll(createPalmScrollState(), .5, .2, 360).delta, 0);
  assert.equal(updatePalmScroll(s, NaN, .3, 390).delta, 0);
});

test('viewport-scaled gain supports comfortable movement and caps single-frame jumps', () => {
  assert.equal(palmDeltaToPixels(.2, 1000), 400);
  assert.equal(palmDeltaToPixels(.1, 1000), 300);
  assert.equal(palmDeltaToPixels(-.1, 500), -150);
  assert.equal(palmDeltaToPixels(NaN, 500), 0);
});

function harness() {
  let id = 0; const pending = new Map(), moves = [], directions = [];
  const driver = createScrollDriver({ scroll: d => moves.push(d), schedule: cb => {pending.set(++id, cb); return id;}, cancel: n => pending.delete(n), onDirection: d => directions.push(d) });
  return { driver, moves, pending, directions, timeout() { const callbacks = [...pending.values()]; pending.clear(); callbacks.forEach(cb => cb()); } };
}

test('each new motion scrolls exactly once; no inertia after stationary sample or timeout', () => {
  const h = harness(); h.driver.move(80); assert.deepEqual(h.moves, [80]);
  h.driver.move(0); h.timeout(); assert.deepEqual(h.moves, [80]);
  h.driver.move(-40); h.timeout(); h.timeout();
  assert.deepEqual(h.moves, [80, -40]); assert.equal(h.directions.at(-1), '');
  assert.equal(h.pending.size, 0);
});

test('caller stop for fist/hand loss/two hands/hidden/unmount clears pending feedback', () => {
  const h = harness();
  for (const reason of ['fist', 'hand loss', 'two hands', 'hidden', 'unmount']) {
    h.driver.move(20); h.driver.stop();
    assert.equal(h.pending.size, 0, reason); assert.equal(h.directions.at(-1), '', reason);
  }
  assert.equal(h.moves.length, 5); h.driver.move(NaN); assert.equal(h.moves.length, 5);
});
