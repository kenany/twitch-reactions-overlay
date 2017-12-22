// @flow
// @jsx h

import { h } from 'preact';
import { connect } from 'preact-redux';
import { TransitionGroup } from 'react-transition-group';
import { compose, lifecycle } from 'recompose';
import type WebSocket from 'reconnecting-websocket';

import type { Emote, UniqueEmote } from '../types';
import { addEmote } from '../redux/modules/emotes';
import EmoteImage from '../components/EmoteImage';
import Fade from '../components/Fade';

type Props = {
  emotes: UniqueEmote[],
  socket: WebSocket
};

const App = (props: Props) => {
  return (
    <TransitionGroup>
      {
        props.emotes.map((emote) => {
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
        })
      }
    </TransitionGroup>
  );
};

export default compose(
  connect(
    state => {
      return {
        emotes: state.emotes.emotes
      };
    },
    { addEmote }
  ),
  lifecycle({
    componentDidMount() {
      this.props.socket.onmessage = (event) => {
        const { data } = event;
        const emotes: Emote[] = JSON.parse(data);

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        for (const emote of emotes) {
          const divWidth = emote.size.width * 4;
          const divHeight = emote.size.height * 4;
          const x = Math.random() * (windowWidth - divWidth);
          const y = Math.random() * (windowHeight - divHeight);
          this.props.addEmote(emote, x, y);
        }
      };
    }
  })
)(App);
