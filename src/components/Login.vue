<template>
  <div id="landing-page">
    <v-layout column align-center>
      <title>Jukebox</title>
      <div class="description">
        Jukebox takes the pressure off by allowing your guests to <br/>
        vote on what songs they want to hear next
      </div>
      <div class="buttons">
        <base-button :onClick="joinParty">JOIN PARTY</base-button>
        <base-button :onClick='isLoggedIn ? createParty : loginWithSpotify'>{{ isLoggedIn ? 'CREATE PARTY' : 'LOGIN WITH SPOTIFY' }}</base-button>
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
    }
    .buttons {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>

<script>
  import BaseButton from '@/components/BaseButton';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    components: {
      BaseButton,
    },
    data() {
      return {
        accessToken: '',
        error: '',
        url: '',
      };
    },
    computed: {
      ...mapGetters([
        'isLoggedIn',
      ]),
    },
    methods: {
      ...mapActions([
        'login',
      ]),
      joinParty() {
        console.log('Join Party');
      },
      createParty() {
        console.log('Create Party');
      },
      loginWithSpotify() {
        window.location.href = this.url;
      },
    },
    mounted() {
      const clientId = '61e4ecaea963457a9e33717688827852';
      const redirectUrl = 'http://localhost:8080/';
      const scope = 'user-read-private user-read-email';
      this.url = 'https://accounts.spotify.com/authorize?client_id=' + clientId + // eslint-disable-line
        '&redirect_uri=' + encodeURIComponent(redirectUrl) +
        '&scope=' + encodeURIComponent(scope) +
        '&response_type=token';
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
