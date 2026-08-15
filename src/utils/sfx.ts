// Web Audio API Synthesizer Engine with Precise Individual Gain Balancing
class SoundFXEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;

  constructor() {
    this.isMuted = false;

    // Attach global user gesture listener to unlock AudioContext on first interaction
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.unlockContext();
      };

      window.addEventListener('pointerdown', unlock, { capture: true, passive: true });
      window.addEventListener('click', unlock, { capture: true, passive: true });
      window.addEventListener('keydown', unlock, { capture: true, passive: true });
      window.addEventListener('touchstart', unlock, { capture: true, passive: true });
    }
  }

  private unlockContext(): AudioContext | null {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        // Master Volume Node (Balanced at 0.25 for crisp clear UI audio)
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playToggle(true);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public unlockAudio() {
    this.unlockContext();
  }

  // Helper method to schedule tone with automatic resume retry & master output node
  private playTone(
    setup: (ctx: AudioContext, out: AudioNode, now: number) => void
  ) {
    if (this.isMuted) return;

    try {
      const ctx = this.unlockContext();
      if (!ctx || !this.masterGain) return;

      const trigger = () => {
        const now = ctx.currentTime;
        setup(ctx, this.masterGain!, now);
      };

      if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
          trigger();
        }).catch(() => {});
      } else {
        trigger();
      }
    } catch {
      // Audio execution safe catch
    }
  }

  // 1. Crisp, soft hover blip (15ms sine tone)
  public playHover() {
    this.playTone((ctx, out, now) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.015);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(out);

      osc.start(now);
      osc.stop(now + 0.015);
    });
  }

  // 2. Crisp, soothing UI click (warm acoustic sine bubble)
  public playClick() {
    this.playTone((ctx, out, now) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.035);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(out);

      osc.start(now);
      osc.stop(now + 0.035);
    });
  }

  // 3. Clear dual-tone toggle switch
  public playToggle(isOn: boolean) {
    this.playTone((ctx, out, now) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      if (isOn) {
        osc.frequency.setValueAtTime(360, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.05);
      } else {
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      }

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(out);

      osc.start(now);
      osc.stop(now + 0.05);
    });
  }

  // 4. Ultra-soft subtle curtain sliding swoosh (whisper of air)
  public playSwoosh() {
    this.playTone((ctx, out, now) => {
      const bufferSize = ctx.sampleRate * 0.09; // 90ms soft subtle sound
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(600, now + 0.09);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(out);

      noise.start(now);
      noise.stop(now + 0.09);
    });
  }

  // 5. Mechanical keyboard keypress
  public playTerminalKey() {
    this.playTone((ctx, out, now) => {
      const baseFreq = 400 + Math.random() * 150;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.02);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      osc.connect(gain);
      gain.connect(out);

      osc.start(now);
      osc.stop(now + 0.02);
    });
  }

  // 6. Gentle Success Chime
  public playSuccess() {
    this.playTone((ctx, out, now) => {
      const notes = [440, 554.37, 659.25]; // A4, C#5, E5
      notes.forEach((freq, idx) => {
        const noteTime = now + idx * 0.06;
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, noteTime);

        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.linearRampToValueAtTime(0.08, noteTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(out);

        osc.start(noteTime);
        osc.stop(noteTime + 0.2);
      });
    });
  }

  // 7. Ambient Soft System Boot / Welcome Startup Sound (Engineered Specially to be Soft & Non-Intrusive)
  // 7. Welcome Startup Sound (Disabled)
  public playWelcomeBoot() {
    // Disabled per user request
  }
}

export const soundFX = new SoundFXEngine();
