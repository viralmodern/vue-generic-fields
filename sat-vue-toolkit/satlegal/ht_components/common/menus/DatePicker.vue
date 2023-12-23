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
              :isReadonly="isReadOnly"
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
            <span class="title">{{ title }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="px-3 py-0 custom-text-field">
            <div class="d-flex">
              <div class="px-1">
                <DateMonthPicker
                  @clear="$emit('clear')"
                  label="Date"
                  :value="days"
                  @change="days = $event"
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
                    date: days,
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
export default {
  components: {
    DateMonthPicker,
    AddIcon
  },
  props: {
    textTooltip: {
      type: String,
      default: () => "Add date"
    },
    nameButtonSubmit: String,
    colorButton: String,
    date: String,
    isActions: Boolean,
    title: String,
    valid: Boolean,
    isClear: Boolean,
    isShowActionClear: Boolean,
    isReadOnly: Boolean
  },
  data() {
    return {
      menu: false,
      days: ""
    };
  },
  methods: {
    clear() {
      this.days = this.isClear ? "" : this.date;
    }
  },
  watch: {
    menu: {
      handler(val) {
        if (val) {
          this.days = this.date;
        }
      },
      deep: true
    }
  },
  mounted() {
    this.days = this.date;
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
</style>
