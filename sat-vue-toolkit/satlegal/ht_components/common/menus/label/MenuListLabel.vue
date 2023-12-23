<template>
  <LabelComponent
    :textTooltip="textTooltip"
    :icon="icon"
    :labels="dataTags"
    :listLabels="tags"
    :keyId="keyId"
    :keyText="keyText"
    :keyColor="keyColor"
    :title="title"
    :nameAdd="nameAdd"
    :lengthDisplay="lengthDisplay"
    :isLoadingGet="isLoadingGet"
    :isLoadingAdd="isLoadingAdd"
    :isLoadingUpdate="isLoadingUpdate"
    :descForm="descForm"
    :description="description"
    :valid="valid"
    @addLabel="addTag"
    @updateLabel="$emit('update', $event)"
    @removeLabel="$emit('remove', $event)"
    @choseLabel="choseTag"
    @onOpenMenu="$emit('onOpenMenu')"
    @changeDesc="$emit('changeDesc', $event)"
  />
</template>
<script>
import LabelComponent from "./LabelComponent";

export default {
  components: {
    LabelComponent
  },
  props: {
    tags: Array,
    tag: Array,
    keyText: String,
    keyId: {
      type: String,
      default: () => "id",
    },
    keyColor: String,
    title: String,
    nameAdd: String,
    lengthDisplay: String,
    icon: String,
    textTooltip: String,
    isLoadingGet: Boolean,
    descForm: Boolean,
    description: String,
    valid: Boolean,
    isLoadingAdd: Boolean,
    isLoadingUpdate: Boolean,
  },
  computed: {
    dataTags() {
      const result = [];
      (this.tag || []).forEach(tagId => {
        const findTag = this.tags.find(t => t[this.keyId] === tagId);
        if (findTag) {
          result.push(findTag);
        }
      })
      return result;
    }
  },
  methods: {
    addTag({dataForm, closeAdd}) {
      const data = {
        id: Math.random(),
        name: dataForm.labelName,
        color: dataForm.colorValue,
        createAt: new Date().toISOString()
      };
      this.$emit("add", {dataForm: data, closeAdd});
    },
    choseTag({ [this.keyId]: idSelect, check }) {
      let data = [];
      if (check) {
        data = this.dataTags.filter(x => x[this.keyId] !== idSelect).map(x => x[this.keyId]);
      } else {
        data = [...this.dataTags.map(x => x[this.keyId]), idSelect];
      }
      this.$emit("chose", data);
    }
  }
};
</script>
