<template>
  <div>
    <v-form ref="form">
      <v-row class="px-2">
        <v-col cols="6">
          <div class="d-flex">
            <span style="color:black;font-weight: 500;" class="mr-2"
              >Actions :</span
            >
            <div>
              <Actions
                :isShowActionDelete="false"
                :isShowActionView="false"
                :valueFlag="dataClientMessageDetail.flag"
                :valueBookmark="!!dataClientMessageDetail.bookmarked_pk"
              />
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <p>
            <span style="color:black;font-weight: 500;">Total Message :</span>
            {{ dataClientMessageDetail.total_messages }}
          </p>
        </v-col>
        <v-col cols="6">
          <p>
            <span style="color:black;font-weight: 500;">First Name :</span>
            {{ dataClientMessageDetail.client.first_name }}
          </p>
        </v-col>
        <v-col cols="6">
          <p>
            <span style="color:black;font-weight: 500;">Last Name :</span>
            {{ dataClientMessageDetail.client.last_name }}
          </p>
        </v-col>
        <v-col cols="6">
          <div class="d-flex">
            <span style="color:black;font-weight: 500;" class="mr-2"
              >Message Source :</span
            >
            <ChipJoinMenuSelectBox
              :isShowDropDown="false"
              :value="dataClientMessageDetail.message_source"
              keyValue="value"
              keyText="label"
              :dataList="appConfigChoices[appConfigConstants.MESSAGE_SOURCE]"
            />
          </div>
        </v-col>
        <v-col cols="6">
          <p>
            <span style="color:black;font-weight: 500;" class="mr-2"
              >Sender :</span
            >
            {{ dataClientMessageDetail.creator }}
          </p>
        </v-col>
        <v-col cols="6">
          <p>
            <span style="color:black;font-weight: 500;" class="mr-2"
              >Matter :</span
            >
            {{ dataClientMessageDetail.matter }}
          </p>
        </v-col>
        <v-col cols="6">
          <p>
            <span style="color:black;font-weight: 500;" class="mr-2"
              >Message Time :</span
            >
            {{ dataClientMessageDetail.message_time }}
          </p>
        </v-col>
        <v-col cols="6">
          <p style="color:black;font-weight: 500;">
            Original Message :
          </p>
          <div>
            <RichTextArea :value="dataClientMessageDetail.subject" />
          </div>
        </v-col>
        <v-col cols="6">
          <p style="color:black;font-weight: 500;">
            Message Source :
          </p>
          <div>
            <MembersWorkspace :value="dataClientMessageDetail.members" />
          </div>
        </v-col>

        <v-col cols="6">
          <p style="color:black;font-weight: 500;">
            Message Status :
          </p>
          <div>
            <ChipJoinMenuSelectBox
              :value="dataClientMessageDetail.status"
              keyValue="value"
              keyText="label"
              :dataList="appConfigChoices[appConfigConstants.MESSAGE_STATUS]"
              @onClickChip="
                $_toggleMenuSelectBox_openMenu({
                  ...$event,
                  title: 'Message Status',
                  name: 'status',
                  pk: dataClientMessageDetail.pk,
                  keyValue: 'value',
                  keyText: 'label',
                  value: dataClientMessageDetail.status,
                  dataList: appConfigChoices[appConfigConstants.MESSAGE_STATUS]
                })
              "
            />
          </div>
        </v-col>
        <v-col cols="6">
          <p>
            <span style="color:black;font-weight: 500;" class="mr-2"
              >Last Update :</span
            >
          </p>
        </v-col>
        <v-col cols="6">
          <p style="color:black;font-weight: 500;">
            Attachments :
          </p>
          <div>
            <AddIcon icon="mdi-attachment" />
          </div>
        </v-col>
        <v-col cols="6">
          <p style="color:black;font-weight: 500;">
            Message Tags :
          </p>
          <div>
            <TagableCCL
              textNoData="No Tags"
              :tag="dataClientMessageDetail.labels"
              @onClickIcon="
                $_toggleMenuCCLMixin_openMenu({
                  ...$event,
                  pk: dataClientMessageDetail.pk
                })
              "
            />
          </div>
        </v-col>
        <v-col cols="6">
          <p style="color:black;font-weight: 500;">
            Attorney-Client Privilege? :
          </p>
          <div>
            <ChipJoinMenuSelectBox
              :value="dataClientMessageDetail.is_check_client_rivilege"
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
                  pk: dataClientMessageDetail.pk,
                  keyValue: 'value',
                  keyText: 'label',
                  value: dataClientMessageDetail.is_check_client_rivilege,
                  dataList:
                    appConfigChoices[
                      appConfigConstants.ATTORNEY_CLIENT_PRIVILEGE
                    ]
                })
              "
            />
          </div>
        </v-col>
      </v-row>
    </v-form>

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
      "
    />

    <MenuCCL
      title="List Tags"
      :labels="menuCCL.value"
      :isShowMenu="menuCCL.isShowMenu"
      :positionX="menuCCL.positionX"
      :positionY="menuCCL.positionY"
      :isLoadingGet="isLoadingGetCCL"
      @closeMenu="menuCCL.isShowMenu = false"
      @update="menuCCL.value = $event"
      @resetValueCheck="menuCCL.value = $event"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import MembersWorkspace from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/MembersWorkspace";
import RichTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/RichTextArea";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import TagableCCL from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/client-communication-label/TagableCCL";
import Actions from "@/sat-vue-toolkit/satlegal/reuse-components/cell-table/Actions";

//menus
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
import MenuCCL from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/client-communication-label/MenuCCL";

//mixins
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuCCLMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/client-communication-label/mixins/toggleMenuCCLMixin";

export default {
  mixins: [toggleMenuSelectBox, appConfigMixin, toggleMenuCCLMixin],
  components: {
    ChipJoinMenuSelectBox,
    RichTextArea,
    AddIcon,
    TagableCCL,
    Actions,
    //menus
    MenuSelectCheckBox,
    MembersWorkspace,
    MenuCCL
  },
  computed: {
    ...mapGetters("ht_store/clients/clientMessage", [
      "dataClientMessageDetail",
      "isLoadingGetDetail"
    ])
  }
};
</script>
