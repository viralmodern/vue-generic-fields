<template>
  <td>
    <v-row no-gutters>
      <ProjectLabels
        :labels="dataTagsLabel"
        :listLabels="tag"
        keyColor="color"
        keyText="name"
        @addLabel="createdLabelTags"
        @updateLabel="
          updateTagsRequest({
            ...$event,
            matterId:$route.params.matter || $route.params.projectId,
            type: 'tag'
          })
        "
        @removeLabel="
          removeTagsRequest({
            id: $event,
            matterId:$route.params.matter || $route.params.projectId,
            type: 'tag'
          })
        "
        @choseLabel="choseLabel"
        title="Select Tags"
        nameAdd="Creat new tags"
      />
    </v-row>
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProjectLabels from "../cards/ProjectLabels";
export default {
  components: {
    ProjectLabels
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/tags", ["tag"]),
    dataTagsLabel() {
      return this.tag.filter(x => {
        return this.dataRow.tags.map(x => x.pk).includes(x.id);
      });
    }
  },
  methods: {
    ...mapActions("ht_store/matter/tags", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),
    ...mapActions("ht_store/project/research/timeline/detail/activities", [
      "addTags",
      "removeTags"
    ]),
    createdLabelTags(e) {
      const data = {
        name: e.labelName,
        color: e.colorValue,
        type: "tag",
        matterId: this.$route.params.matter || this.$route.params.projectId,
        id: this.dataRow.id
      };
      this.addTagsRequest(data);
    },
    choseLabel(e) {
      const isSome = this.dataRow.tags.some(x => x.pk === e.id);
      const { projectId, timelineId } = this.$route.params;
      if (!isSome) {
        const mapTags = this.dataRow.tags.map(x => x.pk);
        const tags = [...mapTags, e.id];
        this.addTags({
          matterId: projectId,
          timelineId,
          activitiesId: this.dataRow.id,
          body: {
            tags
          }
        });
      } else {
        this.removeTags({
          timelineId,
          activitiesId: this.dataRow.id,
          matterId: projectId,
          tagId: e.id
        });
      }
    }
  }
};
</script>
