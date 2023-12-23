<template>
  <div>
    <v-btn
      v-if="!isShowAdd"
      style="text-transform: unset;"
      text
      class="pa-1 primary--text"
      @click="isShowAdd = true"
    >
      <v-icon small>mdi-add</v-icon>
      Add new
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
          <v-col cols="2" class="pa-0 pr-2">
            <v-textarea
              v-model="title"
              class="custom ma-0 pa-0"
              placeholder="Title"
              autofocus
              auto-grow
              :rules="[v => !!v || 'This field is required']"
              rows="1"
            ></v-textarea>
          </v-col>
          <v-col cols="2" class="pa-0 pr-2">
            <v-textarea
              v-model="employer_name"
              class="custom ma-0 pa-0"
              placeholder="Name"
              auto-grow
              rows="1"
            ></v-textarea>
          </v-col>
          <v-col cols="2" class="pa-0 pr-2">
            <v-textarea
              v-model="description"
              class="custom ma-0 pa-0"
              placeholder="Claim"
              auto-grow
              rows="1"
            ></v-textarea>
          </v-col>
          <v-col cols="2" class="pa-0 pr-2">
            <YearSelect
              :isShowDelete="true"
              placeholder="Choose from"
              :value="from"
              @update="from = $event"
              @delete="from = ''"
              :max="to"
            />
          </v-col>
          <v-col cols="2" class="pa-0 pr-2">
            <YearSelect
              :isShowDelete="true"
              placeholder="Choose to"
              :value="to"
              @update="to = $event"
              @delete="to = ''"
              :min="from"
            />
          </v-col>
          <v-col cols="2" class="pa-0 pr-2 mt-2">
            <div class="d-flex ml-2">
              <v-btn
                small
                class="primary mx-1"
                @click="add"
                :loading="isLoadingAdd"
                >Add</v-btn
              >
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
import YearSelect from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/YearSelect";

export default {
  components: {
    AddIcon,
    YearSelect
  },
  data() {
    return {
      valid: false,
      employer_name: "",
      title: "",
      description: "",
      from: "",
      to: "",
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  methods: {
    async add() {
      if (this.$refs.form.validate()) {
        try {
          const data = {
            idParams: {
              matterId: this.$route.params.matter || this.$route.params.projectId,
              depositionId: this.$route.params.depositionId
            },
            body: {
              employer_name: this.employer_name,
              title: this.title,
              description: this.description,
              from: this.from,
              to: this.to
            }
          };
          this.isLoadingAdd = true;
          await this.addPriorExperienceRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.employer_name = "";
      this.title = "";
      this.description = "";
      this.from = "";
      this.to = "";
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/deposition/priorExperience", [
      "addPriorExperienceRequest"
    ])
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
