<template>
  <div>
    <v-btn @click="addRow">Add New Row</v-btn>
    <virtual-list
      style="height: 80vh; overflow-y: auto"
      :data-key="'pk'"
      :data-sources="items"
      :data-component="itemComponent"
    />
  </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
import UiScrollListRow from './UiScrollListRow'
import { v4 as uuid } from 'uuid'
export default {
  name: 'UiScrollList',
  data() {
    return {
      itemComponent: UiScrollListRow,
      items: [],
    }
  },
  components: { 'virtual-list': VirtualList },
  mounted() {
    this.initScroll()
    this.$on('checkBoxValueChange', this.checkBoxValueChange)
  },
  methods: {
    async initScroll() {
      let results = await this.fetchMessages()
      if (results) {
        console.error('RESULT', results)
        this.items = [...results]
      }
    },
    addRow() {
      let r = [...this.items]
      let t = { ...r[0], pk: uuid() }
      r.push(t)
      this.items = [...r]
    },
    async fetchMessages() {
      try {
        let url = 'http://two.legal/api/courts'
        let a = await fetch(url)
        let b = await a.json()
        // let groups = Object.keys(b)
        let results = [...b]
        // groups.forEach((group) => (results = [...results, ...b[group]['results']]))
        return Promise.resolve([...results])
      } catch (e) {
        return Promise.resolve(false)
      }
    },
    checkBoxValueChange(pk, value) {
      const targetItem = this.items.find((item) => item.pk === pk)
      if (targetItem) {
        targetItem['checked'] = value
      }
    },
  },
}
</script>

<style scoped></style>
