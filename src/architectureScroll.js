// MediaPipe Hands assumes mirrored input; startLowLatencyGestureCamera sends
// unmirrored video pixels. CSS mirroring only affects the displayed overlay.
export function isPhysicalRightHand(handedness) {
  return handedness?.label === 'Left' && handedness.score >= 0.6;
}

export function createPalmScrollState() {
  return { origin: null, vertical: false };
}

// Relative to the first open palm: camera-normalized coordinates, not pixels.
export function updatePalmScroll(state, x, y) {
  if (!state.origin) {
    state.origin = { x, y };
    return { velocity: 0, horizontal: false };
  }
  const dx = x - state.origin.x;
  const dy = y - state.origin.y;
  const amount = Math.abs(dy);
  if (state.vertical && amount < 0.025) {
    state.vertical = false;
    state.origin.x = x;
    return { velocity: 0, horizontal: false };
  }
  if (!state.vertical && amount > 0.035 && amount > Math.abs(dx) * 1.2) {
    state.vertical = true;
  }
  if (!state.vertical) {
    return { velocity: 0, horizontal: Math.abs(dx) > 0.065 && Math.abs(dx) > amount * 1.2 };
  }
  // Small tremors remain neutral; moving farther increases speed up to 1600px/s.
  const strength = Math.min(1, Math.max(0, (amount - 0.025) / 0.155));
  return { velocity: Math.sign(dy) * (180 + strength * 1420), horizontal: false };
}

// Render-paced scrolling is independent of inference FPS. Never queue smooth
// scroll animations, and stop if inference stalls or the hand disappears.
export function createScrollDriver({
  requestFrame = callback => window.requestAnimationFrame(callback),
  cancelFrame = id => window.cancelAnimationFrame(id),
  now = () => performance.now(),
  scroll = top => window.scrollBy({ top, left: 0, behavior: 'instant' }),
  onDirection = () => {},
} = {}) {
  let frame = null;
  let velocity = 0;
  let updatedAt = 0;
  let previous = 0;
  let direction = '';
  const notify = next => {
    if (direction === next) return;
    direction = next;
    onDirection(next);
  };
  const stop = () => {
    if (frame !== null) cancelFrame(frame);
    frame = null;
    velocity = 0;
    notify('');
  };
  const tick = () => {
    frame = null;
    const current = now();
    if (!velocity || current - updatedAt > 220) {
      stop();
      return;
    }
    const elapsed = Math.min(50, Math.max(0, current - previous));
    previous = current;
    scroll(velocity * elapsed / 1000);
    frame = requestFrame(tick);
  };
  return {
    stop,
    setVelocity(next) {
      if (!Number.isFinite(next) || !next) {
        stop();
        return;
      }
      velocity = Math.max(-1600, Math.min(1600, next));
      updatedAt = now();
      notify(velocity < 0 ? 'up' : 'down');
      if (frame === null) {
        previous = updatedAt;
        frame = requestFrame(tick);
      }
    },
  };
}
