<script setup>
import { ref, toRefs } from 'vue'
import Progress from './Progress.vue'

const props = defineProps({
  cue: Function,
  items: Array,
  sources: Array,
  currentSrc: String,
  timeCurrent: Number | String,
  timeBuffered: Number | String,
  timeDuration: Number | String,
  timeRemaining: Number | String,
})
const showSources = ref(false)
const { sources } = toRefs(props)
</script>

<script>
export default {
  methods: {
    toggleSources() {
      this.showSources = !this.showSources
    },
  }
}
</script>

<template>
  <div id="video-container" class="flecks">
    <video
      id="videoPlayer"
      class="video-js"
    />
    <Progress
      :items="this.items"
      :timeCurrent="this.timeCurrent"
      :timeBuffered="this.timeBuffered"
      :timeDuration="this.timeDuration"
      :timeRemaining="this.timeRemaining"
      :toggleSources="this.toggleSources"
      :cue="this.cue"
    />
    <ul v-if="showSources">
      <li
        v-for="source in sources" :key="source.src"
        :class="{ active: source.src === currentSrc }"
      >
        <a :href="source.src" target="_blank" title="Open video in new window">{{ source }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  #video-container {
    color: azure;
    text-align: left;
    border-color: red;
  }
  .active {
    font-weight: bold;
  }
  a {
    color: azure;
    text-decoration: none;
  }
</style>
