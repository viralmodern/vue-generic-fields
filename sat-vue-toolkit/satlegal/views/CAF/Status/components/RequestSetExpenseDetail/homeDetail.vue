<template>
  <div>
    <v-navigation-drawer
      :value="isShowPopup"
      @input="$emit('closeMenuRight', $event)"
      :right="true"
      :stateless="isClickOutSide"
      fixed
      class="fill-height"
      temporary
      width="45%"
    >
      <v-row class="header-right">
        <v-col cols="10" class="pl-7">
          <span>Request Set Expense Detail</span>
        </v-col>
        <v-col cols="2 text-right">
          <v-btn text icon color="white" @click="$emit('closeMenuRight', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card flat :disabled="isLoadingGetDetail" class="phong">
        <v-progress-linear v-if="isLoadingGetDetail" class="mt-1" indeterminate rounded></v-progress-linear>
        <v-list dense>
          <v-form ref="form" v-model="valid">
            <v-row class="px-3">
              <v-col cols="6">
                <v-row class="px-3">
                  <v-icon>mdi-rename-box</v-icon>
                  <v-text-field
                    :value="expenseDetail.name"
                    label="Expense Name"
                    placeholder="Expense Name"
                    @change="updateExpenseDetail('name', $event)"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row class="px-3">
                  <v-icon>mdi-numeric</v-icon>
                  <v-text-field
                    :value="expenseDetail.object_id"
                    label="Request Number"
                    placeholder="Request Number"
                    :readonly="true"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row class="px-3">
                  <v-textarea
                    :value="expenseDetail.desc || ''"
                    class="mx-2"
                    label="Expense Description"
                    placeholder="Expense Description"
                    rows="10"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateExpenseDetail('desc', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row class="px-3">
                  <v-icon>mdi-format-list-numbers</v-icon>
                  <v-text-field
                    :value="expenseDetail.amount"
                    label="Expense Amount"
                    placeholder="Expense Amount"
                    type="number"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateExpenseDetail('amount', $event)"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row class="px-3">
                  <v-select
                    :items="appConfigs.expenseCode"
                    label="Expense Code"
                    :value="expenseDetail.expense_code"
                    item-text="title"
                    item-value="code"
                    @change="updateExpenseDetail('expense_code', $event)"
                    class="mx-2"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-select>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Request Item Description:</label>
                <ChipInlineList
                  textNoData="(No request set item)"
                  :value="$_appConfigMixin_filterValueByContentType(
                    appConfigConstants.REQUEST_SET_ITEM_RELATED,
                    expenseDetail.relations_info
                )"
                  :lengthDisplay="2"
                  keyId="pk"
                  keyText="name"
                  colorChipDefault="gray"
                  colorTextChip="black--text"
                  @onClickIcon="
                  $_toggleMenuRequestSetItemMixin_openMenu({
                    ...$event,
                    title: 'Request set item',
                    name: 'request_item',
                    pk: expenseDetail.pk,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.REQUEST_SET_ITEM_RELATED,
                      expenseDetail.relations_info
                    )
                  })
                "
                />
              </v-col>
            </v-row>
          </v-form>
        </v-list>
      </v-card>
    </v-navigation-drawer>
    <MenuRelatedRequestSetItem
      :to="{name: 'RequestSetItems'}"
      keyId="pk"
      :value="relatedRequestSetItemMenu.value"
      :isShowMenu="relatedRequestSetItemMenu.isShowMenu"
      :positionX="relatedRequestSetItemMenu.positionX"
      :positionY="relatedRequestSetItemMenu.positionY"
      :isLoadingGet="isLoadingGetRequestSetItem"
      @select="
        $_toggleMenuRequestSetItemMixin_addValue($event);
        updateRelated(
          appConfigConstants.REQUEST_SET_ITEM_RELATED,
          relatedRequestSetItemMenu.pk,
          $event
        );
      "
      @remove="
        $_toggleMenuRequestSetItemMixin_removeValue($event);
        removeRelated(
          appConfigConstants.REQUEST_SET_ITEM_RELATED,
          relatedRequestSetItemMenu.pk,
          $event
        );
      "
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import MenuRelatedRequestSetItem from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSetItem/MenuRelatedRequestSetItem";
import toggleMenuRequestSetItemMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSetItem/mixins/toggleMenuRequestSetItemMixin";

export default {
  mixins: [appConfigMixin, toggleMenuRequestSetItemMixin],
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean
  },
  components: {
    ChipInlineList,
    MenuRelatedRequestSetItem
  },
  data() {
    return {
      valid: false,
      showExpenseDetail: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/requestStatus/requestSetExpense", [
      "updateRelationRequestSetExpenseRequest",
      "removeRelationRequestSetExpenseRequest",
      "updateRequestSetExpenseRequest"
    ]),
    updateRelated(type, requestSetExpenseId, item, key = "name") {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          requestSetExpenseId
        },
        body: {
          content_type_id: contentTypeId,
          pk: item.pk,
          [key]: item[key]
        },
        detail: true
      };
      this.updateRelationRequestSetExpenseRequest(data);
    },
    removeRelated(type, requestSetExpenseId, item) {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        requestSetExpenseId,
        contentTypeId,
        objectId: item.pk,
        detail: true
      };
      this.removeRelationRequestSetExpenseRequest(data);
    },
    updateExpenseDetail(name, value) {
      const data = {
        idParams: {
          requestSetExpenseId: this.expenseDetail.pk
        },
        body: {
          [name]: value
        },
        detail: true
      };
      this.updateRequestSetExpenseRequest(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/requestStatus/requestSetExpense", [
      "expenseDetail"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  watch: {
    isShowPopup: {
      handler(val) {
        if (val) {
          this.showExpenseDetail = val;
        }
      }
    },
    showExpenseDetail: {
      handler(val) {
        if (!val) {
          this.$emit("closeMenuRight");
        }
      }
    }
  }
};
</script>
<style scoped>
.save_button {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.header-right {
  background-color: #6d42c7;
  color: white;
  display: flex;
  align-items: center;
}
</style>
