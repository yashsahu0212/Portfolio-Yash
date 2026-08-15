import React, { useState } from 'react';

interface TextRollProps {
  children: string | React.ReactNode;
  className?: string;
  active?: boolean;
}

export const TextRoll: React.FC<TextRollProps> = ({ children, className = '', active }) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsTouched(false);
    }, 400);
  };

  const transformClass = `group-hover:-translate-y-full group-active:-translate-y-full group-focus:-translate-y-full ${
    active || isTouched ? '-translate-y-full' : ''
  }`;

  // If children is a string, wrap it for rolling text effect
  if (typeof children === 'string') {
    return (
      <span
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`inline-block overflow-hidden relative align-middle leading-none select-none ${className}`}
      >
        <span className={`inline-flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.76,0,0.24,1)] ${transformClass}`}>
          <span className="inline-block whitespace-nowrap">{children}</span>
          <span className="inline-block whitespace-nowrap absolute top-full left-0">{children}</span>
        </span>
      </span>
    );
  }

  // If children is complex node
  return (
    <span
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`inline-block overflow-hidden relative leading-none select-none ${className}`}
    >
      <span className={`inline-flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.76,0,0.24,1)] ${transformClass}`}>
        <span className="inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
        <span className="inline-flex items-center gap-2 whitespace-nowrap absolute top-full left-0">{children}</span>
      </span>
    </span>
  );
};
