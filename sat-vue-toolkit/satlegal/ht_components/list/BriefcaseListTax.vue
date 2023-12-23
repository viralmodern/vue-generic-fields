<template>
  <div>
    <SelectMultiple
      :value="taxes"
      :list="rates"
      title="List Tax"
      labelSearch="Searach tax"
      @select="selectTax"
    >
      <template slot-scope="{ items }" slot="section">
        <v-chip
          class="pa-0 ml-0"
          v-for="item in items"
          :key="item.id"
          label
        >{{item.name}} {{item.rate}}%</v-chip>
      </template>
      <template slot-scope="{ item }" slot="item">
        <v-list-item-avatar class="border">
          <v-icon v-if="item.check">done</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="ml-2">
          <v-row no-gutters class="align-center" style="width:100%">
            <v-col cols="10">{{item.name}}</v-col>
            <v-col cols="2">{{item.rate}}%</v-col>
          </v-row>
        </v-list-item-content>
      </template>
    </SelectMultiple>
    <div v-if="validateTax">
      <span class="red--text">This is required</span>
    </div>
    <div>
      <v-btn color="primary" @click="submit" class="ml-0">Continue</v-btn>
      <v-btn class="my-0" @click="$emit('back')">Back</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SelectMultiple from "../inputs/SelectMultiple";
export default {
  components: {
    SelectMultiple
  },
  data() {
    return {
      taxes: [],
      validateTax: false
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/billing/setting/rate", ["rates"])
  },
  methods: {
    submit() {
      if (this.taxes.length > 0) {
        this.$emit("submit", this.taxes);
        this.validateTax = false;
      } else {
        this.validateTax = true;
      }
    },
    selectTax({ check, id: idSelect }) {
      if (check) {
        this.taxes = this.taxes.filter(id => id !== idSelect);
      } else {
        this.taxes.push(idSelect);
      }
    },
    clear() {
      this.taxes = [];
    },
    ...mapActions("ht_store/workspace/billing/setting/rate", [
      "getDataSettingRateRequest"
    ])
  },
  mounted() {
    this.getDataSettingRateRequest();
  }
};
</script>

<style scoped>
.border /deep/ .v-avatar {
  border: 1px solid silver;
}
</style>
