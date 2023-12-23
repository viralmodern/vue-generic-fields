<template>
  <div class="text-xs-center">
    <v-dialog persistent :value="isShow" @input="cancel" width="500">
      <v-card>
        <div class="primary">
          <v-row no-gutters class=" justify-center align-center pa-3">
            <div class="title font-weight-regular white--text">{{ title }}</div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="cancel">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="px-3 py-2">
            <v-col cols="12">
              <div class="py-2">
                <span>Announcement</span>
              </div>
              <v-textarea
                class="custom-textarea pa-0"
                :rules="[v => !!v || 'Announcement is required']"
                solo
                v-model="textAnnouncement"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn class="v-btn theme--light primary" @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    isShow: Boolean,
    title: String
  },
  data() {
    return {
      valid: true,
      textAnnouncement: ""
    };
  },
  methods: {
    ...mapActions("ht_store/announcement", ["createAnnouncement"]),
    clear() {
      this.textAnnouncement = "";
    },
    cancel() {
      this.$emit("closeModal");
      this.clear();
      this.$refs.form.resetValidation();
    },
    add() {
      if (this.$refs.form.validate()) {
        this.createAnnouncement(this.textAnnouncement);
        this.cancel();
      }
    }
  }
};
</script>

<style scoped>
.custom-textarea /deep/ .v-text-field__details {
  padding: unset;
}
</style>
