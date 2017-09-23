// @flow

import fetch from 'node-fetch';

import type { Emote } from '../types';

async function getChannelBTTVEmotes(channel: string): Promise<Emote[]> {
  const res = await fetch(`https://api.betterttv.net/2/channels/${channel}`);
  const json = await res.json();
  return json.emotes.map((emote) => {
    return {
      name: emote.code,
      id: emote.id,
      type: 'bttv',
      size: {
        width: 28,
        height: 28
      },
      isGIF: emote.imageType === 'gif'
    };
  });
}

export default getChannelBTTVEmotes;
