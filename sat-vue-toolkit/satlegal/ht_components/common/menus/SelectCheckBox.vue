<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon :color="itemComputed.color" v-if="flag">
                <v-icon>mdi-flag</v-icon>
              </v-btn>
              <v-chip
                style="cursor: pointer;"
                small
                v-else
                :color="itemComputed.color || 'primary'"
                label
                v-on="on"
              >
                <span class="white--text">{{ itemComputed[keyText] }}</span>
              </v-chip>
            </template>
            <span>{{ itemComputed[keyText] }}</span>
          </v-tooltip>
        </div>
      </template>
      <v-card flat>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">
              <p class="title">{{ title }}</p>
              <v-radio-group :value="itemComputed[keyValue]" column>
                <v-radio
                  class="custom-radio"
                  v-for="(item, index) in dataList"
                  :key="index"
                  :color="item.color"
                  :label="item[keyText]"
                  :value="item[keyValue]"
                  @change="$emit('update', item)"
                  :readonly="isReadonly"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import { NA } from "@/sat-vue-toolkit/satlegal/config";

export default {
  props: {
    flag: Boolean,
    value: [Number, String],
    dataList: Array,
    title: String,
    keyValue: {
      type: String,
      default: () => "id"
    },
    keyText: {
      type: String,
      default: () => "name"
    },
    isReadonly: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    itemComputed() {
      return (
        (this.dataList || []).find(f => f[this.keyValue] === this.value) || NA
      );
    }
  }
};
</script>

<style scoped>
.custom-radio /deep/ .v-input--selection-controls__ripple {
  z-index: 1;
}
</style>
