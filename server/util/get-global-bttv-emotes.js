// @flow

import fetch from 'node-fetch';

import type { Emote } from '../types';

async function getGlobalBTTVEmotes(): Promise<Emote[]> {
  const res = await fetch('https://api.betterttv.net/emotes');
  const json = await res.json();
  return json.emotes.map((emote) => {
    const spl = emote.url.split('/emote/')[1];
    return {
      name: emote.regex,
      id: spl.substring(0, spl.length - 3),
      type: 'bttv',
      size: {
        width: emote.width,
        height: emote.height
      },
      isGIF: emote.imageType === 'gif'
    };
  });
}

export default getGlobalBTTVEmotes;
