<template>
  <td>
    <v-menu
      ref="isShowDueDate"
      v-model="isShowDueDate"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          class="custom-text-field"
          v-model="dueDate"
          persistent-hint
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="dueDate"
        no-title
        @input="isShowDueDate = false"
        @change="changeData"
      ></v-date-picker>
    </v-menu>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object
  },
  data() {
    return {
      isShowDueDate: false,
      dueDate: ""
    };
  },
  methods: {
    changeData() {
      const data = {
        id: this.dataRow.id,
        value: this.newValue,
        nameRow: "dueDate"
      };
      this.$emit("changeDocument", data);
    }
  },
  mounted() {
    this.dueDate = this.dataRow.dueDate;
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
