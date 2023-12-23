<template>
  <div>
    <v-btn rounded color="primary" :outlined="!hasFilter" @click="openRight('filterToolbox')">
      Filter is {{hasFilter ? 'on' : 'off'}}
      <v-icon right>mdi-filter_list</v-icon>
    </v-btn>
    <v-navigation-drawer fixed :value="rightType==='filterToolbox'" right clipped app>
      <v-list dense>
        <div class="pa-2">
          <v-row no-gutters class="align-center">
            <h2>Filters</h2>
            <v-spacer></v-spacer>
            <v-btn icon class="ma-0">
              <v-icon @click="close">mdi-close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <div class="pa-2">
          <div>
            <v-text-field
              label="Name"
              placeholder="Search name matter"
              prepend-icon="search"
              @input="changeName"
            />
          </div>
          <div>
            <v-combobox
              :items="typeMaster"
              item-text="name"
              item-value="id"
              label="Types"
              prepend-icon="search"
              placeholder="Choose type"
              return-object
              @change="filterRequest('type', $event ? $event.id : undefined)"
            ></v-combobox>
          </div>
          <div>
            <SelectMultipleUser
              placeholder="Choose creator"
              prepend-icon="search"
              label="Creator"
              :user="creator"
              :users="members"
              @change="filterRequest('creator', $event.length ? $event : undefined)"
              item-value="id"
              itemText="avatar.name"
              itemImg="avatar.imageUrl"
              multiple
            />
          </div>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { typeMaster } from "../../config";
import SelectMultipleUser from "../inputs/SelectMultipleUser";
export default {
  components: {
    SelectMultipleUser
  },
  data() {
    return {
      isShowFilter: false,
      creator: [],
      typeMaster,
      timeOut: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/matter", ["hasFilter"])
  },
  methods: {
    changeName(value) {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.filterRequest("title", value ? value : undefined);
      }, 1000);
    },
    filterRequest(name, value) {
      this[name] = value;
      this.filterMatterRequest({ name, value });
    },
    close() {
      this.openRight("filterToolbox");
    },
    ...mapMutations("ht_store/layout", ["openRight"]),
    ...mapActions("ht_store/matter", ["filterMatterRequest"])
  }
};
</script>
