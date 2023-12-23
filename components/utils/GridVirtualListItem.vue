<template>
  <tr class="gird-virtual-list--row">
    <td class="gird-virtual-list--cell" style="width: 100px;">
      <div :style="itemStyle" class="item--cell">
        {{ info.userID }}
      </div>
    </td>
    <td class="gird-virtual-list--cell" style="width: 200px;">
      <div :style="itemStyle" class="item--cell">
        {{ info.name }}
      </div>
    </td>
    <td class="gird-virtual-list--cell">
      <div :style="itemStyle" class="item--cell">
        {{ info.avatar }}
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'GridVirtualListItem',
  props: {
    height: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    variable: Boolean,
    info: {
      type: Object,
      default: () => ({
        name: '',
        time: '',
        avatar: '',
        color: ''
      })
    }
  },
  computed: {
    itemStyle() {
      return {
        height: `${this.height}px`,
        'line-height': `${this.height}px`
      }
    }
  }
}
</script>

<style scoped>
.gird-virtual-list--row {
}
.gird-virtual-list--cell {
}
.item--cell {
  border-bottom: solid 1px red;
  box-sizing: border-box;
}
</style>
