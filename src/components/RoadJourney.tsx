import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { MapPin, Search, FileText, GraduationCap, Car, Mic, BarChart3, TrendingUp } from 'lucide-react';

const milestones = [
  { id: 1, icon: Search, title: "Recruit & Vet", desc: "We recruit and verify high-quality drivers." },
  { id: 2, icon: FileText, title: "Brand Brief", desc: "We turn your message into a conversation." },
  { id: 3, icon: GraduationCap, title: "Driver Training", desc: "Drivers become trained brand ambassadors." },
  { id: 4, icon: Car, title: "Ride Execution", desc: "Conversations happen in real-time." },
  { id: 5, icon: Mic, title: "Audio Recording", desc: "Every interaction is captured for proof." },
  { id: 6, icon: BarChart3, title: "Daily Scoring", desc: "Human quality checks on every ride." },
  { id: 7, icon: TrendingUp, title: "Brand Report", desc: "Live dashboard with actionable data." },
];

export const RoadJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const carX = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "90%"]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="https://storage.googleapis.com/firebasestorage.googleapis.com/v0/b/firebasestorage-41312.appspot.com/o/6987747-uhd_3840_2160_25fps.mp4?alt=media&token=8187847c-6784-4847-8784-87847c67847c" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/90" /> {/* Dark overlay */}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-5xl md:text-7xl font-display text-brand-yellow mb-24 uppercase tracking-tighter text-center">
          HOW IT WORKS
        </h2>

        {/* Desktop View */}
        <div className="hidden md:block relative h-64">
          {/* Road */}
          <div className="absolute top-1/2 left-0 w-full h-12 bg-brand-dark-grey rounded-full -translate-y-1/2 overflow-hidden">
            <div className="road-line w-[200%] h-1 absolute top-1/2 -translate-y-1/2 opacity-50" />
          </div>

          {/* Milestones */}
          <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2 px-4">
            {milestones.map((m, i) => (
              <MilestonePin key={m.id} milestone={m} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>

          {/* Car */}
          <motion.div
            style={{ left: carX }}
            className="absolute top-1/2 -translate-y-1/2 z-20"
          >
            <div className="relative">
              <Car size={48} className="text-brand-yellow fill-brand-yellow" />
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand-orange blur-sm"
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-12 relative">
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-brand-dark-grey overflow-hidden">
            <div className="road-line-vertical h-[200%] w-full opacity-50" />
          </div>
          {milestones.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-8 relative z-10"
            >
              <div className="w-12 h-12 rounded-full bg-brand-yellow text-brand-black flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,196,0,0.5)]">
                <m.icon size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-brand-yellow uppercase">{m.title}</h3>
                <p className="text-white/70">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MilestonePin = ({ milestone, index, scrollYProgress }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const threshold = index / (milestones.length - 1);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest: number) => {
      if (latest >= threshold && !isExpanded) {
        setIsExpanded(true);
      } else if (latest < threshold && isExpanded) {
        setIsExpanded(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, threshold, isExpanded]);

  return (
    <div className="relative">
      <motion.div
        animate={{
          scale: isExpanded ? 1.2 : 1,
          backgroundColor: isExpanded ? "#F5C400" : "#1C1C1C",
          color: isExpanded ? "#0A0A0A" : "#F5C400"
        }}
        className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg z-10 relative"
      >
        <milestone.icon size={24} />
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 w-48 bg-brand-dark-grey p-4 rounded-xl border border-brand-yellow/30 shadow-2xl z-30"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-dark-grey border-t border-l border-brand-yellow/30 rotate-45" />
            <h4 className="text-brand-yellow font-bold uppercase text-sm mb-1">{milestone.title}</h4>
            <p className="text-xs text-white/70 leading-tight">{milestone.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
