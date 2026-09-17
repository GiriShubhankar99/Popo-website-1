import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { PopoMascot } from './PopoMascot';
import { Compass, Play, Sparkles, ChevronDown } from 'lucide-react';
import { sounds } from '../utils/sound';

interface HeroSectionProps {
  onExploreFlavours: () => void;
  onPlayGame: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreFlavours,
  onPlayGame
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mascotBubble, setMascotBubble] = useState('Welcome Explorer! Ready for masti?');
  const [mascotReaction, setMascotReaction] = useState<'idle' | 'wave' | 'celebrate'>('idle');

  // Three.js 3D Ice Cream Landscape
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    // Dreamy fog
    scene.fog = new THREE.FogExp2(0xfff6ea, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 7.5);

    // Ambient & Directional Lights (Golden warm sunlight)
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffe6a3, 2.0);
    sunLight.position.set(5, 8, 4);
    scene.add(sunLight);

    const pinkFillLight = new THREE.DirectionalLight(0xffb8c9, 1.0);
    pinkFillLight.position.set(-5, -2, 2);
    scene.add(pinkFillLight);

    // Group for objects that will rotate/sway
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Floating 3D Ice Cream Scoops in the distance
    const scoopColors = [
      0xffa812, // Mango
      0xff4365, // Strawberry
      0x684e29, // Chocolate
      0xffd166, // Butterscotch
      0xff9933, // Kesar
      0xfff5dc, // Vanilla
      0x6cd4b3  // Mint chip
    ];

    const scoops: THREE.Mesh[] = [];
    const scoopGeo = new THREE.DodecahedronGeometry(0.55, 3);

    scoopColors.forEach((col, i) => {
      const scoopMat = new THREE.MeshStandardMaterial({
        color: col,
        roughness: 0.35,
        metalness: 0.05
      });
      const mesh = new THREE.Mesh(scoopGeo, scoopMat);

      // Distribute in semi-circle around hero
      const angle = (i / scoopColors.length) * Math.PI * 1.6 - Math.PI * 0.8;
      const radius = 4.2 + (i % 2) * 1.5;
      mesh.position.set(
        Math.sin(angle) * radius,
        0.5 + Math.sin(i * 1.8) * 1.2,
        Math.cos(angle) * radius - 2.5
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      // Add cute decorative waffle cone under 2 of them
      if (i % 3 === 0) {
        const coneGeo = new THREE.ConeGeometry(0.35, 0.9, 16);
        const coneMat = new THREE.MeshStandardMaterial({
          color: 0xc48b3b,
          roughness: 0.8
        });
        const cone = new THREE.Mesh(coneGeo, coneMat);
        cone.position.y = -0.55;
        cone.rotation.x = Math.PI;
        mesh.add(cone);
      }

      worldGroup.add(mesh);
      scoops.push(mesh);
    });

    // 2. Floating Hot Air Balloons (Inspired by POPO Flavourverse map)
    const balloons: THREE.Group[] = [];
    for (let b = 0; b < 4; b++) {
      const balloonGroup = new THREE.Group();
      // Balloon sphere
      const balloonGeo = new THREE.SphereGeometry(0.5, 24, 24);
      balloonGeo.scale(1, 1.25, 1);
      const balloonMat = new THREE.MeshStandardMaterial({
        color: b % 2 === 0 ? 0xff7b54 : 0x70c1b3,
        roughness: 0.4
      });
      const balloonMesh = new THREE.Mesh(balloonGeo, balloonMat);

      // Basket
      const basketGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.15, 8);
      const basketMat = new THREE.MeshStandardMaterial({ color: 0x6e4a25 });
      const basketMesh = new THREE.Mesh(basketGeo, basketMat);
      basketMesh.position.y = -0.85;

      balloonGroup.add(balloonMesh);
      balloonGroup.add(basketMesh);

      balloonGroup.position.set(
        (b - 1.5) * 3.8,
        2.2 + (b % 2) * 0.8,
        -5 - b * 1.2
      );
      worldGroup.add(balloonGroup);
      balloons.push(balloonGroup);
    }

    // 3. Drifting Sparkling Sprinkles & Stardust Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const pColorChoices = [
      new THREE.Color(0xff4365),
      new THREE.Color(0xffaa00),
      new THREE.Color(0xffdd66),
      new THREE.Color(0xffffff),
      new THREE.Color(0x66ccaa)
    ];

    for (let p = 0; p < particleCount; p++) {
      positions[p * 3] = (Math.random() - 0.5) * 14;
      positions[p * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[p * 3 + 2] = (Math.random() - 0.5) * 10;

      const c = pColorChoices[p % pColorChoices.length];
      colors[p * 3] = c.r;
      colors[p * 3 + 1] = c.g;
      colors[p * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse parallax tracking
    let targetCameraX = 0;
    let targetCameraY = 1.2;

    const onMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetCameraX = normX * 0.6;
      targetCameraY = 1.2 + normY * 0.3;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Camera smooth damping
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 0.4, 0);

      // Scoops floating bounce & spin
      scoops.forEach((mesh, idx) => {
        mesh.rotation.y += 0.008 * (idx % 2 === 0 ? 1 : -1);
        mesh.rotation.x += 0.004;
        mesh.position.y += Math.sin(elapsed * 1.5 + idx) * 0.002;
      });

      // Hot air balloons gentle drift
      balloons.forEach((bGroup, idx) => {
        bGroup.position.y += Math.sin(elapsed * 0.8 + idx * 2) * 0.0015;
        bGroup.rotation.y = Math.sin(elapsed * 0.5 + idx) * 0.1;
      });

      // Particle subtle swirl
      particleSystem.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      scoopGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF4E4] via-[#FFEED4] to-[#FFFBF2] pt-24 pb-16 px-4 select-none"
    >
      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Hero Ambient Radial Soft Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-300/20 via-orange-400/20 to-pink-400/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Bold Typography & Headlines */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Eyebrow Chip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-orange-200 shadow-sm text-xs font-black uppercase tracking-wider text-[#FF5500] mb-5"
          >
            <Sparkles size={14} className="animate-spin text-amber-500" />
            <span>The Indian Ice Cream Universe</span>
          </motion.div>

          {/* Large Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-['Outfit',sans-serif] tracking-tight text-[#1A1412] leading-[0.95] mb-6"
          >
            WELCOME TO THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF7A00] to-[#FF2E63]">
              POPOVERSE.
            </span>
          </motion.h1>

          {/* Secondary Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl sm:text-2xl font-bold font-['Fredoka',sans-serif] text-[#523B2A] max-w-lg mb-8 leading-snug"
          >
            7 flavours. 7 worlds. <br className="hidden sm:inline" />
            <span className="text-[#FF5500]">Infinite masti.</span>
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
          >
            {/* CTA 1: EXPLORE THE FLAVOURS */}
            <button
              onClick={() => {
                sounds.playPortal();
                onExploreFlavours();
              }}
              onMouseEnter={() => {
                setMascotReaction('wave');
                setMascotBubble('Let’s see the 7 magical lands!');
              }}
              onMouseLeave={() => {
                setMascotReaction('idle');
                setMascotBubble('Pick your favourite scoop!');
              }}
              className="group relative px-7 py-4 rounded-full bg-gradient-to-r from-[#FF5500] via-[#FF6820] to-[#FF3B66] text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
            >
              <Compass size={18} className="group-hover:rotate-45 transition-transform" />
              <span>EXPLORE THE FLAVOURS</span>
            </button>

            {/* CTA 2: PLAY POPO TIME */}
            <button
              onClick={() => {
                sounds.playGolden();
                onPlayGame();
              }}
              onMouseEnter={() => {
                setMascotReaction('celebrate');
                setMascotBubble('Ready for high-score action?');
              }}
              onMouseLeave={() => {
                setMascotReaction('idle');
                setMascotBubble('Welcome Explorer!');
              }}
              className="px-7 py-4 rounded-full bg-white/90 backdrop-blur-md text-[#241A14] font-black text-sm uppercase tracking-wider border-2 border-orange-200/80 shadow-md hover:border-[#FF5500] hover:text-[#FF5500] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
            >
              <Play size={18} className="text-[#FF5500] fill-[#FF5500]" />
              <span>PLAY POPO TIME</span>
            </button>
          </motion.div>

          {/* Quick Flavour Badges */}
          <div className="mt-8 flex items-center gap-2 text-xs font-bold text-stone-600 overflow-x-auto max-w-full pb-2">
            <span className="text-[#FF5500] font-black uppercase tracking-wider">Worlds:</span>
            {['Vanilla', 'Strawberry', 'Mango', 'Orange', 'Chocolate', 'Butterscotch', 'Kesar Kulfi'].map(
              (name, i) => (
                <span
                  key={name}
                  className="px-2.5 py-1 rounded-full bg-white/60 border border-orange-100 text-[11px] font-semibold whitespace-nowrap"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>

        {/* Right Column: POPO Mascot Showcase */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Soft Glowing Platform Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-200/50 via-orange-300/40 to-pink-300/30 blur-2xl pointer-events-none" />

            {/* Interactive POPO Explorer Mascot */}
            <PopoMascot
              size="hero"
              reaction={mascotReaction}
              holdingFlavour="#FFA812"
              bubbleMessage={mascotBubble}
              onMascotClick={() => {
                sounds.playVictory();
                setMascotReaction('celebrate');
                setMascotBubble('Infinite masti unleashed! 🎉');
                setTimeout(() => setMascotReaction('idle'), 2400);
              }}
            />
          </motion.div>

          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#523B2A]/60">
            Meet the POPO Explorer Mascot • Click for Masti!
          </p>
        </div>
      </div>

      {/* Circular Ice Cream Portal / Scroll Travel Indicator */}
      <div
        onClick={onExploreFlavours}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer group z-20"
      >
        <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#FF5500] group-hover:scale-110 transition-transform">
          Enter Flavour Portal
        </span>
        <div className="w-10 h-10 rounded-full bg-white/90 border-2 border-orange-200 flex items-center justify-center shadow-md group-hover:border-[#FF5500] group-hover:scale-110 transition-all">
          <ChevronDown size={18} className="text-[#FF5500] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
