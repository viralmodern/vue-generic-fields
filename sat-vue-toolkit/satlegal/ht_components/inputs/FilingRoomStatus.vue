<template>
  <v-select
    @click.native.stop
    chips
    class="pa-0 ma-0 mw"
    :value="selectItem"
    :items="listStatus"
    @change="r=>$emit('change',r)"
    item-text="status"
    item-value="status"
    label="Select"
    persistent-hint
    single-line
    hide-details
  >
    <template slot="selection" slot-scope="data">
      <FilingRoomStatus :status="data.item.status" :color="data.item.color"/>
    </template>
  </v-select>
</template>

<script>
import FilingRoomStatus from "../chips/FilingRoomStatus";

export default {
  components: {
    FilingRoomStatus
  },
  data() {
    return {
      listStatus: [
        { status: "Finalizing", color: "secondary" },
        { status: "In Progress", color: "red" },
        { status: "Reviewing", color: "default" },
        { status: "Done", color: "success" },
        { status: "Backlog", color: "orange" },
        { status: "Ignored", color: "purple" }
      ]
    };
  },
  props: {
    selectItem: String
  }
};
</script>

<style scoped>
.mw {
  max-width: 150px !important;
}
</style>


