<template>
  <div>
    <ProcessChooseItem
      @searchText="searchText"
      :items="filterListItems"
      :value="joinLocation"
      type="location"
      title="Locations"
      labelSearch="Search location"
      @chooseValue="chooseItem"
      @deleteLocation="deleteLocation"
      @addLocation="addLocation"
      @editLocation="editLocation"
    >
      <template slot="showMessageSearch">
        <span class="mt-5 text-body-1">
          There is no location is matched with your search pattern.
          Consider to add new location using bellow button.
        </span>
      </template>
      <template slot="showItem" slot-scope="props">
        <span>{{ props.item.name }}</span>
      </template>
    </ProcessChooseItem>
  </div>
</template>
<script>
import ProcessChooseItem from "../menus/ProcessChooseItem";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      searchQuery: false
    };
  },
  props: {
    item: Number
  },
  components: {
    ProcessChooseItem
  },
  methods: {
    ...mapMutations("ht_store/matter/location", [
      "removeLocation",
      "addLocation",
      "editLocation"
    ]),
    searchText(text) {
      this.searchQuery = text;
    },
    chooseItem(e) {
      const data = {
        column: "location",
        value: e.id
      };
      this.$emit("updateLocation", data);
    },
    deleteLocation(id) {
      this.removeLocation(id);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/location", ["locations"]),
    joinLocation() {
      return this.locations.find(x => x.id === this.item) || {};
    },
    filterListItems() {
      if (this.searchQuery) {
        return this.locations.filter(x => {
          return x.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      } else {
        return this.locations;
      }
    }
  }
};
</script>
