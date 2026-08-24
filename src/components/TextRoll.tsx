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

  // If children is a string, split into individual characters for the wave effect
  if (typeof children === 'string') {
    const letters = children.split('');

    return (
      <span
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`inline-flex items-center overflow-hidden relative select-none align-middle ${className}`}
      >
        {letters.map((char, index) => {
          const delay = `${index * 22}ms`;
          const isSpace = char === ' ';

          if (isSpace) {
            return (
              <span key={index} className="inline-block w-[0.25em]">
                &nbsp;
              </span>
            );
          }

          return (
            <span
              key={index}
              className="relative inline-flex flex-col overflow-hidden h-[1.2em] leading-[1.2em]"
            >
              {/* Top character that slides up and out */}
              <span
                style={{
                  transitionDelay: delay,
                  transitionDuration: '380ms',
                  transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                }}
                className={`inline-block transform transition-transform ${
                  active || isTouched ? '-translate-y-full' : 'group-hover:-translate-y-full group-focus:-translate-y-full'
                }`}
              >
                {char}
              </span>

              {/* Bottom character that slides in from below */}
              <span
                style={{
                  transitionDelay: delay,
                  transitionDuration: '380ms',
                  transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                }}
                className={`absolute top-full left-0 inline-block transform transition-transform ${
                  active || isTouched ? '-translate-y-full' : 'group-hover:-translate-y-full group-focus:-translate-y-full'
                }`}
              >
                {char}
              </span>
            </span>
          );
        })}
      </span>
    );
  }

  // Complex ReactNode fallback
  return (
    <span
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`inline-block overflow-hidden relative leading-none select-none ${className}`}
    >
      <span
        className={`inline-flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          active || isTouched ? '-translate-y-full' : 'group-hover:-translate-y-full'
        }`}
      >
        <span className="inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
        <span className="inline-flex items-center gap-2 whitespace-nowrap absolute top-full left-0">{children}</span>
      </span>
    </span>
  );
};
