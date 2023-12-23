<template>
  <div>
    <CreateNewRowGrid
      :save-text="modeManual ? 'ADD' : 'START'"
      title="Time tracking"
      class="mt-2"
      @addRow="addRow"
    >
      <template v-slot:append-inner>
        <ChooseItems title="Select Matter" label-header="All Matter">
          <template v-slot:content="{ selected, on }">
            <div class="d-flex align-center">
              <v-chip
                label
                v-if="selected.length"
                class="cusor--pointer"
                :title="`Matter: ${selected[0].name}`"
              >
                <span v-on="on" class="text-no-wrap">
                  {{ selected[0].name }} <v-icon right>mdi-chevron-down</v-icon>
                </span>
              </v-chip>
              <template v-else>
                <v-icon small color="primary" v-on="on">mdi-plus</v-icon>
                <span v-on="on" class="cusor--pointer primary--text"
                  >Matter</span
                >
              </template>
            </div>
          </template>
        </ChooseItems>
        <v-divider vertical class="mx-3" />
        <ChooseItems
          multiple
          class="mr-2"
          title="labels"
          :show-label-header="false"
          label-header="labels"
        >
          <template v-slot:content="{ selected, on }">
            <div class="d-flex align-center cusor--pointer">
              <v-chip
                color="primary"
                v-if="selected.length"
                v-on="on"
                :title="`Labels: ${selected.length}`"
              >
                <v-icon>mdi-tag</v-icon>
                <template v-for="(i, index) in selected">
                  <div :key="`${index}-${i.name}`" v-if="index === 0">
                    {{ i.name }}
                    <sup v-if="selected.length > 1" class="font-weight-bold"
                      >+{{ selected.length - 1 }}</sup
                    >
                    <v-icon right>mdi-chevron-down</v-icon>
                  </div>
                </template>
              </v-chip>
              <template v-else>
                <v-btn small v-on="on" icon color="primary" class="mr-2">
                  <v-icon small>mdi-tag</v-icon>
                </v-btn>
                <span v-on="on">Labels</span>
              </template>
            </div>
          </template>
        </ChooseItems>
        <v-divider vertical class="mx-3" />
        <div
          class="cusor--pointer title"
          :class="{ 'primary--text': isBillAbled }"
          title="Billable"
          @click="isBillAbled = !isBillAbled"
        >
          {{ $$currency }}
        </div>
        <template v-if="modeManual">
          <v-divider vertical class="mx-3" />
          <ChooseTime />
          <div class="mx-3">-</div>
          <ChooseTime />
          <div class="mx-3">-</div>
          <ChooseDate />
          <v-divider vertical class="mx-3" />
        </template>
        <template v-else>
          <v-divider vertical class="mx-3" />
        </template>
        <template>
          <v-text-field
            v-if="modeManual"
            v-model="value"
            dense
            style="width: 140px"
            v-mask="mask"
            placeholder="000 : 00 : 00"
            flat
            solo
            class="font-weight-bold"
            single-line
            hide-details
            clearable
          />
          <v-text-field
            v-else
            readonly
            :value="timerAdd"
            dense
            style="width: 140px"
            v-mask="mask"
            placeholder="999 : 00 : 00"
            flat
            solo
            class="font-weight-bold"
            single-line
            hide-details
          />
        </template>
        <div class="ml-3" v-if="!isTrackingTimer">
          <v-icon
            small
            :color="!modeManual ? 'primary' : 'default'"
            @click="mode = MODE_TRACKING.TIMER"
            title="Timer"
          >
            mdi-timelapse
          </v-icon>
          <v-icon
            small
            :color="modeManual ? 'primary' : 'default'"
            @click="mode = MODE_TRACKING.MANUAL"
            title="Manual"
          >
            mdi-format-list-bulleted
          </v-icon>
        </div>
      </template>
      <template v-slot:append-save>
        <v-btn
          v-if="modeManual"
          @click="addRow"
          depressed
          class="text-capitalize ml-2"
          color="success"
          >ADD
        </v-btn>
        <template v-else>
          <v-btn
            v-if="isTrackingTimer"
            @click="stopTimer"
            depressed
            class="text-capitalize ml-2"
            color="error"
            >STOP
          </v-btn>
          <v-btn
            v-else
            depressed
            @click="startTimer"
            class="text-capitalize ml-2"
            color="success"
            >START
          </v-btn>
        </template>
      </template>
    </CreateNewRowGrid>
    <div class="mb-4"></div>
    <AlertCURD />
  </div>
</template>

<script>
import CreateNewRowGrid from '@/sat-vue-toolkit/components/slick-grid/attributes/CreateNewRowGrid.vue'
import ChooseItems from '../../../../../utils/ChooseItems.vue'
import ChooseTime from '../../../../../utils/ChooseTime.vue'
import ChooseDate from '../../../../../utils/ChooseDate.vue'
import { MODE_TRACKING } from '../../../../../../utils/timeTracking'
import { mask } from 'vue-the-mask'
import timersInterVal from '../../../../../../mixins/mx_timers-interval'
import AlertCURD from '../../../../../utils/AlertCURD.vue'

export default {
  name: 'FormRowAddTracker',
  components: {
    AlertCURD,
    ChooseDate,
    ChooseTime,
    ChooseItems,
    CreateNewRowGrid,
  },
  directives: {
    mask,
  },
  mixins: [timersInterVal],
  data() {
    return {
      isBillAbled: false,
      MODE_TRACKING: MODE_TRACKING,
      mode: MODE_TRACKING.MANUAL,
      // mask: "### : ## : ##",
      mask: '## : ## : ##',
      value: '',
      isTrackingTimer: false,
    }
  },
  computed: {
    modeManual() {
      return this.mode === this.MODE_TRACKING.MANUAL
    },
    timerAdd() {
      return `${this.$$hours} : ${this.$$minutes} : ${this.$$seconds}`
    },
  },
  methods: {
    addRow(name) {
      console.log('FormRowAddTracker', name)
    },
    startTimer() {
      this.isTrackingTimer = true
      this.$startTimer()
    },
    stopTimer() {
      this.isTrackingTimer = false
      this.$stopTimer()
      this.$eventHub.$emit('alert-curd', {
        text: 'Time entry has been created',
        type: 'success',
      })
    },
  },
}
</script>

<style scoped></style>
