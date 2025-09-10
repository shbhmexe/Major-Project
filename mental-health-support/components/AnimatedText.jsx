'use client';

import { TextGenerateEffect } from './TextGenerateEffect';
import { useAnimationPreference } from '@/app/providers';

export function AnimatedText({ text, className, duration }) {
  const { animationsEnabled } = useAnimationPreference();
  
  // If animations are disabled, render text without animation
  if (!animationsEnabled) {
    return (
      <div className={className}>
        <div className="mt-4">
          <div className="dark:text-white text-black text-2xl leading-snug tracking-wide">
            {text}
          </div>
        </div>
      </div>
    );
  }
  
  // Otherwise, render with animation
  return (
    <TextGenerateEffect 
      words={text} 
      className={className} 
      duration={duration} 
    />
  );
}