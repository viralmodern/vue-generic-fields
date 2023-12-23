<template>
  <v-row no-gutters class="align-center">
    <v-chip
      width="220px"
      label
      class="custom-chip1"
      style="width: 220px"
      @click="$emit('choseLabel')"
    >
      <v-row class="align-center">
        <v-col cols="10">
          <span>{{ text }}</span>
        </v-col>
        <v-col cols="2" v-if="check">
          <v-icon v-if="check" small>&nbsp;&nbsp;check</v-icon>
        </v-col>
      </v-row>
    </v-chip>
    <v-btn @click="$emit('openEdit')" class="ma-0" icon small>
      <v-icon class="text--secondary px-1" small>edit</v-icon>
    </v-btn>
    <v-btn @click="isShowPopup = true" class="ma-0" icon small>
      <v-icon class="text--secondary" small>close</v-icon>
    </v-btn>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="remove"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this item?"
    />
  </v-row>
</template>

<script>
import ConfirmItem from "../dialogs/ConfirmItem";

export default {
  components: {
    ConfirmItem
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  props: {
    text: String,
    check: Boolean
  },
  methods: {
    remove() {
      this.$emit("removeLabel");
      this.isShowPopup = false;
    }
  }
};
</script>

<style scoped>
.custom-chip1 {
  margin: 2px 4px 2px 0px;
}
.custom-chip1 /deep/ .v-chip__content {
  width: 100%;
  cursor: pointer;
}
.custom-chip1 /deep/ .v-chip__content span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
