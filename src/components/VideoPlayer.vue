<script setup>
import { ref } from 'vue'
import videojs from 'video.js'
import '../assets/video-js.css'

defineProps({
  options: Object,
})

const time = ref(null)
const duration = ref(null)

let player = null
let interval = null

function onPlayerPlay(event) {
  if (this.duration === null) {
    this.duration = this.player.duration()
  }
}
</script>

<script>
export default {
  methods: {
    onPlayerReady() {
      console.log('onPlayerReady', this)
      const self = this

      function interval() {
        if (self.player) {
          self.time = parseInt(self.player.currentTime())
        }
      }
      this.interval = window.setInterval(interval, 500)
    },
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, this.onPlayerReady)
  },
  beforeUnmount() {
    window.clearInterval(this.interval)
    if (this.player) {
      this.player.dispose()
    }
  },
}
</script>

<template>
  <div>

    <div id="video-container" class="flecks">
      <video
        ref="videoPlayer"
        class="video-js"
        :playsinline="true"
        @play="onPlayerPlay($event)"
      />
      <div>{{ time }} / {{ parseInt(duration) }}</div>
    </div>

  </div>
</template>

<style scoped>
  #video-container {
    border-color: red;
  }
  .flecks {
    display: inline-block;
    border-width: thick;
    border-style: dashed;
    vertical-align: top;
    padding: 10px;
    margin:  10px;
  }
</style>
