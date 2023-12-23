<template>
  <Tagable
    :tags="dataTags.slice(0, countShow)"
    :keyId="keyId"
    :keyColor="keyColor"
    :keyText="keyText"
    :isShowCountMore="dataTags.length > lengthDisplay"
    :totalCountMore="dataTags.length - lengthDisplay"
    :maxWidth="maxWidth"
  />
</template>
<script>
import Tagable from "./Tagable";

export default {
  components: {
    Tagable
  },
  props: {
    tags: Array,
    tag: Array,
    keyText: String,
    keyId: {
      type: String,
      default: "pk"
    },
    keyColor: String,
    lengthDisplay: {
      type: Number,
      default: 4
    },
    maxWidth: String
  },
  computed: {
    dataTags() {
      const result = [];
      (this.tag || []).forEach(tagId => {
        const findTag = this.tags.find(t => t[this.keyId] === tagId);
        if (findTag) {
          result.push(findTag);
        }
      });
      return result;
    },
    countShow() {
      return this.lengthDisplay ? this.lengthDisplay : this.dataTags.length;
    }
  }
};
</script>
