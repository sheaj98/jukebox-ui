<template>
  <div id="queue">
    <v-list two-line>
      <v-list-tile
        v-for="item in listData"
        :key="item.title"
        @click=""
      >
        <v-list-tile-avatar>
          <img :src="item.imageUrl">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.artist }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple @click='addSong(item)'>
            <v-icon color="accent">queue_music</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
</template>

<style lang="scss">
  #queue {
    background-color: #353E47;
    flex-grow: 1;
    overflow: auto;
    min-height: 500px;
  }
</style>

<script>
  import { mapGetters } from 'vuex';
  import api from '../util/api';

  export default {
    props: {
      listData: Array,
    },
    computed: {
      ...mapGetters([
        'partyId',
      ]),
    },
    methods: {
      addSong(song) {
        console.log(song)
        api.post(`party/update/${this.partyId}`, song)
          .then((response) => {
            console.log('Song added');
          });
      },
    },
  };
</script>
