<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-row class="py-4 px-2">
        <v-col cols="6">
          <label class="mb-3">Note:</label>
          <v-row class="px-3">
            <Notes
              :totalNotes="dataSubpoenasDetail.total_notes"
              :id="dataSubpoenasDetail.pk"
              :detail="true"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Request Item Description:</label>
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-rename-box</v-icon>
            <v-text-field
              :value="dataSubpoenasDetail.name"
              placeholder="Subpoena Name"
              :rules="[v => !!v || 'This field is required']"
              @change="updateSubpoena('name', $event)"
              class="py-0 my-0"
            >
              <v-icon slot="prepend" color="red">mdi-create</v-icon>
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Created By:</label>
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-account</v-icon>
            <CreatedBy :members="members" :value="dataSubpoenasDetail" keyText="creator" />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Subpoena Party:</label>
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-account-check</v-icon>
            <CharacterSingles
              textTooltip="List characters"
              :value="dataSubpoenasDetail.party"
              @update="updateSubpoena('party', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Assigned To:</label>
          <v-row class="px-3">
            <v-icon class="mr-2">mdi-account-multiple</v-icon>
            <Members
              :value="dataSubpoenasDetail.investigators"
              :isLoadingGet="isLoadingGetMember"
              :isEmitOpenMenu="true"
              @update="updateSubpoena('investigators', $event)"
              @onOpenMenu="$emit('getDataMember')"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Description:</label>
          <v-row class="px-3">
            <v-textarea
              :value="dataSubpoenasDetail.desc || ''"
              class="mx-2"
              placeholder="Description"
              rows="5"
              prepend-icon="mdi-comment"
              :rules="[v => !!v || 'This field is required']"
              @change="updateSubpoena('desc', $event)"
            ></v-textarea>
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Service Status:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Service Status"
              keyText="label"
              keyValue="value"
              :value="dataSubpoenasDetail.service_status"
              :dataList="appConfigChoices[appConfigConstants.SUBPOENA_SERVICE_STATUS]"
              @update="updateSubpoena('service_status', $event.value)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Service Jurisdiction:</label>
          <v-row class="px-3">
            <SelectStateAndCountry
              title="Select state and country"
              nameButtonSubmit="Save"
              :isActions="true"
              :valueStateAndCountry="dataSubpoenasDetail.jurisdiction || {}"
              :listState="appConfigChoices[appConfigConstants.SUBPOENA_STATE]"
              :listCountry="appConfigChoices[appConfigConstants.SUBPOENA_COUNTRY]"
              @update="updateSubpoena('jurisdiction', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Proof of Service:</label>
          <v-row class="px-3">
            <AttachmentLink
              :isStyle="true"
              :value="dataSubpoenasDetail.proof_of_service"
              @updateAsync="updateSubpoenaAsync('proof_of_service', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Hardness:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Hardness"
              keyText="label"
              keyValue="value"
              :value="dataSubpoenasDetail.hardness"
              :dataList="appConfigChoices[appConfigConstants.SUBPOENA_HARDNESS]"
              @update="updateSubpoena('hardness', $event.value)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Response Status:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Response Status"
              keyText="label"
              keyValue="value"
              :value="dataSubpoenasDetail.response_status"
              :dataList="appConfigChoices[appConfigConstants.SUBPOENA_RESPONSE_STATUS]"
              @update="updateSubpoena('response_status', $event.value)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Date Served:</label>
          <v-row class="px-3">
            <div>{{ dataSubpoenasDetail.date_served | formatShortDate }}</div>
            <DatePicker
              title="Date Served"
              nameButtonSubmit="Save"
              :isActions="true"
              :date="dataSubpoenasDetail.date_served"
              :textTooltip="
                    [dataSubpoenasDetail.date_served].some(x => !!x)
                      ? `${$options.filters.formatShortDate(dataSubpoenasDetail.date_served)}`
                      : 'Add date'
                  "
              class="mx-2"
              :colorButton="`${[dataSubpoenasDetail.date_served].some(x => !!x) ? 'indigo' : ''}`"
              @updateTime="
                    updateSubpoena('date_served', $event.date)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Objection Deadline:</label>
          <v-row class="px-3">
            <div>{{ dataSubpoenasDetail.objection_deadline | formatShortDate }}</div>
            <DatePicker
              title="Date Served"
              nameButtonSubmit="Save"
              :isActions="true"
              :date="dataSubpoenasDetail.objection_deadline"
              :textTooltip="
                    [dataSubpoenasDetail.objection_deadline].some(x => !!x)
                      ? `${$options.filters.formatShortDate(dataSubpoenasDetail.objection_deadline)}`
                      : 'Add date'
                  "
              class="mx-2"
              :colorButton="`${[dataSubpoenasDetail.objection_deadline].some(x => !!x) ? 'indigo' : ''}`"
              @updateTime="
                    updateSubpoena('objection_deadline', $event.date)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Producing Deadline:</label>
          <v-row class="px-3">
            <div>{{ dataSubpoenasDetail.producing_deadline | formatShortDate }}</div>
            <DatePicker
              title="Date Served"
              nameButtonSubmit="Save"
              :isActions="true"
              :date="dataSubpoenasDetail.producing_deadline"
              :textTooltip="
                    [dataSubpoenasDetail.producing_deadline].some(x => !!x)
                      ? `${$options.filters.formatShortDate(dataSubpoenasDetail.producing_deadline)}`
                      : 'Add date'
                  "
              class="mx-2"
              :colorButton="`${[dataSubpoenasDetail.producing_deadline].some(x => !!x) ? 'indigo' : ''}`"
              @updateTime="
                    updateSubpoena('producing_deadline', $event.date)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <label class="mb-3">Service Method:</label>
          <v-row class="px-3">
            <SelectCheckBox
              title="Service Method"
              keyText="label"
              keyValue="value"
              :value="dataSubpoenasDetail.how_served"
              :dataList="appConfigChoices[appConfigConstants.SUBPOENA_SERVICE_METHOD]"
              @update="updateSubpoena('how_served', $event.value)"
            />
          </v-row>
        </v-col>

        <v-col cols="6">
          <label class="mb-3">Comment:</label>
          <v-row class="px-3">
            <Comments
              :totalComments="dataSubpoenasDetail.total_comments"
              :id="dataSubpoenasDetail.pk"
              :matterId="$route.params.matter || $route.params.projectId"
              :detail="true"
            />
          </v-row>
        </v-col>
      </v-row>
      <v-col cols="6">
        <label class="mb-3">Action:</label>
        <div class="d-flex">
          <BookmarkOrFlag
            :valueBookmark="dataSubpoenasDetail.bookmarked_pk"
            :endpoint="`/api/matters/${$$$matterID}/subpoenas/${dataSubpoenasDetail.pk}`"
            routerMutation="ht_store/matter/subpoena/subpoenaSet/updateDataSubpoena"
            :pk="dataSubpoenasDetail.pk"
            :valueFlag="dataSubpoenasDetail.reported_object && dataSubpoenasDetail.reported_object.pk"
            :detail="true"
            routerMutationDetail="ht_store/matter/subpoena/subpoenaSet/updateDataSubpoenaDetail"
          />
          <Action
            :item="dataSubpoenasDetail"
            @remove="$emit('removeSubpoena',{item: dataSubpoenasDetail, close: $event})"
          />
        </div>
      </v-col>
    </v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CreatedBy from "@/sat-vue-toolkit/satlegal/ht_components/common/CreatedBy";
