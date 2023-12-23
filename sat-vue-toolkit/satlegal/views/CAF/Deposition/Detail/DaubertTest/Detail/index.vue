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
      width="60%"
    >
      <v-row class="header-right">
        <v-col cols="10" class="pl-7">
          <span>Correspondence Detail</span>
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
                <label class="mb-3">Expert Method Name:</label>
                <v-row class="px-3">
                  <v-textarea
                    :value="dataDaubertTestDetail.method_name || ''"
                    class="mx-2"
                    placeholder="Expert Method Name"
                    rows="3"
                    prepend-icon="mdi-comment"
                    :rules="[v => !!v || 'This field is required']"
                    @change="$emit('updateDaubertTest',dataDaubertTestDetail.pk,'method_name', $event)"
                  ></v-textarea>
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Is It Tested?:</label>
                <v-row class="px-3">
                  <Disputed
                    :value="dataDaubertTestDetail.tested"
                    class="justify-center align-center d-flex"
                    @update="$emit('updateDaubertTest',dataDaubertTestDetail.pk, 'tested', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Is This Method Peer Reviewed:</label>
                <v-row class="px-3">
                  <Disputed
                    :value="dataDaubertTestDetail.method_peer_review"
                    class="justify-center align-center d-flex"
                    @update="$emit('updateDaubertTest',dataDaubertTestDetail.pk, 'method_peer_review', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Error Potential?:</label>
                <v-row class="px-3">
                  <v-btn
                    class="ma-0"
                    icon
                    small
                    @click="$emit('updateDaubertTest',dataDaubertTestDetail.pk, 'error_potential', !dataDaubertTestDetail.error_potential)"
                  >
                    <v-icon small :color="dataDaubertTestDetail.error_potential ? 'red' : ''">flag</v-icon>
                  </v-btn>
                </v-row>
              </v-col>
              <v-col cols="12">
                <label class="mb-3">Peer Review Proof:</label>
                <v-row class="px-3">
                  <Review
                    :desserts="dataDaubertTestDetail.reviews"
                    :daubertId="dataDaubertTestDetail.pk"
                    class="py-3"
                    :isShowRightPopup="isShowPopup"
                    @removeReviews="removeReviews"
                    @updateReviews="updateReviews"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Is This Method Generally Accepted In The Field?:</label>
                <v-row class="px-3">
                  <Disputed
                    :value="dataDaubertTestDetail.accepted_field"
                    class="justify-center align-center d-flex"
                    @update="$emit('updateDaubertTest',dataDaubertTestDetail.pk, 'accepted_field', $event)"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <label class="mb-3">Action:</label>
                <v-row class="px-3 d-flex">
                   <BookmarkOrFlag
                    :valueBookmark="dataDaubertTestDetail.bookmarked_pk"
                    :endpoint="`/api/matters/${$$$matterID}/depositions/${$route.params.depositionId}/dauberts/${dataDaubertTestDetail.pk}`"
                    routerMutation="ht_store/matter/deposition/daubertTest/updateDauberts"
                    :pk="dataDaubertTestDetail.pk"
                    :isShowFlag="false"
                    :detail="true"
                    routerMutationDetail="ht_store/matter/deposition/daubertTest/updateDetail"
                  />
                  <Action
                    :item="dataDaubertTestDetail"
                    @remove="$emit('remove', dataDaubertTestDetail.pk, $event)"
                  />
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
import { mapGetters } from "vuex";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import Disputed from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/Disputed";
import Review from "./Review";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

export default {
  props: {
    isShowPopup: Boolean,
    title: String,
    isLoadingGetDetail: Boolean,
    isClickOutSide: Boolean,
    daubertId: Number,
    isLoadingGetIssue: Boolean
  },
  components: {
    Action,
    Disputed,
    Review,
    BookmarkOrFlag
  },
  data() {
    return {
      valid: false,
      showExpenseDetail: false,
      isLoadingGetTag: false,
      isCallApiTagCell: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/daubertTest", [
      "dataDaubertTestDetail"
    ])
  },
  methods: {
    updateReviews(reviewId, daubertId, name, value) {
      this.$emit("updateReviews", reviewId, daubertId, name, value);
    },
    removeReviews(daubertId, reviewId, close) {
      this.$emit("removeReviews", daubertId, reviewId, close);
    }
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
