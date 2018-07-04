<template>
    <router-view></router-view>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,900');
  html, body {
    margin: 0;
    height: 100%;
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
