import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '../../services/AudioService';

export const RosterLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { playSound } = useAudio();
  const [stage, setStage] = useState<'eyes' | 'body' | 'text' | 'exit'>('eyes');
  const [vibrate, setVibrate] = useState(false);

  useEffect(() => {
    // 1. Fade in eyes first (2s)
    const timer1 = setTimeout(() => {
      setStage('body');
      setVibrate(true); // Vibration on "footstep"
      playSound('FOOTSTEP', 0.4);
      setTimeout(() => {
        setVibrate(false);
        playSound('IMPACT', 0.6);
      }, 300);
    }, 2000);

    // 2. Full body emerging (3s)
    const timer2 = setTimeout(() => setStage('text'), 5000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (stage === 'text') {
      const timer = setTimeout(() => setStage('exit'), 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'exit') {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  const videoUrl = "https://i.imgur.com/AWz81vz.mp4";

  return (
    <motion.div 
      className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden ${vibrate ? 'animate-screen-vibrate' : ''}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: stage === 'exit' ? 1.5 : 1 }}
          transition={{ duration: 8, ease: "linear" }}
        >
          <source src={videoUrl} type="video/mp4" />
        </motion.video>
        
        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        
        {/* Particle Glow (Gold Dust) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-brand-yellow/30 rounded-full blur-[1px] animate-particle-glow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Eyes First Animation */}
      <AnimatePresence>
        {stage === 'eyes' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 1] }}
            exit={{ opacity: 0 }}
            className="relative z-20 flex gap-12"
          >
            <div className="w-4 h-4 rounded-full bg-brand-yellow blur-md animate-eye-glow shadow-[0_0_30px_#F5C400]" />
            <div className="w-4 h-4 rounded-full bg-brand-yellow blur-md animate-eye-glow shadow-[0_0_30px_#F5C400]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Text */}
      <AnimatePresence>
        {stage === 'text' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative z-20 text-center space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bebas text-white tracking-[0.2em] leading-none">
              ATTENTION HAS A <span className="text-brand-yellow">NEW OWNER.</span>
            </h1>
            <motion.div 
              className="h-[1px] bg-brand-yellow/50 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Progress Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white/10 overflow-hidden">
        <motion.div 
          className="h-full bg-brand-yellow"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 5, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};
