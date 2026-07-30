import React from 'react';

interface CodeMorphicxLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const CodeMorphicxLogo: React.FC<CodeMorphicxLogoProps> = ({
  className = '',
  size = '100%',
  showText = true,
}) => {
  // 7 colors for the heptagonal pinwheel arms in clockwise order
  const armColors = [
    '#C1272D', // Top Red
    '#E05328', // Orange-Red
    '#F2A925', // Gold / Yellow
    '#388E3C', // Green
    '#4CAF50', // Bright Green / Teal
    '#9B59B6', // Lavender / Light Purple
    '#5B2C6F', // Deep Violet / Dark Purple
  ];

  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Top Arc for "CODE MORPHICX" */}
        <path
          id="topArc"
          d="M 54, 200 A 146, 146 0 0, 1 346, 200"
          fill="none"
        />
        {/* Bottom Arc for "TRANSFORMING IDEAS INTO INNOVATION" */}
        <path
          id="bottomArc"
          d="M 346, 200 A 146, 146 0 0, 1 54, 200"
          fill="none"
        />
      </defs>

      {/* Outer Curved Text: CODE MORPHICX */}
      <text
        fill="#2D8041"
        fontSize="30"
        fontWeight="800"
        fontFamily="'Arial Black', 'Trebuchet MS', system-ui, -apple-system, sans-serif"
        letterSpacing="3px"
      >
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          CODE MORPHICX
        </textPath>
      </text>

      {/* Diamond Separators */}
      <polygon points="46,200 52,194 58,200 52,206" fill="#2D8041" />
      <polygon points="342,200 348,194 354,200 348,206" fill="#2D8041" />

      {/* Outer Curved Text: TRANSFORMING IDEAS INTO INNOVATION */}
      <text
        fill="#6B4897"
        fontSize="18"
        fontWeight="700"
        fontFamily="'Arial', 'Helvetica Neue', system-ui, -apple-system, sans-serif"
        letterSpacing="2px"
      >
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          TRANSFORMING IDEAS INTO INNOVATION
        </textPath>
      </text>

      {/* Center 7-Fold Interlocking Pinwheel Emblem */}
      <g transform="translate(200, 200)">
        {armColors.map((color, index) => {
          const rotation = index * (360 / 7);
          return (
            <path
              key={index}
              d="M -22, -54 L 18, -54 L 38, -24"
              fill="none"
              stroke={color}
              strokeWidth="14"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              transform={`rotate(${rotation})`}
            />
          );
        })}
      </g>
    </svg>
  );
};
