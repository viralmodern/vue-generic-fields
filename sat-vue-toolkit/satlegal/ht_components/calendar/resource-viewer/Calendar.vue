<template>
  <v-calendar
    class="resource-viewer"
    :class="{'hide-header': hideHeader, 'month-view': calendarType === 2}"
    type="custom-daily"
    :weekdays="[1, 2, 3, 4, 5, 6, 0]"
    :start="startDate"
    :end="endDate"
    :max-days="31"
    :interval-count="slotsNumber"
  >
    <template slot="dayBody" slot-scope="{ date, timeToY }">
      <DataRow
        class="resource-row"
        v-for="(resource,index) in eventsMap[date]"
        :key="index"
        :member="resource.resource"
        :type="resource.type"
        :progress="resource.progress"
        :backgroundColor="calculateColorForTeamBoard(resource.resource.id, resource.type) || resource.backgroundColor"
        :position="{x:resource.half ? '50%': '1px', y: `${timeToY(resource.time)}px`}"
        :width="`${resource.days * 100}%`"
        :calendarType="calendarType"
      />
      <Hours
        v-if="calendarType === 1"
        :resource="sumHoursMap[date]"
        style="position: absolute;width: 100%;top: 0;text-align: center;line-height: 40px;"
      />
    </template>
  </v-calendar>
</template>

<script>
import DataRow from "./DataRow";
import Hours from "./Hours";
import { resourceViewerColors } from "../../../config";
import moment from "moment";
export default {
  components: {
    DataRow,
    Hours
  },
  props: {
    type: {
      type: Number,
      default: 0 // 0 project, 1 member
    },
    calendarType: Number,
    startDate: String,
    endDate: String,
    backgroundColor: String,
    resources: {
      type: Array,
      default: () => []
    },
    hideHeader: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    eventsMap() {
      const map = {};
      this.computedResources.forEach(e =>
        (map[e.date] = map[e.date] || []).push(e)
      );
      return map;
    },
    sumHoursMap() {
      let r = {};
      for (let i = 0; i < 7; i++) {
        let sum = 0;
        let checkingDate = moment(this.startDate).add(i, "days");
        const date = checkingDate.format("YYYY-MM-DD");
        this.computedResources.forEach(resource => {
          const monthYear = (moment(resource.date).month() + 1) + (moment(resource.date).year() + 1)
          const checkingMonthYear = (checkingDate.month() + 1) + (checkingDate.year() + 1)
          if(monthYear ===  checkingMonthYear){
            const resourcesDate = moment(resource.date).date()
            if (resourcesDate === checkingDate.date()) {
              resource.half ? (sum += 4) : (sum += 8);
            }
            if (resourcesDate < checkingDate.date()) {
              let countResourceDate = resourcesDate + resource.days - (resource.half ? 0.5 : 0);
              if (countResourceDate > checkingDate.date()) {
                if (countResourceDate - checkingDate.date() === 0.5) {
                  sum += 4;
                } else {
                  sum += 8;
                }
              } else if (
                resource.half &&
                countResourceDate === checkingDate.date() - 0.5
              ) {
                sum += 4;
              }
            }
          }
        });
        r[date] = {
          date,
          sum,
          total: (this.slotsNumber - 1) * 8
        };
      }
      return r;
    },
    computedResources() {
      const res = [];
      this.resources.forEach((resource, index) => {
        resource.efforts.forEach(e => {
          let comp = { resource: resource.resource, ...e };
          if (e.board) {
            comp.resource = e.board;
          }
          comp.type = this.type;
          comp.backgroundColor = this.backgroundColor;
          comp.time = `${(index + 1).toString().padStart(2, "0")}:07`;
          res.push(comp);
        });
      });
      return res;
    },
    slotsNumber() {
      return !this.hideHeader ? 0 : this.resources.length + 1;
    }
  },
  methods: {
    calculateColorForTeamBoard(boardId) {
      if (this.type === 1) return null;
      return resourceViewerColors[boardId % resourceViewerColors.length];
    }
  }
};
</script>

<style scoped>
.first-column {
  width: 300px;
}
.resource-viewer {
  border-top: 1px solid silver;
}
.resource-viewer /deep/ .v-calendar-daily__intervals-body,
.resource-viewer /deep/ .v-calendar-daily__intervals-head {
  display: none;
}
.hide-header /deep/ .v-calendar-daily__head {
  display: none !important;
}
.month-view /deep/ .v-calendar-daily_head-day-label {
  font-size: 16px !important;
  font-weight: 400 !important;
}
</style>

