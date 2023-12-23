<template>
  <div v-if="!isOpen" style="width:100%">
    <v-btn :block="block" color="primary" class="pa-0" @click="openAddNew">
      <span>{{ actionName }}</span>
      <v-icon class="pl-1">mdi-add_circle</v-icon>
    </v-btn>
  </div>
  <AddNew
    v-else
    @add="submit"
    @close="close"
    :class="[classTextField]"
    :hint="hint"
  />
</template>

<script>
import AddNew from "./AddInline";

export default {
  components: {
    AddNew
  },
  props: {
    actionName: String,
    block: Boolean,
    classTextField: String,
    hint: String
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    openAddNew() {
      this.isOpen = true;
    },
    submit(text) {
      this.$emit("submit", text);
    },
    close() {
      this.isOpen = false;
    }
  }
};
</script>
