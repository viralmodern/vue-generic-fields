<template>
  <div>
    <v-navigation-drawer
      :value="isShowPopup"
      @input="$emit('closeMenuRight', $event)"
      :right="true"
      :stateless="isClickOutSide"
      fixed
      class="fill-height"
      temporary
      width="45%"
    >
      <v-row class="header-right">
        <v-col cols="10" class="pl-7">
          <span>Preparation Key Pleading Detail</span>
        </v-col>
        <v-col cols="2 text-right">
          <v-btn text icon color="white" @click="$emit('closeMenuRight', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card flat :disabled="isLoadingGetDetail" class="phong">
        <v-progress-linear v-if="isLoadingGetDetail" class="mt-1" indeterminate rounded></v-progress-linear>
        <v-list dense>
          <v-form ref="form" v-model="valid">
            <v-row class="px-3">
              <v-col cols="6">
                <label class="mb-3">Pleading:</label>
                <v-row class="px-3">
                  <v-text-field
                    :value="dataKeyPleadingDetail.pleading"
                    placeholder="Pleading"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateRequestSetTask('pleading', $event)"
                    class="py-0 my-0"
                  >
                    <v-icon slot="prepend" color="red">mdi-create</v-icon>
                  </v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Counter claim:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataKeyPleadingDetail.counterclaim || ''"
                    class="mx-2"
                    placeholder="Counter claim"
                    rows="5"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="updateKeyPleadingDetail('counterclaim', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Goal:</label>
                <v-row class="px-3">
                  <Goal
                    :value="dataKeyPleadingDetail.goals"
                    @update="updateKeyPleadingDetail('goals', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Note:</label>
                <v-row class="px-3">
                  <Notes
                    :totalNotes="dataKeyPleadingDetail.total_notes"
                    @update="updateKeyPleadingDetail('total_notes', $event)"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataKeyPleadingDetail.deposition"
                    :keyPleadingId="dataKeyPleadingDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Comments:</label>
                <v-row class="px-3">
                  <Comments
                    :totalComments="dataKeyPleadingDetail.total_comments"
                    :matterId="$route.params.matter || $route.params.projectId"
                    :depositionId="dataKeyPleadingDetail.deposition"
                    :keyPleadingId="dataKeyPleadingDetail.pk"
                    :detail="true"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3">
                  <div class="d-flex">
                    <BookmarkOrFlag
                      :valueBookmark="dataKeyPleadingDetail.bookmarked_pk"
                      :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/key-pleadings/${dataKeyPleadingDetail.pk}`"
                      routerMutation="ht_store/matter/deposition/keyPleading/updateDataKeyPleading"
                      :pk="dataKeyPleadingDetail.pk"
                      :valueFlag="dataKeyPleadingDetail.reported_object && dataKeyPleadingDetail.reported_object.pk"
                      :detail="true"
                      routerMutationDetail="ht_store/matter/deposition/keyPleading/updateDetail"
                      :isShowFlag="false"
                    />
                    <Action
                      :item="dataKeyPleadingDetail"
                      @remove="$emit('remove', dataKeyPleadingDetail, $event)"
                    />
                  </div>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Goal from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Goal";
import Comments from "../../../components/key-pleading/Comments";
import Notes from "../../../components/key-pleading/Notes";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    keyPleadingId: Number
  },
  components: { Goal, Comments, Notes, Action, BookmarkOrFlag },
  data() {
    return {
      valid: false,
      showExpenseDetail: false,
      isLoadingGetTag: false,
      isCallApiTagCell: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/deposition/keyPleading", [
      "updateKeyPleadingRequest",
    ]),
    updateKeyPleadingDetail(name, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          keyPleadingId: this.keyPleadingId
        },
        body: {
          [name]: value
        },
        detail: true
      };
      this.updateKeyPleadingRequest(data);
    },
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/keyPleading", [
      "dataKeyPleadingDetail"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ]),
    ...mapGetters("ht_store/project/members", [
      "dataMembersNotExitsCurrentUser"
    ])
  },
  watch: {
    isShowPopup: {
      handler(val) {
        if (val) {
          this.showExpenseDetail = val;
        }
      }
    },
    showExpenseDetail: {
      handler(val) {
        if (!val) {
          this.$emit("closeMenuRight");
        }
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
.header-right {
  background-color: #6d42c7;
  color: white;
  display: flex;
  align-items: center;
}
</style>
