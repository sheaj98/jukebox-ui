<template>
  <button class="BaseButton" @click="onClick">
    <slot class="button-label">Click Me</slot>
  </button>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,900');

  .BaseButton {
    border-color: #66fcf1;
    border-width: 2px;
    border-radius: 8px;
    border-style: solid;
    margin-bottom: 15px;
    letter-spacing: 3px;
    font-size: 18px;
    color: #c5c6c7;
    text-align: center;
    width: 200px;
    height: 60px;
    font-family: 'Titillium Web', sans-serif;
    &:hover,
    &:focus,
    &:active {
      transition-duration: 0.3s;
      background-color: #1F2833;
      color: white;
    }
  }
</style>

<script>
  export default {
    props: {
      onClick: {
        type: Function,
        required: true,
      },
    },
  };
</script>
