<template>
  <div class="d-flex w-100 flex-wrap align-center" no-gutters>
    <LabelColor
      v-for="item in tags"
      :key="item[keyId]"
      :color="item[keyColor] || colorChipDefault"
      :text="item[keyText]"
      :colorTextChip="colorTextChip"
      :maxWidth="maxWidth"
    />
    <v-chip
      v-if="isShowCountMore"
      label
      small
      :class="
        `${colorTextChipMore ? colorTextChipMore : 'white--text'} ${
          colorChipDefaultMore ? colorChipDefaultMore : 'primary'
        }`
      "
    >
      <span>+ {{ totalCountMore }}</span>
    </v-chip>
    <slot name="add-button"></slot>
  </div>
</template>
<script>
import LabelColor from "./LabelColor";

export default {
  components: {
    LabelColor
  },
  props: {
    tags: Array,
    keyText: String,
    keyId: {
      type: String,
      default: "pk"
    },
    keyColor: String,
    isShowCountMore: Boolean,
    totalCountMore: Number,
    colorChipDefault: String,
    colorTextChip: String,
    colorTextChipMore: String,
    colorChipDefaultMore: String,
    maxWidth: String,
  }
};
</script>
