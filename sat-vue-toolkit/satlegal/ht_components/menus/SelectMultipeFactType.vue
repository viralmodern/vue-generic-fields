<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-chip
        class="ml-0"
        small
        :color="showClassColor(item[itemText])"
        text-color="white"
        v-on="on"
        >{{ item[itemText] }}</v-chip
      >
    </template>
    <v-list>
      <v-row
        no-gutters
        v-for="(item, index) in items"
        :key="index"
        class="ma-2"
      >
        <v-btn
          class="px-2 white--text text-capitalize"
          rounded
          :color="showClassColor(item[itemText])"
          small
          @click="submit(item)"
          >{{ item[itemid] }}: {{ item[itemText] }}</v-btn
        >
      </v-row>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    item: Object,
    items: Array,
    itemText: String,
    itemid: String
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    showClassColor(name) {
      if (name == "Ultimate") {
        return "#1b776f";
      } else {
        return "#b11d24";
      }
    },
    submit(item) {
      this.$emit("onChange", item), (this.menu = false);
    }
  }
};
</script>
