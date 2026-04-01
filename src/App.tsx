import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { 
  Car, Mic, MessageSquare, Radio, Tv, Layout, Users, 
  ShoppingBag, ShieldCheck, Landmark, Smartphone, 
  CheckCircle2, Lock, ArrowRight, Volume2, VolumeX,
  Gauge, Zap, Target, BarChart, FileDown, Briefcase,
  Menu, X, ArrowLeft, Play, Activity
} from 'lucide-react';

import { RoadDivider, SpeedLines } from './components/Visuals';
import { RoadJourney } from './components/RoadJourney';
import { SubscriptionModal } from './components/SubscriptionModal';
import AccessGate from './components/AccessGate';
import { RateCard } from './components/RateCard';
import { RosterPage } from './components/roster/RosterPage';
import { RosterLoading } from './components/roster/RosterLoading';
import { useAudio, SOUNDS } from './services/AudioService';
import { SuperpowerCards } from './components/SuperpowerCards';
import { ServiceMenu } from './components/ServiceMenu';

// --- Helper Components ---

const Counter = ({ value, duration = 2, suffix = "" }: { value: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalFrames = duration * 60;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.floor(end * progress);
        
        if (frame === totalFrames) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(currentCount);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    } else {
      setCount(0); // Reset when out of view for Feature 8
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-brand-yellow z-[2000] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

const SocialProofTicker = () => {
  const items = [
    "✓ Insurance campaign — 847 verified conversations this month",
    "✓ FMCG brand — P7.50 per verified conversation",
    "✓ Beauty product demo — 94% passenger engagement rate",
    "✓ New driver certified: BFT-047",
    "✓ 2,000+ rides delivered this month",
    "✓ 100% audio verified",
    "✓ Campaign live in 48 hours"
  ];

  return (
    <div className="h-9 bg-brand-yellow/[0.05] border-b border-brand-yellow/15 overflow-hidden flex items-center relative z-[499]">
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-12 px-12"
        whileHover={{ animationPlayState: 'paused' }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-12">
            {items.map((item, idx) => (
              <span key={idx} className="font-mono text-[11px] text-[#999] flex items-center gap-2">
                <span className="text-brand-yellow">✓</span> {item.split('✓ ')[1]}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const WhatsAppFloatingButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="fixed bottom-[80px] right-[20px] z-[9998] flex items-center gap-3">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-brand-black/90 text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 whitespace-nowrap"
          >
            Chat with us
          </motion.div>
        )}
      </AnimatePresence>
      <motion.a
        href="https://wa.me/26772833448?text=Hi%2C%20I%20found%20you%20on%20bigfoottraffic.co.bw%20and%20want%20to%20know%20more"
        target="_blank"
        rel="noopener noreferrer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-[52px] h-[52px] bg-[#25D366] rounded-full flex items-center justify-center shadow-lg text-white"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('bft_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (type: 'accept' | 'decline') => {
    localStorage.setItem('bft_cookie_consent', type);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 w-full z-[10001] bg-[#1a0a05] border-t border-white/20 p-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-[12px] text-[#AAAAAA] max-w-3xl text-center md:text-left">
            This site uses cookies to improve your experience and track campaign analytics. By continuing, you agree to our use of cookies in accordance with Botswana's Data Protection Act.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => handleAction('decline')}
              className="px-6 py-2 border border-white/20 text-[#AAAAAA] text-[12px] font-bold rounded-full hover:bg-white/5 transition-all"
            >
              DECLINE
            </button>
            <button
              onClick={() => handleAction('accept')}
              className="px-6 py-2 bg-brand-yellow text-brand-black text-[12px] font-bold rounded-full hover:scale-105 transition-all"
            >
              ACCEPT
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Section = ({ children, className = "", id = "", glow = false }: { children: React.ReactNode, className?: string, id?: string, glow?: boolean }) => (
  <section 
    id={id} 
    className={`relative py-28 md:py-40 overflow-hidden ${className}`}
    style={glow ? { background: 'radial-gradient(ellipse at 50% 50%, rgba(245,196,0,0.025) 0%, transparent 70%)' } : {}}
  >
    {children}
  </section>
);

const Spotlight = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[1]" 
      style={{ 
        background: 'radial-gradient(circle 300px at var(--x, 50%) var(--y, 50%), rgba(245,196,0,0.04) 0%, transparent 100%)' 
      }} 
    />
  );
};

const HeroVideoBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-50"
      >
        <source src="https://i.imgur.com/AWz81vz.mp4" type="video/mp4" />
      </video>
      {/* Overlay to ensure text readability and match the brand aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/20 to-brand-black" />
      
      {/* Subtle scanline effect for a tech/cinematic feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
    </div>
  );
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia('(hover: none)').matches) return;
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setTilt({ x, y });
    setMousePos({ 
      x: ((e.clientX - rect.left) / rect.width) * 100, 
      y: ((e.clientY - rect.top) / rect.height) * 100 
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      className={`relative transition-transform duration-500 ease-out ${className}`}
      style={{ 
        transform: isHovered 
          ? `perspective(800px) rotateX(${-tilt.y * 12}deg) rotateY(${tilt.x * 12}deg) translateZ(12px)` 
          : 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
          style={{ 
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.1) 0%, transparent 70%)`,
            zIndex: 10
          }}
        />
      )}
    </div>
  );
};

const VideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <Section className="bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-yellow tracking-tight uppercase">SEE IT IN ACTION</h2>
          <p className="text-white/60 font-medium text-sm md:text-base uppercase tracking-[0.2em]">A real driver. A real product. A real conversation.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative max-w-4xl mx-auto aspect-video bg-brand-dark-grey rounded-2xl border-4 border-black overflow-hidden group cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-yellow z-10" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-yellow z-10" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-yellow z-10" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-yellow z-10" />

          {/* Thumbnail */}
          <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: 'url(https://img.youtube.com/vi/cDwFCOYzAvA/maxresdefault.jpg)' }} />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-brand-yellow flex items-center justify-center shadow-[0_0_30px_rgba(245,196,0,0.4)] group-hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-brand-black border-b-[12px] border-b-transparent ml-2" />
            </div>
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {["Gaborone, Botswana", "Live Campaign Footage", "Personal Care Product Demo"].map((pill, i) => (
            <span key={i} className="px-6 py-2 glass rounded-full text-white/60 text-[10px] font-bold uppercase tracking-widest">
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[20000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-brand-yellow transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs"
              >
                CLOSE <X size={20} />
              </button>
              <iframe
                src="https://www.youtube.com/embed/cDwFCOYzAvA?autoplay=1"
                title="Big Foot Traffic Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
};

const TestimonialSection = () => {
  const testimonials = [
    {
      type: 'video',
      src: 'https://i.imgur.com/FWfGKpW.mp4',
      badge: 'FRANCISTOWN',
      live: true,
      name: 'Burgers Tarven',
      sub: 'Restaurant & Events · Francistown, Botswana',
      quote: '"The conversations our drivers had brought people through the door. We saw it directly."',
      stat: 'Direct foot traffic increase · Gaborone campaign'
    },
    {
      type: 'image',
      src: 'https://i.imgur.com/PveYU82.jpeg',
      badge: 'GABORONE',
      verified: true,
      name: 'Langa S. Ncube',
      sub: 'Campaign Partner — Personal Care Brand · Gaborone, 2026',
      quote: '"I didn\'t expect passengers to actually engage the way they did. They asked real questions. One person asked for a follow-up call on the spot."',
      stat: '94% passenger engagement rate'
    },
    {
      type: 'image',
      src: 'https://i.imgur.com/StBp0pt.jpeg',
      badge: 'GABORONE',
      soldOut: true,
      name: 'Regga Blue',
      sub: 'Comedian & Reggae Artist · Avani Hotel, Gaborone',
      quote: '"Big Foot Traffic filled the room. Drivers were talking about the show during rides for two weeks before the event. Full house."',
      stat: 'Full house — Avani Hotel Gaborone'
    }
  ];

  return (
    <Section className="bg-brand-charcoal" glow>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-brand-yellow tracking-tight uppercase"
          >
            THE PROOF IS IN THE RIDE
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 font-medium text-sm md:text-base uppercase tracking-[0.2em] mt-4"
          >
            Real campaigns. Real people. Real results.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: false }}
              className="relative w-[320px] h-[480px] rounded-[12px] overflow-hidden border border-brand-yellow/18 group cursor-pointer"
              style={{ perspective: '1000px' }}
              whileHover={{ boxShadow: '0 0 20px rgba(245,196,0,0.25)' }}
            >
              {/* Layer 1: Photo/Video Background */}
              <div 
                className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-[1.05]"
                style={{ background: 'linear-gradient(135deg, #1a0f08 0%, #0a0a0a 100%)' }}
              >
                {t.type === 'video' ? (
                  <video
                    src={t.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-[center_top] scale-[1.14]"
                    onError={(e) => { (e.target as HTMLVideoElement).style.display = 'none'; }}
                  />
                ) : (
                  <img
                    src={t.src}
                    alt={t.name}
                    className="w-full h-full object-cover object-[center_top]"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
              </div>

              {/* Layer 2: Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[rgba(0,0,0,0.97)] via-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.1)] via-[45%]" />

              {/* Badges */}
              <div className="absolute top-5 left-5 z-20 flex gap-2">
                <div className="px-[10px] py-[3px] bg-black/60 border border-brand-yellow/18 rounded-[20px] text-brand-yellow text-[10px] font-bold uppercase tracking-wider">
                  {t.badge}
                </div>
              </div>

              {t.live && (
                <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-2 py-1 bg-black/40 rounded-md">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-white text-[9px] font-mono font-bold">LIVE</span>
                </div>
              )}

              {t.soldOut && (
                <div className="absolute top-5 right-5 z-20 px-2 py-1 bg-brand-yellow/20 border border-brand-yellow/40 rounded text-brand-yellow text-[9px] font-bold tracking-widest">
                  SOLD OUT
                </div>
              )}

              {/* Layer 3: Content */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6 z-20"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[18px] font-bebas font-bold text-white tracking-wide">{t.name}</h3>
                  {t.verified && (
                    <div className="relative group/verified">
                      <div className="w-4 h-4 bg-brand-yellow rounded-full flex items-center justify-center">
                        <CheckCircle2 size={10} className="text-white" />
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[8px] rounded opacity-0 group-hover/verified:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                        Verified campaign partner
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/60 font-medium mb-3">{t.sub}</p>
                <p className="text-[13px] text-white italic leading-relaxed mb-4 opacity-90">{t.quote}</p>
                <div className="inline-block px-3 py-1 bg-brand-yellow/12 border border-brand-yellow/18 rounded-full">
                  <span className="text-brand-yellow text-[10px] font-bold tracking-wider uppercase">{t.stat}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Animated Ticker */}
        <div className="mt-20 border-y border-white/5 py-4 overflow-hidden relative">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-12 px-12"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-12">
                {[
                  "94% passenger engagement",
                  "Full house achieved",
                  "Direct foot traffic increase",
                  "Audio verified",
                  "Reported daily",
                  "Real people. Real results."
                ].map((item, idx) => (
                <span key={idx} className="font-mono text-[11px] text-[#AAAAAA] flex items-center gap-2">
                  <span className="text-brand-yellow">✓</span> {item}
                </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        <p className="text-center mt-6 text-[10px] uppercase tracking-[0.3em] text-[#AAAAAA]">
          Results are from real campaign activations. Individual results vary by campaign scope and duration.
        </p>
      </div>
    </Section>
  );
};

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gradient-to-r from-[#161616] via-[#2a2a2a] to-[#161616] bg-[length:200%_100%] animate-shimmer ${className}`} />
);

const BehaviourSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const { playSound } = useAudio();
  const [imagesLoaded, setImagesLoaded] = useState({
    phone: false,
    car: false,
    passenger: false
  });

  const handleImageLoad = (id: keyof typeof imagesLoaded) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <Section className="relative bg-[#050505] overflow-hidden" id="behaviour">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Particle/Dust Texture */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F5C400' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='100' cy='50' r='1'/%3E%3Ccircle cx='150' cy='120' r='1'/%3E%3Ccircle cx='40' cy='180' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Soft Golden Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-yellow/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-yellow/5 blur-[100px] rounded-full" />
        
        {/* Faint Connecting Lines (Data Flow) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,200 Q400,100 900,300 T1800,100" fill="none" stroke="#F5C400" strokeWidth="1" />
          <path d="M-100,500 Q500,400 1000,600 T1900,400" fill="none" stroke="#F5C400" strokeWidth="1" />
        </svg>
      </div>

      {/* Road Dividers (Subtle) */}
      <div className="absolute top-0 left-0 w-full z-10 opacity-30">
        <RoadDivider />
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10 opacity-30">
        <RoadDivider />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="inline-block mb-4"
          >
            <span className="font-mono text-[11px] text-brand-yellow tracking-[0.4em] uppercase border-b border-brand-yellow/30 pb-1">EVOLUTION</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-bebas text-white tracking-[0.12em] leading-none mb-6"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            YOUR CUSTOMER'S <span className="text-brand-yellow">BEHAVIOUR</span> IS CHANGING
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6, y: 0 } : { y: 10 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[14px] text-white uppercase tracking-[0.25em] max-w-2xl mx-auto"
          >
            THE TRADITIONAL PLAYBOOK IS OBSOLETE. ARE YOU READY TO ADAPT?
          </motion.p>
        </div>

        {/* Formula Row — Redesigned as Glass Panels */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-40">
          {/* Box 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -2 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: -1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
            className="min-h-[320px] w-full lg:w-[300px] p-10 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl text-center flex flex-col items-center justify-center relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-yellow/10 blur-[50px] rounded-full group-hover:bg-brand-yellow/20 transition-all" />
            
            <div className="text-brand-yellow mb-8 relative z-10">
              <Car size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-brand-yellow font-bold text-[16px] uppercase tracking-[0.2em] mb-6 relative z-10">IN-RIDE MARKETING</h3>
            <p className="text-white/70 text-[14px] leading-relaxed font-light relative z-10">
              Reach over 60,000 Gaborone residents monthly through high-intent transit networks.
            </p>
          </motion.div>

          {/* Plus */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="text-brand-yellow/40 text-[32px] font-light"
          >
            +
          </motion.div>

          {/* Box 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 1 }}
            animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="min-h-[320px] w-full lg:w-[300px] p-10 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl text-center flex flex-col items-center justify-center relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="text-brand-yellow mb-8 relative z-10">
              <Activity size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-brand-yellow font-bold text-[16px] uppercase tracking-[0.2em] mb-6 relative z-10">VERIFIED REACH</h3>
            <p className="text-white/70 text-[14px] leading-relaxed font-light relative z-10">
              Every interaction recorded, human-scored, and reported in real-time. Zero waste.
            </p>
          </motion.div>

          {/* Equals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.0 }}
            className="text-brand-yellow/40 text-[32px] font-light"
          >
            =
          </motion.div>

          {/* Box 3 */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 2 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
            className="min-h-[320px] w-full lg:w-[360px] p-10 bg-brand-yellow/[0.05] backdrop-blur-2xl border-2 border-brand-yellow/40 rounded-2xl relative overflow-hidden group"
          >
            <motion.div 
              animate={{ 
                boxShadow: ["0 0 20px rgba(245,196,0,0.1)", "0 0 50px rgba(245,196,0,0.25)", "0 0 20px rgba(245,196,0,0.1)"] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none"
            />
            <h3 className="text-brand-yellow font-bold text-[17px] uppercase tracking-[0.25em] mb-8 text-center">ELITE PERFORMANCE</h3>
            <ul className="space-y-5">
              {[
                "Direct face-to-face engagement",
                "Verified human conversations",
                "High-conversion brand awareness"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-white text-[14px] leading-tight font-light">
                  <div className="w-5 h-5 rounded-full bg-brand-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-brand-yellow" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Visual Showcase Row — Asymmetrical & Cinematic */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-16 md:gap-8 mb-32 min-h-[600px] relative">
          {/* Data Flow Lines Background */}
          <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
            <svg width="100%" height="100%" viewBox="0 0 1000 600">
              <motion.path 
                d="M150,300 L400,300" 
                stroke="#F5C400" 
                strokeWidth="0.5" 
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.path 
                d="M600,300 L850,300" 
                stroke="#F5C400" 
                strokeWidth="0.5" 
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {/* LEFT ELEMENT — THE PHONE */}
          <motion.div 
            initial={{ opacity: 0, x: -100, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="flex flex-col items-center gap-8 relative"
          >
            <div className="absolute -inset-10 bg-brand-yellow/5 blur-[60px] rounded-full pointer-events-none" />
            <div className="relative">
              {!imagesLoaded.phone && (
                <Skeleton className="w-[260px] h-[520px] rounded-[30px] absolute inset-0 z-20" />
              )}
              <motion.img 
                src="https://i.imgur.com/WoAIIa5.png"
                alt="Brand Dashboard"
                onLoad={() => handleImageLoad('phone')}
                animate={{ translateY: [0, -15, 0], rotate: [-2, -1, -2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className={`w-[260px] h-auto object-contain relative z-10 transition-opacity duration-500 ${imagesLoaded.phone ? 'opacity-100' : 'opacity-0'}`}
                style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8))' }}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[10px] text-brand-yellow tracking-[0.4em] uppercase opacity-60">SYSTEM INTERFACE</span>
              <span className="font-bebas text-[18px] text-white tracking-widest uppercase">BRAND DASHBOARD</span>
            </div>
          </motion.div>

          {/* CENTRE ELEMENT — THE CAR */}
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex-1 flex flex-col items-center gap-12 relative"
          >
            <div className="absolute inset-0 bg-brand-yellow/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative w-full flex justify-center">
              {!imagesLoaded.car && (
                <Skeleton className="w-[580px] h-[280px] rounded-2xl absolute inset-0 z-20 mx-auto" />
              )}
              <motion.img 
                src="https://i.imgur.com/CKmAUCF.png"
                alt="Bigfoot Branded Car"
                onLoad={() => handleImageLoad('car')}
                animate={{ translateY: [0, -20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className={`w-full max-w-[580px] h-auto object-contain relative z-10 transition-opacity duration-500 ${imagesLoaded.car ? 'opacity-100' : 'opacity-0'}`}
                style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.9))' }}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="flex items-center gap-4 px-6 py-2 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-md">
                <motion.div 
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_15px_#22c55e]" 
                />
                <span className="font-mono text-[10px] text-white/80 tracking-[0.2em] uppercase">LIVE ASSET TRACKING ACTIVE</span>
              </div>
              <h3 className="font-bebas text-[24px] text-brand-yellow tracking-[0.15em] text-center uppercase max-w-md leading-tight">
                OMNIPRESENT BRANDING. <br/>UNMATCHED STREET AUTHORITY.
              </h3>
            </div>
          </motion.div>

          {/* RIGHT ELEMENT — THE PASSENGER */}
          <div className="flex flex-col items-center gap-12 relative">
            <motion.div 
              initial={{ opacity: 0, x: 100, rotate: 5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring", delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-brand-yellow/5 blur-[60px] rounded-full pointer-events-none" />
              <div className="relative">
                {!imagesLoaded.passenger && (
                  <Skeleton className="w-[320px] h-[400px] rounded-2xl absolute inset-0 z-20" />
                )}
                <motion.img 
                  src="https://i.imgur.com/oEutMcN.png"
                  alt="Target Passenger"
                  onLoad={() => handleImageLoad('passenger')}
                  animate={{ translateY: [0, -15, 0], rotate: [3, 4, 3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className={`w-[320px] h-auto object-contain relative z-10 transition-opacity duration-500 ${imagesLoaded.passenger ? 'opacity-100' : 'opacity-0'}`}
                  style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8))' }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            {/* Stat Card — Glassmorphism */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-[240px] p-8 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-[48px] font-bebas text-brand-yellow leading-none mb-2 tracking-tighter">60,000+</div>
              <div className="text-white text-[14px] font-bold uppercase tracking-[0.2em] mb-2">MONTHLY REACH</div>
              <div className="text-white/40 font-mono text-[10px] mb-6 tracking-widest">GABORONE METRO</div>
              
              <div className="pt-6 border-t border-white/10">
                <div className="text-[32px] font-bebas text-brand-yellow leading-none mb-1">P7.50</div>
                <div className="text-white/40 font-mono text-[10px] uppercase tracking-[0.15em]">PER VERIFIED ENGAGEMENT</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Row — Premium Styling */}
        <div className="flex flex-col items-center gap-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-brand-yellow/50 to-transparent mb-2" />
            <span className="font-mono text-[12px] text-brand-yellow tracking-[0.4em] uppercase">SECURE YOUR CATEGORY DOMINANCE</span>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245,196,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playSound('CLICK')}
              className="px-12 py-5 bg-brand-yellow text-brand-black font-bold text-[15px] tracking-[0.2em] rounded-full transition-all shadow-2xl relative overflow-hidden group"
            >
              <span className="relative z-10">BRAND YOUR CAMPAIGN →</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.button>
            
            <motion.a 
              href="#how-it-works"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(245,196,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playSound('CLICK')}
              className="px-12 py-5 border border-brand-yellow/40 text-brand-yellow font-bold text-[15px] tracking-[0.2em] rounded-full transition-all backdrop-blur-sm"
            >
              EXPLORE THE SYSTEM ↓
            </motion.a>
          </div>
        </div>
      </div>
    </Section>
  );
};

// --- Main App ---

export default function App() {
  const { isMuted, toggleMute, playSound } = useAudio();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'SOLDIER' | 'ARMY' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [currentView, setCurrentView] = useState<'landing' | 'roster' | 'rate-card'>('landing');
  const [showRosterLoading, setShowRosterLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Parallax Motion Values
  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);
  const smoothHeroX = useSpring(heroMouseX, { damping: 30, stiffness: 100 });
  const smoothHeroY = useSpring(heroMouseY, { damping: 30, stiffness: 100 });

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    heroMouseX.set(x);
    heroMouseY.set(y);
  };

  const handleHeroMouseLeave = () => {
    heroMouseX.set(0);
    heroMouseY.set(0);
  };

  const layer1X = useTransform(smoothHeroX, x => x * -0.02);
  const layer1Y = useTransform(smoothHeroY, y => y * -0.01);
  const layer2X = useTransform(smoothHeroX, x => x * -0.04);
  const layer2Y = useTransform(smoothHeroY, y => y * -0.02);
  const layer3X = useTransform(smoothHeroX, x => x * -0.06);
  const layer3Y = useTransform(smoothHeroY, y => y * -0.03);

  const navigateToRoster = () => {
    const hasSeenLoading = sessionStorage.getItem('bft_roster_loading_seen');
    if (!hasSeenLoading) {
      setShowRosterLoading(true);
    } else {
      setCurrentView('roster');
      window.scrollTo(0, 0);
    }
    setIsMenuOpen(false);
  };

  const handleLoadingComplete = () => {
    sessionStorage.setItem('bft_roster_loading_seen', 'true');
    setShowRosterLoading(false);
    setCurrentView('roster');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const playClickSound = () => {
      playSound('CLICK', 0.2);
    };

    window.addEventListener('click', playClickSound);
    return () => window.removeEventListener('click', playClickSound);
  }, [playSound]);

  const handleAuthenticated = (role: 'SOLDIER' | 'ARMY') => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const openModal = (plan: string) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  if (!isAuthenticated) {
    return <AccessGate onAuthenticated={handleAuthenticated} />;
  }

  if (userRole === 'SOLDIER') {
    return (
      <div className="bg-brand-black text-white/90 min-h-screen flex flex-col items-center justify-center p-8 text-center font-sans">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-yellow tracking-tight">
              Driver Portal
            </h1>
            <p className="text-lg md:text-xl font-medium text-white/60 uppercase tracking-widest">
              Dashboard coming soon
            </p>
          </div>

          <div className="p-9 md:p-[52px] glass-dark rounded-3xl space-y-8">
            <div className="flex justify-center">
              <Lock size={40} className="text-white/20" />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 text-left">Driver ID</label>
                <input type="text" disabled placeholder="BF-XXXX-XXXX" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white/20" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 text-left">Password</label>
                <input type="password" disabled placeholder="••••••••" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white/20" />
              </div>
            </div>
            <button disabled className="w-full py-4 bg-white/5 text-white/20 font-bold uppercase tracking-widest rounded-xl cursor-not-allowed border border-white/5">
              Login Unavailable
            </button>
          </div>

          <p className="text-white/20 text-[10px] uppercase tracking-[0.4em]">
            The network is expanding.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-brand-black text-white selection:bg-brand-yellow selection:text-brand-black">
      <Spotlight />
      
      {/* --- HEADER --- */}
      <ScrollProgress />
      <header className="fixed top-0 left-0 w-full z-[500] bg-brand-black/85 backdrop-blur-[12px] border-b border-white/18">
        <SocialProofTicker />
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => setCurrentView('landing')} className="text-xl font-bold text-brand-yellow tracking-tight">
            BIG FOOT TRAFFIC
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['HOW IT WORKS', 'THE NUMBERS', 'RATE CARD', 'THE ROSTER', 'SUBSCRIBE', 'CONTACT', 'CONVRSN ↗'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  playSound('CLICK');
                  if (item === 'THE ROSTER') {
                    navigateToRoster();
                  } else if (item === 'CONVRSN ↗') {
                    window.location.href = 'https://convrsn.co.bw';
                  } else if (item === 'SUBSCRIBE') {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  } else if (item === 'CONTACT') {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    document.getElementById(item.toLowerCase().replace(/ /g, '-'))?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`text-[10px] font-bold tracking-[0.2em] transition-all hover:text-brand-yellow ${
                  item === 'THE ROSTER' ? 'text-brand-yellow shadow-[0_0_10px_rgba(245,196,0,0.3)]' : 
                  item === 'CONVRSN ↗' ? 'text-brand-yellow hover:animate-pulse' : 'text-white/50'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-brand-yellow">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-brand-black border-b border-white/5 p-7 flex flex-col gap-6 md:hidden z-[600]"
            >
              {['HOW IT WORKS', 'THE NUMBERS', 'RATE CARD', 'THE ROSTER', 'SUBSCRIBE', 'CONTACT', 'CONVRSN ↗'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    playSound('CLICK');
                    if (item === 'THE ROSTER') {
                      navigateToRoster();
                    } else if (item === 'CONVRSN ↗') {
                      window.location.href = 'https://convrsn.co.bw';
                    } else if (item === 'SUBSCRIBE') {
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                      setIsMenuOpen(false);
                    } else if (item === 'CONTACT') {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setIsMenuOpen(false);
                    } else {
                      document.getElementById(item.toLowerCase().replace(/ /g, '-'))?.scrollIntoView({ behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }
                  }}
                  className={`text-[10px] font-bold tracking-[0.2em] text-left ${
                    item === 'THE ROSTER' || item === 'CONVRSN ↗' ? 'text-brand-yellow' : 'text-white/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        {showRosterLoading && (
          <RosterLoading key="loading" onComplete={handleLoadingComplete} />
        )}

        {currentView === 'rate-card' ? (
          <RateCard onBack={() => setCurrentView('landing')} />
        ) : currentView === 'roster' ? (
          <motion.div
            key="roster"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pt-20"
          >
            <RosterPage onBackToBrief={() => {
              setCurrentView('landing');
              setTimeout(() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* --- SECTION 1: HERO --- */}
            <section 
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
            >
              <motion.div style={{ x: layer1X, y: layer1Y }} className="absolute inset-0 z-0">
                <HeroVideoBackground />
              </motion.div>
              
              <SpeedLines />
              
              <motion.div style={{ x: layer3X, y: layer3Y }} className="relative z-10 space-y-10 max-w-5xl">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-brand-yellow font-bold text-[10px] tracking-[0.3em] uppercase"
                >
                  <Gauge size={14} />
                  <Counter value={60000} suffix="+" /> Monthly Reach
                </motion.div>

                <h1 
                  data-text="BIG FOOT TRAFFIC"
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-brand-yellow glitch-text" 
                  style={{ fontSize: 'clamp(36px, 8vw, 72px)' }}
                >
                  {"BIG FOOT TRAFFIC".split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="inline-block mr-4"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-lg md:text-xl font-medium text-white/60 tracking-widest uppercase"
                >
                  The Ultimate Driver Experience
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
                >
                  Your customers are already in the car. We make sure they hear about you.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
                  {[
                    { icon: Car, val: 100, label: "Brand Ambassadors", suffix: "+" },
                    { icon: Mic, val: 2000, label: "Verified Interactions", suffix: "+" },
                    { icon: MessageSquare, val: 60000, label: "Human Conversations", suffix: "+" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="p-10 rounded-2xl bg-brand-yellow/[0.04] border border-brand-yellow/18"
                    >
                      <stat.icon size={24} className="text-brand-yellow/40 mb-4 mx-auto" />
                      <div className="text-3xl font-bold text-brand-yellow mb-1">
                        <Counter value={stat.val} suffix={stat.suffix} />
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      playSound('CLICK');
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-10 py-5 bg-brand-yellow text-brand-black font-bold text-sm tracking-widest rounded-full flex items-center gap-3 group transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-brand-yellow/15"
                  >
                    JOIN THE RIDE
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      playSound('CLICK');
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-10 py-5 border border-white/10 text-white/80 font-bold text-sm tracking-widest rounded-full transition-all"
                  >
                    HOW IT WORKS
                  </motion.button>
                </div>
              </motion.div>

              <motion.div style={{ x: layer2X, y: layer2Y }} className="absolute bottom-0 left-0 w-full">
                <RoadDivider />
              </motion.div>
            </section>

      {/* --- SECTION 2: THE PROBLEM --- */}
      <Section className="bg-white text-brand-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-24 tracking-tight text-red-600"
          >
            Traditional Advertising is Broken
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Radio, name: "Radio", stat: "30 seconds. They're not listening." },
              { icon: Tv, name: "TV", stat: "Skip. Skip. Skip." },
              { icon: Layout, name: "Billboard", stat: "3 seconds. Forgotten in 3 minutes." },
              { icon: Users, name: "Promoters", stat: "Zero proof it worked." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-9 rounded-3xl bg-white border-2 border-red-600/10 group hover:border-red-600 transition-all shadow-sm hover:shadow-xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <item.icon size={32} className="text-red-600/40" />
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">X</div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand-black">{item.name}</h3>
                <p className="text-red-600/60 text-sm font-medium line-through decoration-red-600/30">{item.stat}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-24 text-center space-y-6"
          >
            <p className="text-3xl md:text-4xl font-bold text-brand-black tracking-tight">
              Paying for attention that <span className="text-red-600">was never there.</span>
            </p>
            <p className="text-lg md:text-xl font-medium text-red-600/40 uppercase tracking-[0.2em]">
              We don’t interrupt. We engage.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <RoadDivider />
        </div>
      </Section>

      <BehaviourSection />

      {/* --- SECTION 3: HOW IT WORKS --- */}
      <div id="how-it-works">
        <RoadJourney />
        <div className="absolute bottom-0 left-0 w-full">
          <RoadDivider />
        </div>
      </div>

      {/* --- SECTION 4: THE NUMBERS --- */}
      <Section className="bg-brand-charcoal" glow>
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-10 blur-[2px]"
          >
            <source src="https://i.imgur.com/X4gMv3b.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/90" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-yellow tracking-tight">
              The Math Doesn't Lie
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/30">
                  <span>Big Foot Traffic</span>
                  <span className="text-brand-yellow">100% Efficiency</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-brand-yellow subtle-glow-yellow"
                  />
                </div>
              </div>
              <div className="space-y-4 opacity-40">
                <div className="flex justify-between text-[10px] uppercase tracking-[0.2em]">
                  <span>Traditional Media</span>
                  <span>15% Efficiency</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "15%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-white/20"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Cost per verified conversation", val: 7.50, prefix: "P", suffix: "" },
                { label: "Monthly guaranteed rides", val: 2000, prefix: "", suffix: "+" },
                { label: "Audio verified", val: 100, prefix: "", suffix: "%" },
                { label: "Average captive attention", val: 15, prefix: "", suffix: " min" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-9 rounded-3xl glass-dark text-center"
                >
                  <div className="text-3xl font-bold text-brand-yellow mb-2">
                    {stat.prefix}<Counter value={stat.val} suffix={stat.suffix} />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 leading-relaxed">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 p-9 glass border-l-2 border-brand-yellow text-left max-w-2xl mx-auto"
          >
            <p className="text-lg font-medium text-brand-yellow leading-relaxed">
              Every pula you spend is tied to a real conversation. No waste. No guesswork.
            </p>
          </motion.div>
        </div>

        {/* Ticker Tape */}
        <div className="mt-32 border-y border-white/10 py-6 bg-brand-yellow/5 overflow-hidden whitespace-nowrap">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block text-xl font-display uppercase tracking-widest text-brand-yellow/80"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8">
                RADIO: P8,000/spot · TV: P40,000/spot · BILLBOARD: P25,000/month · BIG FOOT TRAFFIC: P7.50/conversation ·
              </span>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <RoadDivider />
        </div>
      </Section>

      {/* --- SECTION 4.5: THE FULL ARSENAL --- */}
      <Section id="pricing" className="bg-brand-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-yellow tracking-tight uppercase">
              THE FULL ARSENAL
            </h2>
            <p className="text-white/60 font-medium text-sm md:text-base uppercase tracking-[0.2em] mt-4">
              Verified human interaction. No secrets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-9 rounded-3xl glass-dark border border-white/5 space-y-8 md:col-span-1"
            >
              <h3 className="text-lg font-bold text-white/60 uppercase tracking-widest">Traditional Media Costs</h3>
              <div className="space-y-6">
                {[
                  { name: "Local Radio", price: "~P50,000/mo", detail: "Zero proof of engagement." },
                  { name: "Billboard", price: "~P15,000/mo", detail: "3 seconds of passive attention." },
                  { name: "Bus Shelters", price: "~P70,000+", detail: "No interaction. No conversion proof." },
                  { name: "Promoters", price: "~P35,000/mo", detail: "No audio verification. No data." }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-start border-b border-white/5 pb-4">
                    <div>
                      <div className="font-bold text-white/90">{item.name}</div>
                      <div className="text-xs text-white/50">{item.detail}</div>
                    </div>
                    <div className="text-white/60 font-bold text-sm whitespace-nowrap ml-4">{item.price}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-9 rounded-3xl glass border border-brand-yellow/20 flex flex-col justify-between md:col-span-1"
            >
              <div className="space-y-8">
                <h3 className="text-lg font-bold text-brand-yellow uppercase tracking-widest">Our Delivery</h3>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div>
                    <div className="font-bold text-white/90 text-xl">BFT Monthly</div>
                    <div className="text-brand-yellow/60 font-bold uppercase tracking-widest text-[10px]">2,000+ verified conversations</div>
                  </div>
                  <div className="text-brand-yellow font-bold text-3xl">P15,000</div>
                </div>
                
                <div className="text-center py-8">
                  <div className="text-white/50 uppercase tracking-[0.2em] text-[10px] mb-2 text-center">Cost per verified conversation</div>
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-6xl md:text-7xl font-bold text-brand-yellow tracking-tight"
                  >
                    P7.50
                  </motion.div>
                </div>
              </div>

              <div className="h-24 flex items-end gap-4 mt-8">
                <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="text-[10px] text-white/20 uppercase">Others</div>
                  <div className="w-full h-2 bg-white/5 rounded-t-lg" />
                </div>
                <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="text-[10px] text-brand-yellow uppercase">BFT</div>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="w-full bg-brand-yellow rounded-t-lg subtle-glow-yellow" 
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Subsection B: The Full Arsenal */}
          <div className="mb-32">
            <SuperpowerCards />
            
            {/* Tagline */}
            <div className="flex flex-col items-center justify-center my-24 px-4 text-center">
              <div className="relative max-w-[500px]">
                <span className="absolute -top-6 -left-6 text-4xl text-[#F5C400] font-serif opacity-50">"</span>
                <p className="text-[18px] text-white italic font-serif leading-relaxed">
                  We build brands, create content, deploy AI, and grow businesses.
                </p>
                <span className="absolute -bottom-10 -right-6 text-4xl text-[#F5C400] font-serif opacity-50">"</span>
              </div>
            </div>

            <ServiceMenu />
          </div>

          {/* Subsection C: Subscribe CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-full p-12 rounded-3xl bg-brand-dark-grey border border-brand-yellow/20 text-center space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-display text-brand-yellow uppercase tracking-tighter">
                Launch your campaign in 48 hours.
              </h3>
              <p className="text-xl font-bebas text-white/60 uppercase tracking-widest">
                From idea to real conversations — in 2 days.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => openModal("Rate Card Plan")}
                className="px-10 py-5 bg-brand-yellow text-brand-black font-bold rounded-full hover:scale-105 transition-all w-full sm:w-auto"
              >
                SUBSCRIBE NOW
              </button>
              <button 
                onClick={() => setCurrentView('rate-card')}
                className="px-10 py-5 border border-white/20 text-white font-bold rounded-full hover:border-brand-yellow hover:text-brand-yellow transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <FileDown size={20} />
                DOWNLOAD RATE CARD PDF
              </button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <RoadDivider />
        </div>
      </Section>

      <TestimonialSection />

      {/* --- SECTION 4.7: CASE STUDY --- */}
      <Section className="bg-brand-charcoal !p-0 overflow-hidden" glow>
        <div className="flex flex-col lg:flex-row min-h-[90vh]">
          {/* LEFT: Large product image with slow zoom (Ken Burns effect) */}
          <div className="lg:w-1/2 relative h-[60vh] lg:h-auto overflow-hidden">
            <motion.div
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 15, ease: "linear" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://i.imgur.com/zFZGytd.png)' }}
            />
            <div className="absolute inset-0 bg-brand-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/20 via-transparent to-brand-black/60 lg:to-brand-black" />
          </div>

          {/* RIGHT: Structured case study text */}
          <div className="lg:w-1/2 p-9 md:p-[68px] lg:p-[100px] flex flex-col justify-center bg-brand-black relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-brand-yellow text-[10px] font-bold uppercase tracking-[0.3em]">
                  Case Study: Murdered Lemons
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                  Real Campaign. <br/>
                  <span className="text-brand-yellow">Real Results.</span>
                </h2>
                <p className="text-white/60 text-lg max-w-xl leading-relaxed">
                  A deep dive into how Big Foot Traffic transformed passenger rides into high-recall brand experiences for a local beverage brand.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-brand-yellow tracking-tighter">
                    <Counter value={3200} suffix="+" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Verified Conversations</p>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-brand-yellow tracking-tighter">
                    <Counter value={1100} suffix="+" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">High Recall Mentions</p>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-brand-yellow tracking-tighter">
                    <Counter value={420} suffix="+" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Customer Follow-Ups</p>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-brand-yellow tracking-tighter">
                    Measured
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Store Visit Increase</p>
                </div>
              </div>

              {/* Supporting Visual */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-4"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-brand-yellow/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                  <img 
                    src="https://i.imgur.com/elh58L5.png" 
                    alt="Campaign Support" 
                    className="relative rounded-2xl shadow-2xl border border-white/10 w-full object-cover h-48 md:h-64"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Final Line */}
        <div className="py-20 bg-brand-black border-t border-white/5">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-5xl font-bold text-center tracking-tight"
          >
            This is not reach. <span className="text-brand-yellow">This is real engagement.</span>
          </motion.h3>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full">
          <RoadDivider />
        </div>
      </Section>

      {/* --- SECTION 5: WHO WE SERVE --- */}
      <Section className="bg-brand-black relative overflow-hidden">
        {/* Section Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="https://i.imgur.com/4hOZcXV.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/40 to-brand-black" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(245,196,0,0.03),rgba(0,0,0,0),rgba(245,196,0,0.03))] bg-[length:100%_4px,4px_100%] pointer-events-none opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShoppingBag, name: "FMCG", pitch: "Product education in a private space. No noise." },
              { icon: ShieldCheck, name: "Insurance", pitch: "Qualified leads. No cold calls." },
              { icon: Landmark, name: "Banks", pitch: "Trust built. Accounts opened." },
              { icon: Smartphone, name: "Telcos", pitch: "SIM activations. Data bundles." }
            ].map((item, i) => (
              <div key={i} className="group h-[300px] [perspective:1000px]">
                <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-9 glass-dark rounded-3xl border border-brand-yellow/10 backdrop-blur-md backface-hidden">
                    <item.icon size={48} className="text-brand-yellow/40 mb-6" />
                    <h3 className="text-xl font-bold text-brand-yellow uppercase tracking-widest">{item.name}</h3>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 h-full w-full rounded-3xl glass p-9 text-white flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] backface-hidden">
                    <p className="text-lg font-medium leading-relaxed">{item.pitch}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-24 text-center"
          >
            <p className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              First mover in your category gets exclusivity. <br />
              <span className="text-brand-yellow">Second mover gets nothing.</span>
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <RoadDivider />
        </div>
      </Section>

      {/* --- SECTION 7: THE PROOF --- */}
      <Section className="bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16 md:mb-24 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-yellow tracking-tight">
              Proof Over Promises
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {[
                "Recorded Rides",
                "Driver Scoring",
                "Live Tracking"
              ].map((signal, idx) => (
                <span key={idx} className="px-4 py-2 glass rounded-full text-brand-yellow text-[10px] font-bold uppercase tracking-widest">
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              { icon: Mic, title: "Audio recorded", desc: "Every ride" },
              { icon: Zap, title: "Quality scored", desc: "Daily" },
              { icon: BarChart, title: "Live dashboard", desc: "Real-time" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-12 rounded-3xl bg-brand-yellow/[0.04] border border-brand-yellow/18 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-brand-yellow/40">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-white/50 uppercase tracking-[0.2em] text-[10px]">— {item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 flex flex-wrap justify-center gap-8 opacity-20 grayscale">
            <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
              <ShieldCheck size={14} /> BOCRA compliant
            </div>
            <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
              <ShieldCheck size={14} /> Data Protection Act
            </div>
            <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
              <ShieldCheck size={14} /> 100% Transparent
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <RoadDivider />
        </div>
      </Section>

      <VideoSection />

      {/* --- SECTION 8: THE CLOSER --- */}
      <Section className="h-screen flex flex-col items-center justify-center bg-brand-charcoal" glow>
        <div className="max-w-5xl mx-auto px-4 text-center space-y-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl font-medium text-brand-yellow uppercase tracking-[0.3em]"
          >
            A New Media Channel
          </motion.p>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
            {"There is no box. There never was.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-6 bg-brand-yellow text-brand-black font-bold text-xl rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-brand-yellow/15 transition-all"
          >
            JOIN THE RIDE
          </motion.button>
        </div>

        {/* Floating WhatsApp Button */}
        <motion.a
          href="https://wa.me/26772833448?text=DRIVE"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-24 right-8 z-[1000] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center gap-3 group"
        >
          <div className="hidden group-hover:block whitespace-nowrap font-bold text-sm uppercase tracking-widest">
            Message ‘DRIVE’ on WhatsApp to start
          </div>
          <Smartphone size={24} />
        </motion.a>
      </Section>

      </motion.div>
      )}
      </AnimatePresence>

      {/* --- FOOTER --- */}
      <footer className="bg-brand-black py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-yellow tracking-tight">BIG FOOT TRAFFIC</h3>
              <p className="text-white/50 text-sm uppercase tracking-widest">The Ultimate Driver Experience</p>
              
              <div className="flex gap-6">
                {[
                  { icon: "LinkedIn", url: "https://linkedin.com/company/bigfoottraffic" },
                  { icon: "Instagram", url: "https://instagram.com/bigfoottraffic" },
                  { icon: "TikTok", url: "https://tiktok.com/@bigfoottraffic" },
                  { icon: "Facebook", url: "https://facebook.com/bigfoottraffic" }
                ].map((social) => (
                  <a 
                    key={social.icon} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/20 hover:text-brand-yellow transition-colors"
                  >
                    <span className="sr-only">{social.icon}</span>
                    {social.icon === 'LinkedIn' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>}
                    {social.icon === 'Instagram' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>}
                    {social.icon === 'TikTok' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.417 6.417 0 01-1.87-1.55v7.36c.03 3.47-2.23 6.74-5.55 7.77-3.32 1.03-7.13-.18-9.12-3-1.99-2.82-1.77-6.81.55-9.38 2.32-2.57 6.46-3.11 9.42-1.31v4.3c-1.56-1.14-3.77-1.03-5.22.25-1.45 1.28-1.9 3.4-1.08 5.1 1.08 1.7 3.32 2.44 5.23 1.74 1.91-.7 3.12-2.78 2.93-4.81.01-2.6.01-5.2.01-7.81z"/></svg>}
                    {social.icon === 'Facebook' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Navigation</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><a href="#how-it-works" onClick={() => playSound('CLICK')} className="hover:text-brand-yellow transition-colors">How It Works</a></li>
                <li><a href="#pricing" onClick={() => playSound('CLICK')} className="hover:text-brand-yellow transition-colors">Plans</a></li>
                <li><button onClick={() => { playSound('CLICK'); openModal("General inquiry"); }} className="hover:text-brand-yellow transition-colors">Subscribe</button></li>
                <li><a href="mailto:bigfootraffic@gmail.com" onClick={() => playSound('CLICK')} className="hover:text-brand-yellow transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Stay in the loop</h4>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  playSound('ENTER');
                  const target = e.target as any;
                  target.reset();
                  // alert("You're on the list.");
                }}
                className="space-y-4"
              >
                <input 
                  required 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-brand-yellow/50 outline-none transition-all text-sm" 
                />
                <button type="submit" className="w-full bg-brand-yellow text-brand-black font-bold py-4 rounded-full text-[10px] uppercase tracking-widest">
                  STAY IN THE LOOP
                </button>
              </form>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-white/20">
            <div className="flex flex-wrap justify-center gap-6">
              <p>© 2026 Big Foot Traffic (Pty) Ltd.</p>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">BOCRA Compliance</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
            <p>Designed for market dominance</p>
          </div>
          {/* Footer Signature Strip */} 
          <div className="h-[3px] w-full flex mt-8">
            <div className="w-1/2 h-full" style={{ background: 'linear-gradient(to right, rgba(117,170,218,0.15) 0%, rgba(255,255,255,0.15) 100%)' }}></div>
            <div className="w-1/2 h-full" style={{ background: 'linear-gradient(to right, rgba(0,100,0,0.15) 0%, rgba(255,208,0,0.15) 100%)' }}></div>
          </div>
          {/* Footer Micro Text */}
          <div className="text-center text-[9px] text-[#444] py-2">
            Designed & built · Botswana × Zimbabwe · 🇧🇼🇿🇼
          </div>
        </div>
      </footer>

        {/* Audio Toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={toggleMute}
          className="fixed bottom-8 right-8 z-[10002] p-3 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white/50 hover:text-white hover:border-white/30 transition-all group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded bg-black/80 border border-white/10 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {isMuted ? 'Unmute Experience' : 'Mute Experience'}
          </span>
        </motion.button>

        <WhatsAppFloatingButton />
      <CookieConsent />
      <SubscriptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planName={selectedPlan} 
      />
    </div>
  );
}
