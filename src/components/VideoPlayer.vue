<script setup>
import { ref } from 'vue'
import videojs from 'video.js'
import '../assets/video-js.css'

defineProps({
  options: Object,
})

const id = ref(null)
const time = ref(null)
const items = ref([])
const duration = ref(null)

let player = null
let interval = null

function onPlayerPlay(event) {
  // Video duration metadata is not set until first played
  if (this.duration === null) {
    this.duration = this.player.duration()
  }
}

function cue(id) {
  // Cue selected item for editing
  this.id = this.id === id ? null : id
  const item = this.items.find( i => i.id === id )
  this.time = parseInt(item.time)
  this.player.currentTime(item.time)
}

function autoSave() {
  // Write items to local storage
  window.localStorage.setItem('items', JSON.stringify(this.items))
}

function updateTime() {
  // Update time display
  if (this.player) {
    this.time = parseInt(this.player.currentTime())
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
  // Start a clock loop to perform tasks, e.g. auto-save
  const self = this
  function f() {
    self.updateTime()
    self.autoSave()
  }
  this.interval = window.setInterval(f, 500)
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
      console.log('onPlayerReady', this)
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
    }
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
          <button v-text="item" class="clickable" @click="() => cue(item.id)" />
        </li>
      </ul>
      <button class="clickable" @click="mark"><strong> + </strong></button>
    </div>

    <div id="form-container" class="flecks">
      <div v-if="id !== null">
        {{ id }}
        <button class="clickable" @click="removeCuedItem" title="Remove this item"> X </button>
        {{ cuedItem }}
        time <input type="text" name="time" v-model="cuedItem.time" />
        text <input type="text" name="text" v-model="cuedItem.text" />
      </div>
    </div>

  </div>
</template>

<style scoped>
  #video-container {
    border-color: red;
  }
  #list-container {
    border-color: blue;
  }
  #form-container {
    border-color: green;
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
