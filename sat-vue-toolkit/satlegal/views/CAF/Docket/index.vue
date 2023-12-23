<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
        <div class="flex-grow-1"></div>
        <MenuDropDownGroupBy
          :items="groupByList"
          :activeTitle="$route.query.group"
          @onClickItem="changeQueryRouter"
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
            <v-chip class="ml-2 body-2 badge" small style="position:sticky; right: 40px;">
              <span class="font-weight-bold mr-2">
                {{
                dataDocket[groupItem.groupID]
                ? dataDocket[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataDocket[groupItem.groupID]
                ? dataDocket[groupItem.groupID].totals
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
              dataDocket[groupItem.groupID]
                ? dataDocket[groupItem.groupID].results
                : []"
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.entry_number="{ props: { item } }">
              <span>{{item.entry_number}}</span>
            </template>
            <template v-slot:item.date_added="{ props: { item } }">
              <ChooseDatePicker
                :date="item.date_added"
                :isFormatChooseISOString="false"
                @update="updateDocket(item.pk, 'date_added', $event)"
              />
            </template>
            <template v-slot:item.documents="{ props: { item } }">
              {{item.documents.length}}
              <AddIcon
                @onClickIcon="onShowPopupDocument(item.id, item.documents)"
                icon="mdi-folder"
              />
            </template>
            <template v-slot:item.filed_by="{ props: { item } }">
              <SelectCheckBox
                title="Docket entry field by"
                :value="item.filed_by"
                :dataList="appConfigs.docketEntryByField"
                @update="updateDocket(item.pk, 'filed_by', $event.id)"
              />
            </template>
            <template v-slot:item.short_description="{ props: { item } }">
              <TextArea
                :value="item.short_description"
                @update="updateDocket(item.pk, 'short_description', $event)"
              />
            </template>
            <template v-slot:item.description="{ props: { item } }">
              <TextArea
                :value="item.description"
                @update="updateDocket(item.pk, 'description', $event)"
              />
            </template>
            <template v-slot:item.pacer_link="{ props: { item } }">
              <LinkInline
                textNodata="(No link)"
                :value="item.pacer_link"
                @onClick="
                  $_toggleMenuTextArea_openMenu({
                    ...$event,
                    name: 'pacer_link',
                    pk: item.id,
                    value: item.pacer_link
                  })"
              />
            </template>
            <template v-slot:item.entry_type="{ props: { item } }">
              <SelectLabel
                title="Type"
                textTooltip="Type"
                :value="item.entry_type"
                :labels="appConfigs.typeDocket"
                single
                @chooseLabel="
                  updateDocket(item.pk, 'entry_type', $event)"
              />
            </template>
            <template v-slot:item.labels="{ props: { item } }">
              <Label
                :value="item.labels"
                @onOpenMenu="getDataLabelsRequest({ matterId:$route.params.matter || $route.params.projectId})"
                @update="updateDocket(groupBy.groupID, item.id, 'labels', $event)"
              />
            </template>
            <template v-slot:item.members="{ props: { item } }">
              <Members
                textTooltip="Assigned members"
                :value="item.members"
                @onOpenMenu="getDataMembersRequest({ matterId:$route.params.matter || $route.params.projectId})"
                :isLoadingGet="isLoadingGetMember"
                :isEmitOpenMenu="true"
                @update="updateDocket(item.id, 'members', $event)"
              />
            </template>
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <v-btn class="ma-0" @click="updateDocket(item.pk, 'flag', !item.flag)" icon small>
                  <v-icon small :color="item.flag ? 'red' : 'grey'">flag</v-icon>
                </v-btn>
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/matters/${$$$matterID}/docket-entries/${item.pk}`"
                  routerMutation="ht_store/matter/docket/updateDataDocket"
                  :pk="item.pk"
                  :isShowFlag="false"
                />
              </div>
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <CreatedDocket />
            </v-col>
            <v-col cols="2 text-right">
              <ButtonLoadMore
                v-if="
                  totals_docket > 20 &&
                    totals_docket > (dataFacts.all || {}).results.length
                "
                ref="refLoadMore"
                @onPageChanged="$emit('onPageChanged')"
              />
            </v-col>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <Documents
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataDocuments="dataDocuments"
      :docketEntryId="this.docketEntryId"
      @closePopup="isShowPopupAttachment = false;"
    />
    <MenuTextArea
      width="350"
      title="Update Pacer Link"
      placeholder="Enter text"
      :value="textAreaMenu.value"
      :isShowMenu="textAreaMenu.isShowMenu"
      :positionX="textAreaMenu.positionX"
      :positionY="textAreaMenu.positionY"
      @closeMenu="textAreaMenu.isShowMenu = false"
      @update="
        textAreaMenu.value = $event;
        updateDocket(textAreaMenu.pk, textAreaMenu.name, $event);"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";

// cells component
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import ChooseDatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseDatePicker";
import SelectLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectLabel";
import Label from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Label";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import LinkInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/LinkInline";
import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/MenuTextArea";
import Documents from "./components/Documents";

import CreatedDocket from "./CreatedDocket";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
//mixin
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  name: "static-pagination",
  mixins: [toggleMenuTextArea],
  components: {
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    TextArea,
    LinkInline,
    MenuTextArea,
    ChooseDatePicker,
    SelectLabel,
    Label,
    Members,
    SelectCheckBox,
    AddIcon,
    Documents,
    // Range,
    CreatedDocket,
    ButtonLoadMore,
    BookmarkOrFlag
  },
  data() {
    return {
      panel: [0],
      headers: [
        {
          text: "Docket Entry Number #",
          value: "entry_number",
          active: true
        },
        {
          text: "Docket Date Added ",
          value: "date_added",
          active: true
        },
        { text: "Docket Documents", value: "documents", active: true },
        {
          text: "Docket Entry Filed By",
          value: "filed_by",
          active: true
        },
        { text: "Short Description", value: "short_description", active: true },
        { text: "Description", value: "description", active: true },
        { text: "Pacer Link", value: "pacer_link", active: true },
        { text: "Type", value: "entry_type", active: true },
        { text: "Comment", value: "comment_count", active: true },
        { text: "Note", value: "note_count", active: true },
        { text: "Labels", value: "labels", active: true },
        { text: "Attachment", value: "Documents", active: true },
        { text: "Assigned Members", value: "members", active: true },
        { text: "Action", value: "action", active: true }
      ],
      groupBy: {},
      value: 1,
      groupByList: [
        {
          id: 1,
          field: "all",
          title: "None",
          list: []
        },
        {
          id: 2,
          field: "type",
          title: "Type",
          list: []
        },
        {
          id: 3,
          field: "labels",
          title: "Labels",
          list: []
        },
        {
          id: 4,
          field: "assigned_members",
          title: "Assigned Members",
          list: []
        },
        {
          id: 5,
          field: "docket_entry_filed by ",
          title: "Docket Entry Filed By ",
          list: []
        }
      ],
      docketEntryId: 0,
      isLoadingGetMember: false,
      //attachment
      isShowPopupAttachment: false
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    ...mapGetters("ht_store/matter/docket", [
      "dataDocket",
      "totals_docket",
      "isLoadingGet",
      //documents
      "dataDocuments"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    ...mapMutations("ht_store/matter/docket", ["getDataDocuments"]),
    ...mapActions("ht_store/matter/docket", [
      "getDataDocketRequest",
      "addDocketRequest",
      "updateDocketRequest",
      "removeDocketRequest"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/labels", ["getDataLabelsRequest"]),
    onShowPopupDocument(docketEntryId, documents) {
      this.docketEntryId = docketEntryId;
      this.getDataDocuments(documents);
      this.isShowPopupAttachment = true;
    },
    changeQueryRouter(item) {
      this.$router.push({
        path: this.$route.path,
        query: { group: item.field }
      });
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      // const matterId = this.$route.params.matter || this.$route.params.projectId;
      switch (group) {
        default:
          groupByCurrent.list.push({ id: 1, groupID: "all", text: "" });
          return groupByCurrent;
      }
    },
    async getDataDocketFromApi(group) {
      this.groupBy = await this.getGroupByCurrent(group);
      const searchObject = {
        page: 1,
        group_by: this.groupBy.field === "all" ? undefined : this.groupBy.field,
        group_items:
          this.groupBy.field === "all"
            ? undefined
            : this.groupBy.list.map(x => x.groupID),
        ungroup: this.groupBy.field === "all"
      };
      this.updatePagination(searchObject);
    },
    updatePagination({ page, ungroup, group_by, group_items }) {
      const searchObject = {
        page,
        group_by,
        ungroup,
        group_items
      };
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      this.getDataDocketRequest({ idParams, searchObject });
    },

    updateDocket(docketId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          docketId
        },
        body: {
          [name]: value
        }
      };
      this.updateDocketRequest(data);
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
    }
  },
  mounted() {
    // const matterId = this.$route.params.matter || this.$route.params.projectId;
    const group = this.$route.query.group;
    this.getDataDocketFromApi(group);
  },
  watch: {
    "$route.query"(query) {
      this.getDataDocketFromApi(query.group);
    }
  }
};
</script>

<style scoped></style>
