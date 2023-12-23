<template>
  <v-list class="v-list">
    <v-row no-gutters class="align-center" style="height: 60px;">
      <span class="ml-3">
        <v-checkbox
          @change="change"
          :value="isCheckAll"
          :indeterminate="!isCheckAll ? !indeterminate : null"
        ></v-checkbox>
      </span>
      <MenuFilterCheckbox
        :nameFilters="nameTypes"
        @filterCheckboxType="filterCheckboxType"
      />
      <MenuLabels
        v-if="nameTypes !== 'None'"
        :dataLabels="dataLabels"
        @updateLabels="$emit('updateLabels', $event)"
      />
    </v-row>
  </v-list>
</template>
<script>
import MenuLabels from "./menu/MenuLabels";
import MenuFilterCheckbox from "./menu/MenuFilterCheckbox";
export default {
  components: {
    MenuFilterCheckbox,
    MenuLabels
  },
  props: {
    isCheckAll: Boolean,
    indeterminate: Boolean,
    nameFilters: String,
    dataLabels: Array,
    arrId: Array
  },
  data() {
    return {
      nameTypes: "None"
    };
  },
  mounted() {
    this.nameTypes = this.nameFilters;
  },
  methods: {
    filterCheckboxType(evt) {
      this.nameTypes = evt.name;
      this.$emit("filterCheckboxType", evt);
    },
    change() {
      this.$emit("checkBoxItem", this.isCheckAll);
      this.nameTypes = !this.isCheckAll ? "All" : "None";
    }
  },
  watch: {
    arrId(arr) {
      if (
        (this.nameTypes === "All" && this.nameTypes === "None") ||
        arr.length > 0
      ) {
        this.nameTypes = arr.length > 0 ? "All" : "None";
      } else if (arr.length === 0) {
        this.nameTypes = "None";
      } else {
        this.nameTypes = this.nameTypes;
      }
    }
  }
};
</script>
<style scroped>
.v-list {
  padding: 0px 0 0px;
}
</style>
