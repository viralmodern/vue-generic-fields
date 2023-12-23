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
            />
          </template>
          <span>{{ textTooltip }}</span>
        </v-tooltip>
      </template>
      <div>
        <v-card>
          <v-card-title class="py-2">
            <span class="title">{{ title }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="px-3 py-0 custom-text-field">
            <div class="d-flex">
              <div class="px-1">
                <DateMonthPicker
                  @clear="$emit('clear')"
                  label="Date"
                  :value="dateTime.date"
                  @change="dateTime.date = $event"
                />
              </div>
              <div class="px-1">
                <TimePicker
                  :disabled="dateTime.date ? false : true"
                  :value="dateTime.time"
                  hide-details
                  @change="dateTime.time = $event"
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
                    date: dateTime.date,
                    time: dateTime.time
                  });
                  menu = false;
                "
                >{{nameButtonSubmit}}</v-btn
              >
              <v-btn v-if="isShowButtonClear" small class="ma-0" color="warning" @click="clear"
                >Clear</v-btn
              >
            </div>
          </v-card-actions>
        </v-card>
      </div>
    </v-menu>
  </div>
</template>

<script>
import DateMonthPicker from "../../menus/DateMonthPicker";
import TimePicker from "../../menus/TimePicker";
import AddIcon from "../buttons/AddIcon";
export default {
  components: {
    DateMonthPicker,
    TimePicker,
    AddIcon
  },
  props: {
    textTooltip: {
      type: String,
      default: () => "Add date time"
    },
    nameButtonSubmit: String,
    colorButton: String,
    time: String,
    date: String,
    isActions: Boolean,
    isShowButtonClear: Boolean,
    title: String,
  },
  data() {
    return {
      menu: false,
      dateTime: {
        date: "",
        time: ""
      }
    };
  },
  methods: {
    clear() {
      this.dateTime = {
        date: this.date,
        time: this.time
      };
    }
  },
  watch: {
    time(val) {
      this.dateTime = {
        ...this.dateTime,
        time: val
      };
    },
    date(val) {
      this.dateTime = {
        ...this.dateTime,
        date: val
      };
    }
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
</style>
