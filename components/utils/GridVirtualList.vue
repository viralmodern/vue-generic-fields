<template>
  <div class="gird-virtual-list">
    <div class="gird-virtual-list--header">
      <v-text-field
        dense
        hide-details
        outlined
        :prefix="`Start at: `"
        type="number"
        @keydown.enter="(e) => (start = parseInt(e.target.value))"
      />
    </div>
    <table style="border-spacing: 0px; width: 100%">
      <thead>
        <tr>
          <td style="width: 100px"># No</td>
          <td style="width: 200px">Name</td>
          <td>Avatar</td>
        </tr>
      </thead>
      <tr>
        <td colspan="3">
          <virtual-list
            :size="size"
            :remain="remain"
            :start="start"
            :item="item"
            :itemcount="itemCount"
            :itemprops="getItemProps"
            wtag="table"
            wclass="gird-virtual-list--table"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list'
import itemComponent from './GridVirtualListItem'
import faker from 'faker'

const remain = 6
const itemSize = 50
const itemCount = 100000
export default {
  name: 'GridVirtualList',
  data() {
    return {
      item: itemComponent,
      size: itemSize,
      remain: remain,
      start: 5000,
      itemCount: itemCount
    }
  },
  methods: {
    getItemProps(itemIndex) {
      // <item/> will render with following data object:
      // https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
      return {
        key: itemIndex,
        props: {
          height: itemSize,
          index: itemIndex,
          info: {
            index: itemIndex,
            userID: itemIndex,
            avatar: faker.internet.avatar(),
            name: faker.name.findName()
          }
        }
        // props: itemProps,
        // attrs: itemAttrs,
        // ...
      }
    }
  },
  components: { 'virtual-list': virtualList }
}
</script>

<style scoped>
.gird-virtual-list {
  /*border: solid 1px red;*/
}

.gird-virtual-list >>> .gird-virtual-list--table {
  display: table !important;
  /*border: solid 1px blue;*/
  box-sizing: border-box !important;
  border-spacing: 0;
  width: 100%;
}
</style>
<style>
* {
  box-sizing: border-box !important;
  border-spacing: 0px !important;
}
</style>
