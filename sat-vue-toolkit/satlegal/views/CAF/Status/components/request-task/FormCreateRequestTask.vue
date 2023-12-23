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
      <v-form class="ml-9" ref="form" v-model="valid" @submit.prevent id="check-login-form">
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
              class="custom-chip"
              placeholder="Litigation code"
              :items="appConfigs.litigationCode"
              label="Type"
              item-text="name"
              item-value="code"
              item-color="color"
              :value="litigation"
              @change="litigation = $event"
            />
          </v-col>
          <v-col cols="3" class="pa-0 pr-2">
            <SelectChip
              class="custom-chip"
              placeholder="Activities code"
              :items="appConfigs.activitiesCode"
              label="Type"
              item-text="name"
              item-value="code"
              item-color="color"
              :value="activities"
              @change="activities = $event"
            />
          </v-col>
          <v-col cols="3" class="pa-0 pr-2 mt-2">
            <v-btn
              type="submit"
              form="check-login-form"
              small
              class="primary mx-1"
              @click="add"
              :loading="isLoadingAdd"
              >Add</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="ma-0" v-if="!this.groupBy.isAddInGroupByRequestItem">
          <v-col cols="3" class="pa-0 pr-2">
            <ChipInlineList
              :valid="errorsForm.request_set.valid"
              class="custom-chip-inline-list mt-2"
              textNoData="Choose request set"
              :value="request_set"
              :lengthDisplay="3"
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
          </v-col>
        </v-row>
      </v-form>
    </div>
    <MenuRelatedRequestSet
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SelectChip from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/SelectChip";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import MenuRelatedRequestSet from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSet/MenuRelatedRequestSet";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import { autoFillListIdGroup } from "@/sat-vue-toolkit/satlegal/utils/index";

// mixins
import toggleMenuRequestSetMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSet/mixins/toggleMenuRequestSetMixin";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";

export default {
  mixins: [toggleMenuRequestSetMixin, appConfigMixin],
  components: {
    AddIcon,
    MenuRelatedRequestSet,
    ChipInlineList,
    SelectChip
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
      request_set: [],
      litigation: "",
      activities: "",
      status: "",
      request_items: [],
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
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
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
      if (this.groupBy.isAddInGroupByRequestItem ? this.$refs.form.validate() : this.validForm()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            requestSetId: this.groupBy.isAddInGroupByRequestItem ? this.groupBy.parentRequestSetId : this.request_set[0].pk
          },
          body: {
            name: this.name,
            litigation: this.litigation,
            activities: this.activities,
            status: this.status,
            request_set: this.request_set.length ? this.request_set[0].pk : "",
            request_item_id: this.request_items[0],
          }
        };
        data.listIdGroup = autoFillListIdGroup.bind(this)();
        try {
          this.isLoadingAdd = true;
          await this.addRequestSetTaskRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          console.log(error);
          this.isLoadingAdd = false;
        }
      }
    },
    clearForm() {
      this.name = "";
      this.request_set = [];
      this.litigation = "";
      this.activities = "";
      this.status = "";
      this.request_set = [],
      this.request_items = [],
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/requestStatus/requestSetTask", [
      "addRequestSetTaskRequest"
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
