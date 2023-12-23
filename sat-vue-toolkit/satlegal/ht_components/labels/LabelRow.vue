<template>
  <v-row no-gutters class="align-center" style="flex-wrap:unset">
    <LabelColor
      width="220px"
      :color="color"
      :text="text"
      :check="check"
      @choseLabel="$emit('choseLabel')"
    />
    <v-btn @click="$emit('openEdit')" class="ma-0" icon small>
      <v-icon class="text--secondary px-1" small>edit</v-icon>
    </v-btn>
    <v-btn @click="isShowPopup = true" class="ma-0" icon small>
      <v-icon class="text--secondary" small>close</v-icon>
    </v-btn>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="remove"
      @cancel="isShowPopup= false"
      messageConfirm="Are you sure you want to delete this item?"
    />
  </v-row>
</template>

<script>
import ConfirmItem from "../dialogs/ConfirmItem";
import LabelColor from "../chips/LabelColor2";

export default {
  components: {
    LabelColor,
    ConfirmItem
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  props: {
    color: String,
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
