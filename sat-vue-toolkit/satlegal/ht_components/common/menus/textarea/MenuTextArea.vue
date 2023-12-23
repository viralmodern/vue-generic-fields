<template>
  <BasicMenu
    :width="width"
    :title="title"
    :isShowMenu="isShowMenu"
    :positionX="positionX"
    :positionY="positionY"
    @closeMenu="$emit('closeMenu')"
  >
    <template v-slot:content>
      <TextAreaInline
        class="pa-1"
        ref="textAreaInline"
        :value="value"
        :placeholder="placeholder"
        :rows="4"
        :borderUnset="false"
        @onChange="$emit('update', $event)"
      />
    </template>
  </BasicMenu>
</template>

<script>
import TextAreaInline from "@/sat-vue-toolkit/satlegal/ht_components/inputs/TextAreaInline.vue";
import BasicMenu from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/BasicMenu.vue";

export default {
  components: {
    TextAreaInline,
    BasicMenu
  },
  props: {
    placeholder: String,
    value: String,
    title: String,
    width: String,
    isShowMenu: Boolean,
    positionX: [String, Number],
    positionY: [String, Number],
  },
  watch: {
    isShowMenu(isOpen) {
      if(isOpen) {
        this.$nextTick(() => {
          this.$refs.textAreaInline.focusInput();
        })
      }
    }
  },
};
</script>
