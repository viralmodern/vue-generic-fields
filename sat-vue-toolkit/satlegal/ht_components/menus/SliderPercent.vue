<template>
  <v-menu top offset-y>
    <template v-slot:activator="{ on }">
      <span v-on="on" v-if="type === 'text'">{{value}}&nbsp;%</span>
      <v-progress-linear
        v-on="on"
        v-if="type === 'progress'"
        class="ma-0"
        color="primary"
        height="15"
        :value="value"
      ></v-progress-linear>
      <v-progress-circular
        v-on="on"
        v-if="type === 'circular'"
        :size="45"
        :value="value"
        :width="5"
        :rotate="-90"
        :color="color"
      >{{value}}%</v-progress-circular>
      <span v-on="on" v-if="type === 'span'">{{value}}</span>
    </template>
    <v-list class="pa-3">
      <v-slider
        :value="value"
        @change="$emit('onChange', $event)"
        :thumb-size="24"
        thumb-label="always"
      ></v-slider>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: [Number, String],
    type: String
  },
  computed: {
    color() {
      return this.value < 20 ? "#D84315" : "primary";
    }
  }
};
</script>