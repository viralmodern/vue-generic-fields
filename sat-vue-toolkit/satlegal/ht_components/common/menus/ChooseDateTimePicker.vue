<template>
  <div style="width: 200px">
    <v-row no-gutters class="align-center">
      <span v-if="date" :class="`${sizeText} mr-2`">
        {{ date | formatShortDateTime(format) }}
      </span>
      <span v-else :class="`${sizeText} mr-2`">
        (No date)
      </span>
      <DateTimePicker2
        :title="title"
        :nameButtonSubmit="nameButtonSubmit"
        :isActions="isActions"
        :isShowButtonClear="isShowButtonClear"
        :date="dateTime.date"
        :time="dateTime.time"
        :textTooltip="title"
        :colorButton="colorButton"
        class="mx-2"
        @updateTime="updateTime"
      />
    </v-row>
  </div>
</template>

<script>
import moment from "moment";
import DateTimePicker2 from "./DateTimePicker2";

export default {
  name: "ChooseDatePicker",
  components: {
    DateTimePicker2
  },
  props: {
    date: String,
    title: String,
    colorButton: String,
    isActions: Boolean,
    format: String,
    nameButtonSubmit: {
      type: String,
      default: () => "Add",
    },
    sizeText: {
      type: String,
      default: () => "text-caption"
    },
    isShowButtonClear: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      dialog: false,
      dateTime: {
        date: "",
        time: moment().format("HH:mm")
      }
    };
  },
  methods: {
    updateTime(val) {
      const timer = val.date
        ? val.time
          ? val.date + " " + val.time
          : new Date()
        : new Date();
      this.$emit("update", moment(timer).toISOString());
      this.dateTime.date = val.date;
      this.dateTime.time = val.time;
    },
    clear() {
      this.dateTime.date = moment(this.date).format("YYYY-MM-DD");
      this.dateTime.time = moment(this.date).format("HH:mm");
    }
  },
  mounted() {
    this.dateTime = {
      date: this.date ? moment(this.date).format("YYYY-MM-DD") : "",
      time: this.date ? moment(this.date).format("HH:mm") : ""
    };
  },
  watch: {
    date(val) {
      this.dateTime = {
        date: val ? moment(val).format("YYYY-MM-DD") : "",
        time: val ? moment(val).format("HH:mm") : ""
      };
    }
  },
};
</script>

<style lang="scss">
.fa-user-plus1,
.fa-map-marker,
.fa-cell-icon {
  color: #7a797e;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  transition: all 0.25s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: dashed 1px #c1c2c3;
  color: #dcdcdc;

  &:hover,
  &.active {
    background: rgba(17, 205, 239, 0.5);
    color: #fff;

    * {
      color: #fff !important;
    }
  }
}
.v-small-dialog__content {
  padding: 0px;
}
</style>
