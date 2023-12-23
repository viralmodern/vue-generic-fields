<template>
  <v-card class="pa-3">
    <v-row no-gutters>
      <v-col>
        <v-row no-gutters class="justify-center align-center">
          <v-col cols="1">
            <v-progress-circular
              value="100"
              size="20"
              :color="item.color"
            ></v-progress-circular>
          </v-col>
          <v-col cols="10">
            <span class="subheading font-weight-bold">{{ item.title }}</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="my-3">
        <v-chip
          v-for="(item, index) in showType"
          :key="index"
          small
          class="white--text pb-1"
          :color="item.color"
        >
          {{ item.name }}
        </v-chip>
      </v-col>
      <span class="text-caption font-weight-bold"
        >{{ item.keyResults.length }} Key result</span
      >
      <v-col class="my-2">
        <div v-for="(item, index) in item.keyResults" :key="index">
          <v-row no-gutters class="align-center justify-center">
            <v-col cols="9">
              <v-progress-linear
                color="primary"
                height="5"
                :value="item.progress"
              ></v-progress-linear>
            </v-col>
            <v-col cols="3" class="pl-5">
              <span>{{ item.progress }}%</span>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    item: Object,
    labels: Array
  },
  computed: {
    showType() {
      return this.labels.filter(x => {
        return this.item.labels.includes(x.id);
      });
    }
  }
};
</script>
