import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { AgentCard, Agent } from './AgentCard';
import { BigfootVideo } from '../BigfootVideo';

const AGENT_NAMES = [
  "Thabo", "Kabo", "Mpho", "Lerato", "Tshegofatso", "Goitseone", "Obed", "Neo", "Lebo", "Kagiso", 
  "Refilwe", "Tshepo", "Bontle", "Keabetswe", "Ofentse", "Bantle", "Dineo", "Tumelo", "Lesego", "Gaolathe", 
  "Boitumelo", "Phenyo", "Naledi", "Ditiro", "Kedibonye", "Motshidisi", "Oarabile", "Bogosi", "Gaontebale", "Seatle", 
  "Itumeleng", "Modiri", "Motheo", "Nametso", "Onalenna", "Teko", "Warona", "Keatlaretse", "Loago", "Masego", 
  "Keone", "Galeele", "Obakeng", "Tidimalo", "Kefilwe", "Wame", "Nkosazana", "Baboloki", "Taboka", "Ntombi", 
  "Aobakwe", "Kganetsego", "Laone", "Mathata", "Otlotlego", "Pako", "Refiloe", "Segomotsi", "Gaone", "Tlamelo", 
  "Kgosi", "Phenyo", "Mmamoeletsi", "Ntshepo", "Gorata", "Seneo", "Lora", "Gape", "Ditlhare", "Botlhale", 
  "Rebaone", "Tebogo", "Ntemeng", "Mmilili", "Kopano", "Kelebogile", "Thatayaone", "Kenosi", "Molebatsi", "Motswedi", 
  "Bokang", "Otsile", "Seabelo", "Dipuo", "Moagi", "Osenotse", "Baone", "Gontse", "Mokgweetsi", "Kekgonne", 
  "Ntokozo", "Gaatlhwe", "Tapiwa", "Chichi", "Mago", "Bona", "Neo", "Sethunya", "Tshiamo", "Seemole", "Ketumile"
];

const SPECIALTIES = ["FMCG", "Insurance", "Banking", "Telco", "Beauty & Care", "Food & Beverage", "Finance", "Health & Wellness", "Retail", "Events & Activation"];
const ZONES = ["Gaborone CBD", "Block 6", "Block 8", "Phakalane", "Old Naledi", "Game City", "Mogoditshane", "Tlokweng", "Airport Junction", "Extension 14", "Broadhurst", "Phase 2", "Riverwalk", "Millennium Park", "BBS Mall"];
const CAMPAIGN_TAGS = ["Product Demo", "Brand Story", "Event Activation", "Wet Demo", "Sampling", "Direct Referral"];

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generateAgents = (): Agent[] => {
  return AGENT_NAMES.map((name, i) => {
    const seed = i + 12345; // Salt
    const score = 7.0 + seededRandom(seed) * 2.8;
    const age = 24 + Math.floor(seededRandom(seed + 1) * 19);
    const tier = score >= 9.0 ? 'GOLD' : score >= 8.0 ? 'SILVER' : 'BRONZE';
    const specialty = SPECIALTIES[i % SPECIALTIES.length];
    const zone = ZONES[i % ZONES.length];
    const campaignTag1 = i % 2 === 0 ? "InDrive" : (i % 3 === 0 ? "Tango" : "Taxi");
    const campaignTag2 = CAMPAIGN_TAGS[Math.floor(seededRandom(seed + 2) * CAMPAIGN_TAGS.length)];
    const gender = i % 3 === 0 ? 'female' : 'male';
    const readiness = score >= 8.5 ? 'CAMPAIGN READY' : 'IN TRAINING';

    return {
      id: `BFT-${(i + 1).toString().padStart(3, '0')}`,
      name,
      age,
      zone,
      specialty,
      score,
      tier,
      gender,
      campaignTag1,
      campaignTag2,
      readiness
    };
  });
};

