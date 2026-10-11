import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

interface SpotlightRoleBadgeProps {
  className?: string;
}

export const SpotlightRoleBadge: React.FC<SpotlightRoleBadgeProps> = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Track canvas mask as state so React always has the latest painted result
  const [canvasMaskUrl, setCanvasMaskUrl] = useState('');

  // Target mouse coordinates inside container
  const targetPos = useRef({ x: -200, y: -200 });
  // Current animated coordinates (for smooth liquid spring inertia)
  const currentPos = useRef({ x: -200, y: -200 });
  // Velocity for water droplet squash and stretch physics
  const velocity = useRef({ x: 0, y: 0 });

  // State for the live liquid border SVG overlay
  const [liquidBorderPath, setLiquidBorderPath] = useState('');
  const [blobPoints, setBlobPoints] = useState<{ x: number; y: number }[]>([]);

  // Convert control points to smooth SVG cubic bezier path string
  const createSmoothPath = useCallback((pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    const format = (n: number) => Number(n.toFixed(1));
    let d = `M ${format(pts[0].x)} ${format(pts[0].y)}`;
    for (let i = 0; i < pts.length; i++) {
      const p0 = pts[i === 0 ? pts.length - 1 : i - 1];
      const p1 = pts[i];
      const p2 = pts[(i + 1) % pts.length];
      const p3 = pts[(i + 2) % pts.length];

      const cp1x = format(p1.x + (p2.x - p0.x) / 6);
      const cp1y = format(p1.y + (p2.y - p0.y) / 6);
      const cp2x = format(p2.x - (p3.x - p1.x) / 6);
      const cp2y = format(p2.y - (p3.y - p1.y) / 6);

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${format(p2.x)} ${format(p2.y)}`;
    }
    return d + ' Z';
  }, []);

  // Flush the current canvas state into the mask URL state
  const flushCanvasMask = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setCanvasMaskUrl(canvas.toDataURL());
  }, []);

  // Paint the current blob shape onto the canvas mask (accumulates)
  const paintBlobToCanvas = useCallback((points: { x: number; y: number }[]) => {
    const canvas = canvasRef.current;
    if (!canvas || points.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.beginPath();

    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length; i++) {
      const p0 = points[i === 0 ? points.length - 1 : i - 1];
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];
      const p3 = points[(i + 2) % points.length];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }

    ctx.closePath();
    ctx.fill();
  }, []);

  useEffect(() => {
    let animId: number | null = null;
    let time = 0;
    // Throttle mask URL updates to every N frames (toDataURL is expensive)
    let frameCount = 0;
    const MASK_UPDATE_INTERVAL = 3;

    const updateWaterPhysics = () => {
      time += 0.05;
      frameCount++;

      // Spring physics lerp to follow cursor with fluid lag
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      velocity.current.x = velocity.current.x * 0.75 + dx * 0.12;
      velocity.current.y = velocity.current.y * 0.75 + dy * 0.12;

      currentPos.current.x += velocity.current.x;
      currentPos.current.y += velocity.current.y;

      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
      const dist = Math.sqrt(dx ** 2 + dy ** 2);

      // Generate 12 control points for organic liquid surface tension & ripples
      const numPoints = 12;
      const baseRadius = 30; // Water droplet radius
      const points: { x: number; y: number }[] = [];
      const angleOfMotion = Math.atan2(velocity.current.y, velocity.current.x);

      for (let i = 0; i < numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;

        // Speed-reactive ripple: perfectly circular when still, organic wobble when moving
        const speedFactor = Math.min(speed / 8, 1); // 0 when still, 1 at fast movement
        const ripple = speedFactor * (Math.sin(time * 3.5 + i * 1.8) * 7 + Math.cos(time * 2.2 + i * 2.5) * 5);

        // Hydrodynamic stretch: only deforms in direction of motion when moving
        const stretchDirection = Math.cos(theta - angleOfMotion);
        const stretchAmount = Math.min(speed * 1.2, 35) * stretchDirection;

        const r = baseRadius + ripple + stretchAmount;

        const x = currentPos.current.x + Math.cos(theta) * r;
        const y = currentPos.current.y + Math.sin(theta) * r;

        points.push({ x, y });
      }

      // Paint onto canvas mask (persistent accumulation)
      paintBlobToCanvas(points);

      // Update mask URL periodically (not every frame — toDataURL is expensive)
      if (frameCount % MASK_UPDATE_INTERVAL === 0) {
        flushCanvasMask();
      }

      // Update live blob points for SVG border overlay
      setBlobPoints(points);

      // Slightly expanded outer ring path for glowing water surface border
      const outerBorderPoints = points.map((p) => {
        const vx = p.x - currentPos.current.x;
        const vy = p.y - currentPos.current.y;
        const len = Math.sqrt(vx * vx + vy * vy) || 1;
        return {
          x: p.x + (vx / len) * 3,
          y: p.y + (vy / len) * 3,
        };
      });
      setLiquidBorderPath(createSmoothPath(outerBorderPoints));

      // If hovered or still moving, keep animation frame loop active
      if (isHovered || speed > 0.05 || dist > 0.5) {
        animId = requestAnimationFrame(updateWaterPhysics);
      } else {
        // Animation is stopping — do a final flush so the mask captures everything
        flushCanvasMask();
        animId = null;
      }
    };

    if (isHovered) {
      animId = requestAnimationFrame(updateWaterPhysics);
    }

    return () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
    };
  }, [isHovered, paintBlobToCanvas, createSmoothPath, flushCanvasMask]);

  // Resize canvas to match container
  useEffect(() => {
    const resizeCanvas = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      targetPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      currentPos.current = { ...targetPos.current };
    }
    setIsHovered(true);
    setHasBeenRevealed(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setBlobPoints([]);
    // Final flush: capture the very last canvas state so no painted areas are lost
    flushCanvasMask();
  };

  return (
    <div className={`relative inline-block group ${className}`}>
      {/* Main Container Box */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden bg-black border-3 border-black neo-shadow-sm group-hover:neo-shadow-md px-6 py-3.5 transition-all duration-200 select-none min-h-[60px] min-w-[320px] sm:min-w-[480px] flex items-center justify-center cursor-crosshair"
      >
        {/* Hidden canvas used to accumulate paint mask */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ display: 'none' }}
        />

        {/* Invisible Layout Spacer to maintain component dimensions */}
        <div className="flex items-center gap-3 font-heading font-extrabold text-xl sm:text-2xl md:text-3xl text-transparent select-none uppercase tracking-tight whitespace-nowrap opacity-0">
          <Sparkles className="w-6 h-6 shrink-0" />
          <span>FULL-STACK SOFTWARE ENGINEER</span>
        </div>

        {/* Revealed Yellow Text Layer - uses canvas mask for persistent reveal */}
        <div
          className="absolute inset-0 px-6 py-3.5 flex items-center justify-center pointer-events-none z-10 bg-[#1a1a2e]"
          style={{
            opacity: hasBeenRevealed ? 1 : 0,
            WebkitMaskImage: canvasMaskUrl ? `url(${canvasMaskUrl})` : 'none',
            maskImage: canvasMaskUrl ? `url(${canvasMaskUrl})` : 'none',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat' as any,
          }}
        >
          <div className="flex items-center gap-3 font-heading font-extrabold text-xl sm:text-2xl md:text-3xl text-[#fcd400] uppercase tracking-tight whitespace-nowrap">
            <Sparkles className="w-6 h-6 text-[#fcd400] shrink-0" />
            <span>FULL-STACK SOFTWARE ENGINEER</span>
          </div>
        </div>

        {/* Liquid Water Droplet Glowing Outline & Surface Refraction Ring */}
        {isHovered && liquidBorderPath && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            {/* Outer Glowing Water Ripple Ring */}
            <path
              d={liquidBorderPath}
              fill="rgba(34, 197, 94, 0.08)"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]"
            />
            {/* Center Fluid Drop Refraction Pointer */}
            <circle
              cx={currentPos.current.x}
              cy={currentPos.current.y}
              r="3.5"
              fill="#fcd400"
              className="drop-shadow-[0_0_8px_#fcd400]"
            />
          </svg>
        )}
      </div>

      {/* Tech Specs Tooltip Banner on Hover */}
      <div className="absolute left-0 -bottom-11 z-20 w-max max-w-xs sm:max-w-md md:max-w-lg opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out">
        <div className="bg-black text-[#22c55e] font-mono text-xs font-bold px-3 py-1.5 border-3 border-black neo-shadow-md flex items-center gap-2">
          <span className="w-2 h-2 bg-[#22c55e] rounded-full"></span>
          <span>LIQUID WATER SPOTLIGHT ACTIVE // REACT • TS • NODE • POSTGRES</span>
        </div>
      </div>
    </div>
  );
};

