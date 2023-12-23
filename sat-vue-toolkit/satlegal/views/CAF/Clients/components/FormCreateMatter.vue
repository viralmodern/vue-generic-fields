<template>
  <div>
    <v-btn
      v-if="!isShowAdd"
      style="text-transform: unset;"
      text
      class="pa-1 primary--text"
      @click="isShowAdd = true"
    >
      <v-icon small>mdi-add</v-icon>Add new
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
          <v-col class="pa-0 pr-2">
            <v-textarea
              v-model="name"
              class="custom ma-0 pa-0"
              placeholder="Name"
              autofocus
              auto-grow
              rows="1"
              :rules="[v => !!v || 'This field is required']"
            ></v-textarea>
          </v-col>
          <v-col cols="3" class="pa-0 pr-2 mt-2">
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
    idClient: String,
    detail: Boolean
  },
  data() {
    return {
      valid: false,
      validate: false,
      name: "",
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  methods: {
    ...mapActions("ht_store/clients", ["addMatterOfClient"]),
    validForm() {
      if (!this.date) {
        this.validate = true;
      } else {
        this.validate = false;
      }
    },
    async add() {
      if (this.$refs.form.validate()) {
        const data = {
          body: {
            name: this.name,
            clients: [this.idClient]
          },
          detail: this.detail
        };
        try {
          this.isLoadingAdd = true;
          await this.addMatterOfClient(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.name = "";
      this.$refs.form.resetValidation();
      this.validate = false;
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
