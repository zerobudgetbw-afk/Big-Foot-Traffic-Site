import React from 'react';
import { motion } from 'motion/react';

export const RoadDivider = ({ vertical = false }: { vertical?: boolean }) => {
  return (
    <div className={`relative ${vertical ? 'w-[1px] h-full' : 'w-full h-[1px]'} overflow-hidden`}>
      <div className={`${vertical ? 'road-line-vertical h-[200%]' : 'road-stripe w-full h-full'} absolute inset-0 opacity-20`} />
    </div>
  );
};

export const SpeedLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/20 h-[1px]"
          initial={{ 
            width: Math.random() * 80 + 40,
            x: -200,
            y: Math.random() * 100 + '%',
            opacity: 0
          }}
          animate={{ 
            x: '120vw',
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: Math.random() * 0.8 + 0.5,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};
