<template>
  <v-container fluid>
    <v-card flat class="mb-4" ref="headerSlickTable">
      <v-card-title>
        <SearchInput
          :preset="$route.query.name"
          placeholder="Search"
          :timeDelayChangeInput="500"
          :isDebounceChangeInput="true"
          @input="onSearchClientMessage"
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
    <v-expansion-panels
      class="v-expansion-panels--custom"
      multiple
      v-model="panel"
    >
      <v-expansion-panel
        style="width:100vh"
        v-for="(groupItem, i) in groupBy.list"
        :key="i"
      >
        <v-expansion-panel-header>
          <div class="d-flex align-center">
            <div class="font-weight-bold">
              {{ groupItem.text }}
            </div>
            <div class="flex-grow-1"></div>
            <v-chip
              class="ml-2 text-body-2 badge"
              small
              style="position:sticky; right: 40px;"
            >
              <span class="font-weight-bold mr-2"
                >{{
                  dataClientMessage[groupItem.groupID]
                    ? dataClientMessage[groupItem.groupID].results.length
                    : 0
                }}
                of
                {{
                  dataClientMessage[groupItem.groupID]
                    ? dataClientMessage[groupItem.groupID].totals
                    : 0
                }}
                items</span
              >
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
              dataClientMessage[groupItem.groupID]
                ? dataClientMessage[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >


            <template v-slot:item.first_name="{props: { item }}">
              <span class="text-caption text-no-wrap">{{item.client.first_name}}</span>
            </template>

            <template v-slot:item.last_name="{props: { item }}">
              <span class="text-caption text-no-wrap">{{item.client.last_name}}</span>
            </template>


            <template v-slot:item.subject="{ props: { item } }">
              <div style="width:350px">
                <RichTextArea
                  :value="item.subject"
                  @update="updateClientMessage(item.client.pk, item.pk, 'subject', $event)"
                />
              </div>
            </template>

            <template v-slot:item.message_source="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :isShowDropDown="false"
                :value="item.message_source"
                keyValue="value"
                keyText="label"
                :dataList="appConfigChoices[appConfigConstants.MESSAGE_SOURCE]"
              />
            </template>


             <template v-slot:item.status="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.status"
                keyValue="value"
                keyText="label"
                :dataList="appConfigChoices[appConfigConstants.MESSAGE_STATUS]"
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Message Status',
                    name: 'status',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.status,
                    dataList: appConfigChoices[appConfigConstants.MESSAGE_STATUS],
                  })
                  itemClientMessage = item;
                "
              />
            </template>


            <template v-slot:item.members="{ props: { item } }">
              <MembersWorkspace
                :value="item.members"
                @update="updateClientMessage(item.client.pk, item.pk, 'members', $event)"
              />
            </template>

            <template v-slot:item.attachments="{ props: { item } }">
              <!-- {{ item.attachments.length }} --> 0
              <AddIcon
                @onClickIcon="onShowPopupAttachment(item)"
                icon="mdi-attachment"
              />
            </template>

            <template v-slot:item.labels="{ props: { item } }">
              <TagableCCL
                textNoData="No Tags"
                :tag="item.labels"
                @onClickIcon="
                  $_toggleMenuCCLMixin_openMenu({
                    ...$event,
                    pk: item.pk
                  })
                  itemClientMessage = item;
                "
              />
            </template>

            <template v-slot:item.is_check_client_rivilege="{ props: { item } }">
              <ChipJoinMenuSelectBox
                :value="item.is_check_client_rivilege"
                keyValue="value"
                keyText="label"
                :dataList="
                  appConfigChoices[appConfigConstants.ATTORNEY_CLIENT_PRIVILEGE]
                "
                @onClickChip="
                  $_toggleMenuSelectBox_openMenu({
                    ...$event,
                    title: 'Attorney Client Privilege',
                    name: 'is_check_client_rivilege',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.is_check_client_rivilege,
                    dataList:
                      appConfigChoices[appConfigConstants.ATTORNEY_CLIENT_PRIVILEGE]
                  });
                  itemClientMessage = item;
                "
              />
            </template>

            <template v-slot:item.action="{ props: { item } }">
              <Actions
                :valueFlag="item.flag"
                :valueBookmark="!!item.bookmarked_pk"
                @onClickFlag="updateClientMessage(item.client.pk, item.pk, 'flag', !item.flag)"
                @onClickDelete="
                  actionDetele = { item, name: groupItem.groupID };
                  isShowPopupDelete = true;
                "
                @onClickView="showDetail(item.client.pk, item.pk)"
              />
            </template>
          </TableGrid>
          <div class="d-flex align-center mt-4">
            <v-col cols="10" class="pa-0">
              <FormCreateClientMessage
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
    <div v-if="groupBy.totals > 20" class="text-right text-center mt-2">
      <v-pagination
        :value="groupBy.page"
        :length="groupBy.totals / 20 | numberCeil"
        circle
        @input="onPagingListGroupBy"
      ></v-pagination>
      <!-- <v-btn class="primary" small @click="onPagingListGroupBy">Load more</v-btn> -->
    </div>
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
        updateClientMessage(
          itemClientMessage.client.pk,
          menuSelectBox.pk,
          menuSelectBox.name,
          $event[menuSelectBox.keyValue]
        );
      "
    />
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataAttachments="dataAttachments"
      :clientMessageId="this.clientMessageId"
      @closePopup="isShowPopupAttachment = false"
    />

    <MenuCCL
      title="List Tags"
      :labels="menuCCL.value"
      :isShowMenu="menuCCL.isShowMenu"
      :positionX="menuCCL.positionX"
      :positionY="menuCCL.positionY"
      :isLoadingGet="isLoadingGetCCL"
      @closeMenu="menuCCL.isShowMenu = false"
      @update="
        menuCCL.value = $event;
        updateClientMessage(itemClientMessage.client.pk, menuCCL.pk, 'labels', $event);
      "
      @resetValueCheck="menuCCL.value = $event"
    />

    <ConfirmItem
      messageConfirm="Are you sure want to delete item?"
      :isShowPopup="isShowPopupDelete"
      @remove="removeClientMessage"
      :isLoading="isLoadingDelete"
      @cancel="isShowPopupDelete= false"
    />

    <ClientMessageDetail
      :isShow="showDetailRight"
      title="Client Message Detail"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
    />

  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import MenuDropDownGroupBy from "@/sat-vue-toolkit/satlegal/reuse-components/MenuDropDownGroupBy";
