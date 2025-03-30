
// Utility functions for smoke cursor effect
export interface SmokeParticle {
  x: number;
  y: number;
  alpha: number;
  radius: number;
  vx: number;
  vy: number;
  lifetime: number;
  currentLife: number;
  color: string;
}

export const createSmokeParticle = (x: number, y: number): SmokeParticle => {
  const speed = 0.5 + Math.random() * 1;
  const angle = Math.random() * Math.PI * 2;
  const lifetime = 40 + Math.random() * 20;
  
  // Choose between blue and cyan colors randomly
  const colors = [
    'rgba(16, 249, 241, 0.6)', // cyan
    'rgba(31, 1, 185, 0.6)',   // blue
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return {
    x,
    y,
    alpha: 0.6 + Math.random() * 0.4,
    radius: 5 + Math.random() * 10,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    lifetime,
    currentLife: 0,
    color
  };
};

export const updateSmokeParticle = (particle: SmokeParticle): SmokeParticle => {
  if (particle.currentLife >= particle.lifetime) {
    return particle;
  }
  
  return {
    ...particle,
    x: particle.x + particle.vx,
    y: particle.y + particle.vy,
    radius: particle.radius + 0.05,
    alpha: particle.alpha * (1 - particle.currentLife / particle.lifetime),
    currentLife: particle.currentLife + 1
  };
};

export const isParticleDead = (particle: SmokeParticle): boolean => {
  return particle.currentLife >= particle.lifetime || particle.alpha <= 0.01;
};
