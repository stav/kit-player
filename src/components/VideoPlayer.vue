<script setup>
import { ref } from 'vue'
import videojs from 'video.js'
import Form from './Form.vue'
import List from './List.vue'
import Video from './Video.vue'

import {hotkeys as playerHotkeys} from '~/player'
import '../assets/video-js.css'

defineProps({
  options: Object,
})

const id = ref(null)
const items = ref([])
const description = ref(true)
const timeCurrent = ref(null)
const timeBuffered = ref(null)
const timeDuration = ref(null)
const timeRemaining = ref(null)

let player = null

function onPlayerPlay(event) {
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
    setupPlayer() {
      if (this.options.userActions?.hotkeys === true) {
        this.options.userActions.hotkeys = (event) => playerHotkeys(event, this.player)
      }
      const videoPlayer = window.document.getElementById('videoPlayer')
      this.player = videojs(videoPlayer, this.options, this.onPlayerReady)
    },
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
    cue(id, event) {
      // Cue selected item for editing
      this.id = this.id === id ? null : id
      // Don't cue video if control key was used
      if (!event.ctrlKey) {
        const item = this.items.find( i => i.id === id )
        this.timeCurrent = item.time
        this.player.currentTime(item.time)
      }
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
    console.log('mounted', this)
    this.setupPlayer()
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
    <Video
      :timeCurrent="this.timeCurrent"
      :timeBuffered="this.timeBuffered"
      :timeDuration="this.timeDuration"
      :timeRemaining="this.timeRemaining"
    />
    <List
      :items="this.itemsSortedByTime"
      :description="this.description"
      :removeAllItems="this.removeAllItems"
      :mark="this.mark"
      :cue="this.cue"
    />
    <Form
      :id="this.id"
      :item="this.cuedItem"
      :remove="this.removeCuedItem"
    />
  </div>
</template>

<style scoped>
  .flecks {
    display: inline-block;
    border-width: thick;
    border-style: dashed;
    vertical-align: top;
    padding: 10px;
    margin:  10px;
  }
  .clickable {
    cursor: pointer;
  }
</style>
