<template>
  <div class="py-2">
    <div class="px-3">
      <v-card flat>
        <v-card-title class="py-2 text-body-2">
          <v-spacer></v-spacer>
          <div class="d-flex">
            <v-btn
              text
              small
              :to="{ name: 'character', query: { group: 'all' } }"
              class="mr-2 "
              active-class="primary"
              >List Character</v-btn
            >
            <v-btn
              text
              small
              active-class="primary"
              :to="{ name: 'characterRelationship' }"
              >Relationship Map</v-btn
            >
          </div>
        </v-card-title>
      </v-card>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  layout: 'app',
  name: "CharacterPage1"
};
</script>
