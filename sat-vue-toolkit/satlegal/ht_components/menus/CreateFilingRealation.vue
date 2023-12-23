<template>
  <v-row no-gutters class="justify-center align-center">
    <v-col cols="12">
      <v-row class="align-center" no-gutters>
        <span class="title">{{title}}</span>
        <CreateRelations
          :rules="rules"
          :label="label"
          :items="dataTags"
          @addRelation="data => $emit('addRelation',data)"
        />
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import CreateRelations from "./CreateRelations";
export default {
  props: {
    items: Array,
    dataTags: Array,
    title: String,
    rules: Array,
    label: String
  },
  components: {
    CreateRelations
  },
  methods: {
    deleteTag(group, tag) {
      let data = {
        group: group,
        tag: tag
      };
      this.$emit("deleteTagInGroup", data);
    }
  }
};
</script>

