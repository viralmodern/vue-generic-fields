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
          <v-col cols="2" class="pa-0 pr-2">
            <v-text-field
              v-model="name"
              class="custom ma-0 pa-0"
              placeholder="Name"
              autofocus
              :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="2" class="pa-0 pr-2 mt-2">
            <div class="d-flex">
              <ChipInlineList
                :valid="errorsForm.request_item.valid"
                class="custom-chip-inline-list mr-2"
                textNoData="(No Request Set Item)"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                :value="request_item"
                @onClickIcon="
                  $_toggleMenuRequestSetItemDetailMixin_openMenu({
                    ...$event,
                    title: 'Request set item',
                    name: 'request_item',
                    value: request_item,
                    matterId:$route.params.matter || $route.params.projectId,
                    requestSetId: $route.params.requestSetId,
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
    </div>
    <MenuRelatedRequestSetItemDetail
      keyId="pk"
      single
      :matterId="relatedRequestSetItemDetailMenu.matterId"
      :requestSetId="relatedRequestSetItemDetailMenu.requestSetId"
      :value="relatedRequestSetItemDetailMenu.value"
      :isShowMenu="relatedRequestSetItemDetailMenu.isShowMenu"
      :positionX="relatedRequestSetItemDetailMenu.positionX"
      :positionY="relatedRequestSetItemDetailMenu.positionY"
      :isLoadingGet="isLoadingGetRequestSetItemDetail"
      @select="
        relatedRequestSetItemDetailMenu.value = [$event];
        request_item = [{pk: $event.pk, name: $event.name}];
        validForm();
      "
      @remove="
        relatedRequestSetItemDetailMenu.value = [];
        request_item = [];
        validForm();
      "
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import MenuRelatedRequestSetItemDetail from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/request-set-item-detail/MenuRelatedRequestSetItemDetail";
import toggleMenuRequestSetItemDetailMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/request-set-item-detail/mixins/toggleMenuRequestSetItemDetailMixin";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";

export default {
  mixins: [toggleMenuRequestSetItemDetailMixin],
  components: {
    AddIcon,
    MenuRelatedRequestSetItemDetail,
    ChipInlineList,
  },
  data() {
    return {
      valid: false,
      name: "",
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
      if (this.validForm()) {
        try {
          const data = {
            idParams: {
              matterId: this.$route.params.matter || this.$route.params.projectId,
              requestSetId: this.$route.params.requestSetId,
              requestSetItemId: this.request_item[0].pk
            },
            body: {
              name: this.name
            }
          };
          this.isLoadingAdd = true;
          await this.addRequestSetItemElementRequest(data);
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
      this.request_item = [];
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/requestStatus/requestSet/element", [
      "addRequestSetItemElementRequest"
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
.custom-chip-inline-list /deep/ .wrap-add-icon {
  visibility: visible;
}
.custom-chip-inline-list /deep/ .add-icon{
  display: block;
}
</style>
