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
              v-model="name"
              class="custom ma-0 pa-0"
              placeholder="Request Set Name"
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
              placeholder="Request Set Description"
              auto-grow
              rows="1"
              :rules="[v => !!v || 'This field is required']"
            ></v-textarea>
          </v-col>
          <v-col cols="6" class="pa-0 pr-2 mt-2">
            <v-row no-gutters>
              <CharacterSingles
                textTooltip="Request To"
                :value="request_to"
                @update="request_to = $event"
              />
              <SelectCheckBox
                title="Request From"
                :value="request_from"
                :dataList="appConfigs.whoWin"
                @update="request_from = $event.id"
                class="mr-2"
              />
              <SelectCheckBox
                title="Request Type"
                :value="requestType"
                :dataList="appConfigs.requestType.map(x => ({...x, id: x.value}))"
                @update="requestType = $event.id"
              />
              <div class="d-flex ml-2">
                <v-btn small class="primary mx-1" @click="add" :loading="isLoadingAdd">Add</v-btn>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import CharacterSingles from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/CharacterSingles";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";

export default {
  components: {
    AddIcon,
    SelectCheckBox,
    CharacterSingles
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
      desc: "",
      request_to: null,
      isLoadingAdd: false,
      isShowAdd: false,
      request_from: 1,
      requestType: 1
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    ...mapActions("ht_store/matter/requestStatus/requestSet", ["addRequestApi"]),
    async add() {
      if (this.$refs.form.validate()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId
          },
          body: {
            desc: this.desc,
            name: this.name,
            request_to: this.request_to,
            request_from: this.request_from,
            type: this.requestType
          }
        };
        if (this.groupBy.field === "all") {
          data.listIdGroup = ["all"];
        } else if (Array.isArray(this[this.groupBy.field])) {
          if (this[this.groupBy.field].some(x => typeof x === "object")) {
            data.listIdGroup = this[this.groupBy.field].map(x => x.id);
          } else {
            data.listIdGroup = this[this.groupBy.field];
          }
        } else {
          if (typeof this[this.groupBy.field] === "object") {
            data.listIdGroup = [this[this.groupBy.field].id];
          } else {
            data.listIdGroup = [this[this.groupBy.field]];
          }
        }
        try {
          this.isLoadingAdd = true;
          await this.addRequestApi(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.desc = "";
      this.name = "";
      this.request_to = null;
      this.request_from = 1;
      this.requestType = 1;
      this.$refs.form.resetValidation();
    }
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
