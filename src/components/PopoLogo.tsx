import React, { useEffect, useState } from 'react';

interface PopoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  color?: string;
  isBlinking?: boolean;
  variant?: 'light' | 'dark' | 'brand';
}

export const PopoLogo: React.FC<PopoLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  color,
  isBlinking: forcedBlink,
  variant = 'dark'
}) => {
  const [internalBlink, setInternalBlink] = useState(false);

  // Auto random micro-blink every 4-8 seconds
  useEffect(() => {
    const triggerBlink = () => {
      setInternalBlink(true);
      setTimeout(() => setInternalBlink(false), 220);
    };

    const interval = setInterval(
      () => {
        triggerBlink();
      },
      4500 + Math.random() * 3500
    );

    return () => clearInterval(interval);
  }, []);

  const blinking = forcedBlink || internalBlink;

  const sizeClasses = {
    sm: { mark: 32, text: 'text-xl' },
    md: { mark: 44, text: 'text-2xl' },
    lg: { mark: 64, text: 'text-4xl' },
    xl: { mark: 96, text: 'text-6xl' }
  }[size];

  const fill =
    color ||
    (variant === 'light'
      ? '#FFFFFF'
      : variant === 'brand'
      ? '#FF5500'
      : '#1A1412');

  return (
    <div
      className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}
      onMouseEnter={() => {
        setInternalBlink(true);
        setTimeout(() => setInternalBlink(false), 260);
      }}
    >
      {/* Official POPO Panda Face Mark: 'P' (dripping) + 'O' eyes + ears + smile */}
      <svg
        width={sizeClasses.mark}
        height={sizeClasses.mark * 1.05}
        viewBox="0 0 120 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        {/* Left Panda Ear */}
        <path
          d="M18 42 C14 30 24 16 38 20 C42 22 45 28 40 33 C32 37 25 39 18 42 Z"
          fill={fill}
          className="transition-transform duration-300 origin-[28px_25px] group-hover:-rotate-6"
        />

        {/* Right Panda Ear */}
        <path
          d="M102 42 C106 30 96 16 82 20 C78 22 75 28 80 33 C88 37 95 39 102 42 Z"
          fill={fill}
          className="transition-transform duration-300 origin-[92px_25px] group-hover:rotate-6"
        />

        {/* Eye Blinking Wrapper */}
        <g
          style={{
            transformOrigin: '60px 58px',
            transform: blinking ? 'scaleY(0.12)' : 'scaleY(1)',
            transition: 'transform 0.12s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Left Eye: 'P' with playful ice cream melt drip on bottom left */}
          <path
            d="M 40 32
               C 56 32, 60 44, 60 56
               C 60 68, 54 78, 40 78
               L 31 78
               C 31 84, 30 92, 28 98
               C 26 104, 21 106, 17 101
               C 13 96, 14 88, 17 80
               C 19 75, 20 62, 20 48
               C 20 37, 28 32, 40 32 Z
               M 37 46
               C 33 46, 31 49, 31 56
               C 31 63, 33 66, 38 66
               C 44 66, 47 62, 47 56
               C 47 50, 43 46, 37 46 Z"
            fill={fill}
          />

          {/* Right Eye: 'O' */}
          <path
            d="M 86 32
               C 104 32, 110 44, 110 56
               C 110 68, 104 80, 86 80
               C 68 80, 62 68, 62 56
               C 62 44, 68 32, 86 32 Z
               M 86 46
               C 80 46, 78 50, 78 56
               C 78 62, 80 66, 86 66
               C 92 66, 94 62, 94 56
               C 94 50, 92 46, 86 46 Z"
            fill={fill}
          />
        </g>

        {/* Cute Panda Nose & Smile */}
        <path
          d="M 60 76
             C 65 76, 68 80, 66 84
             C 64 88, 62 89, 60 90
             C 58 89, 56 88, 54 84
             C 52 80, 55 76, 60 76 Z"
          fill={fill}
        />
        {/* Friendly W-smile mouth line */}
        <path
          d="M 45 92
             C 50 102, 57 105, 60 96
             C 63 105, 70 102, 75 92"
          stroke={fill}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Branded Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-['Outfit',sans-serif] font-black tracking-tight ${sizeClasses.text}`}
            style={{ color: fill }}
          >
            POPO
          </span>
          <span
            className="text-[9px] uppercase tracking-[0.26em] font-extrabold opacity-70"
            style={{ color: fill }}
          >
            Flavourverse
          </span>
        </div>
      )}
    </div>
  );
};
