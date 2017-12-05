export enum Command {
  Null=0, PlayPause, Stop, PrevTrack, NextTrack,
}

export function commandFromString(cmdStr: string) {
  switch(cmdStr) {
    case 'mediaPlayPause': return Command.PlayPause;
    case 'mediaStop': return Command.Stop;
    case 'mediaPrevTrack': return Command.PrevTrack;
    case 'mediaNextTrack': return Command.NextTrack;
    default:
      console.error(`Unrecognized media command string: ${cmdStr}`);
      return Command.Null;
  }
}

export interface CommandMessage {
  command: Command;
}
