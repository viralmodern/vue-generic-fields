<template>
  <v-select :items="matchTypes"
            hide-details
            v-model="getItems"
            return-object
            item-text="label"
            item-value="id"
            placeholder="..."
            dense
            :disabled="disableMatchPos"
            label="Standard"></v-select>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "MatchFilterOptions",
    props: ["item"],
    computed: {
      ...mapGetters("cafs/search/filterBuilder", ["matchTypes", "activeMatchType", "allFilter"]),
      disableMatchPos() {
        try {
          let idx = this.allFilter.findIndex(i => i.id === this.item.id);
          return idx !== 0;
        } catch (e) {
          return false;
        }
      },
      getItems: {
        get() {
          return this.activeMatchType
        },
        set(val) {
          console.log(val);
          this.setActiveMatchType(val);
        }
      }
    },
    methods: {
      ...mapActions("cafs/search/filterBuilder", ["setActiveMatchType"])
    }
  }
</script>

<style scoped>

</style>
