<template>
  <v-card>
    <v-row no-gutters class="pa-2">
      <v-col class="mt-1">
        <FileProjectUpload
          @uploadFile="uploadFile"
          @deleteFile="deleteFile"
          :files="files"
        />
      </v-col>
      <v-col class="mt-3">
        <TaskProjectDetailSelect
          v-if="taskDetail"
          :favorables="taskDetail.selects.favorable"
          :limitations="taskDetail.selects.limitation"
          :treatments="taskDetail.selects.treatment"
          :vulnerabilities="taskDetail.selects.vulnerability"
          :dataSelect="dataSelect"
          @changeFavorables="changeFavorables"
          @changeVulnerability="changeVulnerability"
          @changeTreatment="changeTreatment"
          @changeLimitation="changeLimitation"
        />
      </v-col>
      <v-col>
        <span class="title">People</span>
        <UserInfo
          v-for="item in peoples"
          :mini="true"
          :item="item"
          :name="item.user.fullName"
          :avatar="item.user"
          :key="item.id"
          :jobTitle="item.mission"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import FileProjectUpload from "../project/FileProjectUpload";
import UserInfo from "../cards/UserInfo";
import TaskProjectDetailSelect from "../project/TaskProjectDetailSelect";
export default {
  props: {
    files: Array,
    dataSelect: Object,
    taskDetail: Object,
    peoples: Array,
    dataTags: Array
  },
  components: {
    FileProjectUpload,
    TaskProjectDetailSelect,
    UserInfo
  },
  methods: {
    deleteFile(id) {
      this.$emit("deleteFile", id);
    },
    uploadFile(data) {
      this.$emit("uploadFile", data);
    },
    changeFavorables(val) {
      this.$emit("changeFavorables", val);
    },
    changeVulnerability(val) {
      this.$emit("changeVulnerability", val);
    },
    changeTreatment(val) {
      this.$emit("changeTreatment", val);
    },
    changeLimitation(val) {
      this.$emit("changeLimitation", val);
    }
  }
};
</script>
