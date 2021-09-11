<script setup>
defineProps({
  id: Number,
  item: Object,
  remove: Function,
})
</script>

<template>
  <div id="form-container" class="flecks">
    <div v-if="id !== null">
      {{ id }}
      <button class="clickable" @click="remove" title="Remove this item"> X </button>
      time <input type="text" name="time" v-model="item.time" />
      text <input type="text" name="text" v-model="item.text" />
    </div>
  </div>
</template>

<style scoped>
  #form-container {
    border-color: green;
    color: azure;
  }
  #form-container button, #form-container input {
    color: lightyellow;
    background-color: darkgreen;
  }
</style>
