// @flow

require('dotenv').config();

import process from 'process';
import tmi from 'tmi.js';
import { Server as WebSocketServer } from 'uws';

import type { Emote } from './types';
import {
  getChannelBTTVEmotes,
  getChannelFFZEmotes,
  getGlobalBTTVEmotes
} from './util';

type UserStateEmotes = {
  [string]: string[]
};

const validEmotes: Map<string, Emote> = new Map();

function parseEmotes(message: string, twitchEmotes: UserStateEmotes): Emote[] {
  if (!twitchEmotes) {
    twitchEmotes = {};
  }

  Object.keys(twitchEmotes).forEach((twitchEmoteID) => {
    for (const range of twitchEmotes[twitchEmoteID]) {
      const r = range.split('-');
      const start = parseInt(r[0], 10);
      const end = parseInt(r[1], 10) + 1;
      validEmotes.set(message.substring(start, end), {
        id: twitchEmoteID,
        name: message.substring(start, end),
        type: 'twitch',
        size: {
          width: 28,
          height: 28
        },
        isGIF: false
      });
    }
  });

  const words = message.split(' ');
  const emotes = [];
  for (const word of words) {

    // See <https://github.com/facebook/flow/issues/2751> for why
    // `Map#has(word)` cannot be used here.
    const validEmote = validEmotes.get(word);
    if (validEmote) {
      emotes.push(validEmote);
    }
  }
  return emotes;
}

const tmiOptions = {
  options: {
    debug: process.env.NODE_ENV !== 'production'
  },
  connection: {
    reconnect: true
  },
  channels: [`#${process.env.TWITCH_CHANNEL_NAME}`]
};

async function init() {
  const globalBTTVEmotes = await getGlobalBTTVEmotes();
  for (const emote of globalBTTVEmotes) {
    validEmotes.set(emote.name, emote);
  }

  const channelBTTVEmotes = await getChannelBTTVEmotes(
    process.env.TWITCH_CHANNEL_NAME
  );
  for (const emote of channelBTTVEmotes) {
    validEmotes.set(emote.name, emote);
  }

  const channelFFZEmotes = await getChannelFFZEmotes(
    process.env.TWITCH_CHANNEL_NAME
  );
  for (const emote of channelFFZEmotes) {
    validEmotes.set(emote.name, emote);
  }

  const wss = new WebSocketServer({ port: 3000 });
  const sockets = [];

  wss.on('connection', (socket) => {
    sockets.push(socket);
  });

  const tmiClient = new tmi.Client(tmiOptions);

  tmiClient.on('chat', (channel, userState, message, self) => {
    if (self) {
      return;
    }

    const emotes = parseEmotes(message, userState.emotes);
    if (emotes.length) {
      for (const socket of sockets) {
        socket.send(JSON.stringify(emotes));
      }
    }
  });

  tmiClient.connect();
}

init();
