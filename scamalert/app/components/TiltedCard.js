'use client';

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springValues = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "50px",
  imageWidth = "50px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  className = "",
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    
    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  // // Generate a placeholder image if imageSrc is not provided
  // const placeholderImage = !imageSrc || imageSrc.startsWith('http') ? 
  //   `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23111827' rx='15'/%3E%3Cpath d='M50,30 L70,50 L50,70 L30,50 Z' fill='%235227FF' opacity='0.2'/%3E%3C/svg%3E` 
  //   : imageSrc;

  return (
    <figure
      ref={ref}
      className={`relative w-full h-full perspective-300 flex flex-col items-center justify-center pointer-events-auto ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* {showMobileWarning && (
        <div className="absolute top-4 text-center text-xs block sm:hidden">
          This effect works better on desktop
        </div>
      )} */}

      <motion.div
        className="relative preserve-3d"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* Card background */}
        <motion.div
          // className="absolute top-0 left-0 w-full h-full rounded-xl bg-gray-800/90 backdrop-blur shadow-xl border border-gray-700/50 card-glow"
          style={{
            transform: 'translateZ(0px)',
          }}
        />
        
        {/* Image or generated background */}
        <motion.img
          // src={placeholderImage}
          // alt={altText}
          className="absolute top-0 left-0 object-cover rounded-xl will-change-transform"
          style={{
            width: imageWidth,
            height: imageHeight,
            transform: 'translateZ(0px)',
            // opacity: 0.6,
          }}
        />

        {/* Overlay Content */}
        {displayOverlayContent && overlayContent && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full z-20 will-change-transform flex items-center justify-center rounded-xl overflow-hidden"
            style={{ transform: 'translateZ(30px)' }}
          >
            {overlayContent}
          </motion.div>
        )}

        {/* Decorative corners */}
        <motion.div
          // className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-xl"
          style={{ transform: 'translateZ(10px)' }}
        />
        <motion.div
          // className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-xl"
          style={{ transform: 'translateZ(10px)' }}
        />
        <motion.div
          // className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-xl"
          style={{ transform: 'translateZ(10px)' }}
        />
        <motion.div
          // className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-xl"
          style={{ transform: 'translateZ(10px)' }}
        />
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          // className="pointer-events-none absolute left-0 top-0 rounded-md bg-white px-2 py-1 text-xs text-gray-800 shadow-md z-30 hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
} 