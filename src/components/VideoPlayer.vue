<script setup>
import { ref } from 'vue'
import videojs from 'video.js'
import Progress from './Progress.vue'
import '../assets/video-js.css'

defineProps({
  options: Object,
})

const id = ref(null)
const items = ref([])
const timeCurrent = ref(null)
const timeBuffered = ref(null)
const timeDuration = ref(null)
const timeRemaining = ref(null)

let player = null

function onPlayerPlay(event) {
}

function cue(id) {
  // Cue selected item for editing
  this.id = this.id === id ? null : id
  const item = this.items.find( i => i.id === id )
  this.timeCurrent = item.time
  this.player.currentTime(item.time)
}

function save(key) {
  // Write items to local storage
  window.localStorage.setItem(key, JSON.stringify(this.items))
}

function updateTime() {
  // Update time display
  if (this.player) {
    const player = this.player
    this.timeDuration = player.duration()
    this.timeCurrent = player.currentTime()
    this.timeRemaining = player.remainingTime()
    this.timeBuffered = parseInt(player.bufferedPercent() * 100)
    // const bufferedTimeRange = player.buffered()
    // if (bufferedTimeRange.length > 0) {
    //   this.timeBuffered = bufferedTimeRange.end(0) - bufferedTimeRange.start(0)
    // }
  }
}

function loadData() {
  // Pull items from local storage if we have them
  const items = window.localStorage.getItem('items')
  if (items) {
    this.items = JSON.parse(items)
  }
}

function setupInterval() {
  // Start an interval timer to perform tasks, e.g. auto-save; cleared on dispose
  const self = this
  function f() {
    self.updateTime()
    self.save('items')
  }
  this.player.setInterval(f, 500)
}

</script>

<script>
export default {
  computed: {
    itemsSortedByTime() {
      const items = [...this.items]
      items.sort((a, b) => a.time - b.time)
      return items
    },
    cuedItem() {
      return this.items.find(item => item.id === this.id)
    },
    cuedItemIndex() {
      return this.items.findIndex(item => item.id === this.id)
    },
  },
  methods: {
    onPlayerReady() {
      console.log('onPlayerReady', this.player.options())
      this.loadData()
      this.setupInterval()
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
   removeCuedItem() {
      this.items.splice(this.cuedItemIndex, 1)
      this.id = null
    },
    removeAllItems() {
      this.save('backup-items')
      this.items = new Array()
      this.id = null
    },
  },
  mounted() {
    function hotkeys(event) {
      console.log('hotkeys', event)
      // Full screen
      if (event.key === 'f') {
        const p = this.player()
        p.isFullscreen() ? p.exitFullscreen() : p.requestFullscreen()
      }
      // Mute
      if (event.key === 'm') {
        const p = this.player()
        p.muted(!p.muted())
      }
      // Play / pause
      if (event.key === ' ') {
        const p = this.player()
        console.log('space', p.paused())
        p.paused() ? p.play() : p.pause()
      }
    }
    if (this.options.userActions?.hotkeys === true) {
      this.options.userActions.hotkeys = hotkeys
    }
    console.log('mounted', this.options)
    this.player = videojs(this.$refs.videoPlayer, this.options, this.onPlayerReady)
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose() // Player will clear the interval timer
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
      />
      <Progress
        :timeCurrent="this.timeCurrent"
        :timeBuffered="this.timeBuffered"
        :timeDuration="this.timeDuration"
        :timeRemaining="this.timeRemaining"
      />
    </div>

    <div id="list-container" class="flecks">
      <ul class="list">
        <li v-for="item, i in itemsSortedByTime" :key="i">
          <button v-text="item" class="clickable" @click="() => cue(item.id)" />
        </li>
      </ul>
      <div class="kit-flex">
        <div class="kit-cell">
          <button class="clickable" @click="mark" title="Mark cue point now"><strong> + </strong></button>
        </div>
        <div class="kit-cell" align="right">
          <button class="clickable" @click="removeAllItems" title="Remove ALL cue marks!!"><strong> X </strong></button>
        </div>
      </div>
    </div>

    <div id="form-container" class="flecks">
      <div v-if="id !== null">
        {{ id }}
        <button class="clickable" @click="removeCuedItem" title="Remove this item"> X </button>
        time <input type="text" name="time" v-model="cuedItem.time" />
        text <input type="text" name="text" v-model="cuedItem.text" />
      </div>
    </div>

  </div>
</template>

<style scoped>
  #video-container {
    border-color: red;
    text-align: center;
  }
  #list-container {
    border-color: blue;
  }
  #list-container button {
    color: lightcyan;
    background-color: dodgerblue;
  }
  #form-container {
    border-color: green;
    color: azure;
  }
  #form-container button, #form-container input {
    color: lightyellow;
    background-color: darkgreen;
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
  .kit-flex {
    display: flex;
  }
  .kit-cell {
    width: 50%;
    display: table-cell;
  }
</style>
