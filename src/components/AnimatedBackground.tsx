import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  opacity: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animationFrameRef = useRef<number>();

  const rainbowColors = [
    'rgba(255, 0, 0',      // Red
    'rgba(255, 127, 0',    // Orange
    'rgba(255, 255, 0',    // Yellow
    'rgba(0, 255, 0',      // Green
    'rgba(0, 127, 255',    // Blue
    'rgba(75, 0, 130',     // Indigo
    'rgba(148, 0, 211',    // Violet
    'rgba(255, 0, 255',    // Magenta
    'rgba(0, 255, 255',    // Cyan
  ];

  const createParticles = (x: number, y: number, velocityX: number, velocityY: number) => {
    const particleCount = Math.min(15, Math.max(5, Math.abs(velocityX) + Math.abs(velocityY)));
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      const speed = 2 + Math.random() * 4;
      const size = 3 + Math.random() * 8;
      
      // Add cursor velocity to particle direction for splash effect
      const vx = Math.cos(angle) * speed + velocityX * 0.3;
      const vy = Math.sin(angle) * speed + velocityY * 0.3;
      
      particlesRef.current.push({
        x,
        y,
        vx,
        vy,
        life: 1,
        maxLife: 0.6 + Math.random() * 0.4,
        size,
        color: rainbowColors[Math.floor(Math.random() * rainbowColors.length)],
        opacity: 0.6 + Math.random() * 0.4,
      });
    }
  };

  const updateParticles = () => {
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.1; // Gravity
      particle.vx *= 0.98; // Air resistance
      particle.vy *= 0.98;
      particle.life -= 0.02;
      
      return particle.life > 0;
    });
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Apply blur for dreamy effect
    ctx.filter = 'blur(2px)';
    
    particlesRef.current.forEach(particle => {
      const alpha = (particle.life / particle.maxLife) * particle.opacity;
      
      // Outer glow
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      );
      gradient.addColorStop(0, `${particle.color}, ${alpha})`);
      gradient.addColorStop(0.5, `${particle.color}, ${alpha * 0.5})`);
      gradient.addColorStop(1, `${particle.color}, 0)`);
      ctx.fillStyle = gradient;
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner particle
      ctx.beginPath();
      ctx.fillStyle = `${particle.color}, ${alpha})`;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    ctx.filter = 'none';
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!ctx || !canvas) return;
    
    updateParticles();
    drawParticles(ctx);
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const prevX = mouseRef.current.x || clientX;
      const prevY = mouseRef.current.y || clientY;
      
      const velocityX = (clientX - prevX) * 0.5;
      const velocityY = (clientY - prevY) * 0.5;
      
      mouseRef.current = { x: clientX, y: clientY, prevX, prevY };
      
      // Only create particles if mouse is moving
      if (Math.abs(velocityX) > 0.5 || Math.abs(velocityY) > 0.5) {
        createParticles(clientX, clientY, velocityX, velocityY);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default AnimatedBackground;
