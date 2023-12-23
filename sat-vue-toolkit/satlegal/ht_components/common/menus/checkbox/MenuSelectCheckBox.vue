<template>
  <BasicMenu
    :width="width"
    :title="title"
    :isShowMenu="isShowMenu"
    :positionX="positionX"
    :positionY="positionY"
    @closeMenu="$emit('closeMenu')"
    scrollable
    maxHeight="500px"
  >
    <template v-slot:content>
      <div class="px-2">
        <v-radio-group :value="![null,undefined].includes(itemComputed[keyValue]) ? itemComputed[keyValue] : 0" column>
          <v-radio
            class="custom-radio"
            v-for="(item, index) in dataList"
            :key="index"
            :color="item.color"
            :label="item[keyText]"
            :value="![null,undefined].includes(item[keyValue]) ? item[keyValue] : 0"
            @change="$emit('update', item)"
          ></v-radio>
        </v-radio-group>
      </div>
    </template>
  </BasicMenu>
</template>
<script>
import BasicMenu from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/BasicMenu.vue";

import findItemInListSelectBox from "./mixins/findItemInListSelectBox";

export default {
  mixins: [findItemInListSelectBox],
  components: {
    BasicMenu,
  },
  props: {
    width: String,
    isShowMenu: Boolean,
    positionX: [String, Number],
    positionY: [String, Number],

    title: String,
  },
};
</script>

<style scoped>
.custom-radio /deep/ .v-input--selection-controls__ripple {
  z-index: 1;
}
</style>
