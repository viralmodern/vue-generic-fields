<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <!-- <SearchInput
          :preset="$route.query.name"
          placeholder="Search expense name"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchRequestSetExpense"
        />-->
        <div class="flex-grow-1"></div>
        <MenuDropDownGroupBy
          :items="groupByList"
          :activeTitle="$route.query.group"
          @onClickItem="onChangeGroupBy"
        />
        <MenuShowHideFields>
          <CustomizeFieldsTableGrid
            :fields="headers"
            :hideFieldIndex="['drag']"
            @resetFields="resetFields"
          />
        </MenuShowHideFields>
      </v-card-title>
    </v-card>
    <v-expansion-panels class="v-expansion-panels--custom" multiple v-model="panel">
      <v-expansion-panel style="width:100vh" v-for="(groupItem, i) in groupBy.list" :key="i">
        <v-expansion-panel-header>
          <div class="d-flex align-center">
            <div class="font-weight-bold">{{ groupItem.text }}</div>
            <div class="flex-grow-1"></div>
            <v-chip class="ml-2 text-body-2 badge" small style="position:sticky; right: 40px;">
              <span class="font-weight-bold mr-2">
                {{
                dataRequestSetExpense[groupItem.groupID]
                ? dataRequestSetExpense[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataRequestSetExpense[groupItem.groupID]
                ? dataRequestSetExpense[groupItem.groupID].totals
                : 0
                }}
                items
              </span>
            </v-chip>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <TableGrid
            hide-default-header
            hide-default-footer
            :fixedHeader="false"
            :headers="headersFilter"
            :desserts="
              dataRequestSetExpense[groupItem.groupID]
                ? dataRequestSetExpense[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.name="{ props: { item } }">
              <TextInline
                textNodata="(No name)"
                :value="item.name"
                @onClick="
                  $_toggleMenuTextField_openMenu({
                    ...$event,
                    title: 'Name',
                    name: 'name',
                    pk: item.pk,
                    value: item.name
                  })
                "
              />
            </template>
            <template v-slot:item.desc="{ props: { item } }">
              <TextAreaInline
                textNodata="(No Description)"
                :value="item.desc"
                @onClick="
                  $_toggleMenuTextArea_openMenu({
                    ...$event,
                    title: 'Expense Description',
                    name: 'desc',
                    pk: item.pk,
                    value: item.desc
                  })
                "
              />
            </template>
            <template v-slot:item.amount="{ props: { item } }">
              <TextInline
                textNodata="(No amount)"
                :value="item.amount"
                @onClick="
                  $_toggleMenuTextField_openMenu({
                    ...$event,
                    typeInput: 'number',
                    title: 'Amount',
                    name: 'amount',
                    pk: item.pk,
                    value: item.amount
                  })
                "
              />
            </template>
            <template v-slot:item.request_number="{ props: { item, row } }">
              <span class="text-caption">{{ row + 1 }}</span>
            </template>
            <template v-slot:item.expense_code="{ props: { item } }">
              <ChipJoinMenuSelectBox
                textNoData="(No Expense Code)"
                text
                :value="item.expense_code"
                keyValue="code"
                keyText="title"
                :dataList="appConfigs.expenseCode"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Expense Code',
                    name: 'expense_code',
                    pk: item.pk,
                    keyValue: 'code',
                    keyText: 'title',
                    value: item.expense_code,
                    dataList: appConfigs.expenseCode
                  })
                "
              />
            </template>
            <template v-slot:item.request_item="{ props: { item } }">
              <ChipInlineList
                textNoData="(No request set item)"
                :value="$_appConfigMixin_filterValueByContentType(
                    appConfigConstants.REQUEST_SET_ITEM_RELATED,
                    item.relations_info
                )"
                :lengthDisplay="3"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
                  $_toggleMenuRequestSetItemMixin_openMenu({
                    ...$event,
                    title: 'Request set item',
                    name: 'request_item',
                    pk: item.pk,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.REQUEST_SET_ITEM_RELATED,
                      item.relations_info
                    )
                  })
                "
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <Action
                  :item="item"
                  @remove="
                    removeRequestSetExpense(groupItem.groupID, item, $event)
                  "
                />
                <v-btn exact icon small @click="showDetail(item)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
          </TableGrid>
          <div class="d-flex mt-2 align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateRequestSetExpense
                :groupID="groupItem.groupID"
                :groupBy="{ field: groupBy.field, ...groupItem }"
              />
            </v-col>
            <v-col cols="2 text-right">
              <ButtonLoadMore
                ref="refLoadMore"
                v-if="isShowButtonLoadMore(groupItem.groupID)"
                @onPageChanged="loadMore($event, groupItem)"
              />
            </v-col>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <MenuTextField
      width="350"
      :typeInput="textFieldMenu.typeInput"
      :title="textFieldMenu.title"
      :placeholder="`Enter ${textFieldMenu.name}`"
      :value="textFieldMenu.value"
      :isShowMenu="textFieldMenu.isShowMenu"
      :positionX="textFieldMenu.positionX"
      :positionY="textFieldMenu.positionY"
      @closeMenu="textFieldMenu.isShowMenu = false"
      @update="
        textFieldMenu.value = $event;
        updateRequestSetExpense(textFieldMenu.pk, textFieldMenu.name, $event);
      "
    />
    <MenuTextArea
      width="350"
      :title="textAreaMenu.title"
      placeholder="Enter text"
      :value="textAreaMenu.value"
      :isShowMenu="textAreaMenu.isShowMenu"
      :positionX="textAreaMenu.positionX"
      :positionY="textAreaMenu.positionY"
      @closeMenu="textAreaMenu.isShowMenu = false"
      @update="
        textAreaMenu.value = $event;
        updateRequestSetExpense(textAreaMenu.pk, textAreaMenu.name, $event);
      "
    />

    <MenuSelectCheckBox
      :title="menuSelectBox.title"
      :keyValue="menuSelectBox.keyValue"
      :keyText="menuSelectBox.keyText"
      :value="menuSelectBox.value"
      :isShowMenu="menuSelectBox.isShowMenu"
      :positionX="menuSelectBox.positionX"
      :positionY="menuSelectBox.positionY"
      :dataList="menuSelectBox.dataList"
      @closeMenu="menuSelectBox.isShowMenu = false"
      @update="
        menuSelectBox.value = $event[menuSelectBox.keyValue];
        menuSelectBox.isShowMenu = false;
        updateRequestSetExpense(
          menuSelectBox.pk,
          menuSelectBox.name,
          $event[menuSelectBox.keyValue]
        );
      "
    />
    <MenuRelatedRequestSetItem
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
    >
      <template slot="searchNoResult">
        <div class="pt-2">No matching results</div>
      </template>
    </MenuRelatedRequestSetItem>
    <RequestSetExpenseDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :itemsId="itemsId"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
