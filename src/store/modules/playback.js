/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import spotifyApi from '../../util/spotifyApi';
import api from '../../util/api';

const state = {
  nowPlaying: false,
  isPlaying: false,
  playerId: null,
  isCreator: false,
  trackName: 'Track Name',
  artistName: 'Artist Name',
  albumName: 'Album Name',
  position: 0,
  duration: 1,
  searchResults: [],
  currentSong: null,
  songs: [],
  partyId: '',
};

const mutations = {
  set_party_id: (state, payload) => {
    state.partyId = payload;
  },
  set_songs: (state, payload) => {
    state.songs = payload;
  },
  play_track: (state, payload) => {
    state.isPlaying = true;
    state.trackName = payload.name;
    state.artistName = payload.artist;
    state.duration = payload.duration;
    state.currentSong = payload;
    state.nowPlaying = true;
  },
  pause_track: (state) => {
    state.isPlaying = false;
  },
  resume_track: (state) => {
    state.isPlaying = true;
  },
  create_player: (state, payload) => {
    state.playerId = payload;
  },
  set_current_state: (state, payload) => {
    console.log(payload);
    const {
      current_track: currentTrack,
    } = payload.track_window;
    console.log(payload.track_window);
    state.position = payload.position;
    state.duration = currentTrack.duration_ms;
    state.trackName = currentTrack.name;
    state.albumName = currentTrack.album.name;
    state.artistName = currentTrack.artists[0].name;
    state.isPlaying = !payload.paused;
  },
  search: (state, payload) => {
    state.searchResults = payload;
  },
  set_creator: (state) => {
    state.isCreator = true;
  }
};

const actions = {
  setPartyId: ({ commit }, payload) => {
    commit('set_party_id', payload);
  },
  setSongs: ({ commit }, payload) => {
    commit('set_songs', payload);
  },
  updatePlayer: ({ commit }, payload) => {
    commit('set_current_state', payload);
  },
  playTrack: ({ commit }, payload) => {
    spotifyApi({
      method: 'put',
      url: '/me/player/play',
      data: {
        uris: [payload.songId],
      },
    }).then(() => {
      commit('play_track', payload);
    });
  },
  pauseTrack: ({ commit }) => {
    spotifyApi.put('/me/player/pause');
    commit('pause_track');
  },
  resumeTrack: ({ commit }) => {
    spotifyApi.put('me/player/play');
    commit('resume_track');
  },
  createPlayer: ({ commit, dispatch, state }, payload) => {
    this.playerCheckInterval = setInterval(() => {
      const token = payload;
      console.log(token);
      console.log('Player Check')
      // if the Spotify SDK has loaded
      if (window.Spotify !== null) {
        // cancel the interval
        clearInterval(this.playerCheckInterval);
        // create a new player
        const player = new window.Spotify.Player({
          name: 'Jukebox',
          getOAuthToken: (cb) => { cb(token); },
        });
        // set up the player's event handlers
        // problem setting up the player
        player.on('initialization_error', (e) => { console.error(e); });
        // problem authenticating the user.
        // either the token was invalid in the first place,
        // or it expired (it lasts one hour)
        player.on('authentication_error', (e) => {
          console.error(e);
        });
        // currently only premium accounts can use the API
        player.on('account_error', (e) => { console.error(e); });
        // loading/playing the track failed for some reason
        player.on('playback_error', (e) => { console.error(e); });

        player.on('player_state_changed', (newState) => {
          console.log(newState);
          if (newState.paused && newState.position === 0) {
            const nextSongId = state.songs[0].nextSongId;
            console.log("Song End Event");
            if (nextSongId) {
              dispatch('playNextTrack');
            }
          }
          commit('set_current_state', newState);
        })

        player.on('update', (newState) => {
          commit('set_current_state', newState);
        })

        // Ready
        player.on('ready', (deviceId) => {
          console.log(deviceId)
          commit('create_player', deviceId);
          spotifyApi({
            method: 'put',
            url: '/me/player',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              device_ids: [deviceId.device_id],
              play: false,
            },
          }).then(() => {
            spotifyApi.put('/me/player/pause');
          });
        });

        // finally, connect!
        player.connect();
      }
    }, 1000);
  },
  searchSongs: ({ state, commit }, payload) => {
    let searchResults = []
    if (payload.searchQuery !== '') {
      api.get(`party/${state.partyId}/search?q=${payload.searchQuery}`).then((result) => {
        searchResults = result.data;
        console.log(searchResults);
        commit('search', searchResults);
      }).catch((error) => {
        console.log('No Results' + error);
        commit('search', []);
      });
    } else {
      commit('search', []);
    }
    },
  playNextTrack: ({ state, dispatch, commit}) => {
    api.post(`party/${state.partyId}/played`, state.songs[0]).then((res) => {
      api.get(`party/${state.partyId}/songs`).then((res) => {
        commit('set_songs', res.data);
        if (state.songs[0]) {
          dispatch('playTrack', state.songs[0]);
        }
      });
    });
  },
  setCreator: ({ commit }) => {
    commit('set_creator');
  },
};

const getters = {
  isPlaying: state => state.isPlaying,
  playerId: state => state.playerId,
  position: state => state.position,
  duration: state => state.duration,
  searchResults: state => state.searchResults,
  partyId: state => state.partyId,
  songs: state => state.songs,
  isCreator: state => state.isCreator,
  nowPlaying: state => state.nowPlaying,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