export const RosterPage = ({ onBackToBrief }: { onBackToBrief: () => void }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');
  const agents = useMemo(() => generateAgents(), []);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'ALL' || 
                         (filter === 'GOLD TIER' && agent.tier === 'GOLD') ||
                         (filter === 'SILVER TIER' && agent.tier === 'SILVER') ||
                         (filter === 'BRONZE TIER' && agent.tier === 'BRONZE') ||
                         (agent.specialty === filter);
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    'ALL', 'GOLD TIER', 'SILVER TIER', 'BRONZE TIER', 
    'FMCG', 'INSURANCE', 'BANKING', 'TELCO', 'BEAUTY', 'EVENTS'
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Layered Background */}
      <div className="fixed inset-0 z-0">
        {/* Layer 1: Base Cognac Leather */}
        <div className="absolute inset-0 bg-[#1a0f08]" />
        
        {/* PLACEMENT 5: ATMOSPHERIC BACKGROUND */}
        <BigfootVideo 
          src="https://i.imgur.com/SJ6fOi5.mp4"
          opacity={0.15}
          scale={1.14}
          filter="grayscale(1) contrast(1.1)"
          className="fixed inset-0"
        />
        
        {/* Layer 2: Leather Grain Texture */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 4px)`
          }}
        />
        
        {/* Layer 3: Wood Panel Accent */}
        <div className="absolute inset-y-0 left-0 w-1/4 bg-[#241208] opacity-40 shadow-[20px_0_40px_rgba(0,0,0,0.3)]" />
        
        {/* Layer 4: Atmospheric Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
        
        {/* Layer 5: Warm Overhead Light */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,196,0,0.06)_0%,transparent_50%)]" />

        {/* Ambient Detail Elements */}
        {/* Top Left: Steering Wheel Outline */}
        <div className="absolute top-8 left-8 opacity-[0.04] pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="#F5C400" strokeWidth="1">
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="5" />
            <path d="M50 45V10M50 55V90M45 50H10M55 50H90" />
          </svg>
        </div>
        
        {/* Bottom Right: Road Line Pattern */}
        <div className="absolute bottom-8 right-8 opacity-[0.03] pointer-events-none">
          <svg width="300" height="150" viewBox="0 0 200 100" fill="none" stroke="#F5C400" strokeWidth="2" strokeDasharray="10 10">
            <path d="M95 100L100 20M105 100L100 20" />
          </svg>
        </div>

        {/* Right Side: Wood Grain Strip */}
        <div 
          className="absolute inset-y-0 right-0 w-8 opacity-[0.06]"
          style={{
            backgroundImage: `repeating-linear-gradient(to bottom, transparent 0px, transparent 20px, rgba(0,0,0,0.5) 21px, rgba(0,0,0,0.5) 22px)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        {/* Part 3: Header */}
        <header className="w-full bg-[#1f0f07] border-b border-[#F5C400]/20 px-6 py-8 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="font-bebas text-[48px] text-[#F5C400] tracking-[0.1em] leading-none mb-2">THE ROSTER</h1>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#8a7060]">
              BIG FOOT TRAFFIC · CERTIFIED AMBASSADOR NETWORK · GABORONE
            </p>
          </div>

          <div className="grid grid-cols-2 md:flex gap-4">
            <StatBox value="100" label="Certified Ambassadors" />
            <StatBox value="ACTIVE" label="Network Status" pulse />
            <StatBox value="8 CAMPAIGN" label="Specialties" />
            <StatBox value="LAUNCH READY" label="Campaign Start: 48hrs" />
          </div>
        </header>

        {/* Part 4: Filter and Search */}
        <div className="w-full bg-[#180d05] border-b border-[#F5C400]/10 px-6 py-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full md:w-auto">
            {filterOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[11px] font-bold uppercase transition-all border ${
                  filter === opt 
                    ? 'bg-[#F5C400]/10 border-[#F5C400] text-[#F5C400]' 
                    : 'bg-transparent border-[#F5C400]/15 text-[#8a7060] hover:border-[#F5C400]/30'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input 
              type="text"
              placeholder="[ SEARCH AMBASSADOR... ]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-b border-[#F5C400] py-2 px-2 text-[#F5C400] font-mono text-sm focus:outline-none placeholder:text-[#F5C400]/30"
            />
            <Search size={16} className="absolute right-2 top-2.5 text-[#F5C400]/40" />
          </div>
        </div>

        {/* Part 5: Agent Cards Grid */}
        <main className="p-6 md:p-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredAgents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: i * 0.01 }}
                >
                  <AgentCard agent={agent} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredAgents.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[#8a7060] font-mono text-sm uppercase tracking-widest">No ambassadors match your search criteria.</p>
            </div>
          )}
        </main>

        {/* Part 9: Page Bottom */}
        <footer className="w-full bg-[#1f0f07] border-t border-[#F5C400]/10 p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-[500px]">
            <p className="text-[12px] text-[#8a7060] leading-relaxed">
              Every ambassador in this roster has been personally vetted, trained, and certified by Big Foot Traffic. 
              Scores reflect ambassador quality assessment — not campaign history. All 100 are launch-ready.
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBackToBrief}
            className="px-8 py-4 bg-[#F5C400] text-[#050505] font-bold text-sm tracking-widest rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(245,196,0,0.2)]"
          >
            BRIEF A CAMPAIGN
            <ArrowRight size={18} />
          </motion.button>
        </footer>
      </div>
    </div>
  );
};

const StatBox = ({ value, label, pulse = false }: { value: string, label: string, pulse?: boolean }) => (
  <div className="bg-[#1e0e06] border border-[#F5C400]/15 p-3 rounded-md min-w-[140px]">
    <div className={`text-[14px] font-bold text-[#F5C400] mb-0.5 ${pulse ? 'animate-pulse' : ''}`}>
      {value}
      {pulse && <span className="inline-block w-2 h-2 rounded-full bg-green-500 ml-2 shadow-[0_0_8px_#22c55e]" />}
    </div>
    <div className="text-[11px] uppercase tracking-wider text-[#8a7060]">{label}</div>
  </div>
);
