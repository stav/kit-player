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
    value() {
      return parseFloat(this.timeCurrent || 0)
    },
    max() {
      return parseFloat(this.timeDuration || 0)
    },
  },
}
</script>

<template>
  <div class="kit-progress" @click="toggleSources">
    <div>
      <progress :value="value" :max="max" />
    </div>
    <div>
      ({{ timePercent }}%)
      {{ parseInt(timeCurrent) }}
      /
      {{ parseInt(timeDuration) }}
      /
      -{{ parseInt(timeRemaining) }}
      ({{ timeBuffered }}%)
    </div>
  </div>
</template>

<style scoped>
  .kit-progress {
    color: azure;
    text-align: center;
  }
  progress {
    display: block;
    font-size: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    color: red;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  progress::-moz-progress-bar { background: red; }
  progress::-webkit-progress-value { background: red; }
</style>
