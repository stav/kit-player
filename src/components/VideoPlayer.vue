<script setup>
import { ref } from 'vue'
import videojs from 'video.js'
import '../assets/video-js.css'

defineProps({
  options: Object,
})

const time = ref(null)
const items = ref([])
const duration = ref(null)

let player = null
let interval = null

function onPlayerPlay(event) {
  console.log('onPlayerReady', this)
  if (this.duration === null) {
    this.duration = this.player.duration()
  }
}
</script>

<script>
export default {
  computed: {
    itemsSortedByTime() {
      console.log('itemsSortedByTime', this)
      const items = [...this.items]
      items.sort((a, b) => a.time - b.time)
      return items
    },
  },
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
    mark() {
      const items = this.items
      const haveItems = !!items.length
      const id = haveItems ? Math.max(...items.map(i => i.id)) + 1 : 0
      this.items.push({
        id,
        time: this.player.currentTime(),
      })
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

    <div id="list-container" class="flecks">
      <ul class="list">
        <li v-for="item, i in itemsSortedByTime" :key="i">
          <button v-text="item" class="clickable" />
        </li>
      </ul>
      <button class="clickable" @click="mark"><strong> + </strong></button>
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
  .list {
    list-style-type: none;
    padding-inline-start: 0;
    text-align: left;
    margin-block-start: 0;
  }
  .clickable {
    cursor: pointer;
  }
</style>
