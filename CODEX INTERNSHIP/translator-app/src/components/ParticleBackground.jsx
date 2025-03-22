import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate random particles
    const generateParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 25); // Slightly increased density
      const newParticles = [];
      
      for (let i = 0; i < particleCount; i++) {
        // Generate different types of particles for visual variety
        const type = Math.floor(Math.random() * 3); // 0, 1, or 2 (different particle types)
        const baseSize = Math.random() * 4 + 1;
        
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: type === 2 ? baseSize * 1.5 : baseSize, // Larger particles for type 2
          opacity: type === 1 ? 0.3 : 0.15, // More visible particles for type 1
          duration: Math.random() * 40 + 20, // Longer and more varied durations
          delay: Math.random() * 10,
          type
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
    
    const handleResize = () => {
      generateParticles();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden z-[-1]">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            particle.type === 0 
              ? 'bg-white/10' 
              : particle.type === 1 
                ? 'bg-blue-400/20' 
                : 'bg-purple-300/15'
          }`}
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: particle.opacity,
            scale: 0.8,
          }}
          animate={{
            y: [particle.y, particle.y - (particle.type === 2 ? 300 : 200), particle.y],
            opacity: [
              particle.opacity, 
              particle.type === 1 ? 0.6 : 0.4, 
              particle.opacity
            ],
            scale: [0.8, particle.type === 2 ? 1.2 : 1, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            filter: particle.type === 1 ? 'blur(1px)' : 'none'
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground; 