<template>
  <div class="d-flex tagable align-center">
    <div class="text-caption" style="color:rgba(0,0,0,.6)" v-if="!tag.length">
      {{notSource}}
    </div>
    <TagableJoinList
      class="mr-2"
      :tags="dataSource"
      :tag="tag"
      :lengthDisplay="lengthDisplay"
      keyId="pk"
      keyText="name"
      keyColor="color"
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
import { mapGetters } from "vuex";
import TagableJoinList from "../../../chips/TagableJoinList";
import AddIcon from "../../../buttons/AddIcon";

export default {
  components: {
    TagableJoinList,
    AddIcon
  },
  props: {
    tag: Array,
    notSource: String,
    valid: Boolean,
    icon: String,
    textTooltip: {
      type: String,
      default: "Add new"
    },
    lengthDisplay: Number
  },
  computed: {
    ...mapGetters("ht_store/matter/source", ["dataSource"])
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
</style>
