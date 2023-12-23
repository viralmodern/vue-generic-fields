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
      <v-form class="ml-9" ref="form" @submit.prevent id="check-login-form" v-model="valid">
        <v-row class="ma-0">
          <v-col cols="3" class="pa-0 pr-2">
            <v-text-field
              v-model="name"
              class="custom ma-0 pa-0"
              placeholder="Name"
              autofocus
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="pa-0 pr-2">
            <SelectChip
              placeholder="Select expense code"
              :items="appConfigs.expenseCode"
              label="Expense code"
              item-text="title"
              item-value="code"
              :value="expense_code"
              @change="expense_code = $event"
            />
          </v-col>
          <v-col cols="6" class="pa-0 pr-2">
            <div class="d-flex mt-1">
              <ChipInlineList
              :valid="errorsForm.request_set.valid"
              class="custom-chip-inline-list mr-2"
              textNoData="Choose request set"
              :value="request_set"
              :lengthDisplay="2"
              keyId="pk"
              keyText="name"
              colorChipDefault="gray"
              colorTextChip="black--text"
              @onClickIcon="
                $_toggleMenuRequestSetMixin_openMenu({
                  ...$event,
                  value: request_set
                })
              "
            />
            <v-btn
              type="submit"
              form="check-login-form"
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
      <MenuRelatedRequestSet
        :to="{ name: 'RequestSet'}"
        keyId="pk"
        :value="relatedRequestSetMenu.value"
        :isShowMenu="relatedRequestSetMenu.isShowMenu"
        :positionX="relatedRequestSetMenu.positionX"
        :positionY="relatedRequestSetMenu.positionY"
        :isLoadingGet="isLoadingGetRequestSet"
        @select="
          relatedRequestSetMenu.value = [$event.pk];
          request_set = [$event];
          validForm();
        "
        @remove="
          relatedRequestSetMenu.value = [];
          request_set = [];
          validForm();
        "
        @closeMenu="relatedRequestSetMenu.isShowMenu = false"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import SelectChip from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/SelectChip";

import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import MenuRelatedRequestSet from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSet/MenuRelatedRequestSet";
import { autoFillListIdGroup } from "@/sat-vue-toolkit/satlegal/utils";
import toggleMenuRequestSetMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSet/mixins/toggleMenuRequestSetMixin";

export default {
  mixins: [appConfigMixin, toggleMenuRequestSetMixin],
  components: {
    AddIcon,
    SelectChip,
    ChipInlineList,
    MenuRelatedRequestSet,
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
      expense_code: "",
      request_set: [],
      isLoadingAdd: false,
      isShowAdd: false,
      errorsForm: {
        request_set: {
          messages: "",
          valid: false
        }
      }
    };
  },
  methods: {
     validForm() {
      const errors = {
        request_set: {
          messages: "",
          valid: false
        }
      };
      if (!this.request_set.length) {
        errors.request_set.messages = "required";
        errors.request_set.valid = true;
      }
      const valid = !Object.keys(errors).some(
        key => errors[key].valid === true
      );
      this.errorsForm = errors;
      const validForm = this.$refs.form.validate();
      return valid && validForm;
    },

    async add() {
      if (this.validForm()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            depositionId: this.$route.params.depositionId,
          },
          body: {
            name: this.name,
            desc: this.desc,
            expense_code: this.expense_code ? this.expense_code : undefined,
            content_type: this.appConfigListContentType[this.appConfigConstants.REQUEST_SET_RELATED].value,
            object_id : this.request_set.length ? this.request_set[0].pk : "",
          }
        };
        data.listIdGroup = autoFillListIdGroup.bind(this)();
        try {
          this.isLoadingAdd = true;
          await this.addRequestSetExpenseRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.name = "";
      this.expense_code = "";
      this.request_set = [];
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/requestStatus/requestSetExpense", ["addRequestSetExpenseRequest"])
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
.custom-chip-inline-list /deep/ .add-icon{
  display: block;
}
</style>
