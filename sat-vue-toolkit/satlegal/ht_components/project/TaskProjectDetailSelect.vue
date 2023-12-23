<template>
  <v-row no-gutters class="pa-2" v-if="dataSelect">
    <v-col cols="12">
      <v-row no-gutters>
        <v-col sm="3">
          <v-select
            :value="favorables"
            item-text="name"
            item-value="id"
            :items="dataSelect.favorable"
            label="Favorable"
            return-object
            class="pa-1"
            @input="changeFavorables"
          ></v-select>
        </v-col>
        <v-col sm="3">
          <v-select
            :value="vulnerabilities"
            item-text="name"
            item-value="id"
            :items="dataSelect.vulnerability"
            label="Vulnerability"
            return-object
            class="pa-1"
            @input="changeVulnerability"
          ></v-select>
        </v-col>
        <v-col sm="3">
          <v-select
            :value="limitations"
            item-text="name"
            item-value="id"
            :items="dataSelect.limitation"
            label="Limitation"
            return-object
            class="pa-1"
            @input="changeLimitation"
          ></v-select>
        </v-col>
        <v-col sm="3">
          <v-select
            :value="treatments"
            item-text="name"
            item-value="id"
            :items="dataSelect.treatment"
            label="Treatment"
            return-object
            class="pa-1"
            @input="changeTreatment"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    dataSelect: Object,
    favorables: Object,
    vulnerabilities: Object,
    limitations: Object,
    treatments: Object
  },
  data() {
    return {};
  },
  methods: {
    changeFavorables(val) {
      this.$emit("changeFavorables", val);
    },
    changeVulnerability(val) {
      this.$emit("changeVulnerability", val);
    },
    changeTreatment(val) {
      this.$emit("changeTreatment", val);
    },
    changeLimitation(val) {
      this.$emit("changeLimitation", val);
    }
  }
};
</script>
