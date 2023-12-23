<template>
  <div class="text-xs-center">
    <v-menu offset-x :nudge-width="100">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon>
          <v-icon :color="showColor(items.color)">star</v-icon>
        </v-btn>
      </template>
      <v-list class="pa-2">
        <v-row  no-gutters>
          <v-chip
            v-for="item in arrColor"
            :key="item.id"
            :color="item.text"
            text-color="white"
            style="justify-content: center;"
            @click="$emit('selectColor', { color: item, items })"
            >{{ item.text }}</v-chip
          >
        </v-row>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  props: {
    arrColor: Array,
    items: Object
  },
  methods: {
    showColor(e) {
      return this.arrColor.filter(x => x.id === e)[0].text;
    }
  }
};
</script>
