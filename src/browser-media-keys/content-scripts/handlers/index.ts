import { MediaPlayerHandler } from './media-handler.interface';

import { GooglePlayHandler } from './google-play-handler';

const HANDLERS = [
  new GooglePlayHandler(),
];

export function getApplicableHandlers(): MediaPlayerHandler[] {
  return HANDLERS.filter(h => h.isApplicable());
}
