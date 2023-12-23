<template>
  <div class="pl-1">
    <v-row
      @click="isShow = true"
      v-if="!isShow"
      :color="color"
      style="cursor: pointer"
      class="align-center"
      no-gutters
    >
      <span class="primary--text">{{ nameBtnAdd }}</span>
      &nbsp;
      <v-icon small color="primary pa-0">mdi-add</v-icon>
    </v-row>
    <AddInline
      v-else
      style="width:300px"
      @add="$emit('add', $event)"
      @close="isShow = false"
      :hint="hint"
    />
  </div>
</template>
<script>
import AddInline from "./AddInline";
export default {
  components: {
    AddInline
  },
  props: {
    nameBtnAdd: String,
    hint: String,
    color: String
  },
  data() {
    return {
      isShow: false
    };
  }
};
</script>
