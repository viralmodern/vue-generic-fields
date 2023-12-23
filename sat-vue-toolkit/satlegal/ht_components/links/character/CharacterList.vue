<template>
  <v-row no-gutters>
    <v-col cols="12" class="text-xs-right">
      <v-spacer />
      <FilterCharacter />
      <v-btn
        icon
        :to="{ name: 'activity', params: { listType: 'grid' } }"
        active-class="primary--text"
      >
        <v-icon>mdi-view_list</v-icon>
      </v-btn>
      <v-btn
        icon
        :to="{ name: 'activity', params: { listType: 'timeline' } }"
        active-class="primary--text"
      >
        <v-icon>mdi-timeline</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import FilterCharacter from "../../filter/FilterCharacter";
export default {
  components: {
    FilterCharacter
  }
};
</script>
