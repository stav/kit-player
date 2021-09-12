<script setup>
import Progress from './Progress.vue'

defineProps({
  timeCurrent: Number | String,
  timeBuffered: Number | String,
  timeDuration: Number | String,
  timeRemaining: Number | String,
})
</script>

<template>
  <div id="video-container" class="flecks">
    <video
      id="videoPlayer"
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
</template>

<style scoped>
  #video-container {
    border-color: red;
    text-align: center;
  }
</style>
