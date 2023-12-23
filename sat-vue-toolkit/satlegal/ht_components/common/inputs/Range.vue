<template>
  <div>
    <v-row no-gutters>
      <v-menu
        v-model="menu"
        transition="scale-transition"
        offset-y
        :close-on-content-click="false"
        nudge-width="300"
      >
        <template v-slot:activator="{ on }">
          <span v-on="on"
            ><v-chip class="white--text px-4" rounded :color="showColor" small
              >{{ value }} %</v-chip
            ></span
          >
        </template>
        <v-list v-if="!isReadOnly">
          <v-list-item>
            <v-slider
              class="py-5"
              hide-details
              :value="value"
              @change="$emit('update', $event)"
              :thumb-size="20"
              thumb-label="always"
            ></v-slider>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: false
    };
  },
  props: {
    value: Number,
    isReadOnly: Boolean
  },
  computed: {
    showColor() {
      let result = parseInt(this.value);
      if (result < 40) {
        return "red";
      } else if (result > 70) {
        return "primary";
      } else {
        return "success";
      }
    }
  }
};
</script>