import SearchInput from "@/sat-vue-toolkit/satlegal/reuse-components/SearchInput";
import { nullalbe } from "@/sat-vue-toolkit/satlegal/config";
// cells component
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";

import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import TextInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextInline";
import TextAreaInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextAreaInline";
import MenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/MenuTextField";
import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/MenuTextArea";
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import MenuRelatedRequestSetItem from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSetItem/MenuRelatedRequestSetItem";
import RequestSetExpenseDetail from "./components/RequestSetExpenseDetail/homeDetail";

//form
import FormCreateRequestSetExpense from "./components/FormCreateRequestSetExpense";
import toggleMenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/mixins/toggleMenuTextField";
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import toggleMenuRequestSetItemMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSetItem/mixins/toggleMenuRequestSetItemMixin";

export default {
  mixins: [
    appConfigMixin,
    toggleMenuTextField,
    toggleMenuTextArea,
    toggleMenuSelectBox,
    toggleMenuRequestSetItemMixin
  ],
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    Action,
    TextInline,
    MenuTextField,
    MenuTextArea,
    MenuSelectCheckBox,
    ChipJoinMenuSelectBox,
    FormCreateRequestSetExpense,
    ButtonLoadMore,
    ChipInlineList,
    MenuRelatedRequestSetItem,
    TextAreaInline,
    RequestSetExpenseDetail
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "Expense Name", value: "name", active: true },
        { text: "Request Number", value: "request_number", active: true },
        { text: "Expense Description", value: "desc", active: true },
        { text: "Expense Amount", value: "amount", active: true },
        { text: "Expense Code", value: "expense_code", active: true },
        {
          text: "Request Item Description",
          value: "request_item",
          active: true
        },
        { text: "Action", value: "action", active: true }
      ],
      groupBy: {},
      groupByList: [
        {
          id: 1,
          field: "all",
          title: "None",
          list: []
        },
        {
          id: 2,
          field: "expense_code",
          title: "Expense Code",
          list: []
        }
      ],
      isLoadingGetGoals: false,
      isLoadingGetDetail: false,
      showDetailRight: false,
      isClickOutSidePopupDetail: true,
      itemsId: 0
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/requestStatus/requestSetExpense", [
      "dataRequestSetExpense",
      "isLoadingGet"
    ])
  },
  methods: {
    async showDetail(item) {
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      try {
        const idParams = {
          pk: item.pk
        };
        await this.getRequestExpenseDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.itemsId = item.pk;
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
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
        }
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
        objectId: item.pk
      };
      this.removeRelationRequestSetExpenseRequest(data);
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataRequestSetExpense[groupID]) return false;
      const totals = this.dataRequestSetExpense[groupID].totals;
      const results = this.dataRequestSetExpense[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchRequestSetExpense(text) {
      const query = {
        ...this.$route.query,
        name: text
      };
      this.changeQueryRouter(query);
    },
    onChangeGroupBy(item) {
      const query = {
        ...this.$route.query,
        group: item.field
      };
      this.changeQueryRouter(query);
    },
    async loadMore({ page, setLoading }, groupItem) {
      setLoading(true);
      await this.updatePagination({
        ...this.$route.query,
        page,
        ungroup: groupItem.groupID === "all",
        group_items:
          groupItem.groupID === "all" ? undefined : [groupItem.groupID],
        group_by: groupItem.groupID === "all" ? undefined : this.groupBy.field
      });
      setLoading(false);
    },
    async removeRequestSetExpense(name, row, close) {
      const data = {
        name,
        requestSetExpenseId: row.pk
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removeRequestSetExpenseRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      return this.getDataRequestSetExpenseRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateRequestSetExpense(requestSetExpenseId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          requestSetExpenseId
        },
        body: {
          [name]: value
        }
      };
      this.updateRequestSetExpenseRequest(data);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      switch (group) {
        case "expense_code":
          groupByCurrent.list = [...this.appConfigs.expenseCode, nullalbe].map(
            x => {
              return {
                id: x.code,
                groupID: x.code,
                value: x.code,
                text: x.title
              };
            }
          );
          return groupByCurrent;
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataRequestSetExpense(query, isFirstCall) {
      this.groupBy = await this.getGroupByCurrent(query.group);
      const searchObject = {
        page: 1,
        group_by: this.groupBy.field === "all" ? undefined : this.groupBy.field,
        group_items:
          this.groupBy.field === "all"
            ? undefined
            : this.groupBy.list.map(x => x.groupID),
        ungroup: this.groupBy.field === "all",
        ...query
      };
      this.updatePagination(searchObject, isFirstCall);
    },
    ...mapActions("ht_store/matter/requestStatus/requestSetExpense", [
      "getDataRequestSetExpenseRequest",
      "updateRequestSetExpenseRequest",
      "removeRequestSetExpenseRequest",
      "getRequestExpenseDetailRequest",
      // relations
      "updateRelationRequestSetExpenseRequest",
      "removeRelationRequestSetExpenseRequest"
    ])
  },
  mounted() {
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataRequestSetExpense(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataRequestSetExpense(query, true);
      } else {
        this.changeQueryRouter({ group: "all" });
      }
    }
  }
};
</script>


