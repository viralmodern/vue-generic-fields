<template>
  <v-dialog :value="isShowPopup" scrollable @input="closeDialog" width="355">
    <v-card>
      <Picker title="Pick your emoji…" emoji="point_up" @select="emojiPickup" />
    </v-card>
  </v-dialog>
</template>
<script>
import { Picker } from "emoji-mart-vue";

export default {
  props: {
    isShowPopup: Boolean
  },
  components: {
    Picker
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    emojiPickup(emoji) {
      this.$emit("select", emoji.native);
    }
  }
};
</script>
