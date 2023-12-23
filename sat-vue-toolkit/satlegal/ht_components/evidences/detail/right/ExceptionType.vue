<template>
  <v-row no-gutters class="pa-2">
    <v-col cols="12">
      <v-select
        v-if="exception"
        class="ma-0"
        item-text="name"
        item-value="id"
        label="Exception type"
        :value="exceptionType"
        :items="listType"
        @change="$emit('update', $event)"
      ></v-select>
      <v-row class="align-center" v-else>
        <v-col cols="6">
          <span class="subheading font-weight-bold">Exception type</span>
        </v-col>
        <v-col cols="6" class="text-xs-center">
          <span>{{ exceptionType }}</span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { listExceptionType } from "../../../../config";

export default {
  props: {
    exception: Boolean,
    available: Boolean,
    exceptionType: [Number, String]
  },
  data() {
    return {
      listExceptionType
    };
  },
  computed: {
    listType() {
      const type = this.exception && this.available;
      const result = this.listExceptionType.filter(
        x => x.type === (type ? 1 : 2)
      );
      return result;
    }
  }
};
</script>
