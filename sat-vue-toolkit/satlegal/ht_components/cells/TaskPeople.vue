<template>
  <td>
    <v-dialog v-model="modalPeople" width="800" style="width: 130px">
      <template v-slot:activator="{ on }">
        <a v-on="on" href="#">{{ totalPerson }} person(s)</a>
      </template>
      <v-card>
        <v-card-title class="text-h5" primary-title>People Group</v-card-title>
        <v-divider></v-divider>
        <ProjectPeopleGroup
          class="pa-2"
          :members="dataPeoPleGroup"
          :dataProjectGroup="dataRow.people"
          @deleteMemberInGroup="deleteMemberInGroup"
          @toggleSelectMember="toggleSelectMember"
          @addGroup="addGroup"
          @deleteCardGroup="deleteCardGroup"
        />
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="closeModalPeople">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </td>
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
      itemGroup: null,
      modalPeople: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    ...mapActions("ht_store/task/detail/tags", ["getDataPeopleGroupRequest"]),
    ...mapMutations("ht_store/task/list", [
      "addMemberRowInGroup",
      "selectMember",
      "deleteGroupPeople",
      "addGroupProject"
    ]),
    ...mapActions("ht_store/task/list/peopleGroup", [
      "addGroupProjectRequest",
      "deleteGroupPeopleRequest",
      "addMemberRowInGroupRequest",
      "removeMemberRowInGroupRequest"
    ]),
    deleteMemberInGroup(group, members) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        memberId: members.id,
        group,
        members
      };
      this.selectMember(data);
    },
    toggleSelectMember(group, members) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        memberId: members.id,
        group,
        members
      };
      this.selectMember(data);
      if (members.check === false) {
        this.addMemberRowInGroup(data);
        this.addMemberRowInGroupRequest(data);
      } else {
        this.selectMember(data);
        this.removeMemberRowInGroupRequest(data);
      }
    },
    addGroup(itemGroup) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        itemGroup
      };
      this.addGroupProject(data);
      this.addGroupProjectRequest(data);
    },
    deleteCardGroup(itemGroup) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        itemGroup
      };
      this.deleteGroupPeople(data);
      this.deleteGroupPeopleRequest(data);
    },
    closeModalPeople() {
      this.modalPeople = false;
    }
  },
  computed: {
    ...mapGetters("ht_store/task/detail/tags", ["dataPeoPleGroup"]),
    totalPerson() {
      return this.dataRow.people
        .map(x => x.member.length)
        .reduce((a, b) => a + b, 0);
    }
  },
  mounted() {
    this.getDataPeopleGroupRequest();
  }
};
</script>
