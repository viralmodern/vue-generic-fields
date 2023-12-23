<template>
  <ListSource
    :labels="dataTags"
    :listLabels="tags"
    :keyText="keyText"
    :title="title"
    :nameAdd="nameAdd"
    :lengthDisplay="lengthDisplay"
    @addLabel="addTag"
    @updateLabel="$emit('update', $event)"
    @removeLabel="$emit('remove', $event)"
    @choseLabel="choseTag"
    @onOpenMenu="$emit('onOpenMenu')"
  />
</template>
<script>
import ListSource from "../cards/ListSource";

export default {
  components: {
    ListSource
  },
  props: {
    tags: Array,
    tag: Array,
    keyText: String,
    title: String,
    nameAdd: String,
    lengthDisplay: String
  },
  computed: {
    dataTags() {
      const result = (this.tags || []).filter(x =>
        (this.tag || []).includes(x.id)
      );
      return result;
    }
  },
  methods: {
    addTag(name) {
      const data = { name };
      this.$emit("add", data);
    },
    choseTag({ id: idSelect, check }) {
      let data = [];
      if (check) {
        data = this.tag.filter(id => id !== idSelect);
      } else {
        data = [...this.tag, idSelect];
      }
      this.$emit("chose", data);
    }
  }
};
</script>
