import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MascotReaction } from '../types';

export interface PopoMascotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  reaction?: MascotReaction;
  interactive?: boolean;
  holdingFlavour?: string;
  customAssetUrl?: string; // Modular hook to drop in user's official PNG / WebP / GLB asset
  custom3DModelUrl?: string;
  isHoldingCone?: boolean;
  onMascotClick?: () => void;
  bubbleMessage?: string;
}

export const PopoMascot: React.FC<PopoMascotProps> = ({
  className = '',
  size = 'md',
  reaction = 'idle',
  interactive = true,
  holdingFlavour = '#FFF5DC',
  customAssetUrl,
  isHoldingCone = true,
  onMascotClick,
  bubbleMessage
}) => {
  const [blinking, setBlinking] = useState(false);
  const [waving, setWaving] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Periodic natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 180);
    }, 3800 + Math.random() * 2500);

    // Periodic friendly wave
    const waveInterval = setInterval(() => {
      if (reaction === 'idle') {
        setWaving(true);
        setTimeout(() => setWaving(false), 1800);
      }
    }, 9000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(waveInterval);
    };
  }, [reaction]);

  // Cursor tracking for head and pupil gaze
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      // Clamp between -1 and 1
      const clampedX = Math.max(-1, Math.min(1, dx));
      const clampedY = Math.max(-1, Math.min(1, dy));

      setMouseOffset({ x: clampedX, y: clampedY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  const sizePixelMap = {
    sm: 90,
    md: 160,
    lg: 240,
    xl: 320,
    hero: 440
  };

  const currentSize = sizePixelMap[size];

  const pupilX = mouseOffset.x * 6;
  const pupilY = mouseOffset.y * 5;
  const headTilt = mouseOffset.x * 4;

  const isCelebrating = reaction === 'celebrate';
  const isWaving = waving || reaction === 'wave';
  const isJumping = reaction === 'jump' || isCelebrating;
  const isFreezing = reaction === 'freeze';

  return (
    <div
      ref={containerRef}
      className={`relative inline-block select-none cursor-pointer transition-transform duration-300 ${className}`}
      onClick={onMascotClick}
      style={{ width: currentSize, height: currentSize * 1.15 }}
    >
      {/* Speech / Reaction Bubble */}
      <AnimatePresence>
        {bubbleMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.85 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border-2 border-[#FF5500] whitespace-nowrap text-xs font-bold text-[#1A1412] flex items-center gap-1.5"
          >
            <span>✨</span>
            <span>{bubbleMessage}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-[#FF5500] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration Sparkles */}
      {isCelebrating && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{
                scale: [0, 1.2, 0],
                opacity: [1, 1, 0],
                x: (i % 2 === 0 ? 1 : -1) * (30 + (i * 18)),
                y: -40 - (i * 12)
              }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
              className="absolute top-1/4 left-1/2 text-xl"
            >
              {['✨', '⭐', '🍦', '🎉'][i % 4]}
            </motion.span>
          ))}
        </div>
      )}

      {/* MODULAR ASSET FALLBACK: If user specifies customAssetUrl (e.g. Popo Char.png) */}
      {customAssetUrl ? (
        <motion.div
          animate={
            isJumping
              ? { y: [0, -25, 0], rotate: [0, -4, 4, 0] }
              : isFreezing
              ? { scale: [1, 0.98, 1], filter: 'brightness(1.2) hue-rotate(180deg)' }
              : { y: [0, -6, 0] }
          }
          transition={
            isJumping
              ? { duration: 0.45, repeat: Infinity }
              : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
          }
          className="w-full h-full flex items-center justify-center relative"
        >
          <img
            src={customAssetUrl}
            alt="POPO Explorer Mascot"
            className="w-full h-full object-contain filter drop-shadow-2xl"
          />
        </motion.div>
      ) : (
        /* OFFICIAL STYLISED 3D EXPLORER PANDA MASCOT */
        <motion.div
          animate={
            isJumping
              ? { y: [0, -22, 0], scale: [1, 1.05, 0.98, 1] }
              : isFreezing
              ? { x: [-2, 2, -2, 2, 0], filter: 'saturate(0.4) brightness(1.2)' }
              : { y: [0, -6, 0] }
          }
          transition={
            isJumping
              ? { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          className="w-full h-full relative flex items-center justify-center"
        >
          {/* Shadow underneath */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/5 h-4 bg-[#241A14]/15 rounded-full blur-md"
            style={{
              transform: `translateX(-50%) scale(${isJumping ? 0.75 : 1})`,
              transition: 'transform 0.3s ease'
            }}
          />

          {/* Character SVG Rendering */}
          <svg
            viewBox="0 0 320 380"
            className="w-full h-full filter drop-shadow-xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Defs & Gradients */}
            <defs>
              <linearGradient id="hatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F5D899" />
                <stop offset="60%" stopColor="#E3B868" />
                <stop offset="100%" stopColor="#C49646" />
              </linearGradient>
              <linearGradient id="suitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F7E2B0" />
                <stop offset="100%" stopColor="#DCB879" />
              </linearGradient>
              <linearGradient id="scarfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4136" />
                <stop offset="100%" stopColor="#D91E18" />
              </linearGradient>
              <linearGradient id="coneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8A857" />
                <stop offset="100%" stopColor="#B36B21" />
              </linearGradient>
              <radialGradient id="pandaFur" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="85%" stopColor="#F2F0EC" />
                <stop offset="100%" stopColor="#DDD8D0" />
              </radialGradient>
              <radialGradient id="pandaBlack" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#38302C" />
                <stop offset="70%" stopColor="#1C1714" />
                <stop offset="100%" stopColor="#0F0C0A" />
              </radialGradient>
              <radialGradient id="scoopShine" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor={holdingFlavour} />
              </radialGradient>
            </defs>

            {/* Red Explorer Cape Fluttering Behind */}
            <path
              d="M 110 220 C 70 240, 50 300, 40 330 C 75 325, 110 320, 130 300 Z"
              fill="url(#scarfGradient)"
              opacity="0.95"
            />

            {/* Legs & Explorer Hiking Boots */}
            {/* Left Leg */}
            <rect x="120" y="270" width="28" height="42" rx="12" fill="url(#pandaBlack)" />
            {/* Left Boot */}
            <path
              d="M 112 300 C 112 295, 148 295, 148 300 L 152 322 C 152 328, 102 328, 102 322 Z"
              fill="#7A421A"
            />
            {/* Right Leg */}
            <rect x="172" y="270" width="28" height="42" rx="12" fill="url(#pandaBlack)" />
            {/* Right Boot */}
            <path
              d="M 166 300 C 166 295, 204 295, 204 300 L 210 322 C 210 328, 158 328, 158 322 Z"
              fill="#7A421A"
            />

            {/* Safari Explorer Body & Khaki Shirt */}
            <path
              d="M 105 200 C 105 185, 215 185, 215 200 L 222 278 C 222 288, 98 288, 98 278 Z"
              fill="url(#suitGradient)"
            />
            {/* Safari Explorer Belt & Buckle */}
            <rect x="100" y="260" width="120" height="12" fill="#543314" rx="3" />
            <rect x="150" y="257" width="20" height="18" fill="#F4D03F" rx="3" stroke="#9A7D0A" strokeWidth="1.5" />

            {/* Safari Explorer Vest Pockets & Collar */}
            <line x1="160" y1="200" x2="160" y2="260" stroke="#C49646" strokeWidth="2.5" />
            <rect x="114" y="215" width="28" height="24" rx="4" fill="#E8C37C" stroke="#B88E3E" strokeWidth="1" />
            <rect x="178" y="215" width="28" height="24" rx="4" fill="#E8C37C" stroke="#B88E3E" strokeWidth="1" />

            {/* POPO Scout Chest Badge */}
            <rect x="117" y="218" width="22" height="10" rx="3" fill="#FFFDF8" stroke="#FF5500" strokeWidth="1" />
            <text x="128" y="225" fontSize="6" fontFamily="'Outfit', sans-serif" fontWeight="900" fill="#FF5500" textAnchor="middle">
              POPO
            </text>

            {/* Red Neckerchief Knot */}
            <path
              d="M 140 192 C 145 186, 175 186, 180 192 C 185 205, 170 215, 160 218 C 150 215, 135 205, 140 192 Z"
              fill="url(#scarfGradient)"
            />
            <circle cx="160" cy="202" r="6" fill="#FF5722" />

            {/* Left Arm: Holding Waffle Cone or Resting */}
            {isHoldingCone ? (
              <g>
                <path
                  d="M 108 205 C 85 210, 60 220, 65 242 C 68 252, 95 246, 102 230 Z"
                  fill="url(#pandaBlack)"
                />
                {/* Waffle Cone in hand */}
                <path d="M 68 226 L 86 226 L 77 265 Z" fill="url(#coneGradient)" stroke="#8C4B00" strokeWidth="1" />
                {/* Waffle Cone grid lines */}
                <line x1="72" y1="234" x2="82" y2="242" stroke="#8C4B00" strokeWidth="1" opacity="0.6" />
                <line x1="82" y1="234" x2="72" y2="242" stroke="#8C4B00" strokeWidth="1" opacity="0.6" />
                {/* Ice cream scoop on top with sprinkles */}
                <circle cx="77" cy="216" r="18" fill="url(#scoopShine)" />
                <circle cx="77" cy="216" r="18" fill={holdingFlavour} opacity="0.85" />
                {/* Sprinkles */}
                <circle cx="72" cy="210" r="2.2" fill="#FF3366" />
                <circle cx="82" cy="212" r="2" fill="#33CC99" />
                <circle cx="76" cy="222" r="2.2" fill="#FFCC00" />
                <circle cx="70" cy="218" r="1.8" fill="#9966FF" />
              </g>
            ) : (
              <path
                d="M 108 205 C 90 220, 85 240, 95 255 C 102 258, 110 245, 110 230 Z"
                fill="url(#pandaBlack)"
              />
            )}

            {/* Right Arm: Waving / Reaching Friendly Outward */}
            <motion.g
              style={{ transformOrigin: '212px 210px' }}
              animate={
                isWaving
                  ? { rotate: [0, 25, -15, 20, -10, 0] }
                  : { rotate: [0, 6, 0] }
              }
              transition={
                isWaving
                  ? { duration: 1.6, ease: 'easeInOut' }
                  : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <path
                d="M 212 205 C 240 200, 268 180, 275 160 C 282 145, 268 140, 255 158 C 245 172, 225 195, 212 215 Z"
                fill="url(#pandaBlack)"
              />
              {/* Panda Paw / Hand reaching warmly */}
              <circle cx="270" cy="155" r="14" fill="url(#pandaBlack)" />
            </motion.g>

            {/* HEAD GROUP (Controlled by cursor offset) */}
            <g
              style={{
                transform: `rotate(${headTilt}deg) translate(${mouseOffset.x * 4}px, ${mouseOffset.y * 3}px)`,
                transformOrigin: '160px 140px',
                transition: 'transform 0.15s ease-out'
              }}
            >
              {/* Panda Ears */}
              <circle cx="106" cy="92" r="24" fill="url(#pandaBlack)" />
              <circle cx="214" cy="92" r="24" fill="url(#pandaBlack)" />

              {/* Head Base */}
              <ellipse cx="160" cy="138" rx="66" ry="60" fill="url(#pandaFur)" />

              {/* Black Eye Patches (Characteristic POPO panda eyes) */}
              <ellipse cx="132" cy="136" rx="20" ry="24" fill="url(#pandaBlack)" transform="rotate(-10 132 136)" />
              <ellipse cx="188" cy="136" rx="20" ry="24" fill="url(#pandaBlack)" transform="rotate(10 188 136)" />

              {/* Eyes & Pupils (Blinking and Looking at cursor) */}
              <g
                style={{
                  transformOrigin: '160px 136px',
                  transform: blinking ? 'scaleY(0.1)' : 'scaleY(1)',
                  transition: 'transform 0.08s ease'
                }}
              >
                {/* Left White Eyeball */}
                <ellipse cx="134" cy="136" rx="12" ry="14" fill="#FFFFFF" />
                {/* Left Pupil */}
                <circle cx={134 + pupilX} cy={136 + pupilY} r="7" fill="#1A1412" />
                {/* Left Pupil Highlight */}
                <circle cx={136 + pupilX} cy={133 + pupilY} r="2.8" fill="#FFFFFF" />

                {/* Right White Eyeball */}
                <ellipse cx="186" cy="136" rx="12" ry="14" fill="#FFFFFF" />
                {/* Right Pupil */}
                <circle cx={186 + pupilX} cy={136 + pupilY} r="7" fill="#1A1412" />
                {/* Right Pupil Highlight */}
                <circle cx={188 + pupilX} cy={133 + pupilY} r="2.8" fill="#FFFFFF" />
              </g>

              {/* Cute Panda Snout & Mouth */}
              <ellipse cx="160" cy="160" rx="16" ry="12" fill="#FFFFFF" />
              {/* Nose */}
              <ellipse cx="160" cy="154" rx="7" ry="5.5" fill="#1A1412" />
              {/* Happy Open Smile */}
              <path
                d="M 152 163 C 152 173, 168 173, 168 163"
                stroke="#1A1412"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="#FF4455"
              />

              {/* Rosy Cheeks */}
              <circle cx="114" cy="154" r="8" fill="#FF7788" opacity="0.35" />
              <circle cx="206" cy="154" r="8" fill="#FF7788" opacity="0.35" />

              {/* Safari Explorer Hat with "POPO" Round Badge */}
              <ellipse cx="160" cy="85" rx="76" ry="18" fill="url(#hatGradient)" stroke="#A47B2E" strokeWidth="2" />
              <path
                d="M 108 82 C 110 40, 210 40, 212 82 Z"
                fill="url(#hatGradient)"
                stroke="#A47B2E"
                strokeWidth="2"
              />
              <path d="M 112 80 C 115 72, 205 72, 208 80" stroke="#7A421A" strokeWidth="6" fill="none" />
              {/* Hat Center Badge */}
              <circle cx="160" cy="62" r="11" fill="#FFFFFF" stroke="#FF5500" strokeWidth="2" />
              <text
                x="160"
                y="65"
                fontSize="7.5"
                fontFamily="'Outfit', sans-serif"
                fontWeight="900"
                fill="#FF5500"
                textAnchor="middle"
              >
                popo
              </text>
            </g>
          </svg>
        </motion.div>
      )}
    </div>
  );
};
