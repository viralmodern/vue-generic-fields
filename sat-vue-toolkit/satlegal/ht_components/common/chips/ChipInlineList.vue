<template>
  <div class="d-flex w-100 tagable align-center">
    <div class="text-caption text-width" style="color:rgba(0,0,0,.6)" v-if="!value.length">
      {{textNoData}}
    </div>
    <Tagable
      class="mr-2"
      :colorTextChip="colorTextChip"
      :colorTextChipMore="colorTextChipMore"
      :tags="value.slice(0, countShow)"
      :isShowCountMore="value.length > lengthDisplay"
      :totalCountMore="value.length - lengthDisplay"
      :colorChipDefault="colorChipDefault"
      :keyId="keyId"
      :keyText="keyText"
      :maxWidth="maxWidth"
    >
      <div class="wrap-add-icon ml-1" slot="add-button">
        <AddIcon
          class="add-icon"
          ref="refAddIcon"
          @onClickIcon="onClickIcon"
          :colorIcon="valid ? 'red' : ''"
          :style="`${valid ? 'border-color:red' : ''}`"
          :icon="icon"
        />
      </div>
    </Tagable>
  </div>
</template>

<script>
import Tagable from "./Tagable";
import AddIcon from "../buttons/AddIcon";

export default {
  components: {
    Tagable,
    AddIcon
  },
  props: {
    value: Array,
    valid: Boolean,
    icon: String,
    textTooltip: {
      type: String,
      default: "Add new"
    },
    lengthDisplay: Number,
    textNoData: String,
    colorChipDefault: String,
    keyId: String,
    keyText: String,
    colorTextChip: String,
    colorTextChipMore: String,
    colorChipDefaultMore: String,
    maxWidth: String
  },
  computed: {
    countShow() {
      return this.lengthDisplay ? this.lengthDisplay : this.value.length;
    },
  },
  methods: {
    onClickIcon() {
      const data = {
        positionX: this.$refs.refAddIcon.$el.getBoundingClientRect().left,
        positionY: this.$refs.refAddIcon.$el.getBoundingClientRect().top
      };
      this.$emit("onClickIcon", data);
    }
  }
};
</script>

<style scoped>
.tagable:hover .wrap-add-icon {
  visibility: visible;
}
.wrap-add-icon {
  width: 28px;
  height: 28px;
  visibility: hidden;
}

.tagable:hover .add-icon {
  display: block;
}
.add-icon {
  display: none;
}
.tagable{
  max-width: 400px;
}
.text-width{
  min-width: 70px;
  max-width: 300px;
}
</style>
