<template>
  <div class="fill-height">
    <v-list class="v-list">
      <v-row no-gutters class="justify-space-between align-center">
        <v-btn icon>
          <v-icon color="primary">mdi-settings</v-icon>
        </v-btn>
        <span class="text-body-2">Messenger</span>
        <NewMessageClient />
      </v-row>
    </v-list>
    <v-divider></v-divider>
    <ListMessage :chatGroups="chatGroups" />
  </div>
</template>

<script>
import ListMessage from "./ListMessage";
import NewMessageClient from "../../../../ht_components/dialogs/NewMessageClient";
export default {
  components: {
    ListMessage,
    NewMessageClient
  },
  props: {
    chatGroups: Array
  }
};
</script>
<style scoped>
.v-list /deep/ .v-toolbar__content {
  padding: 0px;
  box-shadow: none;
}
</style>
