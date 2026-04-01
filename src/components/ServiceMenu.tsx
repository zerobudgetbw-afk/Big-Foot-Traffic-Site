import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Mail, 
  Instagram, 
  MousePointerClick, 
  PenTool, 
  Video, 
  Megaphone, 
  BarChart3 
} from 'lucide-react';

interface ServiceItemProps {
  icon: React.ElementType;
  title: string;
  tag: string;
  tagColor: string;
  index: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  icon: Icon,
  title,
  tag,
  tagColor,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -2, borderColor: 'rgba(245,196,0,0.3)' }}
      className="h-[140px] p-4 bg-[#161616] border border-[#F5C400]/10 rounded-[10px] flex flex-col justify-between transition-all duration-300 group"
    >
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg bg-white/5 text-[#F5C400]/60 group-hover:text-[#F5C400] transition-colors">
          <Icon size={18} />
        </div>
        <span 
          className="px-2 py-[2px] rounded-full text-[8px] font-bold uppercase tracking-widest"
          style={{ backgroundColor: `${tagColor}22`, color: tagColor }}
        >
          {tag}
        </span>
      </div>
      
      <h4 className="text-[13px] font-bold text-white/90 leading-snug">
        {title}
      </h4>
    </motion.div>
  );
};

export const ServiceMenu: React.FC = () => {
  const services = [
    { icon: Search, title: "SEO & Search Optimization", tag: "VISIBILITY", tagColor: "#00F0FF" },
    { icon: Mail, title: "Email & SMS Automation", tag: "RETENTION", tagColor: "#F5C400" },
    { icon: Instagram, title: "Social Media Management", tag: "AWARENESS", tagColor: "#FF0055" },
    { icon: MousePointerClick, title: "PPC & Paid Acquisition", tag: "TRAFFIC", tagColor: "#00FF66" },
    { icon: PenTool, title: "Copywriting & Storytelling", tag: "CONVERSION", tagColor: "#00F0FF" },
    { icon: Video, title: "Video & Motion Graphics", tag: "ENGAGEMENT", tagColor: "#F5C400" },
    { icon: Megaphone, title: "PR & Media Relations", tag: "AUTHORITY", tagColor: "#FF0055" },
    { icon: BarChart3, title: "Analytics & Data Strategy", tag: "INSIGHTS", tagColor: "#00FF66" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 mt-24">
      <div className="text-center mb-8">
        <h3 className="text-[11px] font-mono font-bold text-[#F5C400] uppercase tracking-[0.25em] mb-2">
          AND EVERYTHING IN BETWEEN
        </h3>
        <p className="text-[12px] text-[#AAA] max-w-[300px] mx-auto">
          Our full service menu. Pick one. Pick all. We handle it.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {services.map((service, i) => (
          <ServiceItem key={i} {...service} index={i} />
        ))}
      </div>
    </div>
  );
};
