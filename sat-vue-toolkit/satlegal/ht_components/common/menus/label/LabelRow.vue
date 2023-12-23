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
      <v-icon class="text--secondary px-1" small>mdi-pencil</v-icon>
    </v-btn>
    <v-btn @click="$emit('onDelete')" class="ma-0" icon small>
      <v-icon class="text--secondary" small>mdi-close</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
import LabelColor from "../../chips/LabelColor";

export default {
  components: {
    LabelColor,
  },
  props: {
    color: String,
    text: String,
    check: Boolean
  },
};
</script>
