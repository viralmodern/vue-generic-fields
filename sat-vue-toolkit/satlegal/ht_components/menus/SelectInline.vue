<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
    offset-y
    :close-on-content-click="false"
    :nudge-width="parseInt(nudgeWidth)"
  >
    <template v-slot:activator="{ on }">
      <v-chip
        v-if="!$scopedSlots.section"
        class="ml-0 pa-2"
        small
        v-on="on"
        :color="item[keyColor]"
        text-color="white"
        >{{ item[keyText] }}</v-chip
      >
      <slot v-else name="section" :item="item"></slot>
    </template>
    <v-list>
      <div>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="select(item)"
        >
          <v-chip
            v-if="!$scopedSlots.menu"
            class="white--text px-4"
            rounded
            :color="item[keyColor]"
            small
            >{{ item[keyText] }}</v-chip
          >
          <slot v-else name="menu" :item="item"></slot>
        </v-list-item>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    item: [Object, Number, String],
    items: Array,
    keyText: String,
    keyColor: String,
    nudgeWidth: [String, Number]
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    select(item) {
      this.$emit("select", item);
      this.menu = false;
    }
  }
};
</script>
