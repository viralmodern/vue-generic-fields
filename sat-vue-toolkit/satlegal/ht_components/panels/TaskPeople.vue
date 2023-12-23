<template>
  <v-row no-gutters>
    <v-col>
      <ProjectPeopleGroup
        :members="dataPeoPleGroup"
        :dataProjectGroup="dataProjectGroup"
        @deleteMemberInGroup="deleteMemberInGroup"
        @toggleSelectMember="toggleSelectMember"
        @addGroup="addGroup"
        @deleteCardGroup="deleteCardGroup"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ProjectPeopleGroup from "../project/ProjectPeopleGroup";
export default {
  components: {
    ProjectPeopleGroup
  },
  data() {
    return {
      itemGroup: null
    };
  },
  methods: {
    // eslint-disable
    ...mapActions("ht_store/task/detail/tags", [ // eslint-disable-line
      "getDataProjectGroupRequest",
      "getDataPeopleGroupRequest"
    ]),
    ...mapMutations("ht_store/task/detail/tags", [ // eslint-disable-line
      "deleteMemberProject",
      "addMemberInGroup",
      "addGroupProject",
      "deleteGroupPeople",
      "selectMember"
    ]),
    deleteMemberInGroup(group, members) {
      const data = {
        id: members.id,
        members,
        group
      };
      this.selectMember(data);
    },
    toggleSelectMember(group, members) {
      const dataSelect = {
        id: members.id,
        members,
        group
      };
      if (members.check === false) {
        this.addMemberInGroup(dataSelect);
      } else {
        this.selectMember(dataSelect);
      }
    },
    addGroup(data) {
      this.addGroupProject(data);
    },
    deleteCardGroup(itemGroup) {
      this.deleteGroupPeople(itemGroup);
    }
  },
  computed: {
    ...mapGetters("ht_store/task/detail/tags", ["dataProjectGroup", "dataPeoPleGroup"])
  },
  mounted() {
    this.getDataProjectGroupRequest();
    this.getDataPeopleGroupRequest();
  }
};
</script>

