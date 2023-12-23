<template>
  <v-row no-gutters class="pa-2">
    <v-col cols="12" sm="3" class="my-3 subheading font-weight-bold">Introduction</v-col>
    <v-col cols="12">
      <v-textarea
        name="input-7-1"
        label="Introduce"
        :value="item.introduce"
        @input="changeDetail('introduce', $event)"
        hint="Introduce overview"
      ></v-textarea>
    </v-col>
    <v-col cols="12" sm="3" class="my-3 subheading font-weight-bold"
      >Jurisdiction and Venue</v-col
    >
    <v-col cols="12">
      <v-textarea
        name="input-7-1"
        label="Jurisdiction and venue"
        :value="item.jurisdiction"
        @input="changeDetail('jurisdiction', $event)"
        hint="Jurisdiction overview"
      ></v-textarea>
    </v-col>
    <v-col cols="12" sm="3" class="my-3 subheading font-weight-bold"
      >Plaintiff & Defendant</v-col
    >
    <v-col cols="12">
      <v-row no-gutters class="my-2">
        <v-col cols="6">
          <v-select
            :value="item.plaintiff"
            :items="overviewSelect.plaintiffs"
            label="Plaintiff"
            item-text="name"
            item-value="id"
            class="pa-1"
            return-object
            @input="changeDetail('plaintiff', $event)"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            :value="item.defendant"
            :items="overviewSelect.defendants"
            label="Defendant"
            item-text="name"
            item-value="id"
            class="pa-1"
            return-object
            @input="changeDetail('defendant', $event)"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { overviewSelect } from "../../config";
export default {
  props: {
    item: Object
  },
  data() {
    return {
      overviewSelect
    };
  },
  methods: {
    changeDetail(e, i) {
      const data = {
        name: e,
        value: i
      };
      this.$emit("changeDetail", data);
    }
  }
};
</script>
