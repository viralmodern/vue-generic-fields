<template>
  <div style="width: 150px">
    <span class="text-caption mr-2">{{ date | formatDate(format) }}</span>
    <v-menu
      v-model="dialog"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" x-small class="fa-user-plus1" color="#dcdcdc">mdi-calendar</v-icon>
      </template>
      <v-date-picker :value="date" no-title @input="update" :min="minComputed"></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "ChooseDatePicker",
  props: {
    date: String,
    format: {
      type: String,
      default: () => "MMM Do YY"
    },
    isFormatChooseISOString: {
      type: Boolean,
      default: () => true
    },
    isValidate: Boolean
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    minComputed() {
      if (this.isValidate) {
        const newDate = moment(new Date()).format("YYYY-MM-DD");
        return newDate;
      }
      return ""
    }
  },
  methods: {
    update(val) {
      if (this.isFormatChooseISOString) {
        this.$emit("update", new Date(val).toISOString());
      } else {
        this.$emit("update", val);
      }
      this.dialog = false;
    }
  }
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
