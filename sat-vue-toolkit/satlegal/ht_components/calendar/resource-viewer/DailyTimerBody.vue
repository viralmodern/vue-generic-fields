<template>
  <div :class="`v-calendar resource-viewer v-calendar-daily theme--${dark?'dark':'light'}`">
    <div class="v-calendar-daily__body">
      <div class="v-calendar-daily__scroll-area">
        <div class="v-calendar-daily__pane" :style="{height: `${slotsNumber * 40}px`}">
          <div class="v-calendar-daily__day-container">
            <div v-for="h in hours" :key="h" class="v-calendar-daily__day v-past">
              <div
                v-for="r in slotsArray"
                :key="r"
                class="v-calendar-daily__day-interval"
                style="height: 40px;"
              >
                <DataRow
                  class="resource-row"
                  v-if="!!getResource(h,r)"
                  :member="getResource(h,r).resource"
                  :type="getResource(h,r).type"
                  :progress="getResource(h,r).progress"
                  :backgroundColor="getResource(h,r).backgroundColor"
                  :position="{x:getResource(h,r).half ? '50%': '1px', y: `5px`}"
                  :width="`${getResource(h,r).duration * 100}%`"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DataRow from "./DataRow";
export default {
  components: {
    DataRow
  },
  data() {
    return {
      hours: []
    };
  },
  mounted() {
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }
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
    ...mapGetters("ht_store/layout", ["dark"]),
    computedResources() {
      const res = [];
      this.resources.forEach((resource, index) => {
        resource.dailyEfforts.forEach(e => {
          let comp = { resource: resource.resource, ...e };
          if (e.board) {
            comp.resource = e.board;
          }
          comp.type = this.type;
          comp.backgroundColor = this.backgroundColor;
          comp.index = index + 1;
          res.push(comp);
        });
      });
      return res;
    },
    slotsNumber() {
      return !this.hideHeader ? 0 : this.resources.length + 1;
    },
    slotsArray() {
      let r = [];
      for (let i = 0; i < this.slotsNumber; i++) {
        r.push(i);
      }
      return r;
    }
  },
  methods: {
    getResource(hour, index) {
      return this.computedResources.filter(
        x => x.index === index && x.hour === hour
      )[0];
    }
  }
};
</script>

<style scoped>
.resource-viewer {
  border-top: 1px solid silver;
}
.v-calendar-daily_head-day-label {
  font-size: 16px !important;
}
.v-calendar-daily__day-interval {
  position: relative;
}
</style>

