import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
  staggerDuration?: number; // delay between words e.g. 0.04
  delay?: number; // initial delay offset
  once?: boolean;
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  children,
  className = '',
  as: Component = 'div',
  staggerDuration = 0.035,
  delay = 0,
  once = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once, amount: 0.2 });

  // Split string into words
  const words = children.split(' ');

  return (
    <Component className={`inline-block ${className}`}>
      <span ref={containerRef} className="inline flex-wrap gap-x-[0.25em] leading-tight">
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden align-top py-0.5">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0, rotateX: 20 }}
              animate={
                isInView
                  ? { y: '0%', opacity: 1, rotateX: 0 }
                  : { y: '110%', opacity: 0, rotateX: 20 }
              }
              transition={{
                duration: 0.55,
                delay: delay + index * staggerDuration,
                ease: [0.215, 0.61, 0.355, 1], // Smooth Lando Norris / Awwwards ease OutCubic
              }}
            >
              {word}&nbsp;
            </motion.span>
          </span>
        ))}
      </span>
    </Component>
  );
};
