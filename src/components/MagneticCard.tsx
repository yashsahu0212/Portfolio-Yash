import React, { useRef, useState, useEffect } from 'react';
import { soundFX } from '../utils/sfx';

interface MagneticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number; // 0.1 to 0.5
  tiltMaxAngle?: number; // degrees e.g. 12
  enableSound?: boolean;
  enableGlare?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const MagneticCard: React.FC<MagneticCardProps> = ({
  children,
  className = '',
  magneticStrength = 0.25,
  tiltMaxAngle = 12,
  enableSound = true,
  enableGlare = true,
  onClick,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Target mouse offsets from center (-0.5 to 0.5)
  const targetOffset = useRef({ x: 0, y: 0 });
  // Current animated spring values
  const currentOffset = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  useEffect(() => {
    let animId: number | null = null;

    const animatePhysics = () => {
      // Spring physics lerp calculation
      const dx = targetOffset.current.x - currentOffset.current.x;
      const dy = targetOffset.current.y - currentOffset.current.y;

      velocity.current.x = velocity.current.x * 0.72 + dx * 0.18;
      velocity.current.y = velocity.current.y * 0.72 + dy * 0.18;

      currentOffset.current.x += velocity.current.x;
      currentOffset.current.y += velocity.current.y;

      const normX = currentOffset.current.x; // -0.5 to 0.5
      const normY = currentOffset.current.y; // -0.5 to 0.5

      // 3D rotation angles
      const rotateX = -normY * tiltMaxAngle;
      const rotateY = normX * tiltMaxAngle;

      // Magnetic pull displacement in pixels
      const maxTrans = 14;
      const transX = normX * maxTrans * (magneticStrength / 0.25);
      const transY = normY * maxTrans * (magneticStrength / 0.25);

      setTransformStyle(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 0px)`
      );

      // Specular glare dynamic calculation
      const glareX = (normX + 0.5) * 100;
      const glareY = (normY + 0.5) * 100;
      setGlareStyle({
        opacity: isHovered ? 0.35 : 0,
        x: glareX,
        y: glareY,
      });

      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = Math.sqrt(velocity.current.x * velocity.current.x + velocity.current.y * velocity.current.y);

      if (isHovered || dist > 0.001 || speed > 0.001) {
        animId = requestAnimationFrame(animatePhysics);
      } else {
        setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)');
        animId = null;
      }
    };

    animId = requestAnimationFrame(animatePhysics);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isHovered, magneticStrength, tiltMaxAngle]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetOffset.current = { x, y };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (enableSound) soundFX.playHover();
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetOffset.current = { x: 0, y: 0 };
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (enableSound) soundFX.playClick();
    if (onClick) onClick(e);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      className={`relative will-change-transform cursor-pointer ${className}`}
      {...props}
    >
      {children}

      {/* Dynamic 3D Specular Glare Overlay */}
      {enableGlare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-30"
          style={{
            opacity: glareStyle.opacity,
            background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 65%)`,
          }}
        />
      )}
    </div>
  );
};
