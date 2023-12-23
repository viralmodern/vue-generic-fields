<template>
  <v-row>
    <v-col cols="12" class="ma-2 pb-2">
      <v-card class="pa-3">
        <v-row no-gutters class="align-center">
          <v-col cols="2">
            <span class="title">Tags</span>
          </v-col>
          <v-col cols="10">
            <v-row no-gutters class="align-center">
              <span>
                <CloseableChip
                  v-for="tag in dataGroupTags"
                  :key="tag.id"
                  :text="tag.tags"
                  @deleteTag="deleteTag(dataGroupTags, tag)"
                />
              </span>
              <CreateTagInGroup @addTag="addTagInGroup" />
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import CloseableChip from "../chips/CloseableChip";
import CreateTagInGroup from "../menus/CreateCitationTag";
export default {
  components: {
    CloseableChip,
    CreateTagInGroup
  },
  data() {
    return {
      dataGroupTags: [
        {
          id: 1,
          tags: "comment"
        },
        {
          id: 2,
          tags: "Like"
        },
        {
          id: 3,
          tags: "Share"
        }
      ]
    };
  },
  methods: {
    deleteTag(a, tag) {
      this.dataGroupTags = a.filter(x => x !== tag);
    },
    addTagInGroup(name) {
      const data = {
        tags: name
      };
      this.dataGroupTags.push(data);
    }
  }
};
</script>
