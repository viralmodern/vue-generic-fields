<template>
  <div>
    <h3>Description</h3>
    <div class="pa-2">
      <v-textarea
        hide-details
        auto-grow
        :value="item.description"
        @change="updatePracticeRequest({description : $event })"
        class="ma-0 pa-2 custom-text-field fieldDes"
        rows="1"
      ></v-textarea>
    </div>
    <v-col class="pa-2">
      <DifferenceTabel/>
    </v-col>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import DifferenceTabel from "./DifferenceTabel"
export default {
  props: {
    item: Object
  },
  components: {
    DifferenceTabel
  },
  methods: {
    ...mapActions("ht_store/matter/partient/practice/detail", [
      "updatePracticeRequest"
    ])
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.fieldDes {
  background: #eceff1;
}
.theme--dark.fieldDes {
  background: #909090;
}
</style>
