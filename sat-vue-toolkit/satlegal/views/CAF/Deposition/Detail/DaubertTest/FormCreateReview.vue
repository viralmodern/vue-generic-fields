<template>
  <div>
    <v-btn
      v-if="!isShowAdd"
      style="text-transform: unset;"
      text
      class="pa-1 primary--text"
      @click="isShowAdd = true"
    >
      <v-icon small>mdi-add</v-icon>New Reviews
    </v-btn>
    <div v-else style="position: relative">
      <AddIcon
        style="position: absolute;top: 5px;"
        @onClickIcon="isShowAdd = false"
        icon="mdi-close"
        colorButton="warning"
        colorIcon="white"
      />
      <v-form class="ml-9" ref="form" v-model="valid">
        <v-row class="ma-0">
          <v-col cols="9" class="pa-0 pr-2">
            <v-text-field
              v-model="publication_name"
              autofocus
              class="custom ma-0 pa-0"
              placeholder="Publication name"
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn small class="primary mx-1" @click="add" :loading="isLoadingAdd">Add</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";

export default {
  components: {
    AddIcon
  },
  props: {
    daubertId: [Number, String],
    detail: Boolean
  },
  data() {
    return {
      valid: false,
      publication_name: "",
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  methods: {
    async add() {
      if (this.$refs.form.validate()) {
        const data = {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          daubertId: this.daubertId,
          body: {
            publication_name: this.publication_name
          },
          detail: this.detail
        };
        try {
          this.isLoadingAdd = true;
          await this.postCreateReviews(data);
          this.$emit("onAddNewCustodyItemSuccess");
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.publication_name = "";
    },
    ...mapActions("ht_store/matter/deposition/daubertTest", [
      "postCreateReviews"
    ])
  },
  watch: {
    isShowAdd(val) {
      if (!val) {
        this.clearForm();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.custom {
  /deep/ .v-text-field__slot {
    font-size: 13px;
    width: 100px;
  }
}
</style>