import SearchInput from "@/sat-vue-toolkit/satlegal/reuse-components/SearchInput";
import { NA } from "@/sat-vue-toolkit/satlegal/config";
// cells component
import RichTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/RichTextArea";
import MembersWorkspace from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/MembersWorkspace";
import TagableCCL from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/client-communication-label/TagableCCL";

// import Flag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Flag";
import Actions from "@/sat-vue-toolkit/satlegal/reuse-components/cell-table/Actions";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import ConfirmItem from "@/sat-vue-toolkit/satlegal/ht_components/dialogs/ConfirmItem";
import ClientMessageDetail from "./components/client-message/ClientMessageDetail";

//form
import FormCreateClientMessage from "./components/client-message/FormCreateClientMessage";
import Attachments from "./components/client-message/Attachments";
//menus
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import MenuCCL from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/client-communication-label/MenuCCL";

//mixins
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuCCLMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/client-communication-label/mixins/toggleMenuCCLMixin";
import { numberCeil } from "@/sat-vue-toolkit/satlegal/ht_plugins/filter"

export default {
  filters: {
    numberCeil
  },
  mixins: [
    toggleMenuSelectBox,
    appConfigMixin,
    toggleMenuCCLMixin,
  ],
  components: {
    SearchInput,
    MenuDropDownGroupBy,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    RichTextArea,
    TagableCCL,
    // Flag,
    Actions,
    MembersWorkspace,
    FormCreateClientMessage,
    ButtonLoadMore,
    Attachments,
    ChipJoinMenuSelectBox,
    AddIcon,
    ConfirmItem,
    ClientMessageDetail,
    //menus
    MenuCCL,
    MenuSelectCheckBox,
  },
  data() {
    return {
      NA,
      panel: [0],
      headers: [
        { text: "First Name", value: "first_name", active: true },
        { text: "Last Name", value: "last_name", active: true },
        { text: "Message Source", value: "message_source", active: true },
        { text: "Sender", value: "creator", active: true },
        { text: "Message Recipients", value: "members", active: true },
        { text: "Message Time", value: "message_time", active: true },
        { text: "Original Message", value: "subject", active: true },
        { text: "Matter", value: "matter", active: true },
        { text: "Message Status", value: "status", active: true },
        { text: "Last Update", value: "last_update", active: true },
        { text: "Attachment", value: "attachments", active: true },
        { text: "Message Tags", value: "labels", active: true },
        { text: "Attorney-Client Privilege?", value: "is_check_client_rivilege", active: true },
        { text: "Total Message", value: "total_message", active: true },
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
          field: "client_name",
          title: "Client Name",
          list: []
        },
        {
          id: 3,
          field: "message_source",
          title: "Message Source",
          list: []
        },
      ],
      clientMessageId: 0,
      actionDetele: {},
      isShowPopupDelete: false,
      isLoadingDelete: false,
      //attachment
      isShowPopupAttachment: false,
      showDetailRight: false,
      isClickOutSidePopupDetail: false,
      isLoadingGetDetail: false
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/clients/clientMessage", [
      "dataClientMessage",
      "isLoadingGet",
      //attachment
      "dataAttachments"
    ]),
    ...mapGetters("ht_store/workspace/member", ["members"]),
  },
  methods: {
    setStatus(status) {
      this.showDetailRight = status;
    },
    async showDetail(clientId, clientMessageId) {
      this.showDetailRight = true;
      const data = {
        clientId,
        clientMessageId,
      };
      this.isLoadingGetDetail = true;
      await this.getClientMessageDetailRequest(data).then((clientMessage) => {
        const data = {
          idParams:
            {
              clientId: clientMessage.client.pk,
              clientMessageId: clientMessage.pk
            }
        }
        this.getDataTopicMessageRequest(data);
      });
      this.isLoadingGetDetail = false;
    },
    onPagingListGroupBy(page) {
      const query = this.$route.query;
      const groupBy = this.groupByList.find(x => x.field === query.group);
      groupBy.page = page;
      this.getDataClientMessage(query);
      this.$nextTick(() => {
        this.$refs.headerSlickTable.$el.scrollIntoView({top: 0, behavior: 'smooth'});
      })
    },
    onShowPopupAttachment(item) {
      this.clientMessageId = item.pk;
      this.getDataAttachments(item.attachments);
      this.isShowPopupAttachment = true;
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataClientMessage[groupID]) return false;
      const totals = this.dataClientMessage[groupID].totals;
      const results = this.dataClientMessage[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    onSearchClientMessage(text) {
      const query = {
        ...this.$route.query,
        name: text,
      }
      this.changeQueryRouter(query);
    },
    onChangeGroupBy(item) {
      const query = {
        ...this.$route.query,
        group: item.field,
      }
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
    async removeClientMessage() {
      const { item, name } = this.actionDetele;
      const data = {
        name,
        clientId: item.client.pk,
        clientMessageId: item.pk
      };
      try {
        this.isLoadingDelete = true;
        await this.removeClientMessageRequest(data);
        this.isLoadingDelete = false;
        this.isShowPopupDelete = false;
      } catch (error) {
        this.isLoadingDelete = false;
        throw error;
      }
    },
    async updatePagination(searchObject, isFirstCall) {
      return this.getDataClientMessageRequest({
        searchObject,
        isFirstCall
      });
    },
    updateClientMessage(clientId, clientMessageId, name, value) {
      const data = {
        idParams: {
          clientId,
          clientMessageId
        },
        body: {
          [name]: value
        }
      };
      this.updateClientMessageRequest(data);
    },

    removeRequestItemInTask(clientId, clientMessageId, requestItemId) {
      const data = {
        clientId,
        clientMessageId,
        requestItemId,
      };
      this.removeRequestItemInTaskRequest(data);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group, resetPageListGroupBy = {isReset: false, pageReset: 1}) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      if (resetPageListGroupBy.isReset) {
        groupByCurrent.page = resetPageListGroupBy.pageReset
      }
      switch (group) {
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataClientMessage(query, isFirstCall, resetPageListGroupBy) {
      this.groupBy = await this.getGroupByCurrent(query.group, resetPageListGroupBy);
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
    ...mapMutations("ht_store/clients/clientMessage", [
      "getDataAttachments"
    ]),
    ...mapActions("ht_store/clients/clientMessage", [
      "getDataClientMessageRequest",
      "getClientMessageDetailRequest",
      "updateClientMessageRequest",
      "removeClientMessageRequest",
      "removeRequestItemInTaskRequest"
    ]),
    ...mapActions("ht_store/clients/clientMessage/message", [
      "getDataTopicMessageRequest"
    ]),
    ...mapActions("ht_store/clients/clientsCommon", ["getWorkspaceMemberRequest"]),
  },
  mounted() {
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataClientMessage(query, true);
    } else {
      this.changeQueryRouter({group: "all"});
    }
    this.getWorkspaceMemberRequest();
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataClientMessage(query, true, {isReset: true, pageReset: 1});
      } else {
        this.changeQueryRouter({group: "all"});
      }
    }
  }
};
</script>
