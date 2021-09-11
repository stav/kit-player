<script setup>
defineProps({
  timeCurrent: Number,
  timeBuffered: Number,
  timeDuration: Number,
  timeRemaining: Number,
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
  <div class="kit-progress">
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
  }
</style>
