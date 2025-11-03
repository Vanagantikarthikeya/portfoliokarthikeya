import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
  opacity: number;
}

const AIEnergyOrb = () => {
  const orbRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const particleIdRef = useRef(0);
  const rafRef = useRef<number>();
  const lastMouseRef = useRef({ x: 0, y: 0, time: 0 });
  
  const [isMobile, setIsMobile] = useState(false);
  const [isInZone, setIsInZone] = useState(false);
  
  // Motion values for smooth cursor following
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring physics for smooth magnetic movement
  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  // Rainbow colors for particles
  const colors = [
    'rgba(147, 51, 234, 0.8)', // purple
    'rgba(236, 72, 153, 0.8)', // pink
    'rgba(59, 130, 246, 0.8)', // blue
    'rgba(34, 211, 238, 0.8)', // cyan
    'rgba(251, 146, 60, 0.8)', // orange
    'rgba(250, 204, 21, 0.8)', // yellow
  ];

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // No tracking on mobile

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Check if mouse is within the boundary zone
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const inZone = 
        mouseX >= rect.left && 
        mouseX <= rect.right && 
        mouseY >= rect.top && 
        mouseY <= rect.bottom;

      setIsInZone(inZone);

      if (inZone) {
        // Calculate position relative to center
        const relX = mouseX - centerX;
        const relY = mouseY - centerY;
        
        x.set(relX);
        y.set(relY);

        // Calculate cursor speed for particle intensity
        const now = Date.now();
        const timeDelta = now - lastMouseRef.current.time;
        if (timeDelta > 0) {
          const dx = mouseX - lastMouseRef.current.x;
          const dy = mouseY - lastMouseRef.current.y;
          const speed = Math.sqrt(dx * dx + dy * dy) / timeDelta;
          
          // Emit particles based on speed
          if (speed > 0.3) {
            createParticles(relX, relY, speed);
          }
        }
        
        lastMouseRef.current = { x: mouseX, y: mouseY, time: now };
      } else {
        // Return to center
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, x, y]);

  const createParticles = (relX: number, relY: number, speed: number) => {
    const count = Math.min(Math.floor(speed * 20), 10); // More particles for faster movement
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 2 + Math.random() * 3;
      const particle: Particle = {
        id: particleIdRef.current++,
        x: relX,
        y: relY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 4,
        opacity: 0.8 + Math.random() * 0.2,
      };
      particlesRef.current.push(particle);
    }

    // Limit total particles for performance
    if (particlesRef.current.length > 100) {
      particlesRef.current = particlesRef.current.slice(-100);
    }
  };

  useEffect(() => {
    const animateParticles = () => {
      particlesRef.current = particlesRef.current
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.1, // Gravity
          life: p.life - 0.02,
          opacity: p.opacity * 0.96,
        }))
        .filter(p => p.life > 0);

      rafRef.current = requestAnimationFrame(animateParticles);
    };

    rafRef.current = requestAnimationFrame(animateParticles);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute -bottom-4 -right-4 w-32 h-32 flex items-center justify-center"
    >
      {/* Particle canvas */}
      <svg 
        className="absolute inset-0 pointer-events-none overflow-visible"
        style={{ width: '100%', height: '100%' }}
      >
        {particlesRef.current.map(p => (
          <circle
            key={p.id}
            cx={p.x + 64}
            cy={p.y + 64}
            r={p.size}
            fill={p.color}
            opacity={p.opacity}
            style={{
              filter: 'blur(2px)',
            }}
          />
        ))}
      </svg>

      {/* Orb */}
      <motion.div
        ref={orbRef}
        className="relative w-24 h-24"
        style={{
          x: isMobile ? 0 : springX,
          y: isMobile ? 0 : springY,
        }}
        animate={{
          scale: isInZone && !isMobile ? [1, 1.1, 1] : [1, 1.05, 1],
        }}
        transition={{
          scale: {
            duration: isInZone ? 1.5 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Multiple gradient layers for depth */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 opacity-90 blur-xl animate-glow" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-400 to-pink-400 opacity-80 blur-lg" 
          style={{
            animation: 'glow 4s ease-in-out infinite alternate',
          }}
        />
        
        {/* Main orb with cycling gradient */}
        <motion.div 
          className="relative w-full h-full rounded-full flex items-center justify-center shadow-glow backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.9), rgba(59, 130, 246, 0.9))',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-md" />
          
          {/* AI Text */}
          <span className="relative text-white font-bold text-xl z-10 drop-shadow-lg">
            AI
          </span>
        </motion.div>

        {/* Rotating ring effect when active */}
        {isInZone && !isMobile && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default AIEnergyOrb;
