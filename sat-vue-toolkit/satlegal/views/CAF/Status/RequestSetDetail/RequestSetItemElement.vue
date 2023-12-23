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
        <v-chip
          class="ml-2 text-body-2 badge"
          small
          style="position:sticky; right: 40px;"
        >
          <span class="font-weight-bold mr-2"
            >{{ dataRequestSetItemElement.length }}
            of
            {{ totals }}
            items</span
          >
        </v-chip>
      </v-card-title>
      <v-card-text>
        <TableGrid
          hide-default-header
          hide-default-footer
          :fixedHeader="false"
          :headers="headers.filter(h => h.active)"
          :desserts="dataRequestSetItemElement"
          :loading="isLoadingGet"
        >
          <template v-slot:item.name="{ props: { item } }">
            <TextInline
              textNodata="(No Name)"
              :value="item.name"
              @onClick="
                $_toggleMenuTextField_openMenu({
                  ...$event,
                  title: 'Name',
                  name: 'name',
                  pk: item.pk,
                  value: item.name
                })
                requestSetItemId = item.request_item && item.request_item.pk;
              "
            />
          </template>
          <template v-slot:item.request_item="{ props: { item } }">
            <span class="text-caption">{{item.request_item ? item.request_item.name : ""}}</span>
          </template>
          <template v-slot:item.request_number="{ props: { item, row } }">
            <span class="text-caption">{{ row + 1 }}</span>
          </template>
          <!-- Related Cell -->
          <template v-slot:item.related_character="{ props: { item } }">
            <ChipInlineList
              textNoData="(No Characters)"
              :value="getValueCharacterByRelations(item.relations_info)"
              :lengthDisplay="3"
              keyId="pk"
              keyText="name"
              colorChipDefault="gray"
              colorTextChip="black--text"
              @onClickIcon="
                $_toggleMenuCharacterMixin_openMenu({
                  ...$event,
                  name: appConfigConstants.CHARACTER_RELATED,
                  pk: item.pk,
                  value: $_appConfigMixin_filterValueByContentType(
                    appConfigConstants.CHARACTER_RELATED,
                    item.relations_info
                  )
                })
                requestSetItemId = item.request_item && item.request_item.pk
              "
            />
          </template>
          <template v-slot:item.related_fact="{ props: { item } }">
            <ChipInlineList
              textNoData="(No Fact)"
              :value="
                $_appConfigMixin_filterValueByContentType(
                  appConfigConstants.FACT_RELATED,
                  item.relations_info
                )
              "
              :lengthDisplay="3"
              keyId="pk"
              keyText="name"
              colorChipDefault="gray"
              colorTextChip="black--text"
              @onClickIcon="
                $_toggleMenuFactMixin_openMenu({
                  ...$event,
                  name: appConfigConstants.FACT_RELATED,
                  pk: item.pk,
                  value: $_appConfigMixin_filterValueByContentType(
                    appConfigConstants.FACT_RELATED,
                    item.relations_info
                  )
                })
                requestSetItemId = item.request_item && item.request_item.pk
              "
            />
          </template>
          <template v-slot:item.legal_issues="{ props: { item } }">
            <TagableIssue
              :tag="item.legal_issues"
              @onClickIcon="
                $_toggleMenuIssueMixin_openMenu({
                  ...$event,
                  pk: item.pk
                })
                requestSetItemId = item.request_item && item.request_item.pk
              "
            />
          </template>
          <template v-slot:item.related_evidence="{ props: { item } }">
            <ChipInlineList
              textNoData="(No Evidence)"
              :value="
                $_appConfigMixin_filterValueByContentType(
                  appConfigConstants.EVIDENCE_RELATED,
                  item.relations_info
                )
              "
              :lengthDisplay="3"
              keyId="pk"
              keyText="name"
              colorChipDefault="gray"
              colorTextChip="black--text"
              @onClickIcon="
                $_toggleMenuEvidenceMixin_openMenu({
                  ...$event,
                  name: appConfigConstants.EVIDENCE_RELATED,
                  pk: item.pk,
                  value: $_appConfigMixin_filterValueByContentType(
                    appConfigConstants.EVIDENCE_RELATED,
                    item.relations_info
                  )
                })
                requestSetItemId = item.request_item && item.request_item.pk
              "
            />
          </template>
          <template v-slot:item.related_deposition="{ props: { item } }">
            <ChipInlineList
              textNoData="(No Deposition)"
              :value="
                $_appConfigMixin_filterValueByContentType(
                  appConfigConstants.DEPOSITION_RELATED,
                  item.relations_info
                )
              "
              :lengthDisplay="3"
              keyId="pk"
              keyText="name"
              colorChipDefault="gray"
              colorTextChip="black--text"
              @onClickIcon="
                $_toggleMenuDepositionMixin_openMenu({
                  ...$event,
                  name: appConfigConstants.DEPOSITION_RELATED,
                  pk: item.pk,
                  value: $_appConfigMixin_filterValueByContentType(
                    appConfigConstants.DEPOSITION_RELATED,
                    item.relations_info
                  )
                })
                requestSetItemId = item.request_item && item.request_item.pk
              "
            />
          </template>
          <template v-slot:item.action="{ props: { item } }">
            <Action @remove="removeRequestSetItemElement(item.request_item && item.request_item.pk, item.pk, $event)" />
          </template>
        </TableGrid>
        <div class="d-flex align-center mt-2">
          <v-col cols="10" class="pa-0">
            <FormCreateRequestSetItemElement />
          </v-col>
          <v-col cols="2 text-right">
            <ButtonLoadMore
              v-if="totals > 20 && totals > dataRequestSetItemElement.length"
              @onPageChanged="loadMore"
            />
          </v-col>
        </div>
      </v-card-text>
    </v-card>
    <MenuRelatedCharacter
      keyId="pk"
      :value="relatedCharacterMenu.value"
      :isShowMenu="relatedCharacterMenu.isShowMenu"
      :positionX="relatedCharacterMenu.positionX"
      :positionY="relatedCharacterMenu.positionY"
      :isLoadingGet="isLoadingGetCharacter"
      @select="
        $_toggleMenuCharacterMixin_addValue($event);
        updateRelated(
          requestSetItemId,
          appConfigConstants.CHARACTER_RELATED,
          relatedCharacterMenu.pk,
          $event,
          'first_name',
          'last_name'
        );
      "
      @remove="
        $_toggleMenuCharacterMixin_removeValue($event);
        removeRelated(
          requestSetItemId,
          appConfigConstants.CHARACTER_RELATED,
          relatedCharacterMenu.pk,
          $event
        );
      "
    />
    <MenuRelatedFact
      keyId="pk"
      :value="relatedFactMenu.value"
      :isShowMenu="relatedFactMenu.isShowMenu"
      :positionX="relatedFactMenu.positionX"
      :positionY="relatedFactMenu.positionY"
      :isLoadingGet="isLoadingGetFact"
      @select="
        $_toggleMenuFactMixin_addValue($event);
        updateRelated(
          requestSetItemId,
          appConfigConstants.FACT_RELATED,
          relatedFactMenu.pk,
          $event
        );
      "
      @remove="
        $_toggleMenuFactMixin_removeValue($event);
        removeRelated(
          requestSetItemId,
          appConfigConstants.FACT_RELATED,
          relatedFactMenu.pk,
          $event
        );
      "
      @closeMenu="relatedFactMenu.isShowMenu = false"
    />
    <MenuIssue
      :labels="menuIssue.value"
      :isShowMenu="menuIssue.isShowMenu"
      :positionX="menuIssue.positionX"
      :positionY="menuIssue.positionY"
      :isLoadingGet="isLoadingGetIssue"
      @closeMenu="menuIssue.isShowMenu = false"
      @update="
        menuIssue.value = $event;
        updateRequestSetItemElement(requestSetItemId, menuIssue.pk, 'legal_issues', $event);
      "
      @resetValueCheck="menuIssue.value = $event"
    />
    <MenuRelatedEvidence
      keyId="pk"
      :value="relatedEvidenceMenu.value"
      :isShowMenu="relatedEvidenceMenu.isShowMenu"
      :positionX="relatedEvidenceMenu.positionX"
      :positionY="relatedEvidenceMenu.positionY"
      :isLoadingGet="isLoadingGetEvidence"
      @select="
        $_toggleMenuEvidenceMixin_addValue($event);
        updateRelated(
          requestSetItemId,
          appConfigConstants.EVIDENCE_RELATED,
          relatedEvidenceMenu.pk,
          $event
        );
      "
      @remove="
        $_toggleMenuEvidenceMixin_removeValue($event);
        removeRelated(
          requestSetItemId,
          appConfigConstants.EVIDENCE_RELATED,
          relatedEvidenceMenu.pk,
          $event
        );
      "
      @closeMenu="relatedEvidenceMenu.isShowMenu = false"
    />
    <MenuRelatedDeposition
      keyId="pk"
      :value="relatedDepositionMenu.value"
      :isShowMenu="relatedDepositionMenu.isShowMenu"
      :positionX="relatedDepositionMenu.positionX"
      :positionY="relatedDepositionMenu.positionY"
      :isLoadingGet="isLoadingGetDeposition"
      @select="
        $_toggleMenuDepositionMixin_addValue($event);
        updateRelated(
          requestSetItemId,
          appConfigConstants.DEPOSITION_RELATED,
          relatedDepositionMenu.pk,
          $event
        );
      "
      @remove="
        $_toggleMenuDepositionMixin_removeValue($event);
        removeRelated(
          requestSetItemId,
          appConfigConstants.DEPOSITION_RELATED,
          relatedDepositionMenu.pk,
          $event
        );
      "
      @closeMenu="relatedDepositionMenu.isShowMenu = false"
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
        updateRequestSetItemElement(
          requestSetItemId,
          textFieldMenu.pk,
          textFieldMenu.name,
          $event
        );
      "
    />
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
// cell
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import ChipInlineList from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipInlineList";
import TagableIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/TagableIssue";
import TextInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextInline";

