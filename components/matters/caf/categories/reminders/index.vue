<template>
  <base-caf>
    <v-card :elevation="0">
      <v-card-title>
        <v-icon left>mdi-timetable</v-icon>
        Reminders
        <v-spacer/>
        <search-input v-model="search" placeholder="Search Reminders"/>
      </v-card-title>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi, eos, error excepturi illo magni,
        molestiae nemo officia quod quos tempore totam! Adipisci hic id ipsa quisquam tempora ullam vel?
      </v-card-text>
      <v-card-text>
        <list-court-order :search="search"/>
      </v-card-text>
    </v-card>
  </base-caf>
</template>

<script>
  import BaseCaf from "../../utils/BaseCaf"
  import ListCourtOrder from "./ListCourtOrder"
  import SearchInput from "../../../../utils/SearchInput"

  export default {
    name: "index",
    components: { SearchInput, ListCourtOrder, BaseCaf },
    data() {
      return {
        search: ''
      }
    }
  }
</script>

<style scoped>

</style>
