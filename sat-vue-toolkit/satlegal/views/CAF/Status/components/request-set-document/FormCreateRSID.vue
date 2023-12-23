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
            <v-text-field
              v-model="name"
              class="custom ma-0 pa-0"
              placeholder="Request set document name"
              autofocus
              auto-grow
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="pa-0 pr-2">
            <ChipInlineList
              :valid="errorsForm.request_item.valid"
              class="custom-chip-inline-list mt-2"
              textNoData="Choose request item"
              :value="request_item"
              :lengthDisplay="3"
              keyId="pk"
              keyText="name"
              colorChipDefault="gray"
              colorTextChip="black--text"
              @onClickIcon="
                $_toggleMenuRequestSetItemMixin_openMenu({
                  ...$event,
                  value: request_item
                })
              "
            />
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
            <div class="d-flex ml-2">
              <v-btn small class="primary mx-1" @click="add" :loading="isLoadingAdd">Add</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <MenuRelatedRequestSetItem
      keyId="pk"
      single
      :value="relatedRequestSetItemMenu.value"
      :isShowMenu="relatedRequestSetItemMenu.isShowMenu"
      :positionX="relatedRequestSetItemMenu.positionX"
      :positionY="relatedRequestSetItemMenu.positionY"
      :isLoadingGet="isLoadingGetRequestSetItem"
      @select="
        relatedRequestSetItemMenu.value = [$event];
       request_item = [$event];
        validForm();
      "
      @remove="
        relatedRequestSetItemMenu.value = [];
        request_item = [];
         validForm();
      "
      @closeMenu="relatedRequestSetItemMenu.isShowMenu = false"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuRequestSetItemMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSetItem/mixins/toggleMenuRequestSetItemMixin";
import MenuRelatedRequestSetItem from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSetItem/MenuRelatedRequestSetItem";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";

export default {
  mixins: [appConfigMixin, toggleMenuRequestSetItemMixin],
  components: {
    AddIcon,
    MenuRelatedRequestSetItem,
    ChipInlineList
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
      request_item: [],
      isLoadingAdd: false,
      isShowAdd: false,
      errorsForm: {
        request_item: {
          messages: "",
          valid: false
        }
      }
    };
  },
  methods: {
    validForm() {
      const errors = {
        request_item: {
          messages: "",
          valid: false
        }
      };
      if (!this.request_item.length) {
        errors.request_item.messages = "required";
        errors.request_item.valid = true;
      }
      const valid = !Object.keys(errors).some(
        key => errors[key].valid === true
      );
      this.errorsForm = errors;
      const validForm = this.$refs.form.validate();
      return valid && validForm;
    },
    async add() {
      if (this.$refs.form.validate()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            rSId: this.$route.params.requestSetId,
            itemsId: this.request_item[0].pk
          },
          body: {
            name: this.name,
            desc: this.desc
          }
        };
        if (this.groupBy.field === "all") {
          data.listIdGroup = ["all"];
        } else if (Array.isArray(this[this.groupBy.field])) {
          data.listIdGroup = this[this.groupBy.field];
        } else {
          data.listIdGroup = [this[this.groupBy.field]];
        }
        try {
          this.isLoadingAdd = true;
          await this.addRSIDRequest(data);
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
      this.request_item = [];
      this.$refs.form.resetValidation();
    },
    ...mapActions(
      "ht_store/matter/requestStatus/requestSetsDocument",
      ["addRSIDRequest"]
    )
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

.custom-chip-inline-list /deep/ .wrap-add-icon {
  visibility: visible;
}

.custom-chip-inline-list /deep/ .add-icon {
  display: block;
}

.custom-chip /deep/ .v-chip {
  max-width: 210px;
}
</style>
