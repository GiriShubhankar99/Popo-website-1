import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Volume2, VolumeX, Sparkles, Trophy, Flame, Compass } from 'lucide-react';
import { sounds } from '../utils/sound';
import { FLAVOURS } from '../data/flavours';
import { FlavourId } from '../types';

interface PopoTimeGameProps {
  onExploreFlavours: () => void;
}

interface FallingItem {
  id: number;
  x: number; // 0 - 100%
  y: number; // 0 - 100%
  speed: number;
  type: 'normal' | 'golden' | 'melting' | 'ice';
  flavourColor: string;
  flavourName: string;
  rotation: number;
  size: number;
}

export const PopoTimeGame: React.FC<PopoTimeGameProps> = ({ onExploreFlavours }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [newHighScoreCelebrated, setNewHighScoreCelebrated] = useState(false);

  // Player position: 0% to 100%
  const [playerX, setPlayerX] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for animation loop
  const itemsRef = useRef<FallingItem[]>([]);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const isFrozenRef = useRef(false);
  const playerXRef = useRef(50);
  const nextItemId = useRef(1);

  // Sync refs with state
  scoreRef.current = score;
  comboRef.current = combo;
  isFrozenRef.current = isFrozen;
  playerXRef.current = playerX;

  // Load High Score from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('popo_game_highscore');
      if (saved) {
        setHighScore(parseInt(saved, 10) || 0);
      }
    }
  }, []);

  const handleSoundToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  // Keyboard controls: ArrowLeft / ArrowRight / 'A' / 'D'
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFrozenRef.current) return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setPlayerX((prev) => Math.max(8, prev - 7));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setPlayerX((prev) => Math.min(92, prev + 7));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Mouse / Touch drag controls
  const handlePointerMove = (clientX: number) => {
    if (gameState !== 'playing' || isFrozenRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(8, Math.min(92, relativeX));
    setPlayerX(clamped);
  };

  // Start / Reset Game
  const startGame = useCallback(() => {
    sounds.playBubble();
    setScore(0);
    setTimeLeft(30);
    setCombo(0);
    setIsFrozen(false);
    setPlayerX(50);
    itemsRef.current = [];
    setNewHighScoreCelebrated(false);
    setGameState('playing');
  }, []);

  // Main Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    // Timer countdown (30s)
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setGameState('gameover');
          sounds.playVictory();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Spawn falling items
    const spawnInterval = setInterval(() => {
      const rand = Math.random();
      let type: FallingItem['type'] = 'normal';
      let flavourChoice = FLAVOURS[Math.floor(Math.random() * FLAVOURS.length)];

      if (rand < 0.12) {
        type = 'golden';
      } else if (rand < 0.24) {
        type = 'melting';
      } else if (rand < 0.35) {
        type = 'ice';
      }

      const newItem: FallingItem = {
        id: nextItemId.current++,
        x: Math.random() * 80 + 10, // 10% to 90%
        y: -5,
        speed: 0.85 + Math.random() * 0.7,
        type,
        flavourColor:
          type === 'golden'
            ? '#FFD700'
            : type === 'melting'
            ? '#795548'
            : type === 'ice'
            ? '#81D4FA'
            : flavourChoice.secondaryColour,
        flavourName: flavourChoice.name,
        rotation: Math.random() * 360,
        size: type === 'golden' ? 44 : 38
      };

      itemsRef.current.push(newItem);
    }, 550);

    // Animation & Collision Loop (RAF)
    let animationFrame: number;

    const loop = () => {
      const items = itemsRef.current;
      const currentPx = playerXRef.current;
      const currentCombo = comboRef.current;
      const multiplier = currentCombo >= 5 ? 2 : 1;

      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.y += item.speed;
        item.rotation += 1.5;

        // Check catch collision at bottom (y between 78% and 88%)
        if (item.y >= 76 && item.y <= 88) {
          const distanceX = Math.abs(item.x - currentPx);

          // Catcher basket width is around ~14%
          if (distanceX < 10) {
            // Caught!
            if (item.type === 'normal') {
              const gained = 10 * multiplier;
              setScore((s) => s + gained);
              setCombo((c) => c + 1);
              sounds.playCatch(currentCombo + 1);
            } else if (item.type === 'golden') {
              const gained = 50 * multiplier;
              setScore((s) => s + gained);
              setCombo((c) => c + 1);
              sounds.playGolden();
            } else if (item.type === 'melting') {
              setScore((s) => Math.max(0, s - 15));
              setCombo(0);
              sounds.playMelt();
            } else if (item.type === 'ice') {
              setIsFrozen(true);
              sounds.playFreeze();
              setTimeout(() => {
                setIsFrozen(false);
              }, 1000);
            }

            items.splice(i, 1);
            continue;
          }
        }

        // Missed item fallen off screen
        if (item.y > 105) {
          if (item.type === 'normal' || item.type === 'golden') {
            // Missed normal or golden scoop resets combo
            setCombo(0);
          }
          items.splice(i, 1);
        }
      }

      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame(loop);

    return () => {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
      cancelAnimationFrame(animationFrame);
    };
  }, [gameState]);

  // Handle Game Over High Score check & Celebration
  useEffect(() => {
    if (gameState === 'gameover') {
      if (score > highScore) {
        setHighScore(score);
        setNewHighScoreCelebrated(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem('popo_game_highscore', String(score));
        }
        // Burst celebration confetti!
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {
          // fallback
        }
      }
    }
  }, [gameState, score, highScore]);

  // Dynamic result commentary
  const getResultRating = (finalScore: number) => {
    if (finalScore >= 400) {
      return { title: 'POPO LEGEND', desc: 'You scooped up the entire galaxy! Certified Flavourverse royalty.' };
    }
    if (finalScore >= 251) {
      return { title: 'Flavour Hunter', desc: 'Quick hands and true ice cream reflexes! Outstanding masti.' };
    }
    if (finalScore >= 101) {
      return { title: 'Certified POPO Fan', desc: 'Solid scooping! You’re definitely ready for the flavour realm.' };
    }
    return { title: 'Warm-up scoop', desc: 'Every grand explorer starts with one scoop! Try again to unlock 2X combos.' };
  };

  const result = getResultRating(score);

  return (
    <section
      id="popo-time"
      className="relative w-full py-20 px-4 bg-gradient-to-b from-[#FFFBF2] via-[#FFEEDC] to-[#FFFBF2] select-none"
    >
      <div className="max-w-4xl mx-auto">
        {/* Game Title Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/90 border border-orange-200 shadow-sm text-xs font-black uppercase tracking-wider text-[#FF5500] mb-2">
            <Sparkles size={14} />
            <span>Browser Mini Game</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black font-['Outfit',sans-serif] tracking-tight text-[#1A1412]">
            POPO TIME: Catch The Scoops!
          </h2>

          <p className="text-sm sm:text-base font-semibold text-[#543B2B] mt-1 max-w-lg mx-auto">
            Catch falling flavour scoops with POPO's waffle cup in 30 seconds. Avoid melting scoops & ice freezes!
          </p>
        </div>

        {/* Game Console Screen */}
        <div
          ref={containerRef}
          onMouseMove={(e) => handlePointerMove(e.clientX)}
          onTouchMove={(e) => {
            if (e.touches[0]) handlePointerMove(e.touches[0].clientX);
          }}
          className={`relative w-full h-[500px] sm:h-[560px] rounded-[36px] overflow-hidden border-4 border-white shadow-2xl transition-all ${
            isFrozen ? 'ring-8 ring-cyan-300' : 'shadow-orange-950/20'
          }`}
          style={{
            background: 'linear-gradient(180deg, #87CEEB 0%, #FFF3DC 60%, #FFD699 100%)'
          }}
        >
          {/* Clouds in Game Background */}
          <div className="absolute top-4 left-6 w-32 h-12 bg-white/75 rounded-full blur-md" />
          <div className="absolute top-16 right-10 w-44 h-14 bg-white/60 rounded-full blur-lg" />

          {/* HUD Status Bar */}
          <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-white/85 backdrop-blur-md shadow-md border border-orange-200">
            {/* Timer */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-stone-500 uppercase">Time:</span>
              <span
                className={`text-lg font-black font-mono ${
                  timeLeft <= 5 ? 'text-red-600 animate-ping' : 'text-[#1A1412]'
                }`}
              >
                {timeLeft}s
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500 uppercase">Score:</span>
              <span className="text-2xl font-black font-['Outfit',sans-serif] text-[#FF5500]">
                {score}
              </span>
            </div>

            {/* Combo Multiplier */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-[#FF5500]">
                {combo >= 5 ? '2X MULTIPLIER!' : `Combo: ${combo}/5`}
              </span>
            </div>

            {/* High Score & Sound Toggle */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-700">
                <Trophy size={14} className="text-amber-500" />
                <span>{highScore}</span>
              </div>
              <button
                onClick={handleSoundToggle}
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </div>

          {/* Frozen HUD Warning Banner */}
          {isFrozen && (
            <div className="absolute top-18 left-1/2 -translate-x-1/2 z-30 px-4 py-1 rounded-full bg-cyan-500 text-white text-xs font-black uppercase tracking-wider animate-bounce shadow-lg">
              ❄️ FROZEN FOR 1 SEC! ❄️
            </div>
          )}

          {/* Falling Items Rendering */}
          {itemsRef.current.map((item) => (
            <div
              key={item.id}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                width: item.size,
                height: item.size
              }}
              className="absolute z-10 pointer-events-none flex items-center justify-center"
            >
              {item.type === 'normal' && (
                <div
                  className="w-full h-full rounded-full shadow-lg border-2 border-white flex items-center justify-center"
                  style={{
                    backgroundColor: item.flavourColor,
                    boxShadow: `0 4px 10px ${item.flavourColor}88`
                  }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-white/70" />
                </div>
              )}

              {item.type === 'golden' && (
                <div className="w-full h-full rounded-full shadow-xl bg-gradient-to-tr from-amber-300 to-yellow-500 border-2 border-white flex items-center justify-center animate-spin">
                  <span className="text-xs">⭐</span>
                </div>
              )}

              {item.type === 'melting' && (
                <div className="w-full h-full rounded-full bg-stone-700/80 border-2 border-dashed border-red-400 flex items-center justify-center shadow-md">
                  <span className="text-xs">💧</span>
                </div>
              )}

              {item.type === 'ice' && (
                <div className="w-full h-full rounded-lg bg-cyan-200/90 border-2 border-white flex items-center justify-center shadow-md backdrop-blur-xs">
                  <span className="text-xs">🧊</span>
                </div>
              )}
            </div>
          ))}

          {/* Player Catcher (POPO Explorer holding Ice Cream Waffle Basket) */}
          <div
            style={{
              left: `${playerX}%`,
              bottom: '12px',
              transform: 'translateX(-50%)'
            }}
            className={`absolute z-20 transition-all duration-75 flex flex-col items-center pointer-events-none ${
              isFrozen ? 'opacity-60 saturate-50' : 'opacity-100'
            }`}
          >
            {/* Waffle Catching Basket */}
            <div className="relative w-28 h-10 rounded-b-3xl bg-gradient-to-b from-[#E5A024] to-[#99580E] border-2 border-[#543314] shadow-xl flex items-center justify-center overflow-hidden">
              {/* Waffle cross lines */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px]" />
              <span className="text-[10px] font-black tracking-wider uppercase text-white drop-shadow">
                POPO CUP
              </span>
            </div>

            {/* POPO Explorer Mascot Upper Body */}
            <div className="w-20 h-20 -mt-2">
              <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow">
                {/* Safari Explorer Hat */}
                <ellipse cx="80" cy="50" rx="44" ry="12" fill="#E8B868" stroke="#A47B2E" strokeWidth="2" />
                <path d="M 50 48 C 50 20, 110 20, 110 48 Z" fill="#E8B868" stroke="#A47B2E" strokeWidth="2" />
                <circle cx="80" cy="38" r="7" fill="#FFF" stroke="#FF5500" strokeWidth="1.5" />
                <text x="80" y="40" fontSize="5" fontWeight="900" fill="#FF5500" textAnchor="middle">
                  popo
                </text>
                {/* Panda Head */}
                <ellipse cx="80" cy="80" rx="38" ry="34" fill="#FFFFFF" />
                {/* Panda Ears */}
                <circle cx="50" cy="54" r="14" fill="#1C1714" />
                <circle cx="110" cy="54" r="14" fill="#1C1714" />
                {/* Eye patches */}
                <ellipse cx="65" cy="78" rx="11" ry="13" fill="#1C1714" />
                <ellipse cx="95" cy="78" rx="11" ry="13" fill="#1C1714" />
                {/* Eyes */}
                <circle cx="66" cy="77" r="4" fill="#FFF" />
                <circle cx="96" cy="77" r="4" fill="#FFF" />
                {/* Smile */}
                <path d="M 74 94 C 74 100, 86 100, 86 94" stroke="#1C1714" strokeWidth="2.5" fill="#FF3B66" />
                {/* Red Neckerchief */}
                <path d="M 68 112 L 92 112 L 80 126 Z" fill="#FF3B66" />
              </svg>
            </div>
          </div>

          {/* OVERLAYS: IDLE START SCREEN */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white">
              <div className="w-20 h-20 rounded-full bg-white/90 text-4xl flex items-center justify-center shadow-xl mb-4 animate-bounce">
                🍨
              </div>
              <h3 className="text-3xl sm:text-4xl font-black font-['Outfit',sans-serif] tracking-tight mb-2">
                READY TO SCOOP?
              </h3>
              <p className="text-sm font-semibold max-w-sm mb-6 text-amber-100">
                Catch normal scoops (+10), Golden scoops (+50), and chain 5 catches for a 2X Multiplier! Avoid melting scoops and ice cubes.
              </p>

              <button
                onClick={startGame}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF5500] to-[#FF3B66] text-white font-black text-sm uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Play size={18} />
                <span>START 30s ARCADE</span>
              </button>

              <div className="mt-6 flex items-center gap-4 text-xs font-bold text-stone-200">
                <span>Controls: Arrow Keys / A & D / Mouse / Touch</span>
              </div>
            </div>
          )}

          {/* OVERLAYS: GAME OVER RESULT SCREEN */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 z-40 bg-black/55 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white animate-in fade-in">
              {newHighScoreCelebrated && (
                <div className="mb-2 px-4 py-1 rounded-full bg-amber-400 text-black text-xs font-black uppercase tracking-wider animate-bounce">
                  🏆 NEW HIGH SCORE! 🏆
                </div>
              )}

              <h3 className="text-4xl sm:text-5xl font-black font-['Outfit',sans-serif] tracking-tight mb-1">
                POPO TIME!
              </h3>

              <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400 my-2">
                {score} PTS
              </div>

              <div className="max-w-xs mb-6">
                <span className="text-lg font-black text-amber-300 block">
                  “{result.title}”
                </span>
                <p className="text-xs font-semibold text-stone-200 mt-1">
                  {result.desc}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={startGame}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF5500] to-[#FF3B66] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  <span>PLAY AGAIN</span>
                </button>

                <button
                  onClick={onExploreFlavours}
                  className="px-7 py-3.5 rounded-full bg-white text-stone-900 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:bg-stone-100 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Compass size={16} />
                  <span>EXPLORE FLAVOURS</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Legend / Rules Footer */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-white/80 border border-orange-100 flex items-center gap-2 text-xs font-bold text-stone-700">
            <span className="w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center text-white text-[10px]">
              🍦
            </span>
            <span>Normal Scoop: +10</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/80 border border-orange-100 flex items-center gap-2 text-xs font-bold text-stone-700">
            <span className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-black text-[10px]">
              ⭐
            </span>
            <span>Golden Scoop: +50</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/80 border border-orange-100 flex items-center gap-2 text-xs font-bold text-stone-700">
            <span className="w-5 h-5 rounded-full bg-amber-800 flex items-center justify-center text-white text-[10px]">
              💧
            </span>
            <span>Melting: -15 pts</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/80 border border-orange-100 flex items-center gap-2 text-xs font-bold text-stone-700">
            <span className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center text-white text-[10px]">
              🧊
            </span>
            <span>Ice Cube: Freeze 1s</span>
          </div>
        </div>
      </div>
    </section>
  );
};
