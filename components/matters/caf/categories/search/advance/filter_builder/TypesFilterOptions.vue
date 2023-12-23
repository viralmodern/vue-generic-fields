<template>
  <v-autocomplete hide-details
                  label="Components"
                  placeholder="..."
                  item-text="title"
                  item-value="id"
                  return-object
                  dense
                  v-model="typesFilter"
                  :items="filterTypes">
    <template v-slot:item="data">
      <v-list-item-icon>
        <v-icon>{{data.item.icon}}</v-icon>
      </v-list-item-icon>
      <v-list-item-content v-text="data.item.title"></v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: "TypesFilterOptions",
    props: ["item"],
    computed: {
      ...mapGetters("cafs/search/filterBuilder", ["filterTypes"]),
      typesFilter: {
        get() {
          return this.item.filter_type
        },
        set(val) {
          this.updateFilter({item: this.item, val});
        }
      }
    },
    methods: {
      ...mapActions("cafs/search/filterBuilder", ["updateFilter"])
    }
  }
</script>

<style scoped>

</style>
