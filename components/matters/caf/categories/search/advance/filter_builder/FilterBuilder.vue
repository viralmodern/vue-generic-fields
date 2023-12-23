<template>
  <div>
    <div v-if="hasFilters">
      <div>
        <template v-for="(item, index) in allFilter">
          <FilterBuilderItem :item="item"
                             :key="index"/>
        </template>
       </div>
      <div class="d-flex align-center">
        <FilterBuilderAddNew @onSave="onSave"/>
        <v-spacer/>
        <v-btn color="success" @click="apply">apply</v-btn>
      </div>
    </div>
    <div v-else>
      <p class="ma-0" style="color: #000;">No Filters Applied</p>
      <p class="ma-0">Add a new filter to single out the items you want to see.</p>
      <FilterBuilderAddNew/>
    </div>
  </div>
</template>

<script>
  import FilterBuilderItem from "./FilterBuilderItem"
  import FilterBuilderAddNew from "./FilterBuilderAddNew"
  import { mapGetters, mapActions } from "vuex"

  export default {
    name: "FilterBuilder",
    components: {
      FilterBuilderAddNew,
      FilterBuilderItem
    },
    data () {
      return {
        rows: [
          {
            id: 0
          },
          {
            id: 1
          }
        ]
      }
    },
    computed: {
      ...mapGetters("cafs/search/filterBuilder", ["allFilter"]),
      hasFilters () {
        try {
          return this.allFilter.length > 0
        } catch (e) {
          return false
        }
      }
    },

    methods: {
      ...mapActions("cafs/search/filterBuilder", ["addNewFilter"]),

      onSave () {
        try {
          this.$emit("onSave")
        } catch (e) {
          console.log("onSave", e.message)
        }
      },
      apply () {
        try {
          this.$emit("onSave")
        } catch (e) {
          console.log(e.message)
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