import CharacterSingles from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/CharacterSingles";
import Members from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Members";
import SelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectCheckBox";
import SelectStateAndCountry from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/SelectStateAndCountry";
import AttachmentLink from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AttachmentLink";
import DatePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/DatePicker";
import Notes from "../../components/Notes";
import Comments from "../../components/Comments";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  props: {
    isLoadingGetMember: Boolean,
    subpoenaId: Number
  },
  components: {
    CreatedBy,
    CharacterSingles,
    Members,
    SelectCheckBox,
    SelectStateAndCountry,
    AttachmentLink,
    DatePicker,
    Notes,
    Comments,
    Action,
    BookmarkOrFlag
  },
  data() {
    return {
      valid: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/subpoena/subpoenaSet", [
      "dataSubpoenasDetail"
    ]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  methods: {
    ...mapActions("ht_store/matter/subpoena/subpoenaSet", [
      "updateSubpoenaRequest",
      "updateSubpoenaAsyncRequest"
    ]),
    updateSubpoena(name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          subpoenaId: this.subpoenaId
        },
        body: {
          [name]: value
        },
        detail: true
      };
      this.updateSubpoenaRequest(data);
    },
    async updateSubpoenaAsync(name, { value, setLoading }) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          subpoenaId: this.subpoenaId
        },
        body: {
          [name]: value
        },
        detail: true
      };
      try {
        setLoading(true);
        await this.updateSubpoenaAsyncRequest(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
