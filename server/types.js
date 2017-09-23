// @flow

export type BaseEmote = {
  name: string,
  id: string,
  type: 'twitch' | 'bttv' | 'ffz',
  size: {
    width: number,
    height: number
  },
  isGIF: boolean
};

export type TwitchEmote = BaseEmote & {
  type: 'twitch'
};

export type BTTVEmote = BaseEmote & {
  type: 'bttv'
};

export type FFZEmote = BaseEmote & {
  type: 'ffz',
  scale: number
};

export type Emote = BTTVEmote | FFZEmote;
