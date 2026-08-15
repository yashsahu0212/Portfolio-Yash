import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  isEnabled: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isEnabled }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on coarse pointer / touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, label, [role="button"], [data-destination], .hover-target'
        );
        setIsHovered(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  // Inject body class for cursor hiding when custom cursor is active
  useEffect(() => {
    if (isEnabled && !isTouchDevice) {
      document.body.classList.add('custom-cursor-enabled');
    } else {
      document.body.classList.remove('custom-cursor-enabled');
    }

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, [isEnabled, isTouchDevice]);

  if (!isEnabled || isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Subtle Hover Pulse Ring */}
      <div
        className={`absolute -top-3 -left-3 w-10 h-10 rounded-full border-2 border-black transition-all duration-200 ease-out ${
          isHovered
            ? 'scale-100 opacity-100 bg-[#22c55e]/30'
            : 'scale-50 opacity-0 bg-transparent'
        }`}
      />

      {/* Sleek Neo-Brutalist Cursor Arrow Pointer */}
      <div
        className={`transition-transform duration-150 ease-out origin-top-left ${
          isClicked
            ? 'scale-90 translate-x-0.5 translate-y-0.5'
            : isHovered
            ? 'scale-115'
            : 'scale-100'
        }`}
      >
        <svg
          width="26"
          height="28"
          viewBox="0 0 26 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          {/* Main Pointer Arrow with Neo-Brutalist black border & yellow/green fill */}
          <path
            d="M 2 2 L 10 24 L 14.5 15.5 L 23 11 Z"
            fill={isHovered ? '#22c55e' : '#fcd400'}
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
        </svg>
      </div>
    </div>
  );
};
