<template>
  <v-row>
    <v-col cols="12">
      <p class="ma-0 title">{{ title }}</p>
    </v-col>
    <v-col v-for="caf in list" :key="caf.text" cols="12" md="3" sm="6">
      <v-card
        :color="caf.color"
        style="border-width: 4px;"
        :outlined="caf.activate"
        dark
        @click="$emit('openDetail', caf)"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <!--            <v-list-item-title class="text-subtitle-1">{{caf.text}}</v-list-item-title>-->
            <!--            <v-list-item-subtitle class="text-caption">by Kurt Wagner</v-list-item-subtitle>-->
            {{ caf.text }}
          </v-list-item-content>
        </v-list-item>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
          height="194"
        ></v-img>
        <v-btn
          color="success"
          fab
          small
          light
          absolute
          bottom
          right
          v-if="caf.activate"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CafsCategory',

  props: {
    list: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: 'Title',
    },
  },
}
</script>

<style scoped></style>
