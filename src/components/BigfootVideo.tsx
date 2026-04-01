import React from 'react';

interface BigfootVideoProps {
  src: string;
  opacity?: number;
  scale?: number;
  filter?: string;
  className?: string;
  objectPosition?: string;
}

export const BigfootVideo: React.FC<BigfootVideoProps> = ({
  src,
  opacity = 1,
  scale = 1.14,
  filter,
  className = "",
  objectPosition = "center center"
}) => {
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition,
          transform: `scale(${scale})`,
          opacity,
          filter
        }}
      />
    </div>
  );
};
