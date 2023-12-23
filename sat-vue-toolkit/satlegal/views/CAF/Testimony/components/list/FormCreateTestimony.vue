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
      <v-form class="ml-9" ref="form" v-model="valid">
        <v-row class="ma-0">
          <v-col cols="11" class="pa-0">
            <v-row class="ma-0 mb-1">
              <v-col cols="3" class="pa-0 pr-2">
                <v-textarea
                v-model="name"
                class="custom ma-0 pa-0"
                placeholder="Formal Testimony"
                auto-grow
                rows="1"
                autofocus
                :rules="[v => !!v || 'This field is required']"
              ></v-textarea>
              </v-col>
              <v-col cols="3" class="pa-0 pr-2">
                <v-btn
                  small
                  class="primary mx-1 mt-2"
                  @click="add"
                  :loading="isLoadingAdd"
                  >Add</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";

import { autoFillListIdGroup } from "@/sat-vue-toolkit/satlegal/utils/index";

export default {
  components: {
    AddIcon,
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
      name: "",
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    async add() {
      if (this.$refs.form.validate()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId
          },
          body: {
            name: this.name,
          }
        };
        data.listIdGroup = autoFillListIdGroup.bind(this)();
        try {
          this.isLoadingAdd = true;
          await this.addTestimonyRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
          throw error;
        }
      }
    },
    clearForm() {
      this.name = "";
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/testimony/list", ["addTestimonyRequest"])
  },
  watch: {
    groupBy(val, oldVal) {
      if (val.field !== oldVal.field) {
        this.isShowAdd = false;
      }
    },
    isShowAdd(open) {
      if (open) {
        if (this.groupBy.field !== "all") {
          if (Array.isArray(this[this.groupBy.field])) {
            this[this.groupBy.field] = [this.groupBy.value];
          } else {
            this[this.groupBy.field] = this.groupBy.value;
          }
        }
      } else {
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
