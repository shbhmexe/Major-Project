'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function SecurityTiltedCard({ title, subtitle, icon, color, className, delay = 0 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { damping: 30, stiffness: 100, mass: 2 });
  const rotateY = useSpring(useMotionValue(0), { damping: 30, stiffness: 100, mass: 2 });
  const scale = useSpring(1, { damping: 30, stiffness: 100, mass: 2 });

  const colorHex = color === 'text-green-400' ? '#10b981' : 
                   color === 'text-blue-400' ? '#60a5fa' : 
                   color === 'text-yellow-400' ? '#facc15' : 
                   color === 'text-purple-400' ? '#c084fc' : 
                   color === 'text-teal-400' ? '#2dd4bf' : '#ffffff';

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -10; // Rotate 10 degrees max
    const rotationY = (offsetX / (rect.width / 2)) * 10;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  function handleMouseEnter() {
    scale.set(1.05);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div 
      className={`${className} security-card`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ width: '160px', height: '110px' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full [transform-style:preserve-3d] relative"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* Card background with glow effect */}
        <motion.div 
          className="absolute inset-0 bg-gray-800/90 backdrop-blur rounded-xl shadow-lg border border-gray-700/50 flex flex-col items-center justify-center p-4"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Glow effect */}
          <div 
            className="absolute -inset-2 opacity-30 blur-xl rounded-full"
            style={{ backgroundColor: colorHex, zIndex: -1 }}
          />
          
          {/* Card content */}
          <div className={`mb-2 ${color}`}>
            {icon}
          </div>
          <div className="text-center">
            <div className="font-bold text-white">{title}</div>
            <div className="text-xs text-gray-400">{subtitle}</div>
          </div>
          
          {/* Corners */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l rounded-tl-xl" style={{ borderColor: colorHex }}></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t border-r rounded-tr-xl" style={{ borderColor: colorHex }}></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l rounded-bl-xl" style={{ borderColor: colorHex }}></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r rounded-br-xl" style={{ borderColor: colorHex }}></div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 