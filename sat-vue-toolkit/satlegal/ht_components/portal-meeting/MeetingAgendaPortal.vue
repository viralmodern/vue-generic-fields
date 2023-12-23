<template>
  <v-row no-gutters class="px-3">
    <v-col cols="4">
      <div class="subheading font-weight-bold my-1">
        Meeting frame of project types
      </div>
      <div>
        <v-date-picker :events="showEventDate"></v-date-picker>
      </div>
    </v-col>
    <v-col cols="8">
      <div>
        <v-row no-gutters align-center>
          <span class="subheading font-weight-bold primary--text"
            >Your agenda</span
          >
          <v-spacer></v-spacer>
          <v-btn icon class="ma-0">
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn @click="isShowCreate = true" icon class="ma-0">
            <v-icon color="primary">mdi-add_circle</v-icon>
          </v-btn>
          <CreateNewMeeting
            @closeModal="isShowCreate = false"
            :isShowCreate="isShowCreate"
            :listMatter="dataMatter"
            @createNewMeeting="postCreateNewMeeting"
            :dataMembers="members"
          />
        </v-row>
      </div>
      <div>
        <v-row no-gutters>
          <v-col
            cols="6"
            v-for="v in groupMonthYear[monthYear]"
            :key="v.id"
            class="mb-3 pr-2"
          >
            <DayEventSchedule :date="v.date" :events="v.listTime" />
          </v-col>
          <div
            v-if="
              !groupMonthYear[monthYear] || !groupMonthYear[monthYear].length
            "
          >
            No events
          </div>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import DayEventSchedule from "../list/DayEventSchedule";
import CreateNewMeeting from "../dialogs/CreateNewMeeting";

export default {
  components: {
    DayEventSchedule,
    CreateNewMeeting
  },
  data() {
    return {
      monthYear: "",
      isShowCreate: false
    };
  },
  mounted() {
    this.getDataPortalMeetingAgendaRequest();
    this.getDataMemberRequest();
    this.getDataMatterRequest();
  },
  methods: {
    postCreateNewMeeting(data) {
      this.addPortalMeetingAgendaRequest(data);
      this.isShowCreate = false;
    },
    showEventDate(date) {
      let result;
      const [year, month, day] = date.split("-");
      this.monthYear = `${year}-${month}`;
      const array = this.groupMonthYear[`${year}-${month}`];
      if (!array || !array.length) return false;
      for (var i = 0; i < array.length; i++) {
        if ([new Date(array[i].date).getDate()].includes(parseInt(day, 10))) {
          result = array[i].listTime.map(x => x.colorLable);
          break;
        }
        result = false;
      }
      return result;
    },
    ...mapActions("ht_store/clientPortal/meeting", [
      "getDataPortalMeetingAgendaRequest",
      "addPortalMeetingAgendaRequest"
    ]),
    ...mapActions("ht_store/matter", ["getDataMatterRequest"]),
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"])
  },
  computed: {
    groupMonthYear() {
      const group = {};
      (this.dataPortalMeetingAgenda || []).forEach(x => {
        const YYYYMM = moment(x.date).format("YYYY-MM");
        (group[YYYYMM] = group[YYYYMM] || []).push(x);
      });
      return group;
    },
    ...mapGetters("ht_store/clientPortal/meeting", ["dataPortalMeetingAgenda"]),
    ...mapGetters("ht_store/matter", ["dataMatter"]),
    ...mapGetters("ht_store/workspace/member", ["members"])
  }
};
</script>
<style scoped>
.v-div-chip {
  width: 5px;
  height: 40px;
  border-radius: 10px;
  display: flex;
}
</style>
