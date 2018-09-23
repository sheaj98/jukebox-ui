<template>
  <div id="landing-page">
    <v-layout column align-center>
      <title>Jukebox</title>
      <div class="description">
        Jukebox takes the pressure off by allowing your guests to <br/>
        vote on what songs they want to hear next
      </div>
      <div class="flip-container" v-bind:class='{ flip: isFlipped }'>
        <div class="flipper">
          <div class="front">
            <div class="buttons">
              <base-button :onClick="flipButtons">JOIN PARTY</base-button>
              <base-button :onClick='isLoggedIn ? createParty : loginWithSpotify'>{{ isLoggedIn ? 'CREATE PARTY' : 'LOGIN WITH SPOTIFY' }}</base-button>
            </div>
          </div>
          <div class="back">
            <div class="buttons">
              <v-text-field
                v-model="partyId"
                prepend-icon="keyboard_arrow_left"
                clear-icon="mdi-close-circle"
                clearable
                :prepend-icon-cb="flipButtons"
                color="white"
                label="Party ID"
              ></v-text-field>
              <base-button :onClick="joinParty">JOIN PARTY</base-button>
            </div>
          </div>
        </div>
      </div>
    </v-layout>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #landing-page {
    height: 100%;
    background: url("../assets/landing-background.png") no-repeat center;
    background-size:  cover;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: 'Titillium Web-Black', sans-serif;
    title {
      display: block;
      font-size: 120px;
      font-weight: bolder;
      text-align: center;
      color: #66fcf1;
    }
    .description {
      text-align: center;
      font-size: 20px;
      color: #c5c6c7;
      margin-top: 62px;
      margin-bottom: 62px;
    }/* entire container, keeps perspective */
    .flip-container {
      perspective: 1000px;
    }
    /* flip the pane when hovered */
    .flip-container.flip .flipper {
      transform: rotateY(180deg);
    }

    .flip-container, .front, .back {
      width: 320px;
      height: 150px;
    }

    /* flip speed goes here */
    .flipper {
      transition: 0.6s;
      transform-style: preserve-3d;

      position: relative;
    }

    /* hide back of pane during swap */
    .front, .back {
      backface-visibility: hidden;

      position: absolute;
      top: 0;
      left: 0;
    }

    /* front pane, placed above back */
    .front {
      z-index: 2;
      /* for firefox 31 */
      transform: rotateY(0deg);
      .buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        .input {
          font-size: 28px;
        }
      }
    }

    /* back, initially hidden pane */
    .back {
      transform: rotateY(180deg);
      .buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        .input {
          font-size: 28px;
        }
      }
    }

  }
</style>

<script>
  import BaseButton from '@/components/BaseButton';
  import { mapGetters, mapActions } from 'vuex';
  import config from '@/util/config';
  import api from '../util/api';

  export default {
    components: {
      BaseButton,
    },
    data() {
      return {
        accessToken: '',
        error: '',
        url: '',
        isFlipped: false,
        partyId: '',
      };
    },
    computed: {
      ...mapGetters([
        'isLoggedIn',
        'getSpotifyToken',
      ]),
    },
    methods: {
      ...mapActions([
        'login',
        'createPlayer',
      ]),
      flipButtons() {
        this.isFlipped = !this.isFlipped;
      },
      joinParty(partyId) {
        this.$router.push(`party/${partyId}`);
      },
      createParty() {
        api.post('party/create').then((res) => {
          console.log(res.data)
          this.$router.push(`party/${res.data.id}`);
        });
        this.createPlayer(this.getSpotifyToken);
      },
      loginWithSpotify() {
        window.location.href = config.url;
      },
    },
    mounted() {
      const parsedParams = {};
      this.$route.hash.split('&')
        .map(part => part.replace(/#/, ''))
          .forEach((param) => {
            const parts = param.split('=');
            parsedParams[parts[0]] = parts[1];
          });
      this.accessToken = parsedParams.access_token;
      if (this.accessToken) {
        this.login(this.accessToken);
      }
    },
  };
</script>
