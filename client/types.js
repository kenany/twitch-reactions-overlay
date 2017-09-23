// @flow

export type Emote = {
  name: string,
  id: string,
  type: 'twitch' | 'bttv' | 'ffz',
  size: {
    width: number,
    height: number
  },
  isGIF: boolean
};

export type UniqueEmote = {
  uuid: number,
  position: {
    x: number,
    y: number
  }
} & Emote;
