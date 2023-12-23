<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <!-- <SearchInput
          :preset="$route.query.case_name"
          placeholder="Search case name"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchPriorEmployment"
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
                dataPriorEmployment[groupItem.groupID]
                ? dataPriorEmployment[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataPriorEmployment[groupItem.groupID]
                ? dataPriorEmployment[groupItem.groupID].totals
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
              dataPriorEmployment[groupItem.groupID]
                ? dataPriorEmployment[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.from_year="{ props: { item } }">
              <YearSelect
                width="50px"
                :max="item.to_year"
                border-unset
                hide-details
                :value="item.from_year"
                @update="updatePriorEmployment(item.pk, 'from_year', $event)"
              />
            </template>
            <template v-slot:item.to_year="{ props: { item } }">
              <YearSelect
                width="50px"
                border-unset
                hide-details
                :min="item.from_year"
                :value="item.to_year"
                @update="updatePriorEmployment(item.pk, 'to', $event)"
              />
            </template>
            <template v-slot:item.total_comments="{ props: { item } }">
              <Comments
                :totalComments="item.total_comments"
                @update="updatePriorEmployment(item.pk, 'total_comments', $event)"
                :matterId="$route.params.matter || $route.params.projectId"
                :depositionId="item.deposition"
                :priorEmploymentId="item.pk"
              />
            </template>
            <template v-slot:item.total_notes="{ props: { item } }">
              <Notes
                :totalNotes="item.total_notes"
                :matterId="$route.params.matter || $route.params.projectId"
                :depositionId="item.deposition"
                :priorEmploymentId="item.pk"
              />
            </template>
            <template v-slot:item.title="{ props: { item } }">
              <TextArea
                :value="item.title"
                @update="updatePriorEmployment(item.pk, 'title', $event)"
              />
            </template>
            <template v-slot:item.role="{ props: { item } }">
              <TextArea
                :value="item.role"
                @update="updatePriorEmployment(item.pk, 'role', $event)"
              />
            </template>
            <template v-slot:item.case_name="{ props: { item } }">
              <TextArea
                :value="item.case_name"
                @update="updatePriorEmployment(item.pk, 'case_name', $event)"
              />
            </template>
            <template v-slot:item.who_win="{ props: { item } }">
              <SelectCheckBox
                title="Who win"
                :value="item.who_win"
                :dataList="[NA,...appConfigs.whoWin]"
                @update="updatePriorEmployment(item.pk, 'who_win', $event.id)"
              />
            </template>
            <template v-slot:item.testimony="{ props: { item } }">
              <SelectCheckBox
                title="Testimony side"
                :value="item.testimony"
                :dataList="[NA,...appConfigs.favorableEvidences]"
                @update="updatePriorEmployment(item.pk, 'testimony', $event.id)"
              />
            </template>
            <template v-slot:item.attachment="{ props: { item } }">
              <AttachmentLink
                :value="item.attachment"
                @updateAsync="updatePriorEmploymentAsync(item.pk, 'attachment', $event)"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/prior-employments/${item.pk}`"
                  routerMutation="ht_store/matter/deposition/priorEmployment/updateData"
                  :pk="item.pk"
                  :isShowFlag="false"
                />
                <Action
                  :item="item"
                  @remove="
                    removePriorEmployment(groupItem.groupID, item, $event)
                  "
                />
                <v-btn exact icon small @click="showDetail(groupItem.groupID,item.pk)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
          </TableGrid>
          <div class="d-flex mt-2 align-center">
            <v-col cols="10" class="pa-0">
              <FormCreatePriorEmployment
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
    <PriorEmploymentDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :priorEmploymentId="priorEmploymentId"
      @remove="removeDetail"
      @updatePriorEmployment="updatePriorEmployment"
      @updatePriorEmploymentAsync="updatePriorEmploymentAsync"
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
import { nullalbe, NA } from "@/sat-vue-toolkit/satlegal/config";
// cells component
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import YearSelect from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/YearSelect";
import AttachmentLink from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AttachmentLink";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

//form
import FormCreatePriorEmployment from "../../../components/prior-employment/FormCreatePriorEmployment";
import Comments from "../../../components/prior-employment/Comments";
import Notes from "../../../components/prior-employment/Notes";
//Detail
import PriorEmploymentDetail from "./Detail/PriorEmploymentDetail";

export default {
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    AttachmentLink,
    SelectCheckBox,
    YearSelect,
    Action,
    FormCreatePriorEmployment,
    ButtonLoadMore,
    BookmarkOrFlag,
    Comments,
    Notes,
    PriorEmploymentDetail
  },
  data() {
    return {
      NA,
      panel: [0],
      headers: [
        { text: "Case name", value: "case_name", active: true },
        { text: "Title", value: "title", active: true },
        { text: "From", value: "from_year", active: true },
        { text: "To", value: "to_year", active: true },
        { text: "Role", value: "role", active: true },
        { text: "Testimony side", value: "testimony", active: true },
        { text: "Who win?", value: "who_win", active: true },
        { text: "Attachment", value: "attachment", active: true },
        { text: "Note", value: "total_notes", active: true },
        { text: "Comment", value: "total_comments", active: true },
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
          field: "who_win",
          title: "Who win",
          list: []
        },
        {
          id: 3,
          field: "testimony",
          title: "Testimony",
          list: []
        }
      ],
      isCallApiGoalsGroupBy: false,
      isLoadingGetGoals: false,
      showDetailRight: false,
      isLoadingGetDetail: false,
      isClickOutSidePopupDetail: true,
      priorEmploymentId: 0,
      groupItemId: ""
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/matter/deposition/priorEmployment", [
      "dataPriorEmployment",
      "isLoadingGet"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    async showDetail(groupItemId, pk) {
      this.groupItemId = groupItemId;
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      try {
        const idParams = {
          priorEmploymentId: pk,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId
        };
        await this.getDataPriorEmploymentDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.priorEmploymentId = pk;
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    async removeDetail(item, close) {
      await this.removePriorEmployment(this.groupItemId, item, close);
      this.showDetailRight = false;
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataPriorEmployment[groupID]) return false;
      const totals = this.dataPriorEmployment[groupID].totals;
      const results = this.dataPriorEmployment[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchPriorEmployment(text) {
      const query = {
        ...this.$route.query,
        case_name: text
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
    async removePriorEmployment(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        priorEmploymentId: row.pk
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removePriorEmploymentRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId
      };
      return this.getDataPriorEmploymentRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updatePriorEmployment(priorEmploymentId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          priorEmploymentId
        },
        body: {
          [name]: value
        },
        detail: this.showDetailRight
      };
      this.updatePriorEmploymentRequest(data);
    },
    async updatePriorEmploymentAsync(
      priorEmploymentId,
      name,
      { value, setLoading }
    ) {
      try {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            depositionId: this.$route.params.depositionId,
            priorEmploymentId
          },
          body: {
            [name]: value
          },
          detail: this.showDetailRight
        };
        setLoading(true);
        await this.updatePriorEmploymentAsyncRequest(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      switch (group) {
        case "who_win":
          groupByCurrent.list = [...this.appConfigs.whoWin, nullalbe].map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
          });
          return groupByCurrent;
        case "testimony":
          groupByCurrent.list = [
            ...this.appConfigs.favorableEvidences,
            nullalbe
          ].map(x => {
            return { id: x.id, groupID: x.id, value: x.id, text: x.name };
          });
          return groupByCurrent;
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataPriorEmployment(query, isFirstCall) {
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
    async getDataGoals() {
      try {
        this.isLoadingGetGoals = true;
        const matterId = this.$route.params.matter || this.$route.params.projectId;
        await this.getDataGoalsRequest({ matterId });
        this.isLoadingGetGoals = false;
      } catch (error) {
        this.isLoadingGetGoals = false;
      }
    },
    ...mapActions("ht_store/matter/deposition/priorEmployment", [
      "getDataPriorEmploymentRequest",
      "updatePriorEmploymentRequest",
      "updatePriorEmploymentAsyncRequest",
      "removePriorEmploymentRequest",
      "getDataPriorEmploymentDetailRequest"
    ]),
    ...mapActions("ht_store/matter/goals", ["getDataGoalsRequest"])
  },
  mounted() {
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataPriorEmployment(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataPriorEmployment(query, true);
      } else {
        this.changeQueryRouter({ group: "all" });
      }
    }
  }
};
</script>
