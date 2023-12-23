<template>
  <MaterialPanel panelTitle="Work" @edit="openModal">
    <v-row no-gutters class="px-4 py-2" v-if="dataWork">
      <div class="py-1">
        <h3 class="pb-1">Occupation</h3>
        <span>{{ dataWork.occupation }}</span>
      </div>
      <div class="py-1">
        <h3 class="pb-1">Skills</h3>
        <span v-for="(item, index) in dataWork.skills" :key="index"
          >&nbsp;{{ item }}&nbsp;,</span
        >
      </div>
      <div class="py-1">
        <h3 class="pb-1">Jobs</h3>
        <div v-for="(item, index) in dataWork.jobs" :key="index">
          <b>{{ item.workplace }}&nbsp;:&nbsp;</b>
          <span class="px-2" v-if="checkYearNow(item.startDate)">Now</span>
          <span class="px-2" v-else
            >{{ item.startDate | getYear }} - {{ item.endDate | getYear }}</span
          >
        </div>
      </div>
    </v-row>
    <EditWork
      title="Update work"
      :isShow="isShow"
      :itemEdit="itemEdit"
      @closeModal="closeModal"
      @edit="edit"
    />
  </MaterialPanel>
</template>

<script>
import MaterialPanel from "./MaterialPanel";
import EditWork from "../dialogs/EditWork";

export default {
  props: {
    dataWork: Object
  },
  components: {
    MaterialPanel,
    EditWork
  },
  data() {
    return {
      isShow: false,
      itemEdit: {}
    };
  },
  methods: {
    openModal() {
      this.isShow = true;
      this.itemEdit = this.dataWork;
    },
    closeModal() {
      this.isShow = false;
      this.itemEdit = {};
    },
    checkYearNow(date) {
      return new Date(date).getFullYear() === new Date().getFullYear();
    },
    edit(data) {
      this.$emit("updateWork", data);
    }
  }
};
</script>
