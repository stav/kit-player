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
        {{ item.id }}
      </div>
      <input type="text" v-model="item.time" placeholder="Time" title="time" />
      <input type="text" v-model="item.text" placeholder="Text" title="text" />
      <textarea name="message" v-model="item.msg" placeholder="Message" title="Message" />
      <div>
        <label for="length">Length</label>
        <input id="length" type="text" v-model="item.length" title="length" disabled readonly class="disabled" />
      </div>
      <div>
        <label for="width">Width</label>
        <input id="width" type="text" v-model="item.width" title="width" disabled readonly class="disabled" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  #form-container {
    border-color: green;
  }
  .header {
    color: darkgrey;
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
  label {
    color: darkgrey;
    display: inline-block;
    margin-right: 5px;
    width: 20%;
  }
  input.disabled {
    color: darkgrey;
    border:  none;
    padding: 10px 0 0 10px;
    display: inline-block;
  }
</style>
