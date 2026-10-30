import test from 'node:test';
import assert from 'node:assert/strict';
import { createPalmScrollState, updatePalmScroll, createScrollDriver, isPhysicalRightHand } from '../src/architectureScroll.js';

test('unmirrored camera maps MediaPipe Left to the physical right hand', () => {
  assert.equal(isPhysicalRightHand({ label: 'Left', score: .95 }), true);
  for (const value of [undefined, { label: 'Right', score: .99 }, { label: 'Left', score: .5 }]) {
    assert.equal(isPhysicalRightHand(value), false);
  }
});

test('comfortable initial position and tremor do not move the page', () => {
  for (const y of [.15, .5, .85]) {
    const state = createPalmScrollState();
    assert.equal(updatePalmScroll(state, .5, y).velocity, 0);
    assert.equal(updatePalmScroll(state, .51, y + .02).velocity, 0);
    assert.equal(updatePalmScroll(state, .49, y - .02).velocity, 0);
  }
});

test('lowering scrolls down and raising scrolls up before camera edges', () => {
  const state = createPalmScrollState();
  updatePalmScroll(state, .5, .5);
  const down = updatePalmScroll(state, .5, .56);
  assert.ok(down.velocity > 0);
  assert.equal(down.horizontal, false);
  assert.ok(updatePalmScroll(state, .5, .62).velocity > down.velocity);
  assert.equal(updatePalmScroll(state, .5, .51).velocity, 0);
  assert.ok(updatePalmScroll(state, .5, .44).velocity < 0);
});

test('horizontal swipe and diagonal jitter cannot become vertical scroll', () => {
  const state = createPalmScrollState();
  updatePalmScroll(state, .5, .5);
  assert.deepEqual(updatePalmScroll(state, .65, .52), { velocity: 0, horizontal: true });
  assert.equal(updatePalmScroll(state, .60, .59).velocity, 0);
});

test('vertical intent keeps sideways drift from changing evidence; center releases', () => {
  const state = createPalmScrollState();
  updatePalmScroll(state, .5, .5);
  updatePalmScroll(state, .5, .58);
  assert.equal(updatePalmScroll(state, .7, .58).horizontal, false);
  assert.equal(updatePalmScroll(state, .7, .50).velocity, 0);
  assert.equal(updatePalmScroll(state, .7, .50).horizontal, false);
});

function harness() {
  let time = 0, id = 0;
  const pending = new Map(), moves = [], directions = [];
  const driver = createScrollDriver({
    now: () => time,
    requestFrame: cb => { pending.set(++id, cb); return id; },
    cancelFrame: n => pending.delete(n),
    scroll: dy => moves.push(dy),
    onDirection: d => directions.push(d),
  });
  return { driver, pending, moves, directions, advance(ms) {
    time += ms;
    const callbacks = [...pending.values()]; pending.clear();
    callbacks.forEach(cb => cb());
  } };
}

test('scroll distance depends on time, not inference FPS, and has one animation loop', () => {
  const distance = fps => {
    const h = harness();
    h.driver.setVelocity(1000);
    for (let step = 1; step <= 60; step++) {
      h.advance(1000 / 60);
      if (step % (60 / fps) === 0) h.driver.setVelocity(1000);
      assert.equal(h.pending.size, 1);
    }
    return h.moves.reduce((a, b) => a + b, 0);
  };
  assert.ok(Math.abs(distance(15) - 1000) < .001);
  assert.ok(Math.abs(distance(30) - distance(60)) < .001);
});

test('neutral, fist/hand loss caller stop, and stale inference cancel immediately', () => {
  const h = harness();
  h.driver.setVelocity(900); h.advance(16);
  h.driver.stop();
  const count = h.moves.length;
  h.advance(100);
  assert.equal(h.moves.length, count);
  assert.equal(h.pending.size, 0);
  assert.equal(h.directions.at(-1), '');
  h.driver.setVelocity(-900); h.advance(16); h.driver.setVelocity(0);
  assert.equal(h.pending.size, 0);
  h.driver.setVelocity(900); h.advance(221);
  assert.equal(h.pending.size, 0);
  assert.equal(h.directions.at(-1), '');
});

test('direction reverses without queued inertia and long frames are capped', () => {
  const h = harness();
  h.driver.setVelocity(1000); h.advance(16);
  h.driver.setVelocity(-1000); h.advance(16);
  assert.equal(h.moves[0], 16); assert.equal(h.moves[1], -16);
  h.advance(150);
  assert.equal(h.moves.at(-1), -50);
  h.driver.setVelocity(NaN);
  assert.equal(h.pending.size, 0);
});
