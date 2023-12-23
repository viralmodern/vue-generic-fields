<template>
  <div>
    <v-btn
      v-if="!isShowAdd"
      style="text-transform: unset;"
      text
      class="primary--text"
      @click="isShowAdd = true"
    >
      <v-icon small>mdi-add</v-icon>
      + Add new
    </v-btn>
    <div v-else style="position: relative">
      <AddIcon
        style="position: absolute;top: 5px;"
        @onClickIcon="isShowAdd = false"
        icon="mdi-close"
        colorButton="warning"
        colorIcon="white"
      />
      <v-form class="ml-9" ref="form" @submit.prevent id="check-login-form" v-model="valid">
        <v-row class="ma-0">
          <v-col cols="10" class="pa-0 pr-2">
            <v-text-field
              v-model="desc"
              autofocus
              class="custom ma-0 pa-0"
              placeholder="desc"
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn
              type="submit"
              form="check-login-form"
              small
              class="primary mx-1"
              @click="add"
              :loading="isLoadingAdd"
              >Add</v-btn
            >
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
    evidenceId: [Number, String]
  },
  data() {
    return {
      valid: false,
      desc: "",
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  methods: {
    async add() {
      if (this.$refs.form.validate()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            evidenceId: this.evidenceId,
          },
          body: {
            desc: this.desc,
          }
        };
        try {
          this.isLoadingAdd = true;
          await this.addDataCustodyItemInEvidenceRequest(data)
          this.$emit('onAddNewCustodyItemSuccess');
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.desc = "";
    },
    ...mapActions("ht_store/matter/evidencesCustody", ["addDataCustodyItemInEvidenceRequest"])
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
