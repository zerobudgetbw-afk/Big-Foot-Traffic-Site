import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Bot, Globe, Palette, TrendingUp } from 'lucide-react';
import { generateServiceImage } from '../lib/imagen';

interface SuperpowerCardProps {
  number: string;
  category: string;
  title: string;
  subtitle: string;
  accentColor: string;
  imagePrompt: string;
  imageUrl?: string;
  icon: React.ElementType;
  index: number;
}

const SuperpowerCard: React.FC<SuperpowerCardProps> = ({
  number,
  category,
  title,
  subtitle,
  accentColor,
  imagePrompt,
  imageUrl: providedImageUrl,
  icon: Icon,
  index
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(providedImageUrl || null);
  const [isLoading, setIsLoading] = useState(!providedImageUrl);

  useEffect(() => {
    if (providedImageUrl) {
      setImageUrl(providedImageUrl);
      setIsLoading(false);
      return;
    }
    
    const loadImage = async () => {
      setIsLoading(true);
      const url = await generateServiceImage(imagePrompt);
      setImageUrl(url);
      setIsLoading(false);
    };
    loadImage();
  }, [imagePrompt, providedImageUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="relative h-[420px] bg-[#0d0d0d] rounded-[14px] overflow-hidden border border-[#F5C400]/15 hover:border-[#F5C400] transition-all duration-300 group"
    >
      {/* Accent Top Border */}
      <div 
        className="absolute top-0 left-0 w-full h-[3px] z-20" 
        style={{ backgroundColor: accentColor }}
      />

      {/* Top Half: Image */}
      <div className="relative h-[200px] overflow-hidden">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="shimmer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer"
              style={{ backgroundSize: '200% 100%' }}
            />
          ) : imageUrl ? (
            <motion.img
              key="image"
              src={imageUrl}
              alt={title}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          ) : (
            <motion.div 
              key="fallback"
              className="w-full h-full"
              style={{ background: `linear-gradient(135deg, ${accentColor}33, #0d0d0d)` }}
            />
          )}
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-70" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Category Pill Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span 
            className="px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-black/80 border border-white/10"
            style={{ color: accentColor }}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Bottom Half: Content */}
      <div className="p-5 flex flex-col justify-between h-[220px] relative">
        {/* Decorative Watermark Number */}
        <div className="absolute top-2 right-4 text-[80px] font-bold text-white/[0.03] pointer-events-none select-none leading-none">
          {number}
        </div>

        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg bg-white/5 border border-white/10"
              style={{ color: accentColor }}
            >
              <Icon size={20} />
            </div>
            <h3 className="text-2xl font-bebas text-white tracking-wide uppercase">
              {title}
            </h3>
          </div>
          <p className="text-[12px] text-[#AAA] leading-[1.7] max-w-[90%] line-clamp-2">
            {subtitle}
          </p>
        </div>

        <div className="flex justify-end mt-auto">
          <motion.div 
            whileHover={{ x: 4 }}
            className="text-[#F5C400] cursor-pointer"
          >
            <ArrowRight size={20} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const SuperpowerCards: React.FC = () => {
  const cards = [
    {
      number: "01",
      category: "AI & AUTOMATION",
      title: "AI Marketing & Content",
      subtitle: "We deploy custom-trained AI agents to handle your content production, customer interactions, and data analysis at 10x human speed.",
      accentColor: "#00F0FF", // Cyan
      imagePrompt: "aiMarketing",
      icon: Bot
    },
    {
      number: "02",
      category: "DIGITAL REAL ESTATE",
      title: "Website Design & Development",
      subtitle: "High-conversion, lightning-fast digital experiences built for premium brands. We don't just build sites; we build sales machines.",
      accentColor: "#F5C400", // Gold
      imagePrompt: "websiteDesign",
      icon: Globe
    },
    {
      number: "03",
      category: "IDENTITY & VISION",
      title: "Branding & Creative Strategy",
      subtitle: "Positioning your brand as the only logical choice. We craft visual identities and narratives that command attention and premium pricing.",
      accentColor: "#FF0055", // Pink/Red
      imagePrompt: "branding",
      imageUrl: "/identity-vision-cover.jpg",
      icon: Palette
    },
    {
      number: "04",
      category: "SCALABLE REVENUE",
      title: "Growth & Performance Marketing",
      subtitle: "Aggressive, data-backed acquisition strategies designed to scale your revenue. We find your customers where they live online.",
      accentColor: "#00FF66", // Green
      imagePrompt: "growth",
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-7xl mx-auto px-4">
      {cards.map((card, i) => (
        <SuperpowerCard key={i} {...card} index={i} />
      ))}
    </div>
  );
};
