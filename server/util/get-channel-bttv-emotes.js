// @flow

import fetch from 'node-fetch';

import type { Emote } from '../types';

export type ImageType = 'gif' | 'png';

export type User = {
  id: string,
  name: string,
  displayName: string,
  providerId: string
};

export type SharedEmote = {
  id: string,
  code: string,
  imageType: ImageType,
  user: User
};

export type ChannelBttvEmotes = {
  id: string,
  sharedEmotes: SharedEmote[]
};

async function getChannelBTTVEmotes(twitchId: number): Promise<Emote[]> {
  const res = await fetch(
    `https://api.betterttv.net/3/cached/users/twitch/${twitchId}`
  );
  const json: ChannelBttvEmotes = await res.json();
  return json.sharedEmotes.map((emote) => {
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
