<template>
  <v-row no-gutters class="pa-2 align-center">
    <v-col cols="6">
      <span class="subheading font-weight-bold">{{ text }}</span>
    </v-col>
    <v-col cols="6" class="text-xs-center">
      <SliderPercent
        :value="value"
        type="circular"
        @onChange="$emit('update', $event)"
      />
    </v-col>
  </v-row>
</template>

<script>
import SliderPercent from "../../menus/SliderPercent";

export default {
  components: {
    SliderPercent
  },
  props: {
    text: String,
    value: [Number, String]
  }
};
</script>
