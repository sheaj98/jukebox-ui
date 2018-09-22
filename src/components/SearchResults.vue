<template>
  <div id="queue">
    <v-list two-line>
      <template v-for="item in listData">
      <v-list-tile>
        <v-list-tile-avatar>
          <img :src="item.imageUrl">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.artist }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action v-if="item === listData[0] && isCreator">
          <v-btn icon ripple @click='playNextTrack'>
            <v-icon color="accent">skip_next</v-icon>
          </v-btn>
          <v-btn icon ripple @click='nowPlaying ? resumeTrack : playTrack(item)' v-show="!isPlaying">
            <v-icon color="accent">play_circle_fill</v-icon>
          </v-btn>
          <v-btn icon ripple @click='pauseTrack' v-show="isPlaying">
            <v-icon color="accent">pause_circle_filled</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider v-if="listData.indexOf(item) + 1 < listData.length"></v-divider>
      </template>
    </v-list>
  </div>
</template>

<style lang="scss">
  #queue {
    background-color: #353E47;
    flex-grow: 1;
    overflow: auto;
    min-height: 500px;
    .list__tile__action--stack {
      flex-direction: row;
      align-content: center;
      align-items: center;
    }
  }
</style>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import api from '../util/api';

  export default {
    props: {
      listData: Array,
    },
    computed: {
      ...mapGetters([
        'partyId',
        'isPlaying',
        'nowPlaying',
        'isCreator',
      ]),
    },
    methods: {
      ...mapActions([
        'playTrack',
        'nextTrack',
        'pauseTrack',
        'resumeTrack',
        'playNextTrack',
      ]),
    },
  };
</script>
