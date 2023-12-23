<template>
  <div class="mx-2 mt-12">
    <MaterialPanel panelTitle="Overview deponent" :hiddenEdit="true">
      <div class="px-4 py-2">
        <div class="py-2">
          <h4>First name</h4>
          <span class="pt-2">
            <v-text-field
              hide-details
              :value="dataDeponentDetail.first_name"
              @change="update('first_name', $event)"
              class="ma-0 pa-0 custom-text-field"
            ></v-text-field>
          </span>
        </div>
        <v-divider></v-divider>
        <div class="py-2">
          <h4>Last name</h4>
          <span class="pt-2">
            <v-text-field
              hide-details
              :value="dataDeponentDetail.last_name"
              @change="update('last_name', $event)"
              class="ma-0 pa-0 custom-text-field"
            ></v-text-field>
          </span>
        </div>
        <v-divider></v-divider>
        <div class="py-1">
          <h4>Address</h4>
          <div class="text--secondary">
            <v-textarea
              hide-details
              :value="dataDeponentDetail.address"
              @change="update('desc', $event)"
              class="ma-0 pa-0 custom-text-field"
            ></v-textarea>
          </div>
        </div>
      </div>
    </MaterialPanel>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import MaterialPanel from "../../panels/MaterialPanel";
export default {
  components: {
    MaterialPanel
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/deposition/detail/deponent", [
      "getDataDeponentDetailRequest",
      "editDataDeponentDetailRequest"
    ]),
    update(column, value) {
      this.editDataDeponentDetailRequest({ column, value });
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/detail/deponent", [
      "dataDeponentDetail"
    ])
  },
  mounted() {
    this.getDataDeponentDetailRequest();
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
</style>
