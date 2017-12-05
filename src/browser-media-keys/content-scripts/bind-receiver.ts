import { Command, CommandMessage } from 'browser-media-keys/common';

import { getApplicableHandlers } from './handlers';

export function bindCommandReceiver() {
  browser.runtime.onMessage.addListener((msg: {}) => {
    let command = (<CommandMessage>msg).command || Command.Null;
    dispatchCommand(command);
  })
}

function dispatchCommand(command: Command) {
  getApplicableHandlers().forEach(h => {
    switch(command) {
      case Command.PlayPause: h.playPause(); break;
      case Command.Stop: h.stop(); break;
      case Command.NextTrack: h.nextTrack(); break;
      case Command.PrevTrack: h.prevTrack(); break;
    }
  })
}
