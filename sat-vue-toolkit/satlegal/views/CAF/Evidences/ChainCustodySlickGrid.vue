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
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-chip class="ml-2 text-body-2 badge" small style="position:sticky; right: 40px;">
          <span class="font-weight-bold mr-2">
            {{ dataEvidencesCustodyComputed.length }}
            of
            {{ totals }}
            items
          </span>
        </v-chip>
      </v-card-title>
      <v-card-text>
        <TableGridStackColumn
          hide-default-header
          hide-default-footer
          show-footer-stack-column
          :fixedHeader="false"
          :headers="headers.filter(h => h.active)"
          :headerStackColumn="headerStackColumn"
          :desserts="dataEvidencesCustodyComputed"
          :loading="isLoadingGet"
        >
          <template v-slot:item.name="{ props: { item } }">
            <TextAreaInline
              textNodata="(No Name)"
              :value="item.name"
              @onClick="
                $_toggleMenuTextArea_openMenu({
                  ...$event,
                  title: 'Evidence Name',
                  name: 'name',
                  pk: item.pk,
                  value: item.name
                })
              "
            />
          </template>
          <template v-slot:item.desc="{ props: { item } }">
            <TextAreaInline
              textNodata="(No Evidence Description)"
              :value="item.desc"
              @onClick="
                $_toggleMenuTextArea_openMenu({
                  ...$event,
                  title: 'Evidence Description',
                  name: 'desc',
                  pk: item.pk,
                  value: item.desc
                })
              "
            />
          </template>

          <template v-slot:item.location="{ props: { item } }">
            <TextAreaInline
              textNodata="(No Location)"
              :value="item.location"
              @onClick="
                $_toggleMenuTextArea_openMenu({
                  ...$event,
                  title: 'Storage Location',
                  name: 'location',
                  pk: item.pk,
                  value: item.location
                })
                typeApi = 'custody'
              "
            />
          </template>

          <template v-slot:item.submitter_desc="{ props: { item } }">
            <TextAreaInline
              textNodata="(No Submitter Description)"
              :value="item.submitter_desc"
              @onClick="
                $_toggleMenuTextArea_openMenu({
                  ...$event,
                  title: 'Submitter Description',
                  name: 'submitter_desc',
                  pk: item.pk,
                  value: item.submitter_desc
                })
                typeApi = 'custody'
              "
            />
          </template>

          <template v-slot:item.collected_by="{ props: { item } }">
            <Members
              :textTooltip="item.collected_by ? 'Update' : 'Add'"
              :value="item.collected_by"
              single
              @update="updateCustodyInEvidence(item.pk, 'collected_by', $event)"
            />
          </template>
          <template v-slot:item.date_submit="{ props: { item } }">
            <ChooseDatePicker
              format="MM DD YYYY"
              :date="item.date_submit"
              :isFormatChooseISOString="false"
              @update="updateCustodyInEvidence(item.pk, 'date_submit', $event)"
            />
          </template>
          <template v-slot:item.date_collected="{ props: { item } }">
            <ChooseDatePicker
              format="MM DD YYYY"
              :date="item.date_collected"
              :isFormatChooseISOString="false"
              @update="updateCustodyInEvidence(item.pk, 'date_collected', $event)"
            />
          </template>
          <template v-slot:item.date_time_stored="{ props: { item } }">
            <ChooseDateTimePicker
              format="MM DD YYYY HH:mm"
              :isActions="true"
              :isShowButtonClear="false"
              :title="item.date_time_stored ? 'Update' : 'Add'"
              :date="item.date_time_stored"
              :nameButtonSubmit="item.date_time_stored ? 'Update' : 'Add'"
              @update="
                updateCustodyInEvidence(item.pk, 'date_time_stored', $event)
              "
            />
          </template>

          <template v-slot:item.md5="{ props: { item } }">
            <TextInline
              textNodata="(No MD5 Sum)"
              :value="item.md5"
              @onClick="
                $_toggleMenuTextField_openMenu({
                  ...$event,
                  title: 'MD5 Sum',
                  name: 'md5',
                  pk: item.pk,
                  value: item.md5,
                });
              "
            />
          </template>

          <template v-slot:item.sha="{ props: { item } }">
            <TextInline
              textNodata="(No SHA-1 Sum)"
              :value="item.sha"
              @onClick="
                $_toggleMenuTextField_openMenu({
                  ...$event,
                  title: 'SHA-1 Sum',
                  name: 'sha',
                  pk: item.pk,
                  value: item.sha,
                })
              "
            />
          </template>

          <template v-slot:item.device_types="{ props: { item } }">
            <TagableEvidenceDeviceType
              class="text-no-wrap"
              :tag="item.device_types"
              @onClickIcon="
                $_toggleMenuEvidenceDeviceTypeMixin_openMenu({
                  ...$event,
                  pk: item.pk,
                })
              "
            />
          </template>

          <template v-slot:item.total_comments="{ props: { item } }">
            <Comments
              :totalComments="item.total_comments"
              :matterId="$route.params.matter || $route.params.projectId"
              :evidenceId="item.pk"
            />
          </template>

          <template v-slot:item.action="{ props: { item } }">
            <div class="d-flex align-center">
              <BookmarkOrFlag
                :valueBookmark="item.bookmarked_pk"
                :endpoint="`/api/matters/${$$$matterID}/evidences/${item.pk}`"
                routerMutation="ht_store/matter/evidencesCustody/updateEvidencesCustody"
                :pk="item.pk"
                :valueFlag="item.reported_object && item.reported_object.pk"
              />
              <Action @remove="removeEvidencesCustody(item.pk, $event)" />
            </div>
          </template>

          <!-- item stack column -->

          <template
            v-slot:appendItemStackColumn.chain_custody_items="{
              props: { itemStackColumn, item }
            }"
          >
            <div class="d-flex align-center" style="height:60px">
              <FormCreateCustodyItem
                :evidenceId="item.pk"
                @onAddNewCustodyItemSuccess="options[item.pk].pageCustody = 1"
              />
              <div class="pagination-custody-item">
                <v-pagination
                  v-if="totalsPageStackColumn[item.pk] && totalsPageStackColumn[item.pk].totalsPageCustody > 1"
                  :value="options[item.pk] ? options[item.pk].pageCustody : 1"
                  :length="totalsPageStackColumn[item.pk] ? totalsPageStackColumn[item.pk].totalsPageCustody : 0"
                  circle
                  @input="onPagingListCustodyItem(item.pk, $event)"
                ></v-pagination>
              </div>
            </div>
          </template>

          <template v-slot:itemStackColumn.desc="{ props: { itemStackColumn, item } }">
            <TextInline
              textNodata="(No Description)"
              :value="itemStackColumn.desc"
              @onClick="
                $_toggleMenuTextArea_openMenu({
                  ...$event,
                  title: 'Description',
                  name: 'desc',
                  pk: itemStackColumn.pk,
                  value: itemStackColumn.desc
                })
                typeApi = 'custodyItem'
                evidenceId = item.pk
              "
            />
          </template>
          <template
            v-slot:itemStackColumn.relinquish_characters="{
              props: { itemStackColumn, item }
            }"
          >
            <ChipInlineList
              textNoData="(No Reliquished By Character)"
              :value="itemStackColumn.relinquish_characters || []"
              :lengthDisplay="2"
              keyId="pk"
              keyText="name"
              colorChipDefault="gray"
              colorTextChip="black--text"
              @onClickIcon="
                $_toggleMenuCharacterMixin_openMenu({
                  ...$event,
                  name: 'relinquish_characters',
                  pk: itemStackColumn.pk,
                  value: itemStackColumn.relinquish_characters || []
                })
                evidenceId = item.pk
              "
            />
          </template>
          <template
            v-slot:itemStackColumn.relinquish_members="{
              props: { itemStackColumn, item }
            }"
          >
            <Members
              :textTooltip="itemStackColumn.relinquish_members ? 'Update' : 'Add'"
              :value="itemStackColumn.relinquish_members"
              @update="updateDataCustodyItemInEvidence(item.pk, itemStackColumn.pk, 'relinquish_members', $event)"
            />
          </template>
          <template
            v-slot:itemStackColumn.relinquish_date="{
              props: { itemStackColumn, item }
            }"
          >
            <ChooseDateTimePicker
              format="MM DD YYYY HH:mm"
              :isActions="true"
              :isShowButtonClear="false"
              :title="itemStackColumn.relinquish_date ? 'Update' : 'Add'"
              :date="itemStackColumn.relinquish_date"
              :nameButtonSubmit="itemStackColumn.relinquish_date ? 'Update' : 'Add'"
              @update="
                updateDataCustodyItemInEvidence(item.pk, itemStackColumn.pk, 'relinquish_date', $event)
              "
            />
          </template>
          <template
            v-slot:itemStackColumn.receive_characters="{
              props: { itemStackColumn, item }
            }"
          >
            <ChipInlineList
              textNoData="(No Received By Character)"
              :value="itemStackColumn.receive_characters || []"
              :lengthDisplay="2"
              keyId="pk"
              keyText="name"
              colorChipDefault="gray"
              colorTextChip="black--text"
              @onClickIcon="
                $_toggleMenuCharacterMixin_openMenu({
                  ...$event,
                  name: 'receive_characters',
                  pk: itemStackColumn.pk,
                  value: itemStackColumn.receive_characters || []
                })
                evidenceId = item.pk
              "
            />
          </template>
          <template
            v-slot:itemStackColumn.receive_members="{
              props: { itemStackColumn, item }
            }"
          >
            <Members
              :textTooltip="itemStackColumn.receive_members ? 'Update' : 'Add'"
              :value="itemStackColumn.receive_members"
              @update="updateDataCustodyItemInEvidence(item.pk, itemStackColumn.pk, 'receive_members', $event)"
            />
          </template>
          <template v-slot:itemStackColumn.receive_date="{ props: { itemStackColumn, item } }">
            <ChooseDateTimePicker
              format="MM DD YYYY HH:mm"
              :isActions="true"
              :isShowButtonClear="false"
              :title="itemStackColumn.receive_date ? 'Update' : 'Add'"
              :date="itemStackColumn.receive_date"
              :nameButtonSubmit="itemStackColumn.receive_date ? 'Update' : 'Add'"
              @update="
                updateDataCustodyItemInEvidence(item.pk, itemStackColumn.pk, 'receive_date', $event)
              "
            />
          </template>
          <template v-slot:itemStackColumn.action="{ props: { itemStackColumn, item } }">
            <Action @remove="removeDataCustodyItemInEvidence(item.pk, itemStackColumn.pk, $event)" />
          </template>
        </TableGridStackColumn>
        <div class="d-flex align-center mt-2">
          <v-col cols="10" class="pa-0">
            <FormCreateEvidencesCustody @onAddNewEvidenceSuccess="onAddNewEvidenceSuccess" />
          </v-col>
          <v-col cols="2 text-right">
            <ButtonLoadMore
              v-if="totals > 20 && totals > dataEvidencesCustodyComputed.length"
              @onPageChanged="loadMore"
            />
          </v-col>
        </div>
      </v-card-text>
    </v-card>
    <MenuTextArea
      width="350"
      :title="textAreaMenu.title"
      placeholder="Enter text"
      :value="textAreaMenu.value"
      :isShowMenu="textAreaMenu.isShowMenu"
      :positionX="textAreaMenu.positionX"
      :positionY="textAreaMenu.positionY"
      @closeMenu="textAreaMenu.isShowMenu = false"
      @update="updateEvidenceAndCustody"
    />

    <MenuTextField
      width="350"
      :typeInput="textFieldMenu.typeInput"
      :title="textFieldMenu.title"
      placeholder="Enter text"
      :value="textFieldMenu.value"
      :isShowMenu="textFieldMenu.isShowMenu"
      :positionX="textFieldMenu.positionX"
      :positionY="textFieldMenu.positionY"
      @closeMenu="textFieldMenu.isShowMenu = false"
      @update="
        textFieldMenu.value = $event;
        updateCustodyInEvidence(textFieldMenu.pk, textFieldMenu.name, $event);
      "
    />

    <MenuEvidenceDeviceType
      :labels="menuEvidenceDeviceType.value"
      :isShowMenu="menuEvidenceDeviceType.isShowMenu"
      :positionX="menuEvidenceDeviceType.positionX"
      :positionY="menuEvidenceDeviceType.positionY"
      :isLoadingGet="isLoadingGetEvidenceDeviceType"
      @closeMenu="menuEvidenceDeviceType.isShowMenu = false"
      @update="
        menuEvidenceDeviceType.value = $event;
        updateCustodyInEvidence(menuEvidenceDeviceType.pk, 'device_types', $event);
      "
      @resetValueCheck="menuEvidenceDeviceType.value = $event"
    />

    <MenuRelatedCharacter
      keyId="pk"
      :value="relatedCharacterMenu.value"
      :isShowMenu="relatedCharacterMenu.isShowMenu"
      :positionX="relatedCharacterMenu.positionX"
      :positionY="relatedCharacterMenu.positionY"
      :isLoadingGet="isLoadingGetCharacter"
      @select="
        $_toggleMenuCharacterMixin_addValue($event, ['pk', 'name', 'first_name', 'last_name', 'avatar']);
        updateDataCustodyItemInEvidence(evidenceId, relatedCharacterMenu.pk, relatedCharacterMenu.name, relatedCharacterMenu.value);
      "
      @remove="
        $_toggleMenuCharacterMixin_removeValue($event);
        updateDataCustodyItemInEvidence(evidenceId, relatedCharacterMenu.pk, relatedCharacterMenu.name, relatedCharacterMenu.value);
      "
    />
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { cloneDeep } from "@/sat-vue-toolkit/satlegal/utils";
import TableGridStackColumn from "@/sat-vue-toolkit/satlegal/reuse-components/TableGridStackColumn";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
// cell
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import ChooseDatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseDatePicker";
import ChooseDateTimePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseDateTimePicker";
import TagableEvidenceDeviceType from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/evidence-device-type/TagableEvidenceDeviceType";
import TextInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextInline";
import TextAreaInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextAreaInline";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";

