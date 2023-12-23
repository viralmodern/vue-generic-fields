<template>
  <base-caf>
    <v-card :elevation="0">
      <v-card-title>
        <v-icon left> mdi-bookmark</v-icon>
        Search
        <v-spacer/>
        <v-btn link text input-value="simple" color="primary" class="text-capitalize" :to="{query: {by: 'simple'}}" exact>
          Simple search
        </v-btn>
        <v-btn link text color="primary" class="text-capitalize" :to="{query: {by: 'advance'}}" exact>
          Advance search
        </v-btn>
      </v-card-title>
      <v-card-text>
        <simple-search v-if="isSimple"/>
        <advance-search v-else/>
      </v-card-text>
    </v-card>
  </base-caf>
</template>

<script>
  import BaseCaf from "../../utils/BaseCaf"
  import SimpleSearch from "./SimpleSearch"
  import AdvanceSearch from "./AdvanceSearch"

  export default {
    components: { AdvanceSearch, SimpleSearch, BaseCaf },
    data() {
      return {
        isSimpleSearch: true
      }
    },
    computed: {
      isSimple() {
        let isSimple = this.$route.query.by === 'simple' || this.$route.query.by !== 'advance'
        return this.$route.name === 'matters-matter-caf-search' && isSimple
      }
    }
  }
</script>

<style scoped>

</style>
