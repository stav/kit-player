<script setup>
import { ref } from 'vue'
import YAML from 'yaml'

defineProps({
  items: Array,
  loadItems: Function,
})

const inputData = ref('')
const showInputData = ref(false)
const showOutputData = ref(false)
</script>

<script>
export default {
  computed: {
    outputItems() {
      return this.items.map(item => ({
        time: item.time,
        text: item.text,
        msg: item.msg,
       }))
    },
    outputData() {
      return YAML.stringify(this.outputItems, { indent: 2, lineWidth: 0 })
    },
  },
  methods: {
    input() {
      this.showInputData = !this.showInputData
      this.showOutputData = false
    },
    output() {
      this.showInputData = false
      this.showOutputData = !this.showOutputData
    },
    getInputJson() {
      // First check if the text is valid JSON
      try {
        JSON.parse(this.inputData)
        return this.inputData
      }
      // If not JSON check if it's YAML
      catch {}
      try {
        const input = YAML.parse(this.inputData)
        return JSON.stringify(input)
      }
      catch {}
    },
    load() {
      window.localStorage.setItem('items', this.getInputJson())
      this.loadItems()
    },
  }
}
</script>

<template>
  <div id="data-container" class="flecks">
    <form @submit.prevent="load" v-show="showInputData">
      <textarea v-model="inputData" placeholder="Input data" title="Input data" />
      <button>Load</button>
    </form>
    <textarea v-model="outputData" placeholder="Output data" title="Output data" readonly v-show="showOutputData" />
  </div>
</template>

<style scoped>
  #data-container {
    border-color: yellow;
  }
  .data {
    color: azure;
  }
  button {
    vertical-align: top;
    margin-left: 0.5rem;
  }
  textarea {
    margin: 0;
    width: 200px;
    height: 200px;
  }
</style>
