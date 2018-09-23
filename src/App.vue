<template>
  <v-app dark>
      <router-view></router-view>
  </v-app>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,900');
  html, body {
    margin: 0;
    height: 100%;
    font-family: "Titillium Web";
  }
  @mixin prefix($declarations) {
    @each $property, $value in $declarations {

      #{'-webkit-' + $property}: $value;
      #{'-moz-' + $property}: $value;
      #{'-ms-' + $property}: $value;

      #{$property}: $value;
    }
  }
</style>


<script>

</script>
