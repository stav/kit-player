<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import VideoPlayer from './components/VideoPlayer.vue'

const playerOptions = {
  width: 256,
  height: 144,
  controls: true,
  autoplay: false,
  sources: [{
    type: 'video/mp4',
    src: 'http://localhost:3000/ViLC8JUvKxI.mp4',
  }],
}
</script>

<template>
  <VideoPlayer :options="playerOptions" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
