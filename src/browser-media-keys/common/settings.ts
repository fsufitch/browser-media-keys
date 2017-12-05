export interface MediaKeysSettings extends browser.storage.StorageObject {
  initialized: boolean;
  nativeMode: boolean;
  playPauseHotkey: Hotkey;
  stopHotkey: Hotkey;
  prevTrackHotkey: Hotkey;
  nextTrackHotkey: Hotkey;
}


export interface Hotkey extends browser.storage.StorageObject {
  modCtrl?: boolean;
  modShift?: boolean;
  modAlt?: boolean;
  modSuper?: boolean;
  keyCode: string;
}

const BROWSER_MEDIA_KEYS_SETTINGS = 'browser-media-keys/settings';
const DEFAULT_SETTINGS: MediaKeysSettings = {
  initialized: true,
  nativeMode: false,
  playPauseHotkey: {keyCode: ""},
  stopHotkey: {keyCode: ""},
  prevTrackHotkey: {keyCode: ""},
  nextTrackHotkey: {keyCode: ""},
}

export function loadSettings(): Promise<MediaKeysSettings> {
  return browser.storage.local.get(BROWSER_MEDIA_KEYS_SETTINGS)
    .then(obj => (<MediaKeysSettings>obj))
    .then(settings => settings.initialized ? settings : DEFAULT_SETTINGS);
}

export function saveSettings(settings: MediaKeysSettings) {
  browser.storage.local.set({
    [BROWSER_MEDIA_KEYS_SETTINGS]: settings
  });
}
