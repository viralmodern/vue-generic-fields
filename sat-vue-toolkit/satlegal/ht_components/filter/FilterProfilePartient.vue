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
            <v-combobox
              :items="patientType"
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
import { patientType } from "../../config";
import SelectMultipleUser from "../inputs/SelectMultipleUser";
export default {
  components: {
    SelectMultipleUser
  },
  data() {
    return {
      isShowFilter: false,
      creator: [],
      patientType
    };
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"]), // eslint-disable-line
    ...mapGetters("ht_store/project/members", ["members"]), // eslint-disable-line
    ...mapGetters("ht_store/matter/partient/profile", ["hasFilter"]) // eslint-disable-line
  },
  methods: {
    filterRequest(name, value) {
      this[name] = value;
      this.filterPartientProfileRequest({ name, value });
    },
    close() {
      this.openRight("filterProfilePartient");
    },
    ...mapMutations("ht_store/layout", ["openRight"]), // eslint-disable-line
    ...mapActions("ht_store/matter/partient/profile", ["filterPartientProfileRequest"]) // eslint-disable-line
  }
};
</script>
