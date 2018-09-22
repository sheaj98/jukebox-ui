<template>
  <div id="party-view">
    <header>
      <v-toolbar fixed class="header">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>{{ partyName ? partyName + '\'s Party' : 'Your Party'}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </header>
    <v-content>
    <v-container page>
      <div class="queue-view">
        <v-text-field
          v-model="searchQuery"
          label="Search"
          color="white"
          box
          clearable
          @input="searchOrExit"
        ></v-text-field>
        <div class="songs">
          <queue :list-data="searchResults" v-if="searchResults.length !== 0"></queue>
          <search-results :list-data="songs" v-else></search-results>
        </div>
        </div>
    </v-container>
      </v-content>

    <v-bottom-nav
      :value="true"
      fixed
      class="header"
    >
      <v-progress-linear
          v-model="buffer"
          color="accent"
        ></v-progress-linear>
        <v-btn
          class='playback-button'
        >
          <v-icon>skip_previous</v-icon>
        </v-btn>

        <v-btn
          class='playback-button'
          v-if="!isPlaying"
          @click="resumeTrack"
        >
          <v-icon>play_circle_outline</v-icon>
        </v-btn>

      <v-btn
        class='playback-button'
        v-if="isPlaying"
        @click="pauseTrack"
      >
        <v-icon>pause_circle_outline</v-icon>
      </v-btn>

        <v-btn
          class='playback-button'
        >
          <v-icon>skip_next</v-icon>
        </v-btn>
    </v-bottom-nav>
  </div>
</template>

<style lang="scss">
  #party-view {
    background-color: #1f2833;
    overflow: hidden;
    .header {
      color: #c5c6c7;
      background-color: #060F1A;
      overflow: hidden;
      flex-shrink: 0;
      .playback-button:hover {
        color: #66fcf1;
      }
    }
    .progress-linear {
      margin: 0;
      position: fixed;
      right: 0;
      z-index: 2;
      .primary {
        background-color: #66fcf1 !important;
        border-color: #66fcf1 !important;
      }
    }
    .queue-view {
      padding-top: 50px;
      display: grid;
      grid-template-rows: 50px auto;
      .songs {
        padding-top: 50px;
        padding-bottom: 50px;
        overflow: auto;
        min-height: 100%;
      }
      .list {
        color: #c5c6c7;
        background-color: #353E47;
      }
    }

  }
</style>
<script>
  import spotifyApi from '../util/spotifyApi';
  import Queue from '../components/Queue';
  import SearchResults from '../components/SearchResults';
  import config from '../util/config';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    components: {
      Queue,
      SearchResults,
    },
    data() {
      return {
        searchQuery: '',
        partyName: null,
        ws: null,
      };
    },
    computed: {
      ...mapGetters([
        'isPlaying',
        'duration',
        'position',
        'songs',
        'partyId',
        'songs',
        'searchResults',
      ]),
      buffer() {
        return (this.position * 100) / this.duration;
      },
    },
    mounted() {
      spotifyApi.get('/me').then((result) => {
        this.partyName = result.data.display_name;
      });
      this.setPartyId(this.$route.params.id);

      this.ws = new WebSocket(`ws://${config.serverUrl}/party/${this.partyId}`);
      this.ws.onmessage = (event) => {
        console.log('Websocket Event' + event);
        let songs = JSON.parse(event.data);
        this.setSongs(songs);
      };
    },
    methods: {
      ...mapActions([
        'playTrack',
        'pauseTrack',
        'resumeTrack',
        'updatePlayer',
        'setPartyId',
        'setSongs',
        'searchSongs',
      ]),
      clear() {
        this.searchQuery = '';
      },
      searchOrExit(query) {
        console.log(query)
        if (query === '' || query === null) {
          this.searchSongs({ searchQuery: '', partyId: this.partyId });
        } else {
          this.searchSongs({ searchQuery: query, partyId: this.partyId });
        }
      },
    },
  };
</script>
