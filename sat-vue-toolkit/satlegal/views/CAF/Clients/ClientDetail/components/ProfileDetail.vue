<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-row class="py-4 px-2">
        <v-col cols="12" class="d-flex justify-center text-no-wrap">
          <UserAvatar :imageUrl="clientDetail.avatar" :avatarSize="130" class="mr-1" />
        </v-col>
        <v-col cols="12" class="d-flex justify-center text-no-wrap">
          <UploadFileSingle
            type="round"
            accept="image/*"
            :isAvatarCenter="true"
            imageUrl
            name
            textButtonRemove="remove"
            textButtonAdd="Update Avatar"
            @remove="updateAttachment('remove', {})"
            @change="updateAttachment('update', $event)"
          />
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-text-field
              :value="clientDetail.first_name || ''"
              label="Fist Name"
              placeholder="Fist Name"
              :rules="[v => !!v || 'This field is required']"
              @change="updateClientDetail('first_name', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-text-field
              :value="clientDetail.last_name"
              label="Last Name"
              placeholder="Last Name"
              :rules="[v => !!v || 'This field is required']"
              @change="updateClientDetail('last_name', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.CLIENT_CLIENTTYPE]"
            label="Client Type"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="clientDetail.client_type"
            @change="updateClientDetail('client_type', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Emails:</label>
          <CommunicationsClient
            :isLoading="isLoadingUpdate"
            :primaryValue="clientDetail.email"
            name="emails"
            keyValue="email"
            :listData="(clientDetail.extra_info && clientDetail.extra_info.emails) || []"
            :listType="appConfigChoices[appConfigConstants.CLIENT_EMAILTYPE]"
            @addDefaultEmail="updateClientDetailAsync('email', $event)"
            @update="updateClientDetailAsync('extra_info', {...clientDetail.extra_info, emails: $event} )"
          />
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Phones:</label>
          <CommunicationsClient
            :isLoading="isLoadingUpdate"
            name="phones"
            keyValue="number"
            :listData="(clientDetail.extra_info && clientDetail.extra_info.phones) || []"
            :listType="appConfigChoices[appConfigConstants.CLIENT_EMAILTYPE]"
            @update="updateClientDetailAsync('extra_info', {...clientDetail.extra_info, phones: $event} )"
          />
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Added By:</label>
          <CreatedBy :members="members" :value="clientDetail" keyText="creator" />
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Client since:</label>
          <v-row no-gutters class="td-date">
            <div>{{clientDetail.created | formatShortDate}}</div>
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Referral By Members:</label>
          <MembersWorkspace
            :value="clientDetail.user_referrals"
            :isLoadingGet="isLoadingGetMember"
            :isEmitOpenMenu="true"
            @update="updateClientDetail('user_referrals', $event)"
            @onOpenMenu="getDataMember"
          />
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Referral By Clients:</label>
          <ReferralByClients
            :pk="clientDetail.pk"
            :value="clientDetail.client_referrals"
            :isLoadingGet="isLoadingGetClients"
            :isEmitOpenMenu="true"
            @update="updateClientDetail('client_referrals', $event)"
            @onOpenMenu="getDataClientsCommon"
          />
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Client Address:</label>
          <ListAddress
            :listAddress="clientDetail.addresses"
            :listType="appConfigChoices[appConfigConstants.CLIENT_ADDRESSTYPE]"
            :pk="clientDetail.pk"
            :detail="true"
          />
        </v-col>

        <v-col cols="6">
          <label class="mb-3">Current Matter:</label>
          <div>
            {{(clientDetail.matters || []).length}}
            <AddIcon
              @onClickIcon="onShowPopupMeeting('matters', clientDetail.matters)"
              icon="mdi-attachment"
            />
          </div>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Managed by:</label>
          <MembersWorkspace
            :value="clientDetail.managers_map"
            :isLoadingGet="isLoadingGetMember"
            :isEmitOpenMenu="true"
            @selectRow="updateClientDetailManagers('add', $event)"
            @removeRow="updateClientDetailManagers('remove', $event)"
            @onOpenMenu="getDataMember"
          />
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Client Meeting:</label>
          <div>
            {{(clientDetail.meetings || []).length}}
            <AddIcon
              @onClickIcon="onShowPopupMeeting('meetings', clientDetail.meetings)"
              icon="mdi-attachment"
            />
          </div>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Client Portal Access:</label>
          <Disputed
            :value="clientDetail.enable_portal"
            @update="updateClientDetail('enable_portal', $event)"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.CLIENTSTATUS_STATUSTYPE]"
            label="Client Status"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="clientDetail.status"
            @change="updateClientDetail('status', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.CLIENTS_CREDIBILITY]"
            label="Credibility"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="clientDetail.credibility"
            @change="updateClientDetail('credibility', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Client Label:</label>
          <LabelsClient
            :tag="clientDetail.labels || []"
            :lengthDisplay="2"
            @onClickIcon="
                $_toggleMenuIssueMixin_openMenu({
                  ...$event,
                  pk: clientDetail.pk
                })
              "
          />
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Note:</label>
          <Notes :totalNotes="clientDetail.total_notes" :id="clientDetail.pk" />
        </v-col>
      </v-row>
    </v-form>
    <PopupClientList
      :value="[]"
      :isShowPopup="isShowPopupClients"
      :data="clientData"
      :id="clientDetail.pk"
      @closePopup="isShowPopupClients = false;"
      :name="namePopupDetail"
      :detail="true"
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
        updateClientDetail('labels', $event);
      "
      @resetValueCheck="menuIssue.value = $event"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import UploadFileSingle from "@/sat-vue-toolkit/satlegal/ht_components/inputs/UploadFileSingle";
