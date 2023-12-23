<template>
  <v-row no-gutters fill-height>
    <v-list>
      <div>
        <v-list-item>
          <v-btn block color="primary" :outlined="!mode" @click="$emit('turnOnMap')">
            <span>Relationship map</span>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block color="primary" @click="isShowAdd = true">
            <span>Add new Character</span>
            <v-icon class="pl-1">mdi-add_circle</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
      </div>
      <div v-for="item in filters " :key="item.id">
        <v-list-item>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <h3 class="ml-3">Types</h3>
      <div class="filterCheckbox">
        <v-list-item v-for="item in characterType" :key="item.id">
          <v-list-item-action>
            <v-checkbox></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-chip small :color="item.color" class="white--text pb-1">
                <span>{{item.name}}</span>
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
    <AddCharacter
      :isShow="isShowAdd"
      title="Add new Character"
      @close="isShowAdd = false"
      @submit="add"
    />
  </v-row>
</template>
<script>
import { characterType } from "../../config.js";
import { mapActions } from "vuex";

import AddCharacter from "../research/characters/AddCharacter";
export default {
  components: {
    AddCharacter
  },
  props: {
    mode: Boolean
  },
  data() {
    return {
      filters: [
        {
          id: Math.random(),
          name: "All characters",
          icon: "perm_contact_calendar"
        },
        {
          id: Math.random(),
          name: "Frequently characters",
          icon: "contact_phone"
        },
        {
          id: Math.random(),
          name: "Key characters",
          icon: "vpn_key"
        }
      ],
      isShowAdd: false,
      characterType
    };
  },
  methods: {
    async add({ first_name, last_name, phone, type, email }) {
      const data = {
        first_name,
        last_name,
        email,
        phone,
        type
      };
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      this.addDataCharacterRequest({ matterId, data });
    },
    ...mapActions("ht_store/matter/character", ["addDataCharacterRequest"])
  }
};
</script>

