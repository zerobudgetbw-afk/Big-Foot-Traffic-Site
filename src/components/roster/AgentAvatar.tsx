import React from 'react';

interface AvatarProps {
  index: number;
  gender: 'male' | 'female';
  tier: 'GOLD' | 'SILVER' | 'BRONZE';
}

const SKIN_TONES = [
  '#3d2314', '#5c3218', '#7a4520', '#9a5a28', 
  '#b5712a', '#c98535', '#d4904a', '#c07838'
];

const HAIR_COLORS = ['#1a1008', '#2c1810'];

export const AgentAvatar = ({ index, gender, tier }: AvatarProps) => {
  const skinTone = SKIN_TONES[index % SKIN_TONES.length];
  const hairStyle = index % 10;
  const hairColor = HAIR_COLORS[index % HAIR_COLORS.length];
  const expression = index % 4;
  const agentHue = (index * 37) % 360;
  
  const tierColor = tier === 'GOLD' ? '#F5C400' : tier === 'SILVER' ? '#C0C0C0' : '#B4641E';

  return (
    <div className="relative w-20 h-20 rounded-full overflow-hidden" style={{ 
      background: `radial-gradient(circle, hsl(${agentHue}, 35%, 25%) 0%, #0a0a0a 100%)`,
      boxShadow: tier === 'GOLD' ? '0 0 12px rgba(245, 196, 0, 0.2)' : 'none',
      border: `3px solid ${tierColor}`
    }}>
      <svg viewBox="0 0 80 80" className="w-full h-full">
        {/* Face Shape */}
        <ellipse cx="40" cy="42" rx="22" ry="26" fill={skinTone} />
        
        {/* Jaw/Chin (more defined) */}
        <path 
          d={gender === 'male' 
            ? "M18 42C18 58 30 68 40 68C50 68 62 58 62 42" 
            : "M20 42C20 56 30 66 40 66C50 66 60 56 60 42"} 
          fill={skinTone} 
        />

        {/* Hair Styles */}
        {renderHair(hairStyle, hairColor, gender)}

        {/* Eyes */}
        <g transform="translate(40, 34)">
          {/* Left Eye */}
          <g transform="translate(-10, 0)">
            <ellipse cx="0" cy="0" rx="5" ry="4" fill="white" />
            <circle cx="0" cy="0" r="2.5" fill="#3d2314" />
            <circle cx="1" cy="-1" r="0.8" fill="white" />
          </g>
          {/* Right Eye */}
          <g transform="translate(10, 0)">
            <ellipse cx="0" cy="0" rx="5" ry="4" fill="white" />
            <circle cx="0" cy="0" r="2.5" fill="#3d2314" />
            <circle cx="1" cy="-1" r="0.8" fill="white" />
          </g>
        </g>

        {/* Eyebrows */}
        <path d="M25 30Q30 28 35 30" stroke={hairColor} strokeWidth="1.8" fill="none" />
        <path d="M45 30Q50 28 55 30" stroke={hairColor} strokeWidth="1.8" fill="none" />

        {/* Nose */}
        <path d="M40 34V48M37 48Q40 50 43 48" stroke="black" strokeOpacity="0.15" strokeWidth="1" fill="none" />
        <ellipse cx="37" cy="48" rx="3" ry="1.5" fill="black" fillOpacity="0.1" />
        <ellipse cx="43" cy="48" rx="3" ry="1.5" fill="black" fillOpacity="0.1" />

        {/* Mouth */}
        {renderMouth(expression)}

        {/* Stubble / Beard */}
        {gender === 'male' && index % 7 === 0 && (
          <g opacity="0.4">
            {[...Array(20)].map((_, i) => (
              <circle key={i} cx={30 + Math.sin(i) * 10} cy={55 + Math.cos(i) * 5} r="0.6" fill="#2c1008" />
            ))}
          </g>
        )}
        {gender === 'male' && index % 9 === 0 && (
          <path d="M20 45Q20 68 40 68Q60 68 60 45L55 45Q55 62 40 62Q25 62 25 45Z" fill={hairColor} fillOpacity="0.85" />
        )}

        {/* Clothing */}
        {renderClothing(tier)}
      </svg>
    </div>
  );
};

const renderHair = (style: number, color: string, gender: string) => {
  switch(style) {
    case 0: // Low fade
      return <path d="M18 42C18 20 62 20 62 42L62 35Q40 25 18 35Z" fill={color} />;
    case 1: // High top fade
      return <path d="M18 35V20H62V35Q40 30 18 35Z" fill={color} />;
    case 2: // Short afro
      return <circle cx="40" cy="30" r="24" fill={color} clipPath="inset(0 0 50% 0)" />;
    case 3: // Locs (male)
      return (
        <g fill={color}>
          {[...Array(8)].map((_, i) => (
            <rect key={i} x={20 + i * 5} y="15" width="3" height="20" rx="1.5" />
          ))}
        </g>
      );
    case 4: // Braids (female)
      return (
        <g stroke={color} strokeWidth="2" fill="none">
          {[...Array(10)].map((_, i) => (
            <path key={i} d={`M${15 + i * 5} 15L${20 + i * 5} 40`} />
          ))}
        </g>
      );
    case 5: // Natural afro (female)
      return <circle cx="40" cy="32" r="28" fill={color} />;
    case 6: // Taper cut
      return <path d="M18 38Q40 28 62 38" stroke={color} strokeWidth="4" fill="none" />;
    case 7: // Twist out
      return (
        <g fill={color}>
          {[...Array(12)].map((_, i) => (
            <circle key={i} cx={20 + i * 4} cy={25 + Math.sin(i) * 3} r="6" />
          ))}
        </g>
      );
    case 8: // Shaved bald
      return null;
    case 9: // Long locs
      return (
        <g fill={color}>
          {[...Array(12)].map((_, i) => (
            <rect key={i} x={10 + i * 5} y="15" width="3" height="60" rx="1.5" />
          ))}
        </g>
      );
    default: return null;
  }
};

const renderMouth = (expression: number) => {
  switch(expression) {
    case 0: // Confident smile
      return <path d="M32 55Q40 60 48 55" stroke="#6b2d1a" strokeWidth="2" fill="none" />;
    case 1: // Serious neutral
      return <path d="M34 56H46" stroke="#6b2d1a" strokeWidth="2" fill="none" />;
    case 2: // Professional warm smile
      return (
        <g>
          <path d="M30 54Q40 62 50 54" fill="#6b2d1a" />
          <rect x="35" y="55" width="10" height="2" rx="1" fill="white" />
        </g>
      );
    case 3: // Composed smirk
      return <path d="M32 56Q40 58 48 54" stroke="#6b2d1a" strokeWidth="2" fill="none" />;
    default: return null;
  }
};

const renderClothing = (tier: string) => {
  const shirtColor = tier === 'GOLD' ? '#0d1a2e' : tier === 'SILVER' ? '#2a0a0a' : '#1a1a1a';
  return (
    <g transform="translate(0, 65)">
      <path d="M10 0L40 15L70 0V15H10V0Z" fill={shirtColor} />
      {tier === 'GOLD' && (
        <path d="M38 0L40 12L42 0H38Z" fill="#F5C400" />
      )}
    </g>
  );
};
