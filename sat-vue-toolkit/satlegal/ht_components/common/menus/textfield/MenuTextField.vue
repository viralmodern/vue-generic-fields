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
      <TextFieldInline
        :typeInput="typeInput"
        class="pa-1"
        ref="textFieldInline"
        :value="value"
        :placeholder="placeholder"
        :borderUnset="false"
        @onChange="$emit('update', $event)"
      />
    </template>
  </BasicMenu>
</template>

<script>
import TextFieldInline from "../../../inputs/TextFieldInline";
import BasicMenu from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/BasicMenu.vue";

export default {
  components: {
    TextFieldInline,
    BasicMenu
  },
  props: {
    typeInput: String,
    placeholder: String,
    value: [String, Number],
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
          this.$refs.textFieldInline.focusInput();
        })
      }
    }
  },
};
</script>
