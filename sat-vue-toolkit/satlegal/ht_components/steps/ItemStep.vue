<template>
  <v-row no-gutters>
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="90" offset-y>
      <template v-slot:activator="{ on }">
        <v-stepper-step
          class="stepDetail"
          :complete="showComplete(item.status)"
          @click="showContent"
          :step="index + 1"
        >{{ item.name }}</v-stepper-step>
        <v-divider v-if="index + 1 < total "></v-divider>
      </template>
      <v-card>
        <slot name="MilestoneContent"></slot>
      </v-card>
    </v-menu>
  </v-row>
</template>
<script>
export default {
  props: {
    item: Object,
    index: Number,
    total: Number
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    showComplete(e) {
      return e ? true : false;
    },
    showContent() {
      this.menu = true;
    }
  }
};
</script>

<style scoped>
.stepDetail {
  cursor: pointer;
}
</style>
