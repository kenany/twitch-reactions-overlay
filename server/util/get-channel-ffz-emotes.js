// @flow

import fetch from 'node-fetch';

import type { Emote } from '../types';

type Emoticon = {
  height: number,
  id: number,
  name: string,
  urls: { [key: string]: string },
  width: number
};

type Room = {
  set: number,
  twitch_id: number
};

type Set = {
  emoticons: Emoticon[]
};

type ChannelFfzEmotes = {
  room: Room,
  sets: { [key: string]: Set }
};

async function getChannelFFZEmotes(
  channel: string
): Promise<{ twitchId: number, emotes: Emote[] }> {
  const res = await fetch(`https://api.frankerfacez.com/v1/room/${channel}`);
  const json: ChannelFfzEmotes = await res.json();
  return {
    emotes: json.sets[json.room.set.toString()].emoticons.map((emote) => {
      const scales = Object.keys(emote.urls);

      return {
        name: emote.name,
        id: emote.id.toString(),
        type: 'ffz',
        size: {
          width: emote.width,
          height: emote.height
        },
        isGIF: false,
        scale: parseInt(scales[scales.length - 1], 10)
      };
    }),
    twitchId: json.room.twitch_id
  };
}

export default getChannelFFZEmotes;