// menus
import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/MenuTextArea";
import MenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/MenuTextField";
import MenuEvidenceDeviceType from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/evidence-device-type/MenuEvidenceDeviceType";
import MenuRelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/MenuRelatedCharacter";

import FormCreateEvidencesCustody from "./components/FormCreateEvidencesCustody";
import FormCreateCustodyItem from "./components/FormCreateCustodyItem";
// mixins
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";
import toggleMenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/mixins/toggleMenuTextField";
import toggleMenuEvidenceDeviceTypeMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/evidence-device-type/mixins/toggleMenuEvidenceDeviceTypeMixin";
import toggleMenuCharacterMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/mixins/toggleMenuCharacterMixin";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

import Comments from "./components/custody/Comments";

const rowsPerPage = 5;

export default {
  mixins: [
    toggleMenuTextArea,
    toggleMenuTextField,
    toggleMenuEvidenceDeviceTypeMixin,
    toggleMenuCharacterMixin
  ],
  components: {
    TableGridStackColumn,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    Action,
    ButtonLoadMore,
    Members,
    ChooseDatePicker,
    ChooseDateTimePicker,
    TagableEvidenceDeviceType,
    TextInline,
    TextAreaInline,
    ChipInlineList,
    // Menus
    MenuTextArea,
    MenuTextField,
    MenuEvidenceDeviceType,
    MenuRelatedCharacter,

    FormCreateEvidencesCustody,
    FormCreateCustodyItem,
    BookmarkOrFlag,
    Comments
  },
  data() {
    return {
      headerStackColumn: [
        {
          text: "Description",
          value: "desc",
          headerValue: "chain_custody_items",
          color: "cyan"
        },
        {
          text: "Reliquished By (character)",
          value: "relinquish_characters",
          headerValue: "chain_custody_items",
          color: "green"
        },
        {
          text: "Reliquished By (matter member)",
          value: "relinquish_members",
          headerValue: "chain_custody_items",
          color: "purple"
        },
        {
          text: "Reliquished Date",
          value: "relinquish_date",
          headerValue: "chain_custody_items",
          color: "deep-purple"
        },
        {
          text: "Received by (character)",
          value: "receive_characters",
          headerValue: "chain_custody_items",
          color: "indigo"
        },
        {
          text: "Received by (matter member)",
          value: "receive_members",
          headerValue: "chain_custody_items",
          color: "blue"
        },
        {
          text: "Received Date",
          value: "receive_date",
          headerValue: "chain_custody_items",
          color: "light-blue"
        },
        {
          text: "Action",
          value: "action",
          headerValue: "chain_custody_items",
          color: "error"
        }
      ],
      headers: [
        {
          text: "Evidence Name",
          value: "name",
          active: true,
          rowspan: 2
        },
        {
          text: "Evidence Description",
          value: "desc",
          active: true,
          rowspan: 2
        },
        {
          text: "Date Submitted",
          value: "date_submit",
          active: true,
          rowspan: 2
        },
        {
          text: "Collected By",
          value: "collected_by",
          active: true,
          rowspan: 2
        },
        {
          text: "Date Collected",
          value: "date_collected",
          active: true,
          rowspan: 2
        },
        {
          text: "Date and Time stored",
          value: "date_time_stored",
          active: true,
          rowspan: 2
        },
        {
          text: "Storage Location",
          value: "location",
          active: true,
          rowspan: 2
        },
        {
          text: "Device Type",
          value: "device_types",
          active: true,
          rowspan: 2
        },
        {
          text: "MD5 Sum",
          value: "md5",
          active: true,
          rowspan: 2
        },
        {
          text: "SHA-1 Sum",
          value: "sha",
          active: true,
          rowspan: 2
        },
        {
          text: "Comment",
          value: "total_comments",
          active: true,
          rowspan: 2
        },
        {
          text: "Submitter Description",
          value: "submitter_desc",
          active: true,
          rowspan: 2
        },
        {
          text: "Chain of Custody ",
          value: "chain_custody_items",
          active: true,
          isStackColumn: true,
          center: true,
          class: "text-subtitle-1 font-weight-bold"
        },
        {
          text: "Action",
          value: "action",
          active: true,
          rowspan: 2
        }
      ],
      typeApi: "evidence",

      evidenceId: "",

      options: []
    };
  },
  computed: {
    dataEvidencesCustodyComputed() {
      const data = this.dataEvidencesCustody.map(x => {
        const option = this.options[x.pk] || {};
        const end = (option.pageCustody || 1) * rowsPerPage;
        const chainOfCustody = x.chain_custody_items.slice(
          end - rowsPerPage,
          end
        );
        return {
          ...x,
          chain_custody_items: chainOfCustody
        };
      });
      return data;
    },
    totalsPageStackColumn() {
      const data = {};
      this.dataEvidencesCustody.forEach(x => {
        data[x.pk] = {
          totalsPageCustody: Math.ceil(
            x.chain_custody_items.length / rowsPerPage
          )
        };
      });
      return data;
    },
    ...mapGetters("ht_store/matter/evidencesCustody", [
      "dataEvidencesCustody",
      "isLoadingGet",
      "totals"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    onAddNewEvidenceSuccess(data) {
      this.options = {
        ...this.options,
        [data.pk]: { pageCustody: 1 }
      };
    },
    onPagingListCustodyItem(evidenceId, page) {
      this.options[evidenceId].pageCustody = page;
    },
    updateEvidenceAndCustody(value) {
      this.textAreaMenu.value = value;
      if (this.typeApi === "evidence") {
        this.updateEvidencesCustody(
          this.textAreaMenu.pk,
          this.textAreaMenu.name,
          value
        );
      } else if (this.typeApi === "custody") {
        this.updateCustodyInEvidence(
          this.textAreaMenu.pk,
          this.textAreaMenu.name,
          value
        );
      } else {
        this.updateDataCustodyItemInEvidence(
          this.evidenceId,
          this.textAreaMenu.pk,
          this.textAreaMenu.name,
          this.textAreaMenu.value
        );
      }
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    updateEvidencesCustody(evidenceId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          evidenceId
        },
        body: {
          [name]: value
        }
      };
      this.updateEvidencesCustodyRequest(data);
    },

    updateCustodyInEvidence(evidenceId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          evidenceId
        },
        body: {
          [name]: value
        }
      };
      this.updateCustodyInEvidenceRequest(data);
    },
    updateDataCustodyItemInEvidence(evidenceId, custodyItemId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          evidenceId,
          custodyItemId
        },
        body: {
          [name]: cloneDeep(value)
        }
      };
      this.updateDataCustodyItemInEvidenceRequest(data);
    },
    async removeEvidencesCustody(evidenceId, close) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        evidenceId
      };
      await this.removeEvidencesCustodyRequest(data);
      close();
    },
    async removeDataCustodyItemInEvidence(evidenceId, custodyItemId, close) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        evidenceId,
        custodyItemId
      };
      await this.removeDataCustodyItemInEvidenceRequest(data);
      const totalsPage = this.totalsPageStackColumn[evidenceId]
        .totalsPageCustody;
      const currentPage = this.options[evidenceId].pageCustody;
      if (currentPage > totalsPage) {
        this.options[evidenceId].pageCustody = totalsPage;
      }
      close();
    },
    async loadMore({ page, setLoading }) {
      setLoading(true);
      await this.updatePagination({ page });
      const options = {};
      this.dataEvidencesCustody.forEach(x => {
        options[x.pk] = {
          pageCustody: 1
        };
      });
      this.options = options;
      setLoading(false);
    },
    updatePagination({ page, isFirstCall }) {
      const searchObject = {
        page
      };
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        evidenceId: this.$route.params.evidenceId
      };
      return this.getDataEvidencesCustodyRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    ...mapActions("ht_store/matter/evidencesCustody", [
      "getDataEvidencesCustodyRequest",
      "updateEvidencesCustodyRequest",
      "updateEvidencesCustodyAsyncRequest",
      "removeEvidencesCustodyRequest",
      //custody
      "addCustodyInEvidenceRequest",
      "updateCustodyInEvidenceRequest",
      //custody item
      "addDataCustodyItemInEvidenceRequest",
      "updateDataCustodyItemInEvidenceRequest",
      "removeDataCustodyItemInEvidenceRequest"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
  },
  async mounted() {
    this.getDataMembersRequest({
      matterId: this.$route.params.matter || this.$route.params.projectId
    });
    const { results } = await this.updatePagination({
      page: 1,
      isFirstCall: true
    });
    const options = {};
    results.forEach(x => {
      options[x.pk] = {
        pageCustody: 1
      };
    });
    this.options = options;
  }
};
</script>

<style scoped>
.pagination-custody-item {
  width: 100%;
}
.pagination-custody-item >>> .v-pagination {
  justify-content: flex-end !important;
}
</style>
