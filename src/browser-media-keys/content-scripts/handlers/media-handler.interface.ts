export interface MediaPlayerHandler {
  isApplicable(): boolean;
  playPause(): void;
  stop(): void;
  nextTrack(): void;
  prevTrack(): void;
}
