import React, { useRef, useState, useEffect } from 'react';
import { soundFX } from '../utils/sfx';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticRadius?: number; // Distance in px before magnetic pull triggers
  pullFactor?: number; // 0.1 to 0.5
  enableSound?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  magneticRadius = 100,
  pullFactor = 0.35,
  enableSound = true,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const [transformStyle, setTransformStyle] = useState('translate3d(0px, 0px, 0px) scale(1)');

  useEffect(() => {
    let animId: number | null = null;

    const animate = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      velocity.current.x = velocity.current.x * 0.72 + dx * 0.2;
      velocity.current.y = velocity.current.y * 0.72 + dy * 0.2;

      currentPos.current.x += velocity.current.x;
      currentPos.current.y += velocity.current.y;

      const scale = isHovered ? 1.05 : 1;
      setTransformStyle(
        `translate3d(${currentPos.current.x.toFixed(1)}px, ${currentPos.current.y.toFixed(1)}px, 0px) scale(${scale})`
      );

      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = Math.sqrt(velocity.current.x * velocity.current.x + velocity.current.y * velocity.current.y);

      if (isHovered || dist > 0.01 || speed > 0.01) {
        animId = requestAnimationFrame(animate);
      } else {
        setTransformStyle('translate3d(0px, 0px, 0px) scale(1)');
        animId = null;
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    targetPos.current = {
      x: distX * pullFactor,
      y: distY * pullFactor,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    if (enableSound) soundFX.playHover();
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    targetPos.current = { x: 0, y: 0 };
    if (onMouseLeave) onMouseLeave(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (enableSound) soundFX.playClick();
    if (onClick) onClick(e);
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: transformStyle,
        transition: isHovered ? 'none' : 'transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      className={`group will-change-transform ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
