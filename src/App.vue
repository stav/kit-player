<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import VideoPlayer from '~c/VideoPlayer.vue'

const playerOptions = {
  width: 300,
  height: 144,
  controls: true,
  autoplay: false,
  sources: [{
    type: 'video/youtube',
    src: 'https://www.youtube.com/watch?v=ViLC8JUvKxI',
  }],
  userActions: {
    hotkeys: true,
    doubleClick: false,
  },
  controlBar: {
    fullscreenToggle: true,
  },
}
</script>

<template>
  <VideoPlayer :options="playerOptions" />
</template>

<style>
body {
  background-color: #222;
}
#app {
  background-color: #333;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
