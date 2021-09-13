<script setup>
defineProps({
  timeCurrent: Number | String,
  timeBuffered: Number | String,
  timeDuration: Number | String,
  timeRemaining: Number | String,
  toggleSources: Function,
})
</script>

<script>
export default {
  computed: {
    timePercent() {
      return parseInt(parseFloat(this.timeCurrent) / parseFloat(this.timeDuration) * 100)
    },
  },
}
</script>

<template>
  <div class="kit-progress" @click="toggleSources">
    ({{ timePercent }}%)
    {{ parseInt(timeCurrent) }}
    /
    {{ parseInt(timeDuration) }}
    /
    -{{ parseInt(timeRemaining) }}
    ({{ timeBuffered }}%)
  </div>
</template>

<style scoped>
  .kit-progress {
    color: azure;
    text-align: center;
  }
</style>
