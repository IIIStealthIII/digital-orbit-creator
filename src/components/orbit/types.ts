
export interface OrbitButtonProps {
  text: string;
  path: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: string;
  startAngle?: number;
  isHighlighted: boolean;
  id: string;
}

export interface CategoryData {
  name: string;
  path: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: string;
  startAngle?: number;
  id: string;
}

export interface CenterButtonProps {
  text: string;
  size: number;
  path: string;
  isHighlighted: boolean;
  id: string;
}
