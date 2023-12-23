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
          <v-col cols="11" class="pa-0">
            <v-row class="ma-0 mb-1">
              <v-col cols="4" class="pa-0 pr-2">
                <v-text-field
                  v-model="terminology"
                  autofocus
                  class="custom ma-0 pa-0"
                  placeholder="terminology"
                  :rules="[v => !!v || 'This field is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-0 pr-2">
                <v-text-field
                  v-model="instruction"
                  class="custom ma-0 pa-0"
                  placeholder="instruction"
                  :rules="[v => !!v || 'This field is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-0 pr-2">
                <v-text-field
                  v-model="definition"
                  class="custom ma-0 pa-0"
                  placeholder="definition"
                  :rules="[v => !!v || 'This field is required']"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1" class="pa-0 pr-2 mt-2">
            <v-btn small class="primary mx-1" @click="add" :loading="isLoadingAdd">Add</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import { autoFillListIdGroup } from "@/sat-vue-toolkit/satlegal/utils/index";

export default {
  components: {
    AddIcon
  },
  props: {
    groupID: [String, Number],
    groupBy: {
      type: Object,
      default: () => {}
    },
    isLoadingGetCharacter: Boolean,
    isLoadingGetSubject: Boolean,
    subpoenaId: Number
  },
  data() {
    return {
      valid: false,
      terminology: "",
      definition: "",
      instruction: "",
      isLoadingAdd: false,
      isShowAdd: false,
      members: []
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    onChangeInputNullAbleNumbers(key, value) {
      const findObjectNullAble = this[key].find(x => x.id === 0);
      if (findObjectNullAble) {
        this[key] = value;
        this[key] = [findObjectNullAble, ...value];
        return;
      }
      return (this[key] = value);
    },
    async add() {
      if (this.$refs.form.validate()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            subpoenaId: this.subpoenaId
          },
          body: {
            terminology: this.terminology,
            definition: this.definition,
            instruction: this.instruction
          }
        };
        data.listIdGroup = autoFillListIdGroup.bind(this)();
        try {
          this.isLoadingAdd = true;
          await this.addDefiAndInstrucsRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.terminology = "";
      this.definition = "";
      this.instruction = "";
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/subpoena/subpoenaDefiAndInstrucs", [
      "addDefiAndInstrucsRequest"
    ])
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
