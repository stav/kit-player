<script setup>
defineProps({
  items: Array,
  description: Boolean,
  removeAllItems: Function,
  mark: Function,
  cue: Function,
})
</script>

<template>
  <div id="list-container" class="flecks">
    <ul class="list">
      <li v-for="item, i in items" :key="i">
        <button v-text="description ? item.text ? item.text : item : item" class="clickable" @click="($event) => cue(item.id, $event)" />
      </li>
    </ul>
    <div class="kit-flex">
      <div class="kit-cell">
        <button class="clickable" @click="mark" title="Mark cue point now"><strong> + </strong></button>
      </div>
      <div class="kit-cell" align="center">
        <button class="clickable" @click="description = !description" title="Toggle display"><strong> o </strong></button>
      </div>
      <div class="kit-cell" align="right">
        <button class="clickable" @click="removeAllItems" title="Remove ALL cue marks!!"><strong> X </strong></button>
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
    width: 33%;
    display: table-cell;
  }
</style>
