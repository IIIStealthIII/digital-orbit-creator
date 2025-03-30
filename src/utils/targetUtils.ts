
export interface TargetElement {
  element: Element;
  id: string;
  rect: DOMRect;
  centerX: number;
  centerY: number;
  distance: number;
}

export const findClosestTarget = (
  targets: Element[],
  mouseX: number,
  mouseY: number,
  maxDistance: number
): TargetElement | null => {
  let closestTarget: TargetElement | null = null;
  let closestDistance = Infinity;

  targets.forEach(target => {
    const rect = target.getBoundingClientRect();
    const targetCenterX = rect.left + rect.width / 2;
    const targetCenterY = rect.top + rect.height / 2;
    
    // Calculate distance to target
    const distanceToTarget = Math.sqrt(
      Math.pow(mouseX - targetCenterX, 2) + 
      Math.pow(mouseY - targetCenterY, 2)
    );
    
    // If close enough to target and closer than previous closest
    if (distanceToTarget < maxDistance && distanceToTarget < closestDistance) {
      closestTarget = {
        element: target,
        id: target.id,
        rect,
        centerX: targetCenterX,
        centerY: targetCenterY,
        distance: distanceToTarget
      };
      closestDistance = distanceToTarget;
    }
  });

  return closestTarget;
};

export const applyTargetEffects = (targets: Element[], activeTargetIds: Set<string>, currentTime: number) => {
  targets.forEach(target => {
    if (activeTargetIds.has(target.id)) {
      // Target is being hit by lightning
      if (target instanceof HTMLElement) {
        target.classList.add('tron-button-highlight');
        target.style.transform = 'scale(1.25)';
        target.dataset.lastHit = currentTime.toString();
      }
    } else if (target instanceof HTMLElement && target.dataset.lastHit) {
      // Check if 2 seconds have passed since last hit
      const lastHit = parseInt(target.dataset.lastHit);
      if (currentTime - lastHit > 2000) {
        target.classList.remove('tron-button-highlight');
        target.style.transform = '';
        delete target.dataset.lastHit;
      }
    }
  });
};
