<template>
  <v-row no-gutters>
    <div class="pr-3">
      <v-row no-gutters>
        <span class="subheading font-weight-bold primary--text">{{
          startTime
        }}</span>
        <span class="text-caption">{{ endTime }}</span>
      </v-row>
    </div>
    <div v-bind:style="{ background: colorLable }">&nbsp;</div>
    <v-col class="pl-3 content">
      <v-row no-gutters>
        <span class="text-body-2">{{ category }}</span>
        <span class="text-body-1">{{ description }}</span>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    startTime: String,
    endTime: String,
    colorLable: String,
    category: String,
    description: String
  }
};
</script>
<style scoped>
.v-div-chip {
  min-width: 5px;
  border-radius: 10px;
}
</style>
