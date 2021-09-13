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
      <div class="header">
        <button class="clickable" @click="remove" :title="`Remove this item with id ${id}`"> X </button>
      </div>
      <input type="text" name="time" v-model="item.time" placeholder="Time" title="time" />
      <input type="text" name="text" v-model="item.text" placeholder="Text" title="text" />
      <textarea name="message" v-model="item.msg" placeholder="Message" title="Message" />
    </div>
  </div>
</template>

<style scoped>
  #form-container {
    border-color: green;
  }
  .header {
    color: azure;
    margin-bottom: 1rem;
  }
  button {
    background-color: darkgreen;
  }
  input, textarea {
    display: block;
    padding: 15px;
    background: transparent;
    outline: none;
    color: azure;
    border: solid 1px #b3aca7;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
  }
  input {
    border-bottom: none;
  }
  input:hover, textarea:hover {
    background: #555;
  }
  textarea {
  }
</style>
