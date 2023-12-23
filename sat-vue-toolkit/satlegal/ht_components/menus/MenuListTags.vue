<template>
  <ProjectLabels
    :textTooltip="textTooltip"
    :icon="icon"
    :labels="dataTags"
    :listLabels="tags"
    :keyText="keyText"
    :keyColor="keyColor"
    :title="title"
    :nameAdd="nameAdd"
    :lengthDisplay="lengthDisplay"
    :isLoadingGet="isLoadingGet"
    :descForm="descForm"
    :description="description"
    @addLabel="addTag"
    @updateLabel="$emit('update', $event)"
    @removeLabel="$emit('remove', $event)"
    @choseLabel="choseTag"
    @onOpenMenu="$emit('onOpenMenu')"
    @changeDesc="$emit('changeDesc', $event)"
  />
</template>
<script>
import ProjectLabels from "../cards/ProjectLabels";

export default {
  components: {
    ProjectLabels
  },
  props: {
    tags: Array,
    tag: Array,
    keyText: String,
    keyColor: String,
    title: String,
    nameAdd: String,
    lengthDisplay: String,
    icon: String,
    textTooltip: String,
    isLoadingGet: Boolean,
    descForm: Boolean,
    description: String
  },
  computed: {
    dataTags() {
      const result = [];
      (this.tag || []).forEach(tagId => {
        const findTag = this.tags.find(t => t.id === tagId);
        if (findTag) {
          result.push(findTag);
        }
      })
      return result;
    }
  },
  methods: {
    addTag(e) {
      const data = {
        id: Math.random(),
        name: e.labelName,
        color: e.colorValue,
        createAt: new Date().toISOString()
      };
      this.$emit("add", data);
    },
    choseTag({ id: idSelect, check }) {
      let data = [];
      if (check) {
        data = this.dataTags.filter(x => x.id !== idSelect).map(x => x.id);
      } else {
        data = [...this.dataTags.map(x => x.id), idSelect];
      }
      this.$emit("chose", data);
    }
  }
};
</script>
