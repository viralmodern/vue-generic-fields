<template>
  <v-row>
    <v-col cols="12">
      <v-row no-gutters class="pl-2 justify-space-between align-center">
        <v-col cols="12">
          <v-select
            v-model="years"
            :items="itemsYears"
            item-text="state"
            item-value="id"
            label="Select Years"
            persistent-hint
            return-object
            @change="$emit('getYear', $event)"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row no-gutters class="pa-2 justify-space-between align-center">
        <v-col>
          <div>
            <span class="text-body-2">Total Collected:</span>
          </div>
          <div>
            <span class="title mx-2">{{ totalChartOfCard.collected }}</span>
          </div>
        </v-col>
        <span class="title">200%</span>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row no-gutters class="pa-2">
        <v-col>
          <div class="text-body-2">Total Outstanding:</div>
          <div class="title mt-2">{{ totalChartOfCard.outstanding }}</div>
        </v-col>
        <v-col class="d-flex justify-end">
          <div>
            <div class="text-body-2">Total Overdue:</div>
            <div class="title mt-2 justify-space-between align-center">$ 1.226</div>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row no-gutters class="pa-2">
        <v-col>
          <div class="text-body-2">Total Clients:</div>
          <div
            class="title mt-2 justify-space-between align-center"
          >{{ totalChartOfCard.countUser }}</div>
        </v-col>
        <div>
          <v-btn outlined color="primary text-capitalize">
            <v-icon class="mr-1">mdi-contacts</v-icon>See All Client
          </v-btn>
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { implementYear } from "../../config";
export default {
  props: {
    totalChartOfCard: Object
  },
  data() {
    return {
      itemsYears: implementYear,
      years: { id: new Date().getFullYear() }
    };
  }
};
</script>
