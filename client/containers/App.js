// @flow
// @jsx h

import { h } from 'preact';
import { useCallback, useEffect } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import type WebSocket from 'reconnecting-websocket';

import EmoteImage from '../components/EmoteImage';
import Fade from '../components/Fade';
import { addEmote } from '../redux/modules/emotes';
import type { State } from '../redux/types';
import type { Emote } from '../types';

type Props = {
  socket: WebSocket
};

const App = ({ socket }: Props) => {
  const emotes = useSelector((state: State) => state.emotes.emotes);

  const dispatch = useDispatch();
  const ownAddEmote = useCallback(
    (emote: Emote, x: number, y: number) => dispatch(addEmote(emote, x, y)),
    [dispatch]
  );

  useEffect(() => {
    socket.onmessage = (event) => {
      const { data } = event;
      const emotes: Emote[] = JSON.parse(data);

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      for (const emote of emotes) {
        const divWidth = emote.size.width * 4;
        const divHeight = emote.size.height * 4;
        const x = Math.random() * (windowWidth - divWidth);
        const y = Math.random() * (windowHeight - divHeight);
        ownAddEmote(emote, x, y);
      }
    };
  }, [ownAddEmote, socket]);

  return (
    <TransitionGroup>
      {emotes.map((emote) => {
        let url = '';

        switch (emote.type) {
          case 'twitch':
            url = `https://static-cdn.jtvnw.net/emoticons/v1/${emote.id}/3.0`;
            break;
          case 'bttv':
            url = `https://cdn.betterttv.net/emote/${emote.id}/3x`;
            break;
          case 'ffz':
            url = `https://cdn.frankerfacez.com/emoticon/${emote.id}/${emote.scale}`;
            break;
        }

        return (
          <Fade key={emote.uuid}>
            <EmoteImage
              src={url}
              left={emote.position.x + 'px'}
              top={emote.position.y + 'px'}
            />
          </Fade>
        );
      })}
    </TransitionGroup>
  );
};

export default App;
