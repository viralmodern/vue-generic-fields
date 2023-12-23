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
      <v-form
        class="ml-9"
        ref="form"
        v-model="valid"
        @submit.prevent
        id="check-login-form"
      >
        <v-row class="ma-0">
          <v-col cols="3" class="pa-0 pr-2">
            <v-textarea
              v-model="subject"
              class="custom ma-0 pa-0"
              placeholder="Name"
              auto-grow
              rows="1"
              autofocus
              :rules="[v => !!v || 'This field is required']"
            ></v-textarea>
          </v-col>
          <v-col cols="3" class="pa-0 pr-2">
            <div class="d-flex mt-2">
              <ChipInlineList
                :valid="errorsForm.clientId.valid"
                class="custom-chip-inline-list mr-2"
                textNoData="Choose client"
                :value="clientId"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
                  $_toggleMenuClientMixin_openMenu({
                    ...$event,
                    value: clientId
                  })
                "
              />
              <MembersWorkspace
                class="mr-2"
                :value="members"
                @update="members = $event"
              />
              <v-btn
                type="submit"
                form="check-login-form"
                small
                class="primary"
                @click="add"
                :loading="isLoadingAdd"
                >Add</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <MenuRelatedClient
      keyId="pk"
      :value="relatedClientMenu.value"
      :isShowMenu="relatedClientMenu.isShowMenu"
      :positionX="relatedClientMenu.positionX"
      :positionY="relatedClientMenu.positionY"
      :isLoadingGet="isLoadingGetClient"
      @select="
        relatedClientMenu.value = [$event.pk];
        clientId = [$event];
        validForm();
      "
      @remove="
        relatedClientMenu.value = [];
        clientId = [];
        validForm();
      "
      @closeMenu="relatedClientMenu.isShowMenu = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import MenuRelatedClient from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/client/MenuRelatedClient";
import MembersWorkspace from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/MembersWorkspace";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import { autoFillListIdGroup } from "@/sat-vue-toolkit/satlegal/utils/index";

// mixins
import toggleMenuClientMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/client/mixins/toggleMenuClientMixin";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";

export default {
  mixins: [toggleMenuClientMixin, appConfigMixin],
  components: {
    AddIcon,
    MenuRelatedClient,
    ChipInlineList,
    MembersWorkspace
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
      subject: "",
      clientId: [],
      members: [],
      isLoadingAdd: false,
      isShowAdd: false,
      errorsForm: {
        clientId: {
          messages: "",
          valid: false
        }
      }
    };
  },
  methods: {
    validForm() {
      const errors = {
        clientId: {
          messages: "",
          valid: false
        }
      };
      if (!this.clientId.length) {
        errors.clientId.messages = "required";
        errors.clientId.valid = true;
      }
      const valid = !Object.keys(errors).some(
        key => errors[key].valid === true
      );
      this.errorsForm = errors;
      const validForm = this.$refs.form.validate();
      return valid && validForm;
    },
    async add() {
      if (
        this.groupBy.isAddInGroupByRequestItem
          ? this.$refs.form.validate()
          : this.validForm()
      ) {
        const data = {
          idParams: {
            clientId: this.clientId.length ? this.clientId[0].pk : "",
          },
          body: {
            subject: this.subject,
            members: this.members
          }
        };
        data.listIdGroup = autoFillListIdGroup.bind(this)();
        try {
          this.isLoadingAdd = true;
          await this.addClientMessageRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
          throw error;
        }
      }
    },
    clearForm() {
      this.subject = "";
      this.clientId = [];
      (this.members = []), this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/clients/clientMessage", [
      "addClientMessageRequest"
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
.custom-chip-inline-list /deep/ .wrap-add-icon {
  visibility: visible;
}
.custom-chip-inline-list /deep/ .add-icon{
  display: block;
}
.custom-chip /deep/ .v-chip {
  max-width: 210px;
}
</style>
