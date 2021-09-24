<script setup>
defineProps({
  items: Array,
  description: Boolean,
  removeAllItems: Function,
  loadBackupItems: Function,
  mark: Function,
  cue: Function,
  id: Number,
})
</script>

<script>
export default {
  methods: {
    xClicked(event) {
      if (event.ctrlKey) {
        this.loadBackupItems()
      } else {
        this.removeAllItems()
      }
    },
    input() {
      this.$parent.$refs.dataComponent.input()
    },
    output() {
      this.$parent.$refs.dataComponent.output()
    },
  }
}
</script>

<template>
  <div id="list-container" class="flecks">
    <ul class="list">
      <li v-for="item, i in items" :key="i">
        <button
          @click="($event) => cue(item.id, $event)"
          v-text="description ? item.text ? item.text : item : item"
          :class="{ clickable: true, active: item.id == id }"
        />
      </li>
    </ul>
    <div class="kit-flex">
      <div class="kit-cell">
        <button class="clickable" @click="mark" title="Mark cue point now"><strong> + </strong></button>
      </div>
      <div class="kit-cell" align="center">
        <button class="clickable" @click="input" title="Import items as text"><strong> &lt; </strong></button>
        <button class="clickable" @click="output" title="Export items as text"><strong> &gt; </strong></button>
      </div>
      <div class="kit-cell" align="center">
        <button class="clickable" @click="description = !description" title="Toggle display"><strong> o </strong></button>
      </div>
      <div class="kit-cell" align="right">
        <button class="clickable" @click="xClicked" title="Remove ALL cue marks!!"><strong> X </strong></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #list-container {
    border-color: blue;
  }
  #list-container button {
    color: lightcyan;
    background-color: dodgerblue;
  }
  #list-container button.active {
    color: #222;
    font-weight: bold;
    background-color: skyblue;
  }
  .list {
    list-style-type: none;
    padding-inline-start: 0;
    text-align: left;
    margin-block-start: 0;
  }
  .kit-flex {
    display: flex;
  }
  .kit-cell {
    width: 25%;
    display: table-cell;
  }
</style>
