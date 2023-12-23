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
          <v-col cols="3" class="pa-0 pr-2">
            <v-textarea
              v-model="term"
              class="custom ma-0 pa-0"
              placeholder="Terminology"
              autofocus
              auto-grow
              rows="1"
              :rules="[v => !!v || 'This field is required']"
            ></v-textarea>
          </v-col>
          <v-col cols="3" class="pa-0 pr-2">
            <v-textarea
              v-model="desc"
              class="custom ma-0 pa-0"
              placeholder="Description"
              auto-grow
              rows="1"
              :rules="[v => !!v || 'This field is required']"
            ></v-textarea>
          </v-col>
          <v-col cols="6" class="pa-0 pr-2 mt-2">
            <div class="d-flex ml-2">
              <v-btn small class="primary mx-1" @click="add" :loading="isLoadingAdd">Add</v-btn>
            </div>
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
    groupID: [String, Number],
    groupBy: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      valid: false,
      term: "",
      desc: "",
      request_to: null,
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/requestStatus/requestSetDefinition", [
      "addDefinitionRequest"
    ]),
    async add() {
      if (this.$refs.form.validate()) {
      try {
          const data = {
            idParams: {
              matterId: this.$route.params.matter || this.$route.params.projectId,
              requestSetId: this.$route.params.requestSetId
            },
            body: {
              desc: this.desc,
              term: this.term
            }
          };
          this.isLoadingAdd = true;
          await this.addDefinitionRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.desc = "";
      this.term = "";
      this.$refs.form.resetValidation();
    }
  },
  watch: {
    isShowAdd(open) {
      if (!open) {
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
