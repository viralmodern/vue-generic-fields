<template>
  <div>
    <v-btn
      v-if="!isShowAdd"
      style="text-transform: unset;"
      text
      class="pa-1 primary--text"
      @click="isShowAdd = true"
    >
      <v-icon small>mdi-plus</v-icon>Add new
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
            <v-text-field
              v-model="name"
              class="custom ma-0 pa-0"
              placeholder="Publication name"
              autofocus
              auto-grow
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="pa-0 pr-2">
            <v-textarea
              v-model="author"
              class="custom ma-0 pa-0"
              placeholder="Author"
              auto-grow
              rows="1"
            ></v-textarea>
          </v-col>
          <v-col cols="3" class="pa-0 pr-2">
            <v-textarea
              v-model="bibliography"
              class="custom ma-0 pa-0"
              placeholder="Bibilography"
              auto-grow
              rows="1"
            ></v-textarea>
          </v-col>
          <v-col cols="3" class="pa-0 pr-2">
            <v-textarea
              v-model="desc"
              class="custom ma-0 pa-0"
              placeholder="Description"
              auto-grow
              rows="1"
            ></v-textarea>
          </v-col>
          <v-col cols="4" class="pa-0 pr-2 mt-2">
            <div class="d-flex">
              <YearSelect
                :isShowDelete="true"
                placeholder="Publication year"
                :value="date"
                @update="date = $event"
                @delete="date = ''"
                :max="new Date().getFullYear()"
              />
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
import YearSelect from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/YearSelect";

export default {
  components: {
    AddIcon,
    YearSelect,
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
      validate: false,
      name: "",
      author: "",
      date: "",
      bibliography: "",
      desc: "",
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  methods: {
    validForm() {
      if (!this.date) {
        this.validate = true;
      } else {
        this.validate = false;
        this.add();
      }
    },
    async add() {
      if (this.$refs.form.validate()) {
        try {
          const data = {
            idParams: {
              matterId: this.$route.params.matter || this.$route.params.projectId,
              depositionId: this.$route.params.depositionId
            },
            body: {
              name: this.name,
              desc: this.desc,
              author: this.author,
              publication_year: this.date,
              bibliography: this.bibliography,
            }
          };
          this.isLoadingAdd = true;
          await this.addPublishedRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.name = "";
      this.desc = "";
      this.author = "";
      this.bibliography = "";
      this.date = "";
      this.$refs.form.resetValidation();
      this.validate = false;
    },
    ...mapActions("ht_store/matter/deposition/published", [
      "addPublishedRequest"
    ])
  },
  watch: {
    isShowAdd(open) {
      if (!open) {
        this.clearForm();
      }
    },
    date: {
      handler(val) {
        if (val) {
          this.validate = false;
        }
      },
      deep: true
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
