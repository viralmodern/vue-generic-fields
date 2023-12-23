<template>
  <div class="showDetail">
    <a
      class="ma-0 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small"
      @click="update(valueFlag, true)"
      icon
      small
      v-if="isShowFlag"
    >
      <v-icon small :color="valueFlag ? 'red' : 'grey'">mdi-flag</v-icon>
    </a>
    <v-btn
      class="ma-0 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small"
      @click="update(valueBookmark, false)"
      icon
      small
      v-if="isShowBookMark"
    >
      <v-icon small :color="valueBookmark ? 'success' : 'grey'">bookmark</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    valueBookmark: Number,
    valueFlag: Number,
    endpoint: String,
    routerMutation: String,
    pk: [Number, String],
    isShowFlag: {
      type: Boolean,
      default: () => true
    },
    isShowBookMark: {
      type: Boolean,
      default: () => true
    },
    detail: Boolean,
    routerMutationDetail: String
  },
  methods: {
    ...mapActions("ht_store/bookmarkOrReport", ["updateRequest"]),
    update(value, check) {
      let data = check
        ? {
            endpoint: `${this.endpoint}/${
              value ? `reports/${value}` : "reports"
            }/`,
            name: "reported_object",
            data: {
              reason: "s"
            }
          }
        : {
            endpoint: `${this.endpoint}/bookmarks/`,
            name: "bookmarked_pk"
          };
      data = {
        ...data,
        value,
        routerMutation: this.routerMutation,
        pk: this.pk,
        detail: this.detail,
        routerMutationDetail: this.routerMutationDetail
      };
      this.updateRequest(data);
    }
  }
};
</script>
<style scoped>
.showDetail {
  display: flex;
  justify-content: center;
  flex-wrap: inherit;
}
</style>