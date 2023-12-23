<template>
  <v-row no-gutters class="ml-2">
    <v-col>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card class="pa-2" v-if="dataMatter.length > 0">
            <TaskListFilter
              @apply="getDataYourDesk"
              :matters="dataMatter"
              :dues="dues"
              :labels="dataListLabel"
            />
            <v-divider></v-divider>
            <h3>{{ (paginationToMe.selectDue || {}).name }}</h3>
            <ListView :dataList="dataYouDesk" :loading="loading" />
            <div class="py-3">
              <v-pagination
                v-model="pageToMe"
                :length="1"
                total-visible="7"
              ></v-pagination>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import TaskListFilter from "../../ht_components/filter/TaskListFilter";
import ListView from "../../ht_components/task/ListView";

export default {
  components: {
    TaskListFilter,
    ListView
  },
  mounted() {
    this.getDataMatterRequest();
    this.getDataListLabelRequest();
  },
  data() {
    return {
      dues: [
        {
          id: 1,
          name: "Today",
          start: moment()
            .startOf("day")
            .toISOString(),
          end: moment()
            .endOf("day")
            .toISOString()
        },
        {
          id: 2,
          name: "Tomorrow",
          start: moment()
            .startOf("day")
            .add(1, "days")
            .toISOString(),
          end: moment()
            .endOf("day")
            .add(1, "days")
            .toISOString()
        },
        {
          id: 3,
          name: "Last week",
          start: moment()
            .subtract(1, "weeks")
            .startOf("isoWeek")
            .toISOString(),
          end: moment()
            .subtract(1, "weeks")
            .endOf("isoWeek")
            .toISOString()
        },
        {
          id: 3,
          name: "This week",
          start: moment()
            .startOf("isoWeek")
            .toISOString(),
          end: moment()
            .endOf("isoWeek")
            .toISOString()
        },
        {
          id: 4,
          name: "Next week",
          start: moment()
            .add(1, "weeks")
            .startOf("isoWeek")
            .toISOString(),
          end: moment()
            .add(1, "weeks")
            .endOf("isoWeek")
            .toISOString()
        },
        {
          id: 5,
          name: "In the part",
          start: moment("2000-01-01").toISOString(),
          end: moment().toISOString()
        },
        {
          id: 6,
          name: "No date",
          start: null,
          end: null
        }
      ],
      paginationToMe: {},
      pageToMe: 1
    };
  },
  computed: {
    ...mapGetters("ht_store/matter", ["dataMatter"]),
    ...mapGetters("ht_store/task/detail/labels", ["dataListLabel"]),
    ...mapGetters("ht_store/matter/briefcase/yourdesk", ["dataYourDesk", "loading"]),
    dataYouDesk() {
      return this.dataYourDesk.map(x => ({
        ...x,
        labels: this.dataListLabel.filter(y => x.labels.includes(y.id))
      }));
    }
  },
  methods: {
    getDataYourDesk(filter) {
      this.paginationToMe = filter;
      this.getDataYourDeskRequest();
    },
    ...mapActions("ht_store/matter", ["getDataMatterRequest"]),
    ...mapActions("ht_store/matter/briefcase/yourdesk", ["getDataYourDeskRequest"]),
    ...mapActions("ht_store/task/detail/labels", ["getDataListLabelRequest"])
  }
};
</script>

<style scoped></style>
