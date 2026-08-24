import React from 'react';
import { motion } from 'motion/react';

interface YashSignatureProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
  duration?: number;
}

export const YashSignature: React.FC<YashSignatureProps> = ({
  className = '',
  width = 280,
  height = 90,
  color = '#fcd400',
  strokeWidth = 2.5,
  animated = true,
  duration = 1.4,
}) => {
  // SVG paths replicating the handwritten signature "Yash Sahu."
  // Path 1: "Y" + "ash" (First name cursive stroke)
  const yashPath = "M 22 52 C 14 38, 30 18, 44 14 C 52 12, 48 30, 42 58 L 34 82 C 28 104, 18 116, 26 118 C 36 120, 52 94, 56 68 C 60 58, 64 50, 72 52 C 78 54, 76 66, 80 66 C 84 66, 86 54, 92 56 C 96 58, 94 70, 96 70 C 98 70, 102 40, 104 36 L 102 68 C 104 60, 114 54, 120 62 L 120 68";

  // Path 2: "Sahu." (Last name cursive stroke + period)
  const sahuPath = "M 142 46 C 136 34, 154 26, 160 36 C 166 48, 138 58, 144 72 C 150 82, 166 76, 172 64 C 176 56, 184 54, 186 64 C 188 70, 184 72, 188 72 C 190 72, 194 44, 196 40 L 194 68 C 196 60, 206 54, 212 62 L 212 68 C 214 62, 222 58, 228 64 C 232 68, 230 72, 236 72";

  // Path 3: Period dot "."
  const dotPath = "M 246 71 A 2.5 2.5 0 1 1 245.9 71";

  // Underline flourish (Lando Norris style sleek accent slash)
  const underlinePath = "M 18 88 Q 130 92, 248 84";

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 260 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {animated ? (
          <>
            {/* Yash stroke */}
            <motion.path
              d={yashPath}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: duration * 0.5,
                ease: [0.45, 0, 0.55, 1],
              }}
            />

            {/* Sahu stroke */}
            <motion.path
              d={sahuPath}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: duration * 0.45,
                delay: duration * 0.4,
                ease: [0.45, 0, 0.55, 1],
              }}
            />

            {/* Period dot */}
            <motion.path
              d={dotPath}
              stroke={color}
              fill={color}
              strokeWidth={strokeWidth}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: duration * 0.82,
              }}
            />

            {/* Sleek Underline Accent Slash */}
            <motion.path
              d={underlinePath}
              stroke={color}
              strokeWidth={strokeWidth * 0.8}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{
                duration: duration * 0.35,
                delay: duration * 0.75,
                ease: 'easeOut',
              }}
            />
          </>
        ) : (
          <>
            <path
              d={yashPath}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={sahuPath}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d={dotPath} stroke={color} fill={color} strokeWidth={strokeWidth} />
            <path
              d={underlinePath}
              stroke={color}
              strokeWidth={strokeWidth * 0.8}
              strokeLinecap="round"
              opacity={0.85}
            />
          </>
        )}
      </svg>
    </div>
  );
};
