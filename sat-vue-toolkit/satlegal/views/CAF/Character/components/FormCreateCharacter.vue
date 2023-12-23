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
      New character
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
            <v-text-field
              v-model="first_name"
              autofocus
              class="custom ma-0 pa-0"
              placeholder="First name"
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="2" class="pa-0 pr-2">
            <v-text-field
              v-model="last_name"
              class="custom ma-0 pa-0"
              placeholder="Last name"
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="2" class="pa-0 pr-2 mt-2">
            <v-btn
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
    groupID: [String, Number],
    groupBy: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      valid: false,
      first_name: "",
      last_name: "",
      favorable: "",
      credibility: undefined,
      located: undefined,
      availability: undefined,
      served: undefined,
      relevant_level: undefined,
      value_level: undefined,
      members: [],
      tags: [],
      isLoadingAdd: false,
      isShowAdd: false
    };
  },
  methods: {
    onChangeInputNullAble(key, value) {
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
            matterId: this.$route.params.matter || this.$route.params.projectId
          },
          body: {
            first_name: this.first_name,
            last_name: this.last_name,
            favorable: this.favorable,
            credibility: this.credibility,
            located: this.located,
            availability: this.availability,
            served: this.served,
            relevant_level: this.relevant_level,
            value_level: this.value_level,
            members: this.members,
            tags: this.tags,
          }
        };
        if (this.groupBy.field === "all") {
          data.listIdGroup = ["all"];
        } else if (Array.isArray(this[this.groupBy.field])) {
          if (this.groupBy.field === "characters__character") {
            data.listIdGroup = this.characters__character.map(x => x.id);
          } else {
            data.listIdGroup = this[this.groupBy.field];
          }
        } else {
          data.listIdGroup = [this[this.groupBy.field]];
        }
        try {
          this.isLoadingAdd = true;
          await this.addCharacterRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.first_name = "";
      this.last_name = "";
      this.favorable = "";
      this.credibility = undefined;
      this.located = undefined;
      this.availability = undefined;
      this.served = undefined;
      this.relevant_level = undefined;
      this.value_level = undefined;
      this.members = [];
      this.tags = [];
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/character2", ["addCharacterRequest"])
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
