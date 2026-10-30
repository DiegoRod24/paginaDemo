// MediaPipe Hands assumes mirrored input; our camera sends unmirrored pixels.
export function isPhysicalRightHand(handedness) {
  return handedness?.label === 'Left' && handedness.score >= 0.6;
}

export function createPalmScrollState() {
  return { origin: null, previous: null, axis: '', lastAt: null, stillAt: null };
}

// Direct manipulation: return only distance actually travelled, never a velocity
// derived from holding a position. A new gesture or stale sample starts at zero.
export function updatePalmScroll(state, x, y, now) {
  const neutral = { delta: 0, horizontal: false };
  if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(now)) {
    Object.assign(state, createPalmScrollState());
    return neutral;
  }
  if (!state.origin || now - state.lastAt > 220 || now < state.lastAt) {
    Object.assign(state, createPalmScrollState(), {
      origin: { x, y }, previous: { x, y }, lastAt: now,
    });
    return neutral;
  }
  state.lastAt = now;
  const dx = x - state.previous.x;
  const dy = y - state.previous.y;
  // Ignore implausible tracking jumps; re-anchor instead of moving the page.
  if (Math.hypot(dx, dy) > .16) {
    Object.assign(state, createPalmScrollState(), {
      origin: { x, y }, previous: { x, y }, lastAt: now,
    });
    return neutral;
  }
  if (!state.axis) {
    const travelX = x - state.origin.x;
    const travelY = y - state.origin.y;
    if (Math.abs(travelY) > .018 && Math.abs(travelY) > Math.abs(travelX) * 1.3) state.axis = 'vertical';
    else if (Math.abs(travelX) > .025 && Math.abs(travelX) > Math.abs(travelY) * 1.3) state.axis = 'horizontal';
    else return neutral;
  }
  const travel = state.axis === 'vertical' ? Math.abs(dy) : Math.abs(dx);
  if (travel < .004) {
    if (state.stillAt === null) state.stillAt = now;
    if (now - state.stillAt >= 160) {
      state.axis = '';
      state.origin = { x, y };
      state.previous = { x, y };
    }
    return neutral;
  }
  state.stillAt = null;
  state.previous = { x, y };
  return state.axis === 'vertical'
    ? { delta: dy, horizontal: false }
    : { delta: 0, horizontal: true };
}

export function palmDeltaToPixels(delta, viewportHeight) {
  if (!Number.isFinite(delta) || !Number.isFinite(viewportHeight) || viewportHeight <= 0) return 0;
  // A comfortable 20% of camera height moves about 60% of a screen.
  return Math.sign(delta) * Math.min(Math.abs(delta) * viewportHeight * 3, viewportHeight * .4);
}

// One scroll per observed movement; no momentum or pending movement animation.
// The timer only clears the HUD when tracking stops delivering samples.
export function createScrollDriver({
  scroll = top => window.scrollBy({ top, left: 0, behavior: 'instant' }),
  schedule = callback => window.setTimeout(callback, 120),
  cancel = id => window.clearTimeout(id),
  onDirection = () => {},
} = {}) {
  let timer = null;
  let direction = '';
  const notify = next => {
    if (direction === next) return;
    direction = next;
    onDirection(next);
  };
  const stop = () => {
    if (timer !== null) cancel(timer);
    timer = null;
    notify('');
  };
  return {
    stop,
    move(delta) {
      if (!Number.isFinite(delta) || !delta) { stop(); return; }
      if (timer !== null) cancel(timer);
      scroll(delta);
      notify(delta < 0 ? 'up' : 'down');
      timer = schedule(stop);
    },
  };
}
