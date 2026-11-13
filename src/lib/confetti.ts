/**
 * Lightweight Zero-Dependency Neon Confetti Cannon
 * Designed specifically for LernDev Dark-Neon Cyberpunk aesthetic.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  life: number;
  maxLife: number;
  shape: 'rect' | 'circle' | 'star';
}

const NEON_COLORS = [
  '#38BDF8', // Cyan
  '#818CF8', // Indigo
  '#C084FC', // Purple
  '#34D399', // Mint
  '#F472B6', // Pink
  '#FBBF24', // Amber/Gold
  '#FFFFFF'  // Sparkle white
];

let activeCanvas: HTMLCanvasElement | null = null;
let animId: number | null = null;

export function fireNeonConfetti(options?: { count?: number; originY?: number }) {
  if (typeof window === 'undefined') return;

  const count = options?.count ?? 140;
  const originY = options?.originY ?? 0.6; // from 60% down the screen

  // Create or reuse canvas
  let canvas = activeCanvas;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);
    activeCanvas = canvas;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Handle high-DPI screens
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const particles: Particle[] = [];

  // Left & Right cannon burst
  for (let i = 0; i < count; i++) {
    // 50% left cannon, 50% right cannon
    const isLeft = i % 2 === 0;
    const startX = isLeft ? width * 0.15 : width * 0.85;
    const startY = height * originY;

    // Angle towards center-up
    const baseAngle = isLeft ? -Math.PI / 4 : (-3 * Math.PI) / 4;
    const angleSpread = (Math.random() - 0.5) * (Math.PI / 3);
    const angle = baseAngle + angleSpread;
    const speed = Math.random() * 14 + 10;

    const shapes: Array<'rect' | 'circle' | 'star'> = ['rect', 'circle', 'star'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];

    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 7 + 5,
      color,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      life: 0,
      maxLife: Math.random() * 60 + 100,
      shape
    });
  }

  if (animId) cancelAnimationFrame(animId);

  const gravity = 0.38;
  const drag = 0.985;

  function render() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, width, height);

    let aliveCount = 0;

    for (const p of particles) {
      p.life++;
      if (p.life >= p.maxLife) continue;

      aliveCount++;
      p.vx *= drag;
      p.vy = p.vy * drag + gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      // Fade out near end of life
      const remainingLife = p.maxLife - p.life;
      if (remainingLife < 30) {
        p.opacity = remainingLife / 30;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8; // Neon glow

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.7);
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Draw small sparkle star
        ctx.beginPath();
        for (let s = 0; s < 4; s++) {
          ctx.rotate(Math.PI / 4);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(0, p.size * 0.3);
        }
        ctx.fill();
      }
      ctx.restore();
    }

    if (aliveCount > 0) {
      animId = requestAnimationFrame(render);
    } else {
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
        activeCanvas = null;
      }
      animId = null;
    }
  }

  animId = requestAnimationFrame(render);
}
