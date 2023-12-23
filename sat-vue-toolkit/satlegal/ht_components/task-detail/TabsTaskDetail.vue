<template>
  <v-card>
    <v-row no-gutters>
      <v-col>
        <ProjectCitation
          :items="dataCitation"
          :isShowMessage="isShowMessage"
          :message="message"
          @add="$emit('addCitation', $event)"
          @update="$emit('updateCitation', $event)"
          @remove="$emit('deleteCitation', $event)"
        />
      </v-col>
      <v-col>
        <ProjectPeopleGroup
          :members="members"
          :dataProjectGroup="dataProjectGroup"
          @deleteMemberInGroup="
            (group, members) => $emit('deleteMemberInGroup', group, members)
          "
          @addMembersInGroup="addMembersInGroup"
          @addGroup="data => $emit('addGroup', data)"
          @deleteCardGroup="data => $emit('deleteCardGroup', data)"
          @toggleSelectMember="
            (group, members) => $emit('toggleSelectMember', group, members)
          "
        />
      </v-col>
      <v-col>
        <ProjectGroupTag
          @addTagInGroup="addTagInGroup"
          :dataTags="dataTags"
          @addTagGroup="addTagGroup"
          @deleteTagInGroup="deleteTagInGroup"
          :items="items"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import ProjectCitation from "../projects/ProjectCitation";
import ProjectGroupTag from "../projects/ProjectGroupTag";
import ProjectPeopleGroup from "../project/ProjectPeopleGroup";

export default {
  props: {
    isShowMessage: Boolean,
    message: String,
    dataCitation: Array,
    members: Array,
    dataProjectGroup: Array,
    dataTags: Array,
    items: Array
  },
  components: {
    ProjectCitation,
    ProjectPeopleGroup,
    ProjectGroupTag
  },
  methods: {
    addMembersInGroup(members, group) {
      this.$emit("addMembersInGroup", members, group);
    },
    addGroup(members, groupName) {
      this.$emit("addGroup", members, groupName);
    },
    addTagInGroup(name, group) {
      this.$emit("addTagInGroup", name, group);
    },
    deleteTagInGroup(group, tag) {
      this.$emit("deleteTagInGroup", group, tag);
    },
    addTagGroup(data) {
      this.$emit("addTagGroup", data);
    }
  }
};
</script>