import UserAvatar from "@/sat-vue-toolkit/satlegal/ht_components/avatars/UserAvatar";
import SelectChip from "@/sat-vue-toolkit/satlegal/ht_components/inputs/SelectChip";
import CommunicationsClient from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/CommunicationsClient";
import CreatedBy from "@/sat-vue-toolkit/satlegal/ht_components/common/CreatedBy";
import MembersWorkspace from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/MembersWorkspace";
import PopupClientList from "../../components/PopupClientList";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import LabelsClient from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/lable-client/LabelsClient";
import Notes from "../../components/TdNotesClients";
import ListAddress from "../../components/ListAddress";
import ReferralByClients from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ReferralByClients";

import MenuLabelWorkSpace from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/lable-client/MenuLabelWorkSpace";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuLabelWorkSpaceMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/lable-client/mixins/toggleMenuILabelWorkSpaceMixin";

export default {
  name: "clientDetail",
  mixins: [appConfigMixin, toggleMenuLabelWorkSpaceMixin],
  data() {
    return {
      valid: false,
      isLoadingUpdate: false,
      isCallApiMemberCell: false,
      isLoadingGetMember: false,
      clientData: [],
      namePopupDetail: "",
      isShowPopupClients: false,
      isLoadingGetDocumentLabel: false,
      isLoadingGetClients: false,
      isCallAPIClientsCommon: false
    };
  },
  components: {
    UploadFileSingle,
    UserAvatar,
    SelectChip,
    CommunicationsClient,
    CreatedBy,
    MembersWorkspace,
    PopupClientList,
    AddIcon,
    Disputed,
    LabelsClient,
    MenuLabelWorkSpace,
    Notes,
    ListAddress,
    ReferralByClients
  },
  computed: {
    ...mapGetters("ht_store/clients", ["clientDetail"]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ]),
    ...mapGetters("ht_store/clients/clientsCommon", ["members"])
  },
  methods: {
    ...mapActions("ht_store/clients", [
      "updateClientAsyncRequest",
      "updateClientsRequest",
      "updateFullameClientAsyncRequest",
      "removeManagersRequest",
      "postManagersRequest"
    ]),
     ...mapActions("ht_store/clients/clientsCommon", [
      "getWorkspaceMemberRequest",
      "getDataClientsCommonRequest"
    ]),
    async getDataClientsCommon() {
      if (!this.isCallAPIClientsCommon) {
        this.isCallAPIClientsCommon = true;
        try {
          this.isLoadingGetClients = true;
          await this.getDataClientsCommonRequest();
          this.isLoadingGetClients = false;
        } catch (error) {
          this.isLoadingGetClients = false;
        }
      }
    },

    onShowPopupMeeting(name, data) {
      this.clientData = data;
      this.isShowPopupClients = true;
      this.namePopupDetail = name;
    },
    async getDataMember() {
      if (!this.isCallApiMemberCell) {
        this.isCallApiMemberCell = true;
        try {
          this.isLoadingGetMember = true;
          await this.getWorkspaceMemberRequest();
          this.isLoadingGetMember = false;
        } catch (error) {
          this.isLoadingGetMember = false;
        }
      }
    },
    updateClientDetailManagers(name, value) {
      if (name === "add") {
        const data = {
          idParams: {
            pk: this.clientDetail.pk
          },
          body: {
            user: value
          },
          detail: true
        };
        this.postManagersRequest(data);
      } else {
        const user = this.clientDetail.managers.find(x => x.user_id === value);
        this.removeManagersRequest({
          pk: this.clientDetail.pk,
          value: user.pk,
          user_id: user.user_id,
          detail: true
        });
      }
    },
    async updateAttachment(name, file) {
      const data = {
        idParams: {
          pk: this.clientDetail.pk
        },
        body: {
          avatar: file.file || null
        },
        detail: true
      };
      try {
        this.isLoadingUpdate = true;
        await this.updateFullameClientAsyncRequest(data);
        this.isLoadingUpdate = false;
      } catch (error) {
        this.isLoadingUpdate = false;
      }
    },
    async updateClientDetailAsync(name, value) {
      if (this.$refs.form.validate()) {
        const data = {
          idParams: {
            pk: this.clientDetail.pk
          },
          body: {
            [name]: value
          },
          detail: true
        };
        try {
          this.isLoadingUpdate = true;
          await this.updateClientAsyncRequest(data);
          this.isLoadingUpdate = false;
        } catch (error) {
          this.isLoadingUpdate = false;
        }
      }
    },
    updateClientDetail(name, value) {
      if (this.$refs.form.validate()) {
        const data = {
          idParams: {
            pk: this.clientDetail.pk
          },
          body: {
            [name]: value
          },
          detail: true
        };
        this.updateClientsRequest(data);
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
.custom-chip /deep/ .v-chip {
  max-width: 80px;
}
.text-custom {
  color: rgba(0, 0, 0, 0.6);
}
.td-date {
  justify-content: space-between;
  flex-direction: row;
  width: 100px;
  align-items: center;
}
</style>
