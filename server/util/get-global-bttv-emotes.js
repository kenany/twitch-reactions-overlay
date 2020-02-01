// @flow

import fetch from 'node-fetch';

import type { Emote } from '../types';

type ImageType = 'gif' | 'png';

type GlobalBttvEmote = {
  code: string,
  id: string,
  imageType: ImageType,
  userId: string
};

async function getGlobalBTTVEmotes(): Promise<Emote[]> {
  const res = await fetch('https://api.betterttv.net/3/cached/emotes/global');
  const json: GlobalBttvEmote[] = await res.json();
  return json.map((emote) => {
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

export default getGlobalBTTVEmotes;
