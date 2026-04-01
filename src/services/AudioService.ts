import { useEffect, useRef, useState } from 'react';

// Sound URLs (Using high-quality placeholders)
export const SOUNDS = {
  AMBIENT: 'https://assets.mixkit.co/sfx/preview/mixkit-deep-hum-drone-2144.mp3', // Deep bass hum
  FOOTSTEP: 'https://assets.mixkit.co/sfx/preview/mixkit-heavy-footstep-on-concrete-540.mp3', // Heavy step
  IMPACT: 'https://assets.mixkit.co/sfx/preview/mixkit-cinematic-impact-low-thud-2592.mp3', // Bass impact
  CLICK: 'https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3', // UI Click
  ENTER: 'https://assets.mixkit.co/sfx/preview/mixkit-cinematic-transition-whoosh-1506.mp3', // Enter Network
  TYPE: 'https://assets.mixkit.co/sfx/preview/mixkit-typewriter-soft-click-1125.mp3', // Typewriter
};

class AudioService {
  private static instance: AudioService;
  private ambientAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = true; // Default to muted for better UX (autostart issues)
  private volume: number = 0.15;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.ambientAudio = new Audio(SOUNDS.AMBIENT);
      this.ambientAudio.loop = true;
      this.ambientAudio.volume = this.volume;
    }
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ambientAudio) {
      if (this.isMuted) {
        this.ambientAudio.pause();
      } else {
        this.ambientAudio.play().catch(e => console.log('Audio play blocked:', e));
      }
    }
    return this.isMuted;
  }

  public getMuteState() {
    return this.isMuted;
  }

  public playSound(url: string, volume: number = 0.3) {
    if (this.isMuted) return;
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(e => console.log('Audio play blocked:', e));
  }

  public startAmbient() {
    if (!this.isMuted && this.ambientAudio) {
      this.ambientAudio.play().catch(e => console.log('Audio play blocked:', e));
    }
  }
}

export const audioService = AudioService.getInstance();

// Hook for components to use
export const useAudio = () => {
  const [isMuted, setIsMuted] = useState(audioService.getMuteState());

  const toggleMute = () => {
    const newState = audioService.toggleMute();
    setIsMuted(newState);
  };

  const playSound = (soundKey: keyof typeof SOUNDS, volume?: number) => {
    audioService.playSound(SOUNDS[soundKey], volume);
  };

  return { isMuted, toggleMute, playSound };
};
