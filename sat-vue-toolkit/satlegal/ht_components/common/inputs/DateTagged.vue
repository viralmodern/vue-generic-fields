<template>
  <div class="d-flex align-center no-gutters">
    <v-menu
      v-model="menu"
      transition="scale-transition"
      offset-x
      top
      nudge-width="250"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on: onMenu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: onTooltip }">
            <AddIcon
              :on="{ ...onMenu, ...onTooltip }"
              @onClickIcon="$emit('onOpenMenu')"
              icon="mdi-calendar"
              :colorButton="colorButton"
              :colorIcon="valid ? 'red' : ''"
              :style="`${valid ? 'border-color:red' : ''}`"
            />
          </template>
          <span>{{ textTooltipAfter }}</span>
        </v-tooltip>
      </template>
      <div>
        <v-card>
          <v-card-title class="py-2">
            <span class="title">{{ title }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>
            <v-radio-group :value="typeDate" row>
              <v-radio
                class="custom-radio mx-1"
                v-for="(item, index) in dataTypeDate"
                :key="index"
                :label="item.label"
                :value="item.value"
                @change="updateTypeDate(item.value)"
              ></v-radio>
            </v-radio-group>
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text class="px-4 py-0 custom-text-field">
            <div class="d-flex justify-space-around">
              <div class="px-2" v-if="typeDate ==='onExact' ">
                <DateMonthPicker
                  @clear="$emit('clear')"
                  label="Date"
                  :value="days1"
                  @change="days1 = days2 = $event"
                />
              </div>
              <div class="px-2" v-if="typeDate ==='between' || typeDate ==='after'">
                <DateMonthPicker
                  @clear="$emit('clear')"
                  label="After day"
                  :value="days1"
                  @change="days1 = $event"
                  :max="setMax"
                />
              </div>
              <div class="px-2" v-if="typeDate ==='between' || typeDate ==='before' ">
                <DateMonthPicker
                  @clear="$emit('clear')"
                  label="Before day"
                  :value="days2"
                  @change="days2 = $event"
                  :min="setMin"
                />
              </div>
            </div>
          </v-card-text>
          <v-card-actions v-if="isActions">
            <div class="text-right" style="width:100%">
              <v-btn
                small
                class="mr-1"
                color="primary"
                @click="
                  $emit('updateTime', {
                    date_tagged_after: days1,
                    date_tagged_before: days2
                  });
                  menu = false;
                "
              >{{nameButtonSubmit}}</v-btn>
              <v-btn
                small
                class="ma-0"
                v-if="isShowActionClear"
                color="warning"
                @click="clear"
              >Clear</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </div>
    </v-menu>
  </div>
</template>

<script>
import DateMonthPicker from "../../menus/DateMonthPicker";
import AddIcon from "../buttons/AddIcon";
import moment from "moment";
export default {
  components: {
    DateMonthPicker,
    AddIcon
  },
  props: {
    textTooltipAfter: {
      type: String,
      default: () => "Add date"
    },
    textTooltipBefore: {
      type: String,
      default: () => "Add date"
    },
    nameButtonSubmit: String,
    colorButton: String,
    dateAfter: String,
    dateBefore: String,
    isActions: Boolean,
    title: String,
    valid: Boolean,
    isClear: Boolean,
    isShowActionClear: Boolean
  },
  data() {
    return {
      menu: false,
      days1: null,
      days2: null,
      typeDate: "onExact",
      dataTypeDate: [
        { value: "onExact", label: "Tag on exact date" },
        { value: "between", label: "Tag between two dates" },
        { value: "after", label: "Tag after a date" },
        { value: "before", label: "Tag before a date" }
      ],
      isClone: false
    };
  },
  computed: {
    setMin() {
      if (!this.days1) return null;
      const minDate = moment(this.days1, "YYYY-MM-DD").add(1, "days");
      return moment(minDate).format("YYYY-MM-DD");
    },
    setMax() {
      if (!this.days2) return null;
      const maxDate = moment(this.days2, "YYYY-MM-DD").add(-1, "days");
      return moment(maxDate).format("YYYY-MM-DD");
    }
  },
  methods: {
    updateTypeDate(type) {
      this.isClone = this.checkTypyDate() !== type ? true : false;
      this.clear();
      this.typeDate = type;
    },
    clear() {
      this.days1 = this.isClone ? null : this.dateAfter;
      this.days2 = this.isClone ? null : this.dateBefore;
    },
    checkTypyDate() {
      if (
        this.dateAfter &&
        this.dateBefore &&
        moment(this.dateAfter).isBefore(this.dateBefore)
      )
        return "between";
      if (!this.dateAfter && this.dateBefore) return "before";
      if (!this.dateBefore && this.dateAfter) return "after";
      return "onExact";
    }
  },
  watch: {
    menu: {
      handler(val) {
        if (val) {
          this.days1 = this.dateAfter;
          this.days2 = this.dateBefore;
          if (
            this.days1 &&
            this.days2 &&
            moment(this.days1).isBefore(this.days2)
          )
            this.typeDate = "between";
          if (!this.days1 && this.days2) this.typeDate = "before";
          if (!this.days2 && this.days1) this.typeDate = "after";
        }
      },
      deep: true
    }
  },
  mounted() {
    this.days1 = this.dateAfter;
    this.days2 = this.dateBefore;
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
.custom-radio /deep/ .v-input--selection-controls__ripple {
  z-index: 1;
}
</style>
