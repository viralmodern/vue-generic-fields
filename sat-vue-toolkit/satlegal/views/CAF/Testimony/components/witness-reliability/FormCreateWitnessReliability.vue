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
      <v-form class="ml-9" ref="form" @submit.prevent id="check-login-form" v-model="valid">
        <v-row class="ma-0">
          <v-col cols="11" class="pa-0">
            <v-row class="ma-0 mb-1">
              <v-col cols="3" class="pa-0 pr-2">
                <div class="d-flex mt-2">
                  <ChipInlineList
                    :valid="errorsForm.witness.valid"
                    class="custom-chip-inline-list mr-2"
                    textNoData="(Add WitnessReliability)"
                    :value="witness"
                    :lengthDisplay="3"
                    keyId="pk"
                    keyText="name"
                    colorChipDefault="gray"
                    colorTextChip="black--text"
                    @onClickIcon="
                      $_toggleMenuCharacterMixin_openMenu({
                        ...$event,
                        value: witness
                      })
                    "
                  />
                  <v-btn
                    small
                    form="check-login-form"
                    class="primary mx-1"
                    @click="add"
                    :loading="isLoadingAdd"
                    >Add</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
      <MenuRelatedCharacter
        keyId="pk"
        :value="relatedCharacterMenu.value"
        :isShowMenu="relatedCharacterMenu.isShowMenu"
        :positionX="relatedCharacterMenu.positionX"
        :positionY="relatedCharacterMenu.positionY"
        :isLoadingGet="isLoadingGetCharacter"
        @select="
          $_toggleMenuCharacterMixin_addValue($event, ['pk', 'name']);
          witness = relatedCharacterMenu.value;
          validForm();
        "
        @remove="
          $_toggleMenuCharacterMixin_removeValue($event);
          witness = relatedCharacterMenu.value;
          validForm();
        "
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import MenuRelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/MenuRelatedCharacter";
import toggleMenuCharacterMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/mixins/toggleMenuCharacterMixin";

import { autoFillListIdGroup } from "@/sat-vue-toolkit/satlegal/utils/index";

export default {
  mixins: [toggleMenuCharacterMixin],
  components: {
    AddIcon,
    ChipInlineList,
    MenuRelatedCharacter
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
      witness: [],
      isLoadingAdd: false,
      isShowAdd: false,
      errorsForm: {
        witness: {
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
        witness: {
          messages: "",
          valid: false
        }
      };
      if (!this.witness.length) {
        errors.witness.messages = "required";
        errors.witness.valid = true;
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
            matterId: this.$route.params.matter || this.$route.params.projectId
          },
          body: {
            witness: this.witness
          }
        };
        data.listIdGroup = autoFillListIdGroup.bind(this)();
        try {
          this.isLoadingAdd = true;
          await this.addWitnessReliabilityRequest(data);
          this.isLoadingAdd = false;
          this.isShowAdd = false;
        } catch (error) {
          this.isLoadingAdd = false;
          throw error;
        }
      }
    },
    clearForm() {
      this.witness = [];
      this.$refs.form.resetValidation();
    },
    ...mapActions("ht_store/matter/testimony/witnessReliability", ["addWitnessReliabilityRequest"])
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
