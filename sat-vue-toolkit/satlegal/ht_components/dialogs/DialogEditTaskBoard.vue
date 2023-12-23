<template>
  <v-dialog persistent :value="isDialogEdit" @input="close" width="500">
    <v-card>
      <div class="primary">
        <v-row no-gutters class=" justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">{{ title }}</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="close">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-text>
        <v-col class="px-2">
          <v-form ref="form">
            <v-col cols="12">
              <v-text-field
                v-model="name"
                :rules="[v => (v || '').length > 0 || requireName]"
                :label="label"
                required
                append-icon="event_note"
              ></v-text-field>
            </v-col>
          </v-form>
        </v-col>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn class="v-btn theme--light primary" @click="add">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  props: {
    title: String,
    itemList: Object,
    isDialogEdit: Boolean,
    requireName: String,
    label: String
  },
  methods: {
    add() {
      const data = {
        id: this.itemList.id,
        name: this.name,
        alias: this.name.toLowerCase()
      };
      this.$emit("add", data);
      this.$emit("closeDialog");
    },
    close() {
      this.$emit("closeDialog");
      this.name = this.itemList.name;
      this.$refs.form.resetValidation();
    }
  },
  watch: {
    itemList(val) {
      this.name = val.name;
    }
  }
};
</script>
