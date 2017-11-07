# twitch-reactions-overlay

Website that briefly displays emotes from a Twitch chat as they're posted.
Intended to be added as a Browser Source in live streaming software like OBS
Studio, so that the emotes can be shown on stream as an overlay.

## Usage

```
$ npm install
$ cp .env.example .env

# edit `.env`

$ npm run build
```

Then one can run the server at `out/index.js` and serve the client at `build/`.
