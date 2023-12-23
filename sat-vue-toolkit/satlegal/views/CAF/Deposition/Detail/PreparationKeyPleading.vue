<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <SearchInput
          :preset="$route.query.pleading"
          placeholder="Search pleading name"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchKeyPleading"
        />
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
                dataKeyPleading[groupItem.groupID]
                ? dataKeyPleading[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataKeyPleading[groupItem.groupID]
                ? dataKeyPleading[groupItem.groupID].totals
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
              dataKeyPleading[groupItem.groupID]
                ? dataKeyPleading[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.pleading="{ props: { item } }">
              <TextArea
                :value="item.pleading"
                @update="updateKeyPleading(item.pk, 'pleading', $event)"
              />
            </template>
            <template v-slot:item.counterclaim="{ props: { item } }">
              <TextArea
                :value="item.counterclaim"
                @update="updateKeyPleading(item.pk, 'counterclaim', $event)"
              />
            </template>
            <template v-slot:item.goals="{ props: { item } }">
              <Goal :value="item.goals" @update="updateKeyPleading(item.pk, 'goals', $event)" />
            </template>
            <template v-slot:item.total_comments="{ props: { item } }">
              <Comments
                :totalComments="item.total_comments"
                :matterId="$route.params.matter || $route.params.projectId"
                :depositionId="item.deposition"
                :keyPleadingId="item.pk"
              />
            </template>
            <template v-slot:item.total_notes="{ props: { item } }">
              <Notes
                :totalNotes="item.total_notes"
                @update="updateKeyPleading(item.pk, 'total_notes', $event)"
                :matterId="$route.params.matter || $route.params.projectId"
                :depositionId="item.deposition"
                :keyPleadingId="item.pk"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                :valueBookmark="item.bookmarked_pk"
                :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/key-pleadings/${item.pk}`"
                routerMutation="ht_store/matter/deposition/keyPleading/updateDataKeyPleading"
                :pk="item.pk"
                :isShowFlag="false"
              />
                <Action :item="item" @remove="removeKeyPleading(groupItem.groupID, item, $event)" />
                <v-btn exact icon small @click="showDetail(groupItem.groupID, item.pk)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
          </TableGrid>
          <div class="d-flex mt-2 align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateKeyPleading
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
    <KeyPleadingDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :keyPleadingId="keyPleadingId"
      @remove="removeDetail"
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
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import Goal from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Goal";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";
//form
import FormCreateKeyPleading from "../components/FormCreateKeyPleading";
import Comments from "../components/key-pleading/Comments";
import Notes from "../components/key-pleading/Notes";
import KeyPleadingDetail from "./components/KeyPleadingDetail/index";

export default {
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    Goal,
    Action,
    FormCreateKeyPleading,
    ButtonLoadMore,
    Comments,
    Notes,
    BookmarkOrFlag,
    KeyPleadingDetail
  },
  data() {
    return {
      panel: [0],
      headers: [
        { text: "Pleading", value: "pleading", active: true },
        { text: "Counter claim ", value: "counterclaim", active: true },
        { text: "Goal", value: "goals", active: true },
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
          field: "goals",
          title: "Goal",
          list: []
        }
      ],
      isCallApiGoalsGroupBy: false,
      isLoadingGetGoals: false,
      keyPleadingId: 0,
      showDetailRight: false,
      isLoadingGetDetail: false,
      isClickOutSidePopupDetail: true,
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
    ...mapGetters("ht_store/matter/deposition/keyPleading", [
      "dataKeyPleading",
      "isLoadingGet"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    async showDetail(groupItemId, pk) {
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      this.groupItemId = groupItemId;

      try {
        const idParams = {
          keyPleadingId: pk,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId
        };
        await this.getKeyPleadingDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.keyPleadingId = pk;
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    async removeDetail(item, close) {
      await this.removeKeyPleading(this.groupItemId, item, close);
      this.showDetailRight = false;
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataKeyPleading[groupID]) return false;
      const totals = this.dataKeyPleading[groupID].totals;
      const results = this.dataKeyPleading[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchKeyPleading(text) {
      const query = {
        ...this.$route.query,
        pleading: text
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
    async removeKeyPleading(name, row, close) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        keyPleadingId: row.pk
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removeKeyPleadingRequest(data);
      close();
    },
    async updatePagination(searchObject, isFirstCall) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId
      };
      return this.getDataKeyPleadingRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateKeyPleading(keyPleadingId, name, value) {
      console.log(keyPleadingId, name, value, '????');

      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          keyPleadingId
        },
        body: {
          [name]: value
        }
      };
      this.updateKeyPleadingRequest(data);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        case "goals":
          if (!this.isCallApiGoalsGroupBy) {
            this.isCallApiGoalsGroupBy = true;
            const dataGoals = await this.getDataGoalsRequest({
              matterId
            });
            groupByCurrent.list = [...dataGoals, nullalbe].map(x => {
              return {
                id: x.pk,
                groupID: x.pk,
                value: x.pk,
                text: x.name
              };
            });
            return groupByCurrent;
          }
          return groupByCurrent;
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataKeyPleading(query, isFirstCall) {
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
    ...mapActions("ht_store/matter/deposition/keyPleading", [
      "getDataKeyPleadingRequest",
      "updateKeyPleadingRequest",
      "removeKeyPleadingRequest",
      "getKeyPleadingDetailRequest"
    ]),
    ...mapActions("ht_store/matter/goals", ["getDataGoalsRequest"])
  },
  mounted() {
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataKeyPleading(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataKeyPleading(query, true);
      } else {
        this.changeQueryRouter({ group: "all" });
      }
    }
  }
};
</script>

<style scoped>
.detail-character {
  color: blue;
  cursor: pointer;
}
</style>
