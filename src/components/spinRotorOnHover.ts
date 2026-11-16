const IDLE_SPEED_EPSILON = 0.001;

// Returns the cleanup that removes the listeners and stops the frame loop
export function spinRotorOnHover(svg: SVGSVGElement): () => void {
  let angle = 0;
  let speed = 0;
  let targetSpeed = 0;
  let frameId: number | null = null;

  const animate = () => {
    speed += (targetSpeed - speed) * 0.02;
    angle = (angle + speed) % 360;
    svg.style.setProperty("--rotor-angle", `${angle}deg`);

    if (targetSpeed === 0 && Math.abs(speed) < IDLE_SPEED_EPSILON) {
      speed = 0;
      frameId = null;
      return;
    }

    frameId = requestAnimationFrame(animate);
  };

  const ensureAnimating = () => {
    frameId ??= requestAnimationFrame(animate);
  };

  const onEnter = () => {
    targetSpeed = 1;
    ensureAnimating();
  };
  const onLeave = () => {
    targetSpeed = 0;
    ensureAnimating();
  };

  svg.addEventListener("mouseenter", onEnter);
  svg.addEventListener("mouseleave", onLeave);

  return () => {
    svg.removeEventListener("mouseenter", onEnter);
    svg.removeEventListener("mouseleave", onLeave);
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
    }
  };
}
