
export interface Waypoint {
  x: number;
  y: number;
}

export interface ParticleData {
  element: HTMLDivElement;
  startTime: number;
  duration: number;
  waypoints: Waypoint[];
  currentWaypointIndex: number;
  targetId: string;
}

export interface LightningParticleProps {
  mousePosition: { x: number, y: number };
  targets: Element[];
  isInWindow: boolean;
}
