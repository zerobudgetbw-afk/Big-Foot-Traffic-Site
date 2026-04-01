import React from 'react';
import { motion } from 'motion/react';
import { AgentAvatar } from './AgentAvatar';

export interface Agent {
  id: string;
  name: string;
  age: number;
  zone: string;
  specialty: string;
  score: number;
  tier: 'GOLD' | 'SILVER' | 'BRONZE';
  gender: 'male' | 'female';
  campaignTag1: string;
  campaignTag2: string;
  readiness: string;
}

export const AgentCard = ({ agent }: { agent: Agent }) => {
  const tierColor = agent.tier === 'GOLD' ? '#F5C400' : agent.tier === 'SILVER' ? '#C0C0C0' : '#B4641E';
  const tierBg = agent.tier === 'GOLD' ? 'rgba(245, 196, 0, 0.15)' : agent.tier === 'SILVER' ? 'rgba(192, 192, 192, 0.15)' : 'rgba(180, 100, 30, 0.15)';
  const tierBorder = agent.tier === 'GOLD' ? 'rgba(245, 196, 0, 0.3)' : agent.tier === 'SILVER' ? 'rgba(192, 192, 192, 0.3)' : 'rgba(180, 100, 30, 0.3)';

  return (
    <motion.div
      whileHover={{ y: -4, borderColor: 'rgba(245, 196, 0, 0.5)', boxShadow: '0 8px 32px rgba(245, 196, 0, 0.08)' }}
      className="bg-[#1c0d06] border border-white/10 rounded-xl p-4 flex flex-col items-center transition-all duration-250 group"
      style={{ borderColor: tierBorder }}
    >
      {/* Agent ID Strip */}
      <div className="w-full flex justify-between items-center mb-4">
        <span className="font-mono text-[9px] text-[#8a7060]">{agent.id}</span>
        <div 
          className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border"
          style={{ backgroundColor: tierBg, color: tierColor, borderColor: tierBorder }}
        >
          {agent.tier}
        </div>
      </div>

      {/* Avatar */}
      <div className="mb-4">
        <AgentAvatar index={parseInt(agent.id.split('-')[1])} gender={agent.gender} tier={agent.tier} />
      </div>

      {/* Name */}
      <h3 className="text-[15px] font-semibold text-[#F2F0EB] mb-1">{agent.name}</h3>

      {/* Age & Zone */}
      <p className="text-[10px] text-[#8a7060] mb-3">Age {agent.age} · {agent.zone}</p>

      {/* Specialty Badge */}
      <div className="bg-[#E8440A]/12 border border-[#E8440A]/30 text-[#E8440A] text-[10px] font-bold uppercase px-3 py-1 rounded-full mb-4">
        {agent.specialty} SPECIALIST
      </div>

      {/* Performance Bar Section */}
      <div className="w-full space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-[#8a7060] uppercase">Readiness</span>
          <span className={`text-[10px] font-bold ${agent.readiness === 'CAMPAIGN READY' ? 'text-[#F5C400]' : 'text-[#8a7060]'}`}>
            {agent.readiness}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-[#8a7060] uppercase">Score</span>
          <span className="text-[10px] font-bold text-[#F5C400]">{agent.score.toFixed(1)}</span>
        </div>
        <div className="w-full h-[3px] bg-[#281208] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${(agent.score / 10) * 100}%` }}
            className="h-full bg-[#F5C400]"
          />
        </div>
      </div>

      {/* Campaign Focus Tags */}
      <div className="flex gap-2 mb-4">
        <div className="bg-[#281208] border border-[#2e1a0a] text-[#6a5040] text-[9px] px-2 py-0.5 rounded">
          {agent.campaignTag1}
        </div>
        <div className="bg-[#281208] border border-[#2e1a0a] text-[#6a5040] text-[9px] px-2 py-0.5 rounded">
          {agent.campaignTag2}
        </div>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center gap-1.5 mt-auto">
        <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
        <span className="text-[8px] text-[#556655] font-bold tracking-widest uppercase">Available for Campaign</span>
      </div>
    </motion.div>
  );
};
