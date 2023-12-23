<template>
  <v-card>
    <v-row no-gutters class="px-4 mt-3">
      <v-card class="elevation-4 card-title-policy" dark color="primary">
        <v-row no-gutters class="pa-3">
          <div>
            <h4 class="title pr-1 font-weight-light">{{ panelTitle }}</h4>
          </div>
        </v-row>
      </v-card>
    </v-row>
    <slot />
    <div style="text-align: right" class="pb-2" v-if="!hiddenEdit">
      <v-divider />
      <v-btn @click="edit" color="primary">Edit</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    panelTitle: String,
    hiddenEdit: Boolean
  },
  methods: {
    edit() {
      this.$emit("edit");
    }
  }
};
</script>

<style scoped>
.card-title-policy {
  width: 100%;
  margin-top: -20px;
  border-radius: 6px;
}
.btn-edit {
  top: calc(50% - 18px);
}
</style>
