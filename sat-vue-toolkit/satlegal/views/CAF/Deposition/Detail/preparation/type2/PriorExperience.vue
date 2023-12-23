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
            {{ dataPriorExperience.length }}
            of
            {{ totals }}
            items
          </span>
        </v-chip>
      </v-card-title>
      <v-card-text>
        <TableGrid
          hide-default-header
          hide-default-footer
          :fixedHeader="false"
          :headers="headers.filter(h => h.active)"
          :desserts="dataPriorExperience"
          :loading="isLoadingGet"
        >
          <template v-slot:item.from_year="{ props: { item } }">
            <YearSelect
              width="50px"
              :max="item.to_year"
              border-unset
              hide-details
              :value="item.from_year"
              @update="updatePriorExperience('from_year', item.pk, $event)"
            />
          </template>
          <template v-slot:item.to_year="{ props: { item } }">
            <YearSelect
              width="50px"
              border-unset
              hide-details
              :min="item.from_year"
              :value="item.to_year"
              @update="updatePriorExperience('to_year', item.pk, $event)"
            />
          </template>
          <template v-slot:item.title="{ props: { item } }">
            <div style="width:200px">
              <TextArea
                :value="item.title"
                @update="updatePriorExperience('title', item.pk, $event)"
              />
            </div>
          </template>
          <template v-slot:item.desc="{ props: { item } }">
            <div style="width:200px">
              <TextArea
                :value="item.desc"
                @update="updatePriorExperience('desc', item.pk, $event)"
              />
            </div>
          </template>
          <template v-slot:item.employer_name="{ props: { item } }">
            <TextArea
              :value="item.employer_name"
              @update="updatePriorExperience('employer_name', item.pk, $event)"
            />
          </template>
          <template v-slot:item.address="{ props: { item } }">
            <div style="width:200px">
              <TextArea
                :value="item.address"
                @update="updatePriorExperience('address', item.pk, $event)"
              />
            </div>
          </template>
          <template v-slot:item.attachments="{ props: { item } }">
            {{ item.attachments.length }}
            <AddIcon
              @onClickIcon="onShowPopupAttachment(item.pk, item.attachments)"
              icon="mdi-attachment"
            />
          </template>
          <template v-slot:item.note_count="{ props: { item } }">
            <Notes
              :totalNotes="item.note_count"
              @update="updatePriorExperience(item.pk, 'note_count', $event)"
              :matterId="$route.params.matter || $route.params.projectId"
              :depositionId="item.deposition"
              :priorExperienceId="item.pk"
            />
          </template>
          <template v-slot:item.comment_count="{ props: { item } }">
            <Comments
              :totalComments="item.comment_count"
              :matterId="$route.params.matter || $route.params.projectId"
              :depositionId="item.deposition"
              :id="item.pk"
            />
          </template>
          <template v-slot:item.action="{ props: { item } }">
            <div class="d-flex">
              <Action :item="item" @remove="removePriorExperience(item.pk, $event)" />
              <v-btn exact icon small @click="showDetail(item.pk)">
                <v-icon small>mdi-eye</v-icon>
              </v-btn>
            </div>
          </template>
        </TableGrid>
        <div class="d-flex align-center mt-2">
          <v-col cols="10" class="pa-0">
            <FormCreatePriorExperience />
          </v-col>
          <v-col cols="2 text-right">
            <ButtonLoadMore
              v-if="totals > 20 && totals > dataPriorExperience.length"
              @onPageChanged="loadMore"
            />
          </v-col>
        </div>
      </v-card-text>
    </v-card>
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :dataAttachments="dataAttachments"
      :requestForProductionId="this.requestForProductionId"
      @closePopup="isShowPopupAttachment = false"
      :detail="showDetailRight"
    />
    <PriorExperienceDetail
      :isShowPopup="showDetailRight"
      :isLoadingGetDetail="isLoadingGetDetail"
      :isClickOutSide="isClickOutSidePopupDetail"
      @closeMenuRight="setStatus"
      :priorId="priorId"
      @remove="removeDetail"
      @onShowPopupAttachment="onShowPopupAttachment"
    />
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
// cell
import Attachments from "../../../components/prior-experience/Attachments";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import YearSelect from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/YearSelect";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
//create
import FormCreatePriorExperience from "../../../components/prior-experience/FormCreatePriorExperience";
import Notes from "../../../components/prior-experience/Notes";
import Comments from "../../../components/prior-experience/Comments";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import PriorExperienceDetail from "./Detail/PriorExperienceDetail";
export default {
  components: {
    TableGrid,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    Action,
    Attachments,
    TextArea,
    YearSelect,
    ButtonLoadMore,
    FormCreatePriorExperience,
    Notes,
    Comments,
    AddIcon,
    PriorExperienceDetail
  },
  data() {
    return {
      headers: [
        { text: "Employer name", value: "employer_name", active: true },
        { text: "Title", value: "title", active: true },
        { text: "From", value: "from_year", active: true },
        { text: "To", value: "to_year", active: true },
        { text: "Description", value: "desc", active: true },
        { text: "Address", value: "address", active: true },
        { text: "Attachment", value: "attachments", active: true },
        { text: "Note", value: "note_count", active: true },
        { text: "Comment", value: "comment_count", active: true },
        { text: "Action", value: "action", active: true }
      ],
      requestForProductionId: 0,
      //attachment
      isShowPopupAttachment: false,
      showDetailRight: false,
      isLoadingGetDetail: false,
      isClickOutSidePopupDetail: true,
      priorId: null
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/priorExperience", [
      "dataPriorExperience",
      "isLoadingGet",
      "totals",
      "dataAttachments"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    async showDetail(pk) {
      this.showDetailRight = true;
      this.isLoadingGetDetail = true;
      try {
        const idParams = {
          priorId: pk,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId
        };
        await this.getDataPriorExperienceDetailRequest(idParams);
        this.isLoadingGetDetail = false;
      } catch (error) {
        this.isLoadingGetDetail = false;
      }
      this.priorId = pk;
    },
    setStatus(status) {
      this.showDetailRight = status;
    },
    async removeDetail(item, close) {
      await this.removePriorExperience(item, close);
      this.showDetailRight = false;
    },
    onShowPopupAttachment(requestForProductionId, attachments) {
      (this.requestForProductionId = requestForProductionId),
        this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    updatePriorExperience(name, priorExperienceId, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          priorExperienceId
        },
        body: {
          [name]: value
        }
      };
      this.updatePriorExperienceRequest(data);
    },
    async updatePriorExperienceAsync(
      name,
      priorExperienceId,
      { value, setLoading }
    ) {
      try {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            depositionId: this.$route.params.depositionId,
            priorExperienceId
          },
          body: {
            [name]: value
          }
        };
        setLoading(true);
        await this.updatePriorExperienceAsyncRequest(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    async removePriorExperience(priorExperienceId, close) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        priorExperienceId
      };
      await this.removePriorExperienceRequest(data);
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
        depositionId: this.$route.params.depositionId
      };
      return this.getDataPriorExperienceRequest({
        idParams,
        searchObject,
        isFirstCall
      });
    },
    ...mapMutations("ht_store/matter/deposition/priorExperience", [
      "getDataAttachments"
    ]),
    ...mapActions("ht_store/matter/deposition/priorExperience", [
      "getDataPriorExperienceRequest",
      "updatePriorExperienceRequest",
      "updatePriorExperienceAsyncRequest",
      "removePriorExperienceRequest",
      "getDataPriorExperienceDetailRequest"
    ])
  },
  mounted() {
    this.updatePagination({ page: 1, isFirstCall: true });
  }
};
</script>