import FormCreateRequestSetItemElement from "../components/request-set/element/FormCreateRequestSetItemElement";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
//menus
import MenuRelatedFact from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/fact/MenuRelatedFact";
import MenuRelatedDeposition from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/deposition/MenuRelatedDeposition";
import MenuRelatedEvidence from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/evidence/MenuRelatedEvidence";
import MenuIssue from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/MenuIssue";
import MenuRelatedRequestSet from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSet/MenuRelatedRequestSet";
import MenuRelatedCharacter from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/MenuRelatedCharacter";
import MenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/MenuTextField";

// mixins
import toggleMenuFactMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/fact/mixins/toggleMenuFactMixin";
import toggleMenuDepositionMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/deposition/mixins/toggleMenuDepositionMixin";
import toggleMenuEvidenceMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/evidence/mixins/toggleMenuEvidenceMixin";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import toggleMenuIssueMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/issue/mixins/toggleMenuIssueMixin";
import toggleMenuRequestSetMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/requestSet/mixins/toggleMenuRequestSetMixin";
import toggleMenuCharacterMixin from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/related/characters/mixins/toggleMenuCharacterMixin";
import toggleMenuTextField from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textfield/mixins/toggleMenuTextField";

export default {
  mixins: [
    appConfigMixin,
    toggleMenuFactMixin,
    toggleMenuDepositionMixin,
    toggleMenuEvidenceMixin,
    toggleMenuIssueMixin,
    toggleMenuRequestSetMixin,
    toggleMenuCharacterMixin,
    toggleMenuTextField,
  ],
  components: {
    TableGrid,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    Action,
    ButtonLoadMore,
    ChipInlineList,
    TagableIssue,
    TextInline,
    FormCreateRequestSetItemElement,
    AddIcon,
    // Menu
    MenuRelatedFact,
    MenuRelatedDeposition,
    MenuRelatedEvidence,
    MenuIssue,
    MenuRelatedRequestSet,
    MenuRelatedCharacter,
    MenuTextField
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "name", active: true },
        {
          text: "Request Item Description",
          value: "request_item",
          active: true
        },
        { text: "Request Number", value: "request_number", active: true },
        {
          text: "Related Characters",
          value: "related_character",
          active: true
        },
        { text: "Related Facts", value: "related_fact", active: true },
        { text: "Related Legal Issues", value: "legal_issues", active: true },
        { text: "Related Evidences", value: "related_evidence", active: true },
        {
          text: "Related Deposition",
          value: "related_deposition",
          active: true
        },
        { text: "Action", value: "action", active: true }
      ],
      requestSetItemId: "",
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/requestStatus/requestSet/element", [
      "dataRequestSetItemElement",
      "isLoadingGet",
      "totals"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    resetFields({ fields }) {
      this.headers = fields;
    },
    updateRequestSetItemElement(requestSetItemId, requestSetItemElementId, name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          requestSetId: this.$route.params.requestSetId,
          requestSetItemId,
          requestSetItemElementId
        },
        body: {
          [name]: value
        }
      };
      this.updateRequestSetItemElementRequest(data);
    },
    async removeRequestSetItemElement(requestSetItemId, requestSetItemElementId, close) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        requestSetId: this.$route.params.requestSetId,
        requestSetItemId,
        requestSetItemElementId
      };
      await this.removeRequestSetItemElementRequest(data);
      close();
    },
    async loadMore({ page, setLoading }) {
      setLoading(true);
      await this.updatePagination({ page });
      setLoading(false);
    },
    updatePagination({ page, isFirstCall }) {
      const searchObject = {
        page
      };
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        requestSetId: this.$route.params.requestSetId
      };
      return this.getDataRequestSetItemElementRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    updateRelated(requestSetItemId, type, requestSetItemElementId, item, key = "name", key2) {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          requestSetId: this.$route.params.requestSetId,
          requestSetItemId,
          requestSetItemElementId
        },
        body: {
          content_type_id: contentTypeId,
          pk: item.pk,
          [key]: item[key],
          [key2]: item[key2]
        }
      };
      this.updateRelationRequestSetItemElementRequest(data);
    },
    removeRelated(requestSetItemId, type, requestSetItemElementId, item) {
      const contentTypeId =
        this.appConfigListContentType[type] &&
        this.appConfigListContentType[type].value;
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        requestSetId: this.$route.params.requestSetId,
        requestSetItemId,
        requestSetItemElementId,
        contentTypeId,
        objectId: item.pk
      };
      this.removeRelationRequestSetItemElementRequest(data);
    },
    getValueCharacterByRelations(relations_info) {
      return this.$_appConfigMixin_filterValueByContentType(
        this.appConfigConstants.CHARACTER_RELATED,
        relations_info
      ).map(character => ({
        ...character,
        name: `${character.first_name || ""} ${character.last_name || ""}`
      }));
    },
    ...mapActions("ht_store/matter/requestStatus/requestSet/element", [
      "getDataRequestSetItemElementRequest",
      "updateRequestSetItemElementRequest",
      "removeRequestSetItemElementRequest",

      //relations
      "updateRelationRequestSetItemElementRequest",
      "removeRelationRequestSetItemElementRequest"
    ])
  },
  mounted() {
    this.updatePagination({ page: 1, isFirstCall: true });
  }
};
</script>
