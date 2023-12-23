<template>
  <v-card style="border-radius: 6px;" class="card-content">
    <confirmDeleteBoard @removeItems="removeItems" class="btn-edit-card ma-0"/>
    <v-card-title class="subheading" primary-title>{{cardBlock.title}}r</v-card-title>
    <v-divider></v-divider>
    <v-card-actions class="pa-3">
      <v-icon small>mdi-visibility</v-icon>
      <v-spacer></v-spacer>
      <v-icon small>mdi-attachment</v-icon>
      <span class="ml-2 caption">{{cardBlock.attachment}}</span>
      <v-icon small class="ml-2">mdi-comment</v-icon>
      <span class="ml-2 caption">{{cardBlock.comments}}</span>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import confirmDeleteBoard from "../dialogs/confirmDeleteBoard";
export default {
  components: {
    confirmDeleteBoard
  },
  props: {
    cardBlock: Object
  },
  methods: {
    ...mapActions("ht_store/project/credlibleBoard", ["deleteBlock"]),
    removeItems() {
      this.deleteBlock(this.cardBlock);
    }
  }
};
</script>
<style scoped>
.btn-edit-card {
  position: absolute;
  top: 2px;
  right: 2px;
  display: none;
}
.card-content:hover {
  cursor: pointer;
}
.card-content:hover .btn-edit-card {
  display: block;
}
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
