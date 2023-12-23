<template>
  <div>
    <v-row class="align-center" no-gutters>
      <v-chip
        v-for="(item, index) in items"
        :key="index"
        small
        :color="item.color"
        class="ml-0 white--text"
      >{{item.text}}</v-chip>
      <v-btn icon class="ma-0" @click="isShowAddIssue = true">
        <v-icon>mdi-add_circle</v-icon>
      </v-btn>
    </v-row>
    <CreateTextColor
      :isShow="isShowAddIssue"
      @submit="submit"
      @closeModal="cancel"
      btnAdd="Add Issue"
      labelTitle="Add Issue"
      labelColor="Issue name"
    />
  </div>
</template>

<script>
import CreateTextColor from "./CreateTextColor";

export default {
  components: {
    CreateTextColor
  },
  props: {
    items: Array
  },
  data() {
    return {
      isShowAddIssue: false
    };
  },
  methods: {
    submit(value) {
      this.$emit("submit", value);
      this.cancel();
    },
    cancel() {
      this.isShowAddIssue = false;
    }
  }
};
</script>
