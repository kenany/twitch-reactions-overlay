// @flow

import fetch from 'node-fetch';

import type { Emote } from '../types';

async function getChannelFFZEmotes(channel: string): Promise<Emote[]> {
  const res = await fetch(`https://api.frankerfacez.com/v1/room/${channel}`);
  const json = await res.json();
  return json.sets[json.room.set].emoticons.map((emote) => {
    const scales = Object.keys(emote.urls);

    return {
      name: emote.name,
      id: emote.id,
      type: 'ffz',
      size: {
        width: emote.width,
        height: emote.height
      },
      isGIF: false,
      scale: scales[scales.length - 1]
    };
  });
}

export default getChannelFFZEmotes;
