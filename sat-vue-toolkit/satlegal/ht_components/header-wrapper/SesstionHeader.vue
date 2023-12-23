<template>
  <v-row no-gutters class="align-center">
    <v-btn
      @click="changeViewTab(false)"
      :color="viewMode === 'exhibit document' ? `primary` : ''"
    >
      <v-icon size="20">mdi-playlist_add</v-icon>
      <span class="ml-1 text-capitalize">Exhibit Document</span>
    </v-btn>
    <v-btn
      @click="changeViewTab(true)"
      :color="viewMode === 'spreadsheet' ? `primary` : ''"
    >
      <v-icon size="20">mdi-list_alt</v-icon>
      <span class="ml-1 text-capitalize">Spreadsheet</span>
    </v-btn>
    <v-btn>
      <span class="text-capitalize mr-2">Export</span>
      <v-icon color="primary">mdi-picture_as_pdf</v-icon>
    </v-btn>
    <v-switch
      v-model="isSwitch"
      class="v-input--selection-controls v-label theme--light"
      hide-details
      color="primary"
      :label="isSwitch === true ? `Spreadsheet` : `Rich editor`"
      @change="$emit('emitChangeSwich', isSwitch)"
    />
    <v-btn color="primary" @click="openRight('notebook-history')">
      <v-icon size="20">mdi-access_time</v-icon>
      <span class="text-capitalize">History</span>
    </v-btn>
    <v-btn color="success" @click="openRight('notebook-comment')">
      <v-badge right color="error">
        <span slot="badge">2</span>
        <v-icon size="17">mdi-message</v-icon>
        <span class="text-capitalize">Comment</span>
      </v-badge>
    </v-btn>
    <!-- <v-btn color="default">
      <span class="text-capitalize">more</span>
      <v-icon class="ml-1">mdi-more_horiz</v-icon>
    </v-btn>-->
    <v-row>
      <v-menu
        style="width: 130px"
        v-model="menu"
        transition="scale-transition"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on }">
          <v-btn color="default" v-on="on">
            <span class="text-capitalize">more</span>
            <v-icon class="ml-1">mdi-more_horiz</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Remove Cover</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Remove Attachment</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
  </v-row>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      isSwitch: true,
      viewMode: "exhibit document",
      menu: false
    };
  },
  methods: {
    ...mapMutations("ht_store/layout", ["openRight"]),
    async changeViewTab(isShow) {
      this.isTabs = !isShow;
      this.viewMode = !this.isTabs ? "spreadsheet" : "exhibit document";
      await this.$emit("emitChangeViewTab", this.viewMode);
    }
  }
};
</script>
<style scoped>
.v-input--selection-controls {
  margin-bottom: 20px;
}
.v-label {
  font-weight: bold;
}
</style>
