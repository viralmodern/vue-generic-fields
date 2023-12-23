<template>
  <div class="px-2">
    <v-row class="pa-2 align-center" no-gutters>
      <v-col cols="6">
        <span class="subheading font-weight-bold">Priority:</span>
      </v-col>
      <v-col cols="6" class="text-xs-center">
        <SelectInline
          :item="evidencesJoin"
          :items="evidencesConvert"
          keyText="name"
          keyColor="color"
          @select="$emit('update', {newValue: $event.id, columnName: 'priority'})"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="pa-2 align-center" no-gutters>
      <v-col cols="6">
        <span class="subheading font-weight-bold">Total items:</span>
      </v-col>
      <v-col cols="6" class="text-xs-center">{{items.total_request_items || 0}}</v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="pa-2 align-center" no-gutters>
      <v-col cols="6">
        <span class="subheading font-weight-bold">Progress:</span>
      </v-col>
      <v-col cols="6" class="text-xs-center">{{items.current_progress || 0}}</v-col>
    </v-row>
  </div>
</template>

<script>
import { evidencesLevel } from "../../../../config";
import SelectInline from "../../../menus/SelectInline";
export default {
  props: {
    items: Object
  },
  components: {
    SelectInline
  },
  data() {
    return {
      evidencesLevel
    };
  },
  computed: {
    evidencesConvert() {
      const arrColor = ["#512da8", "#76ff03", "#f50057", "#00c853", "#ff6f00"];
      return (this.evidencesLevel || []).map((x, i) => {
        return {
          ...x,
          color: arrColor[i]
        };
      });
    },
    evidencesJoin() {
      return (this.evidencesConvert || []).find(
        item => item.id === this.items.priority
      );
    }
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.label /deep/ .label-item {
  flex-wrap: wrap;
}
</style>

