<template>
  <div class="no-gutters">
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
          <span>{{ textTooltip }}</span>
        </v-tooltip>
      </template>
      <div>
        <v-card>
          <v-card-title class="py-2">
            <span class="title">{{title}}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="px-3 py-0 custom-text-field">
            <div class="d-flex">
              <div class="px-1">
                <DateMonthPicker
                  @clear="$emit('clear')"
                  label="Date"
                  :value="date"
                  @change="$emit('updateDate', $event)"
                />
              </div>
              <div class="px-1">
                <TimePicker
                  :disabled="date ? false : true"
                  :value="time"
                  hide-details
                  @change="$emit('updateTime', $event)"
                />
              </div>
            </div>
          </v-card-text>
          <v-card-actions v-if="isActions">
            <div class="text-right" style="width:100%">
              <v-btn small class="ma-0" color="warning" @click="$emit('clear')">Clear</v-btn>
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
    valid: Boolean,
    colorButton: String,
    time: String,
    date: String,
    isActions: Boolean,
    title: String
  },
  data() {
    return {
      menu: false
    };
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
</style>
