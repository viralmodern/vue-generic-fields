<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    max-width="600px"
    min-width="600px"
    :nudge-width="200"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <div v-on="on" class="text-capitalize d-flex align-center cusor--pointer">
        <v-icon small>mdi-filter</v-icon>
        <div class="text-caption mx-1">
          Filter <span v-if="allFilter.length"> ({{ allFilter.length }}) </span>
        </div>
      </div>
    </template>
    <v-card dense>
      <v-card-text>
        <FilterBuilder />
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import FilterBuilder from './filter_builder/FilterBuilder'
import { mapGetters } from 'vuex'

export default {
  name: 'MenuFilterBoard',
  components: { FilterBuilder },
  data() {
    return {
      menu: false,

      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'action', value: 'action' },
      ],
      desserts: [
        {
          name: 'Where',
          calories: 159,
          fat: 6.0,
          carbs: 24,
        },
        {
          name: 'And',
          calories: 237,
          fat: 9.0,
          // carbs: 37,
        },
      ],
    }
  },
  computed: {
    // ...mapGetters("filterBuilder", ["allFilter"])
    allFilter() {
      try {
        return this.$store.getters['filterBuilder/allFilter']
      } catch (e) {
        return []
      }
    },
  },
}
</script>

<style scoped></style>
