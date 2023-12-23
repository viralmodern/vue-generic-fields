<template>
  <v-row no-gutters class="justify-center align-center">
    <v-col cols="12">
      <v-row no-gutters class="align-center">
        <span class="font-weight-bold ml-2">Tag group</span>
        <CreateGroupTag
          :items="dataTags"
          @addGroupTag="data => $emit('addTagGroup', data)"
        />
      </v-row>
    </v-col>
    <v-col cols="12" v-for="item in items" :key="item.id" class="ma-2">
      <v-card class="pa-3">
        <v-row no-gutters class="align-center">
          <v-col cols="1">
            <span class="font-weight-bold">{{ item.name }}</span>
          </v-col>
          <v-col cols="10">
            <v-row class="align-center">
              <span>
                <CloseableChip
                  v-for="tag in item.tags"
                  :key="tag"
                  :text="tag"
                  @deleteTag="deleteTag(item, tag)"
                />
              </span>
              <CreateTagInGroup
                :items="dataTags.filter(x => !item.tags.some(r => r === x))"
                @addTag="name => $emit('addTagInGroup', { name, group: item })"
              />
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import CreateGroupTag from "../menus/CreateGroupTag";
import CloseableChip from "../chips/CloseableChip";
import CreateTagInGroup from "../menus/CreateCitationTag";
export default {
  props: {
    items: Array,
    dataTags: Array
  },
  components: {
    CreateGroupTag,
    CloseableChip,
    CreateTagInGroup
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
