<template>
  <ProjectLabels
    :labels="dataTagsJoin"
    :listLabels="tags"
    keyText="name"
    keyColor="color"
    title="List Tags"
    nameAdd="Add new Tag"
    @addLabel="addTags"
    @updateLabel="updateTagsRequest"
    @removeLabel="removeTag"
    @choseLabel="choseTag"
  />
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProjectLabels from "../cards/ProjectLabels";
export default {
  components: {
    ProjectLabels
  },
  props: {
    tag: Array
  },
  computed: {
    dataTagsJoin() {
      const result = (this.tags || []).filter(
        x => this.tag && this.tag.includes(x.id)
      );
      return result;
    },
    ...mapGetters("ht_store/matter/discovery/index/detailIndex/tag", ["tags"])
  },
  methods: {
    addTags(e) {
      const data = {
        id: Math.random(),
        name: e.labelName,
        color: e.colorValue,
        createAt: new Date().toISOString()
      };
      this.addTagsRequest(data);
    },
    choseTag({ id: idSelect, check }) {
      let data;
      if (check) {
        data = {
          tag: this.tag.filter(id => id !== idSelect)
        };
      } else {
        data = {
          tag: [...this.tag, idSelect]
        };
      }
      this.updateIndexDetail(data);
    },
    async removeTag(id) {
      await this.removeTagsRequest(id);
      const data = {
        tag: this.tag.filter(idTag => idTag !== id)
      };
      this.updateIndexDetail(data);
    },
    ...mapActions("ht_store/matter/discovery/index/detailIndex", ["updateIndexDetail"]),
    ...mapActions("ht_store/matter/discovery/index/detailIndex/tag", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  }
};
</script>
