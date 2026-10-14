import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

interface SpotlightRoleBadgeProps {
  className?: string;
}

export const SpotlightRoleBadge: React.FC<SpotlightRoleBadgeProps> = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
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
  const [, setBlobPoints] = useState<{ x: number; y: number }[]>([]);

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

  // Helper to generate organic blob points around a center
  const getBlobPoints = useCallback(
    (
      centerX: number,
      centerY: number,
      vx: number = 0,
      vy: number = 0,
      time: number = 0
    ): { x: number; y: number }[] => {
      const numPoints = 12;
      const baseRadius = 30; // Water droplet radius
      const speed = Math.sqrt(vx ** 2 + vy ** 2);
      const angleOfMotion = Math.atan2(vy, vx);
      const points: { x: number; y: number }[] = [];

      for (let i = 0; i < numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        const speedFactor = Math.min(speed / 8, 1);
        const ripple =
          speedFactor *
          (Math.sin(time * 3.5 + i * 1.8) * 7 + Math.cos(time * 2.2 + i * 2.5) * 5);
        const stretchDirection = Math.cos(theta - angleOfMotion);
        const stretchAmount = Math.min(speed * 1.2, 35) * stretchDirection;
        const r = baseRadius + ripple + stretchAmount;

        points.push({
          x: centerX + Math.cos(theta) * r,
          y: centerY + Math.sin(theta) * r,
        });
      }

      return points;
    },
    []
  );

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

      const points = getBlobPoints(
        currentPos.current.x,
        currentPos.current.y,
        velocity.current.x,
        velocity.current.y,
        time
      );

      // Paint onto canvas mask (persistent accumulation)
      paintBlobToCanvas(points);

      // Update mask URL periodically and immediately on first frame
      if (frameCount === 1 || frameCount % MASK_UPDATE_INTERVAL === 0) {
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
  }, [isHovered, paintBlobToCanvas, createSmoothPath, flushCanvasMask, getBlobPoints]);

  // Resize canvas to match container & preserve existing scratches across resize
  useEffect(() => {
    const resizeCanvas = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      if (canvas.width === rect.width && canvas.height === rect.height) return;

      let tempCanvas: HTMLCanvasElement | null = null;
      if (canvas.width > 0 && canvas.height > 0) {
        tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0);
        }
      }

      canvas.width = rect.width;
      canvas.height = rect.height;

      if (tempCanvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(tempCanvas, 0, 0, rect.width, rect.height);
          flushCanvasMask();
        }
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [flushCanvasMask]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (container && canvas) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      targetPos.current = { x, y };
      currentPos.current = { x, y };

      if (canvas.width === 0 || canvas.height === 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      // Paint initial contact droplet immediately onto the canvas
      const initialPoints = getBlobPoints(x, y, 0, 0, 0);
      paintBlobToCanvas(initialPoints);

      // Compute initial liquid border path
      const outerBorderPoints = initialPoints.map((p) => {
        const vx = p.x - x;
        const vy = p.y - y;
        const len = Math.sqrt(vx * vx + vy * vy) || 1;
        return {
          x: p.x + (vx / len) * 3,
          y: p.y + (vy / len) * 3,
        };
      });
      setBlobPoints(initialPoints);
      setLiquidBorderPath(createSmoothPath(outerBorderPoints));

      // Synchronously flush mask URL so the very first render already has the droplet mask
      setCanvasMaskUrl(canvas.toDataURL());
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setBlobPoints([]);
    setLiquidBorderPath('');
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
            opacity: canvasMaskUrl ? 1 : 0,
            WebkitMaskImage: canvasMaskUrl ? `url(${canvasMaskUrl})` : 'linear-gradient(transparent, transparent)',
            maskImage: canvasMaskUrl ? `url(${canvasMaskUrl})` : 'linear-gradient(transparent, transparent)',
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


