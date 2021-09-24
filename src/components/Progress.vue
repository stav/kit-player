<script setup>
defineProps({
  cue: Function,
  items: Array,
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
    adjustedItems() {
      const items = [...this.items]
      for (let i = items.length - 1; i >= 0; i--) {
        const start = parseFloat(items[i].time)
        const end = parseFloat(items[i + 1]?.time) || parseFloat(this.timeDuration)
        const length = end - start
        const percent = length / parseFloat(this.timeDuration) * 100
        items[i].length = length
        items[i].width = `${percent}%`
      }
      return items
    },
    timePercent() {
      return parseInt(parseFloat(this.timeCurrent) / parseFloat(this.timeDuration) * 100)
    },
    firstItemStartPosition() {
      return this.firstItemStartRatio * this.totalWidth
    },
    firstItemStartRatio() {
      const time = parseFloat(this.adjustedItems.length ? this.adjustedItems[0].time : 0)
      const duration = parseFloat(this.timeDuration)
      return time / duration
    },
    totalWidth() {
      return this.$refs.progressBar
        ? this.$refs.progressBar.getBoundingClientRect().width
        : 300 // hardcode to width set in options
    },
    value() {
      return parseFloat(this.timeCurrent || 0)
    },
    max() {
      return parseFloat(this.timeDuration || 0)
    },
    stripesStyle() {
      return {
        position: 'relative',
        width: `${this.totalWidth - this.firstItemStartPosition}px`,
        left: `${this.firstItemStartPosition}px`,
      }
    },
  }
}
</script>

<template>
  <div class="kit-progress">
    <div>
      <progress :value="value" :max="max" ref="progressBar" />
    </div>
    <div class="stripes" :style="stripesStyle">
      <div
        v-for="item in items" :key="item.id"
        v-text="item.id + 1"
        @click="($event) => cue(item.id, $event)"
        :style="{ width: item.width }"
        class="stripe clickable"
      ></div>
    </div>
    <div class="clickable" @click="toggleSources">
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
  .clickable {
    cursor: pointer;
  }
  .kit-progress {
    color: azure;
    text-align: center;
  }
  .stripes {
    display: flex;
  }
  .stripe:first-child {
    border-left-width: 1.2px !important;
  }
  .stripe {
    border-style: dotted;
    border-left-width: 0;
    border-right-width: 1.2px;
  }
  .stripe:hover {
    background-color: red;
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
