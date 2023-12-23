<template>
  <div class="d-flex tagable align-center">
    <div class="text-caption text-no-wrap" style="color:rgba(0,0,0,.6)" v-if="!tag.length">
      (No Privilege Label)
    </div>
    <TagableJoinList
      class="mr-2"
      :tags="dataPrivilegeLabel"
      :tag="tag"
      :lengthDisplay="lengthDisplay"
      keyId="pk"
      keyText="name"
      keyColor="color"
      :maxWidth="maxWidth"
    />
    <div class="wrap-add-icon">
      <AddIcon
        class="add-icon"
        ref="refAddIcon"
        @onClickIcon="onClickIcon"
        :colorIcon="valid ? 'red' : ''"
        :style="`${valid ? 'border-color:red' : ''}`"
        :icon="icon"
      />
    </div>
  </div>
</template>

<script>
import basePrivilegeLabelMixin from "./mixins/basePrivilegeLabelMixin";

import TagableJoinList from "../../../chips/TagableJoinList";
import AddIcon from "../../../buttons/AddIcon";

export default {
  mixins: [basePrivilegeLabelMixin],
  components: {
    TagableJoinList,
    AddIcon
  },
  props: {
    tag: Array,
    valid: Boolean,
    icon: String,
    textTooltip: {
      type: String,
      default: "Add new"
    },
    lengthDisplay: Number,
    maxWidth: String
  },
  methods: {
    onClickIcon() {
      const value = [];
      (this.tag || []).forEach(tagId => {
        const findTag = this.dataPrivilegeLabel.find(t => t.pk === tagId);
        if (findTag) {
          value.push(tagId);
        }
      });
      const data = {
        positionX: this.$refs.refAddIcon.$el.getBoundingClientRect().left,
        positionY: this.$refs.refAddIcon.$el.getBoundingClientRect().top,
        value
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
</style>
