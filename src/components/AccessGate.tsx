import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Briefcase, Target, ShieldAlert, Lock, ArrowRight } from 'lucide-react';
import { useAudio } from '../services/AudioService';

interface AccessGateProps {
  onAuthenticated: (role: 'SOLDIER' | 'ARMY') => void;
}

const AccessGate: React.FC<AccessGateProps> = ({ onAuthenticated }) => {
  const { playSound } = useAudio();
  const [stage, setStage] = useState<number>(1);
  const [hoveredRole, setHoveredRole] = useState<'SOLDIER' | 'ARMY' | null>(null);

  // Stage 1: Terminal Typing
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const fullLines = [
    "INITIALISING SECURE NETWORK...",
    "LOCATION: GABORONE, BOTSWANA",
    "ENCRYPTING CHANNEL...",
    "BIG FOOT TRAFFIC NETWORK — RESTRICTED ACCESS"
  ];

  const videoUrl = "https://i.imgur.com/AWz81vz.mp4";

  useEffect(() => {
    if (stage === 1) {
      let currentLine = 0;
      const interval = setInterval(() => {
        if (currentLine < fullLines.length) {
          setTerminalLines(prev => [...prev, fullLines[currentLine]]);
          // Play typing sound
          playSound('TYPE', 0.15);
          currentLine++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStage(2), 1000);
        }
      }, 600);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <div className="fixed inset-0 z-[9999] bg-brand-black text-white overflow-hidden font-sans">
      {/* Global Video Background for Stages 2 & 3 */}
      <AnimatePresence>
        {stage > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-0"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-20"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black" />
            
            {/* Golden Streaks */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-0 w-full h-[1px] bg-brand-yellow/20 animate-golden-streak" />
              <div className="absolute top-3/4 left-0 w-full h-[1px] bg-brand-yellow/10 animate-golden-streak" style={{ animationDelay: '4s' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* STAGE 1: LOADING SEQUENCE */}
        {stage === 1 && (
          <motion.div
            key="stage1"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col justify-center p-8 md:p-24 font-mono text-white/40 relative z-10"
          >
            <div className="space-y-2">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, ease: "linear" }}
                  className="overflow-hidden whitespace-nowrap border-r-2 border-white/20 text-xs uppercase tracking-widest"
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STAGE 2: QUOTE SCREEN */}
        {stage === 2 && (
          <motion.div
            key="stage2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8 }}
            className="h-full flex flex-col items-center justify-center p-8 text-center space-y-12 relative z-10"
          >
            <div className="max-w-4xl space-y-6 md:space-y-8">
              <div className="space-y-4">
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.5 }}
                  className="text-lg md:text-2xl font-medium text-white/40"
                >
                  "A drug dealer sells addiction to the desperate."
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 1 }}
                  className="text-lg md:text-2xl font-medium text-white/40"
                >
                  "A jeweller sells beauty to the vain."
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 1.5 }}
                  className="text-lg md:text-2xl font-medium text-white/40"
                >
                  "A preacher sells salvation to the fearful."
                </motion.p>
              </div>

              <motion.p 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 2 }}
                className="text-4xl md:text-7xl font-bold text-brand-yellow tracking-tight leading-tight"
              >
                WE SELL ATTENTION TO THE DISTRACTED.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 2.5 }}
                className="text-sm md:text-lg font-bold text-white uppercase tracking-[0.3em]"
              >
                The most valuable currency in the world is attention.
              </motion.p>
              
              <div className="space-y-4 pt-8">
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 3.5 }}
                  className="text-white/30 text-[10px] uppercase tracking-[0.3em]"
                >
                  Welcome to Big Foot Traffic Botswana’s first verified conversational advertising network.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 4 }}
                  className="text-white/40 text-xs italic"
                >
                  "We don’t reach people. We sit with them."
                </motion.p>
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5 }}
              onClick={() => {
                playSound('ENTER');
                setStage(3);
              }}
              className="mt-12 px-12 py-4 bg-brand-yellow text-brand-black font-bold uppercase tracking-widest hover:scale-105 transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">ENTER THE NETWORK</span>
              <motion.div 
                className="absolute inset-0 bg-white/20"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </motion.div>
        )}

        {/* STAGE 3: IDENTITY SELECTION */}
        {stage === 3 && (
          <motion.div
            key="stage3"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="h-full flex flex-col items-center justify-center p-8 relative z-10"
          >
            {/* Big Foot Eyes Glow in Background on Hover */}
            <AnimatePresence>
              {hoveredRole && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute top-1/4 pointer-events-none transition-all duration-500 flex gap-24 ${hoveredRole === 'SOLDIER' ? '-translate-x-1/4' : 'translate-x-1/4'}`}
                >
                  <div className="w-2 h-2 rounded-full bg-brand-yellow blur-sm animate-eye-glow" />
                  <div className="w-2 h-2 rounded-full bg-brand-yellow blur-sm animate-eye-glow" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-yellow font-bold text-[10px] uppercase tracking-[0.4em] mb-16"
            >
              IDENTIFY YOURSELF
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
              {/* SOLDIER CARD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredRole('SOLDIER')}
                onHoverEnd={() => setHoveredRole(null)}
                onClick={() => { 
                  playSound('ENTER');
                  onAuthenticated('SOLDIER'); 
                }}
                className="p-10 rounded-3xl glass-dark border border-white/5 cursor-pointer group transition-all relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-brand-yellow group-hover:text-brand-black transition-colors relative">
                    <Car size={32} className="text-white/40 group-hover:text-brand-black" />
                    {/* Car Movement Icon Animation */}
                    <motion.div 
                      className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight size={12} className="text-brand-black" />
                    </motion.div>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-2">SOLDIER</h2>
                  <p className="text-brand-yellow/60 font-bold text-[10px] uppercase mb-6 tracking-widest">Driver · Partner · Voice</p>
                  <div className="space-y-4">
                    <p className="text-white/40 text-sm leading-relaxed">
                      You are on the ground. You deliver the message. You are the voice of the network.
                    </p>
                    {/* Soundwave Animation */}
                    <div className="flex gap-1 h-3 items-end opacity-0 group-hover:opacity-100 transition-opacity">
                      {[...Array(5)].map((_, i) => (
                        <motion.div 
                          key={i}
                          className="w-1 bg-brand-yellow"
                          animate={{ height: [4, 12, 4] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ARMY CARD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredRole('ARMY')}
                onHoverEnd={() => setHoveredRole(null)}
                onClick={() => { 
                  playSound('ENTER');
                  onAuthenticated('ARMY'); 
                }}
                className="p-10 rounded-3xl glass-dark border border-brand-yellow/20 cursor-pointer group transition-all relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-brand-yellow/10 flex items-center justify-center mb-8 group-hover:bg-brand-yellow group-hover:text-brand-black transition-colors relative">
                    <Target size={32} className="text-brand-yellow group-hover:text-brand-black" />
                    {/* Targeting Animation */}
                    <motion.div 
                      className="absolute inset-0 border border-brand-yellow rounded-full opacity-0 group-hover:opacity-100"
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-2">ARMY</h2>
                  <p className="text-brand-yellow font-bold text-[10px] uppercase mb-6 tracking-widest">Brand · Agency · Partner</p>
                  <div className="space-y-4">
                    <p className="text-white/40 text-sm leading-relaxed">
                      You control the narrative. We deliver the conversation.
                    </p>
                    <div className="space-y-1">
                      <p className="text-brand-yellow font-bold text-xs uppercase tracking-widest">
                        Minimum investment: P15,000/mo.
                      </p>
                      <p className="text-white/20 text-[9px] uppercase tracking-widest">
                        Real conversations. Real data.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessGate;
