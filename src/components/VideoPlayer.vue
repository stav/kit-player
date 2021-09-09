<script setup>
import videojs from 'video.js'
import '../assets/video-js.css'

defineProps({
  options: Object,
})

const player = null

function onPlayerReady() {
  console.log('onPlayerReady', this);
}
</script>

<script>
export default {
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, this.onPlayerReady)
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  },
}
</script>

<template>
  <div>
    <video ref="videoPlayer" class="video-js" />
  </div>
</template>
