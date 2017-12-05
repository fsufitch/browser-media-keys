import { MediaPlayerHandler } from './media-handler.interface';
import { createMouseClickEvent } from './events.util';

const GOOGLE_PLAY_HOST = 'play.google.com';
const MUSIC_PATH_RE = /\/music\/listen/;

export class GooglePlayHandler implements MediaPlayerHandler {
  isApplicable() {
    return window.location.host === GOOGLE_PLAY_HOST && MUSIC_PATH_RE.test(window.location.pathname);
  }

  playPause() {
    let el = document.querySelector('#player-bar-play-pause');
    if (!el) {
      console.error('Player play/pause button not found!');
      return;
    }
    el.dispatchEvent(createMouseClickEvent());
  }

  stop() {
    let el = document.querySelector('#player-bar-play-pause');
    if (!el) {
      console.error('Player play/pause button not found!');
      return;
    }
    if (el.classList.contains('playing')) {
      el.dispatchEvent(createMouseClickEvent());
    }
  }

  nextTrack() {
    let el = document.querySelector('#player-bar-forward');
    if (!el) {
      console.error('Player forward button not found!');
      return;
    }
    el.dispatchEvent(createMouseClickEvent());
  }

  prevTrack() {
    let el = document.querySelector('#player-bar-rewind');
    if (!el) {
      console.error('Player rewind button not found!');
      return;
    }
    el.dispatchEvent(createMouseClickEvent());
  }
}
