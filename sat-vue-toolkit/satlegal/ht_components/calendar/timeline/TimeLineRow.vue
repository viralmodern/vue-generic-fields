<template>
  <div class="my-2">
    <div style="text-align: center" class="mb-1">
      <div>{{item.event.name}}</div>
      <div
        class="text-caption"
        :style="{color: item.event.color}"
      >{{item.time.from | formatTimeHHmm}}-{{item.time.to | formatTimeHHmm}},&nbsp;{{item.place.shortName}}</div>
    </div>
    <div :style="{background: item.event.color,height:'5px',position:'relative'}">
      <div :style="{background: item.event.color}" class="left"></div>
      <div :style="{background: item.event.color}" class="right"></div>
    </div>
  </div>
</template>

<script>
import { formatTimeHHmm } from "@/sat-vue-toolkit/satlegal/ht_plugins/filter"

export default {
  filters: {
    formatTimeHHmm
  },
  props: {
    item: Object
  }
};
</script>

<style scoped>
.left {
  height: 12px;
  position: absolute;
  width: 12px;
  top: -4px;
  left: -1px;
  border-radius: 50%;
}
.right {
  height: 12px;
  position: absolute;
  width: 12px;
  top: -4px;
  right: -1px;
  border-radius: 50%;
}
</style>
