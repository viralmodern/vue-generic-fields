<template>
  <v-card>
    <v-card-text class="px-3 py-2">
      <v-row no-gutters class="align-center">
        <div>
          <v-row no-gutters>
            <div class="text-h4 primary--text">{{ formatDay }}</div>
            <div class="px-1 text-uppercase">{{ formatDate }}</div>
          </v-row>
        </div>
        <v-col class="pl-2">
          <div>
            <span class="text--secondary">{{ item.time }}</span>
            <v-icon class="red--text subheading ml-2" v-if="item.status === 1"
              >mdi-error_outline</v-icon
            >
            <div class="subheading font-weight-bold">{{ item.title }}</div>
            <div class="text--secondary" v-html="item.description"></div>
          </div>
        </v-col>
        <div class="align-self-start">
          <v-row class="align-cente" r no-gutters>
            <v-col>
              <v-btn @click="$emit('editItem')" icon class="ma-0">
                <v-icon class="text--secondary">mdi-flash_on</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import moment from "moment";
export default {
  props: {
    item: Object
  },
  data() {
    return {
      isShowOngoingSchedule: false
    };
  },
  computed: {
    formatDay() {
      return moment(this.item.date).format("DD");
    },
    formatDate() {
      return moment(this.item.date).format("ddd");
    }
  }
};
</script>
