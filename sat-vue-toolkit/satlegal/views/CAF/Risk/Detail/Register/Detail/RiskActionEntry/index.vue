<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <div class="flex-grow-1"></div>
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
      <v-expansion-panel style="width:100vh">
        <v-expansion-panel-header>
          <div class="d-flex align-center">
            <div class="flex-grow-1"></div>
            <v-chip class="ml-2 text-body-2 badge" small style="position:sticky; right: 40px;">
              <span class="font-weight-bold mr-2">
                {{ dataRiskAction ? dataRiskAction.length : 0 }}
                of
                {{ dataRiskAction ? totals : 0 }}
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
            :desserts="dataRiskAction"
            :loading="isLoadingGet"
          >
            <template v-slot:item.entry="{ props: { item } }">
              <TextField :value="item.entry" @update="updateRiskAction(item.id, 'entry', $event)" />
            </template>
            <template v-slot:item.owner="{ props: { item } }">
              <Members
                single
                :value="item.owner"
                :isLoadingGet="isLoadingGetMember"
                :isEmitOpenMenu="true"
                @onOpenMenu="getDataMember"
                @update="updateRiskAction(item.pk, 'owner', $event)"
              />
            </template>
            <template v-slot:item.start_date="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{ item.start_date | formatShortDate }}</div>
                <DatePicker
                  title="Date"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.start_date"
                  :textTooltip="
                    [item.start_date].some(x => !!x)
                      ? `${$options.filters.formatShortDate(item.start_date)}`
                      : 'Add date'
                  "
                  class="mx-2"
                  :colorButton="`${[item.start_date].some(x => !!x) ? 'indigo' : ''}`"
                  @updateTime="
                    updateRiskAction(item.id, 'start_date', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.end_date="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{ item.end_date | formatShortDate }}</div>
                <DatePicker
                  title="Date"
                  nameButtonSubmit="Save"
                  :isActions="true"
                  :date="item.end_date"
                  :textTooltip="
                    [item.end_date].some(x => !!x)
                      ? `${$options.filters.formatShortDate(item.end_date)}`
                      : 'Add date'
                  "
                  class="mx-2"
                  :colorButton="`${[item.end_date].some(x => !!x) ? 'indigo' : ''}`"
                  @updateTime="
                    updateRiskAction(item.id, 'end_date', $event.date)"
                />
              </v-row>
            </template>
            <template v-slot:item.related_risk_register="{ props: { item } }">
              <ChipInlineList
                textNoData="(No Data)"
                :value="
                  $_appConfigMixin_filterValueByContentType(
                    appConfigConstants.RISK_RELATED,
                    item.relations_info
                  )
                "
                :lengthDisplay="3"
                keyId="pk"
                keyText="name"
                colorChipDefault="gray"
                colorTextChip="black--text"
                @onClickIcon="
                  $_toggleMenuRiskMixin_openMenu({
                    ...$event,
                    name: appConfigConstants.RISK_RELATED,
                    pk: item.pk,
                    value: $_appConfigMixin_filterValueByContentType(
                      appConfigConstants.RISK_RELATED,
                      item.relations_info
                    )
                  })
                "
              />
            </template>
            <template v-slot:item.status="{ props: { item } }">
              <SelectCheckBox
                title="Action Status"
                :value="item.status"
                :dataList="appConfigs.action_status"
                @update="updateRiskAction(item.id, 'status', $event.id)"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/risks/${riskId}/actions/${item.id}`"
                  routerMutation="ht_store/matter/risk/actionEntry/updateData"
                  :pk="item.id"
                  :valueFlag="item.reported_object && item.reported_object.pk"
                />
                <Action @remove="removeRiskAction(item.id, $event)" />
              </div>
            </template>
          </TableGrid>
          <div class="d-flex mt-2 align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateActionEntry />
            </v-col>
            <v-col cols="2 text-right">
              <ButtonLoadMore
                v-if="totals > 20 && totals > dataRiskAction.length"
                @onPageChanged="loadMore"
              />
            </v-col>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <MenuRelatedRisk
      keyId="pk"
      :value="relatedRiskMenu.value"
      :isShowMenu="relatedRiskMenu.isShowMenu"
      :positionX="relatedRiskMenu.positionX"
      :positionY="relatedRiskMenu.positionY"
      :isLoadingGet="isLoadingGetRisk"
      @select="
        $_toggleMenuRiskMixin_addValue($event);
        updateRelated(
          appConfigConstants.RISK_RELATED,
          relatedRiskMenu.pk,
          $event
        );
      "
      @remove="
        $_toggleMenuRiskMixin_removeValue($event);
        removeRelated(
          appConfigConstants.RISK_RELATED,
          relatedRiskMenu.pk,
          $event
        );
      "
      @closeMenu="relatedRiskMenu.isShowMenu = false"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue.vue";
// cells component
import TextField from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextField";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import MenuRelatedRisk from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/risk-register-entry/MenuRelatedRisk";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

//form
import FormCreateActionEntry from "./components/FormCreateActionEntry";
// mixins
import toggleMenuRiskMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/risk-register-entry/mixins/toggleMenuRiskMixin";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";

export default {
  name: "static-pagination",
  mixins: [appConfigMixin, toggleMenuRiskMixin],
  components: {
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextField,
    Members,
    DatePicker,
    BookmarkOrFlag,
    Action,
    FormCreateActionEntry,
    ButtonLoadMore,
    SelectCheckBox,
    ChipInlineList,
    MenuRelatedRisk
  },
  props: {
    riskId: Number
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "Action Entry", value: "entry", active: true },
        { text: "Action Owner", value: "owner", active: true },
        { text: "Start Date", value: "start_date", active: true },
        { text: "End Date", value: "end_date", active: true },
        {
          text: "Related Risk Register",
          value: "related_risk_register",
          active: true
        },
        { text: "Action Status", value: "status", active: true },
        { text: "Action", value: "action", active: true }
      ],
      isLoadingGetMember: false,
      isCallApiMemberCell: false
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    ...mapGetters("ht_store/matter/risk/actionEntry", [
      "dataRiskAction",
      "isLoadingGet",
      "totals"
    ]),
    ...mapGetters("ht_store/project/members", ["dataMembers"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    resetFields({ fields }) {
      this.headers = fields;
    },
    async loadMore({ page, setLoading }) {
      setLoading(true);
      await this.updatePagination({ page });
      setLoading(false);
    },
    async removeRiskAction(rowId, close) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        riskActionId: this.riskId,
        rowId
      };
      await this.removeRiskActionRequest(data);
      close();
    },
    updatePagination({ page, isFirstCall }) {
      const searchObject = {
        page
      };
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        riskActionId: this.riskId
      };
      return this.getDataRiskActionRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateRiskAction(rowId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          riskActionId: this.riskId,
          rowId
        },
        body: {
          [name]: value
        }
      };
      this.updateRiskActionRequest(data);
    },
    async updateReports(pk, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          riskActionId: this.riskId,
          rowId: pk
        },
        body: value
      };
      await this.updateReportRequest(data);
    },
    updateRelated(type, id, item) {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          riskActionId: this.riskId,
          id
        },
        body: {
          content_type_id: contentTypeId,
          pk: item.pk,
          name: item.name
        }
      };
      this.updateRelationRiskRequest(data);
    },
    removeRelated(type, id, item) {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        riskActionId: this.riskId,
        id,
        contentTypeId,
        objectId: item.pk
      };
      this.removeRelationRiskRequest(data);
    },
    async getDataMember() {
      if (!this.isCallApiMemberCell) {
        this.isCallApiMemberCell = true;
        try {
          this.isLoadingGetMember = true;
          const matterId =
            this.$route.params.matter || this.$route.params.projectId;
          await this.getDataMembersRequest({ matterId });
          this.isLoadingGetMember = false;
        } catch (error) {
          this.isLoadingGetMember = false;
        }
      }
    },
    ...mapActions("ht_store/matter/risk/actionEntry", [
      "getDataRiskActionRequest",
      "updateRiskActionRequest",
      "removeRiskActionRequest",
      //relations
      "updateRelationRiskRequest",
      "removeRelationRiskRequest",
      "updateReportRequest"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
  }
};
</script>

<style scoped>
.detail-character {
  color: blue;
  cursor: pointer;
}
.td-date {
  justify-content: space-between;
  flex-direction: row;
  width: 150px;
  align-items: center;
}
</style>
