// @flow

type BaseEmote = {
  name: string,
  id: string,
  size: {
    width: number,
    height: number
  },
  isGIF: boolean
};

type TwitchEmote = BaseEmote & { type: 'twitch' };
type BTTVEmote = BaseEmote & { type: 'bttv' };
type FFZEmote = BaseEmote & { type: 'ffz', scale: number };

export type Emote = TwitchEmote | BTTVEmote | FFZEmote;

type BaseUniqueEmote = {
  uuid: number,
  position: {
    x: number,
    y: number
  }
};

type UniqueTwitchEmote = BaseUniqueEmote & TwitchEmote;
type UniqueBTTVEmote = BaseUniqueEmote & BTTVEmote;
type UniqueFFZEmote = BaseUniqueEmote & FFZEmote;

export type UniqueEmote = UniqueTwitchEmote | UniqueBTTVEmote | UniqueFFZEmote;
