<template>
  <v-container fluid>
    <v-card flat class="mb-4">
      <v-card-title>
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
            <v-chip class="ml-2 body-2 badge" small style="position:sticky; right: 40px;">
              <span class="font-weight-bold mr-2">
                {{
                dataClients[groupItem.groupID]
                ? dataClients[groupItem.groupID].results.length
                : 0
                }}
                of
                {{
                dataClients[groupItem.groupID]
                ? dataClients[groupItem.groupID].totals
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
            :headers="headersFilter"
            :desserts="
              dataClients[groupItem.groupID]
                ? dataClients[groupItem.groupID].results
                : []
            "
            :loading="isLoadingGet[groupItem.groupID]"
          >
            <template v-slot:item.action="{ props: { item } }">
              <div class="d-flex">
                <BookmarkOrFlag
                  :valueBookmark="item.bookmarked_pk"
                  :endpoint="`/api/clients/${item.pk}`"
                  routerMutation="ht_store/clients/updateClient"
                  :pk="item.pk"
                  :isShowFlag="false"
                />

                <Action :item="item" @remove="removeClient(groupItem.groupID, item.pk, $event)" />
                <a
                  class="ma-0 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small"
                  @click="showDetail(item.pk)"
                  icon
                  small
                >
                  <v-icon small color="grey">mdi-eye</v-icon>
                </a>
              </div>
            </template>
            <template v-slot:item.total_notes="{ props: { item } }">
              <Notes :totalNotes="item.total_notes" :id="item.pk" />
            </template>
            <template v-slot:item.labels="{ props: { item } }">
              <LabelsClient
                :tag="item.labels"
                @onClickIcon="
                $_toggleMenuIssueMixin_openMenu({
                  ...$event,
                  pk: item.pk
                })
              "
              />
            </template>
            <template v-slot:item.credibility="{ props: { item } }">
              <SelectCheckBox
                title="Credibility"
                keyText="label"
                keyValue="value"
                :value="item.credibility"
                :dataList="appConfigChoices[appConfigConstants.CLIENTS_CREDIBILITY]"
                @update="updateClients(item.pk, 'credibility', $event.value)"
              />
            </template>
            <template v-slot:item.status="{ props: { item } }">
              <SelectCheckBox
                title="Client Status"
                keyText="label"
                keyValue="value"
                :value="item.status"
                :dataList="appConfigChoices[appConfigConstants.CLIENTSTATUS_STATUSTYPE]"
                @update="updateClients(item.pk, 'status', $event.value)"
              />
            </template>
            <template v-slot:item.enable_portal="{ props: { item } }">
              <Disputed
                :value="item.enable_portal"
                @update="updateClients(item.pk, 'enable_portal', $event)"
              />
            </template>

            <template v-slot:item.managers_map="{ props: { item } }">
              <MembersWorkspace
                :value="item.managers_map"
                :isLoadingGet="isLoadingGetMember"
                :isEmitOpenMenu="true"
                @selectRow="updateClientsManagers(item, 'add', $event)"
                @removeRow="updateClientsManagers(item, 'remove', $event)"
                @onOpenMenu="getDataMember"
              />
            </template>
            <template v-slot:item.user_referrals="{ props: { item } }">
              <MembersWorkspace
                :value="item.user_referrals"
                :isLoadingGet="isLoadingGetMember"
                :isEmitOpenMenu="true"
                @update="updateClients(item.pk, 'user_referrals', $event)"
                @onOpenMenu="getDataMember"
              />
            </template>
            <template v-slot:item.client_referrals="{ props: { item } }">
              <ReferralByClients
                :pk="item.pk"
                :value="item.client_referrals"
                :isLoadingGet="isLoadingGetClients"
                :isEmitOpenMenu="true"
                @update="updateClients(item.pk, 'client_referrals', $event)"
                @onOpenMenu="getDataClientsCommon"
              />
            </template>
            <template v-slot:item.addresses="{ props: { item } }">
              <ListAddress
                :listAddress="item.addresses"
                :listType="appConfigChoices[appConfigConstants.CLIENT_ADDRESSTYPE]"
                :pk="item.pk"
              />
            </template>
            <template v-slot:item.client_since="{ props: { item } }">
              <v-row no-gutters class="td-date">
                <div>{{item.created | formatShortDate}}</div>
              </v-row>
            </template>
            <template v-slot:item.name="{ props: { item } }">
              <FullName
                :isLoading="isLoadingUpdate"
                :avatar="item.avatar"
                :firstName="item.first_name"
                :lastName="item.last_name"
                @update="updateFullnameClients(item.pk, $event)"
              />
            </template>
            <template v-slot:item.creator="{ props: { item } }">
              <CreatedBy :members="members" :value="item" keyText="creator" />
            </template>
            <template v-slot:item.client_type="{ props: { item } }">
              <SelectCheckBox
                title="Client Type"
                keyText="label"
                keyValue="value"
                :value="item.client_type"
                :dataList="appConfigChoices[appConfigConstants.CLIENT_CLIENTTYPE]"
                @update="updateClients(item.pk, 'client_type', $event.value)"
              />
            </template>
            <template v-slot:item.emails="{ props: { item } }">
              <CommunicationsClient
                :isLoading="isLoadingUpdate"
                :primaryValue="item.email"
                name="emails"
                keyValue="email"
                :listData="item.extra_info && item.extra_info.emails"
                :listType="appConfigChoices[appConfigConstants.CLIENT_EMAILTYPE]"
                @addDefaultEmail="updateClientsAsync(item.pk, 'email', $event)"
                @update="updateClientsAsync(item.pk, 'extra_info', {...item.extra_info, emails: $event} )"
              />
            </template>
            <template v-slot:item.phones="{ props: { item } }">
              <CommunicationsClient
                :isLoading="isLoadingUpdate"
                name="phones"
                keyValue="number"
                :listData="item.extra_info && item.extra_info.phones"
                :listType="appConfigChoices[appConfigConstants.CLIENT_PHONETYPE]"
                @update="updateClientsAsync(item.pk, 'extra_info', {...item.extra_info, phones: $event} )"
              />
            </template>
            <template v-slot:item.matters="{ props: { item } }">
              {{(item.matters || []).length}}
              <AddIcon
                @onClickIcon="onShowPopupMeeting(item.pk, 'matters', item.matters)"
                icon="mdi-attachment"
              />
            </template>
            <template v-slot:item.meetings="{ props: { item } }">
              {{(item.meetings || []).length}}
              <AddIcon
                @onClickIcon="onShowPopupMeeting(item.pk, 'meetings', item.meetings)"
                icon="mdi-attachment"
              />
            </template>
          </TableGrid>
          <div class="d-flex align-center align-center">
            <v-col cols="10" class="pa-0">
              <FormCreateClient
                class="pt-4"
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

    <ClientDetail
      :isShow="showDetailRight"
      title="Client Detail"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :pk="clientId"
    />
    <MenuLabelWorkSpace
      :labels="menuIssue.value"
      :isShowMenu="menuIssue.isShowMenu"
      :positionX="menuIssue.positionX"
      :positionY="menuIssue.positionY"
      :isLoadingGet="isLoadingGetDocumentLabel"
      @closeMenu="menuIssue.isShowMenu = false"
      @update="
        menuIssue.value = $event;
        updateClients(menuIssue.pk, 'labels', $event);
      "
      @resetValueCheck="menuIssue.value = $event"
    />
    <PopupClientList
      :value="[]"
      :isShowPopup="isShowPopupClients"
      :data="clientData"
      :id="clientId"
      @closePopup="isShowPopupClients = false;"
      :name="namePopupDetail"
      :detail="false"
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
import CommunicationsClient from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/CommunicationsClient";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import MembersWorkspace from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/MembersWorkspace";
import ReferralByClients from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ReferralByClients";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import LabelsClient from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/lable-client/LabelsClient";

import Notes from "./components/TdNotesClients";
import ClientDetail from "./ClientDetail/index";
import FullName from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/FullName";
import CreatedBy from "@/sat-vue-toolkit/satlegal/ht_components/common/CreatedBy";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";
import PopupClientList from "./components/PopupClientList";
import ListAddress from "./components/ListAddress";
import FormCreateClient from "./components/FormCreateClient";
// menu
import MenuLabelWorkSpace from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/lable-client/MenuLabelWorkSpace";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";

// mixins
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuLabelWorkSpaceMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/lable-client/mixins/toggleMenuILabelWorkSpaceMixin";
import { nullalbe } from "@/sat-vue-toolkit/satlegal/config";

export default {
  name: "Clients",
  mixins: [appConfigMixin, toggleMenuLabelWorkSpaceMixin],
  components: {
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    TableGrid,
    ButtonLoadMore,
    CommunicationsClient,
    SelectCheckBox,
    MembersWorkspace,
    Disputed,
    LabelsClient,
    Notes,
    Action,
    ClientDetail,
    FullName,
    CreatedBy,
    ReferralByClients,
    AddIcon,
    FormCreateClient,
    // Menu
    MenuLabelWorkSpace,
    MenuDropDownGroupBy,
    PopupClientList,
    ListAddress,
    BookmarkOrFlag
  },
  data() {
    return {
      panel: [0],
      isClickOutSidePopupDetail: false,
      isLoadingGetDocumentLabel: false,
      isLoadingGetClients: false,
      isCallAPIClientsCommon: false,
      isShowPopupClients: false,
      clientId: "",
      clientData: [],
      namePopupDetail: "",
      headers: [
        // { text: "Frist Name", value: "first_name", active: true },
        { text: "FullName", value: "name", active: true },
        { text: "Account Type", value: "client_type", active: true },
        { text: "Email", value: "emails", active: true },
        {
          text: "Phone Number",
          value: "phones",
          active: true
        },
        { text: "Added By", value: "creator", active: true },
        { text: "Client since", value: "client_since", active: true },
        { text: "Referral By Members", value: "user_referrals", active: true },
        {
          text: "Referral By Clients",
          value: "client_referrals",
          active: true
        },
        { text: "Client Address", value: "addresses", active: true },
        { text: "Current Matter", value: "matters", active: true },
        { text: "Managed by ", value: "managers_map", active: true },
        { text: "Client Meeting", value: "meetings", active: true },
        { text: "Client Portal Access", value: "enable_portal", active: true },
        { text: "Client Status", value: "status", active: true },
        {
          text: "Credibility",
          value: "credibility",
          active: true
        },
        {
          text: "Client Label",
          value: "labels",
          active: true
        },
        { text: "Note", value: "total_notes", active: true },
        {
          text: "Action",
          value: "action",
          active: true
        }
      ],
      isCallApiMemberCell: false,
      isLoadingGetMember: false,
      isLoadingGetDetail: false,
      showDetailRight: false,
      isLoadingUpdate: false,
      dataClientsGroupBy: [],
      dataMembersGroupBy: [],
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
          field: "client_referrals",
          title: "Referrals by Client",
          list: []
        },
        {
          id: 3,
          field: "user_referrals",
          title: "Referral By Members",
          list: []
        },
        {
          id: 4,
          field: "managers",
          title: "Managed by",
          list: []
        },
        {
          id: 5,
          field: "credibility",
          title: "Credibility",
          list: []
        },
        {
          id: 6,
          field: "enable_portal",
          title: "Client Portal Access",
          list: []
        }
      ]
    };
  },
  computed: {
    ...mapGetters("ht_store/clients", [
      "dataClients",
      "totals",
      "isLoadingGet"
    ]),
    ...mapGetters("ht_store/clients/clientsCommon", ["members"]),
    headersFilter() {
      return this.headers.filter(h => h.active);
    },
    checkExistGroupBy() {
      return this.groupByList.some(x => x.field === this.$route.query.group);
    },
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  methods: {
    async getDataMember() {
      if (!this.isCallApiMemberCell) {
        this.isCallApiMemberCell = true;
        try {
          this.isLoadingGetMember = true;
          this.dataMembersGroupBy = await this.getWorkspaceMemberRequest();
          this.isLoadingGetMember = false;
        } catch (error) {
          this.isLoadingGetMember = false;
        }
      }
    },
    async getDataClientsCommon() {
      if (!this.isCallAPIClientsCommon) {
        this.isCallAPIClientsCommon = true;
        try {
          this.isLoadingGetClients = true;
          this.dataClientsGroupBy = await this.getDataClientsCommonRequest();
          this.isLoadingGetClients = false;
        } catch (error) {
          this.isLoadingGetClients = false;
        }
      }
    },
    ...mapActions("ht_store/clients", [
      "getDataClientsRequest",
      "updateClientsRequest",
      "updateClientAsyncRequest",
      "removeClientRequest",
      "postManagersRequest",
      "removeManagersRequest",
      "updateFullameClientAsyncRequest",
      "getClientDetailRequest"
    ]),
    ...mapActions("ht_store/clients/clientsCommon", [
      "getWorkspaceMemberRequest",
      "getDataClientsCommonRequest"
    ]),
    ...mapMutations("ht_store/clients", ["updateEmailsMutation"]),
    setStatus(status) {
      this.showDetailRight = status;
    },
    async showDetail(pk) {
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      await this.getClientDetailRequest(pk);
      this.isLoadingGetDetail = false;
      this.clientId = pk;
    },
    onShowPopupMeeting(id, name, data) {
      this.clientId = id;
      this.clientData = data;
      this.isShowPopupClients = true;
      this.namePopupDetail = name;
    },
    isShowButtonLoadMore(groupID) {
      if (!this.dataClients[groupID]) return false;
      const totals = this.dataClients[groupID].totals;
      const results = this.dataClients[groupID].results;
      return totals > 20 && totals > results.length;
    },
    changeQueryRouter(query) {
      this.$router.push({
        path: this.$route.path,
        query
      });
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
    async getDataObjectionType() {
      if (!this.isCallApiObjectionTypeCell) {
        this.isCallApiObjectionTypeCell = true;
        this.isLoadingGetObjectionType = true;
        const matterId =
          this.$route.params.matter || this.$route.params.projectId;
        await this.getDataObjectionTypeRequest({ matterId });
        this.isLoadingGetObjectionType = false;
      }
    },
    onSearchDeposition(text) {
      const query = {
        ...this.$route.query,
        question: text
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
    resetFields({ fields }) {
      this.headers = fields;
    },
    async getGroupByCurrent(group) {
      const groupByCurrent =
        this.groupByList.find(x => x.field === group) || this.groupByList[0];
      switch (group) {
        case "client_referrals":
          if (!this.isCallAPIClientsCommon) {
            this.isCallAPIClientsCommon = true;
            this.dataClientsGroupBy = await this.getDataClientsCommonRequest();
          }
          groupByCurrent.list = [...this.dataClientsGroupBy, nullalbe].map(
            x => {
              const dataMap = {
                id: x.pk,
                groupID: x.pk,
                value: {
                  id: x.pk,
                  name: `${x.last_name} ${x.first_name}`,
                  avatarUrl: x.avatar
                },
                text: (x.last_name || "") + " " + (x.first_name || "")
              };
              return dataMap;
            }
          );
          return groupByCurrent;
        case "user_referrals":
          if (!this.isCallApiMemberCell) {
            this.isCallApiMemberCell = true;
            this.dataMembersGroupBy = await this.getWorkspaceMemberRequest();
          }
          groupByCurrent.list = this.dataMembersGroupBy.map(x => {
            const dataMap = {
              id: x.user && x.user.pk,
              groupID: x.user && x.user.pk,
              value: {
                id: x.user && x.user.pk,
                name: x.user && x.user.name,
                avatarUrl: x.user && x.user.avatar
              },
              text: x.user && x.user.name
            };
            return dataMap;
          });
          return groupByCurrent;
        case "managers":
          if (!this.isCallApiMemberCell) {
            this.isCallApiMemberCell = true;
            this.dataMembersGroupBy = await this.getWorkspaceMemberRequest();
          }
          groupByCurrent.list = this.dataMembersGroupBy.map(x => {
            const dataMap = {
              id: x.user && x.user.pk,
              groupID: x.user && x.user.pk,
              value: {
                id: x.user && x.user.pk,
                name: x.user && x.user.name,
                avatarUrl: x.user && x.user.avatar
              },
              text: x.user && x.user.name
            };
            return dataMap;
          });
          return groupByCurrent;
        case "credibility":
          groupByCurrent.list = [
            ...this.appConfigChoices[
              this.appConfigConstants.CLIENTS_CREDIBILITY
            ],
            nullalbe
          ].map(x => {
            const dataMap = {
              id: x.value,
              groupID: x.value,
              value: {
                id: x.value,
                name: x.label
              },
              text: x.label
            };
            return dataMap;
          });
          return groupByCurrent;
        case "enable_portal":
          groupByCurrent.list = [
            {
              id: true,
              groupID: "True",
              value: {
                id: "True",
                name: "True"
              },
              text: "True"
            },
            {
              id: false,
              groupID: "False",
              value: {
                id: "False",
                name: "False"
              },
              text: "False"
            }
          ];
          return groupByCurrent;
        default:
          groupByCurrent.list = [
            { id: 1, groupID: "all", value: "all", text: "" }
          ];
          return groupByCurrent;
      }
    },
    async getDataClientsFromApi(query, isFirstCall) {
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
    updatePagination(searchObject, isFirstCall) {
      return this.getDataClientsRequest({ searchObject, isFirstCall });
    },
    async updateClientsAsync(pk, name, value) {
      const data = {
        idParams: {
          pk
        },
        body: {
          [name]: value
        }
      };
      try {
        this.isLoadingUpdate = true;
        await this.updateClientAsyncRequest(data);
        this.isLoadingUpdate = false;
      } catch (error) {
        this.isLoadingUpdate = false;
      }
    },
    async updateFullnameClients(pk, body) {
      const data = {
        idParams: {
          pk
        },
        body
      };
      try {
        this.isLoadingUpdate = true;
        await this.updateFullameClientAsyncRequest(data);
        this.isLoadingUpdate = false;
      } catch (error) {
        this.isLoadingUpdate = false;
      }
    },
    updateClients(pk, name, value) {
      const data = {
        idParams: {
          pk
        },
        body: {
          [name]: value
        }
      };
      this.updateClientsRequest(data);
    },
    async updateClientsManagers(item, name, value) {
      if (name === "add") {
        const data = {
          idParams: {
            pk: item.pk
          },
          body: {
            user: value
          }
        };
        try {
          this.isLoadingGetMember = true;
          await this.postManagersRequest(data);
          this.isLoadingGetMember = false;
        } catch (error) {
          this.isLoadingGetMember = false;
        }
      } else {
        const user = item.managers.find(x => x.user_id === value);
        this.removeManagersRequest({
          pk: item.pk,
          value: user.pk,
          user_id: user.user_id
        });
      }
    },
    async removeClient(name, id, close) {
      const data = {
        name,
        id
      };
      data.isFieldArray = Array.isArray(this.groupBy.field);
      await this.removeClientRequest(data);
      close();
    },
  },
  async mounted() {
    await this.getWorkspaceMemberRequest();
    const query = this.$route.query;
    if (this.checkExistGroupBy) {
      this.getDataClientsFromApi(query, true);
    } else {
      this.changeQueryRouter({ group: "all" });
    }
  },
  watch: {
    "$route.query"(query) {
      if (this.checkExistGroupBy) {
        this.getDataClientsFromApi(query, true);
      } else {
        this.changeQueryRouter({ group: "all" });
      }
    }
  }
};
</script>

<style scoped>
.td-date {
  justify-content: space-between;
  flex-direction: row;
  width: 100px;
  align-items: center;
}
</style>
