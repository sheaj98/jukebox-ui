<template>
  <div id="party-view">
    <v-toolbar dark color="#45A29E">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Your Party Name</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      absolute
      color="transparent"
    >
      <v-btn
        color="teal"
        flat
        value="recent"
      >
        <v-icon>skip_previous</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="favorites"
      >
        <v-icon>play_circle_outline</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="nearby"
      >
        <v-icon>skip_next</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<style lang="scss">
  #party-view {
    background-color: #1f2833;
    height: 100%;
  }
</style>
