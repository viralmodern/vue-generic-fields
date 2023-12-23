<template>
  <v-row class="white" fill-height no-gutters>
    <v-col cols="12" class="text-xs-right border">
      <v-tooltip
        bottom
        v-for="item in items"
        :key="item.value"
        v-slot:activator="{ on }"
      >
        <v-btn
          icon
          @click="mode = item.value"
          :class="mode === item.value ? 'primary--text' : ''"
          v-on="on"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
        <span>{{ item.name }}</span>
      </v-tooltip>
    </v-col>
    <v-col cols="12">
      <div v-if="mode === 1">
        <RequestTaskSlick />
      </div>
      <div v-else>
        <RequestTaskKanban class="py-2 custom-kanban" />
      </div>
    </v-col>
  </v-row>
</template>
<script>
import RequestTaskSlick from "./RequestTaskSlick";
import RequestTaskKanban from "./RequestTaskKanban";
export default {
  components: {
    RequestTaskSlick,
    RequestTaskKanban
  },
  props: {
    dataRequestDetail: Object
  },
  data() {
    return {
      mode: 1,
      items: [
        {
          value: 1,
          name: "Slick Grid",
          icon: "view_quilt"
        },
        {
          value: 2,
          name: "Kanban",
          icon: "view_list"
        }
      ]
    };
  }
};
</script>

<style scoped>
.border {
  border: 1px solid #d4cdcd8a;
}
.custom-kanban /deep/ .drag-column {
  margin: 0px;
  margin-right: 20px;
  flex-basis: 31%;
}
</style>
