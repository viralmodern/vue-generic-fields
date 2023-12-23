<template>
  <v-container fluid class="pa-0">
    <TableGrid
      hide-default-header
      hide-default-footer
      :headers="headers.filter(h => h.active)"
      :desserts="dataHistories"
      :loading="isLoadingHistories"
    >
      <template v-slot:item.drag="{ props: { item } }">
        <Flag
          :value="item.flag"
          :valueBookmark="!!item.bookmarked_pk"
          @update="updated(item.pk, 'flag', !item.flag)"
          @updateBookmark="
            updateBookmarkHistory(item.pk, !item.bookmarked_pk)
          "
        />
      </template>
      <template v-slot:item.date="{ props: { item } }">
        <ChooseDateTimePicker
          :isActions="true"
          :title="item.date ? 'Update time' : 'Add time'"
          :nameButtonSubmit="item.date ? 'Update' : 'Add'"
          :date="item.date"
          @update="updated(item.pk, 'date', $event)"
        />
      </template>
      <template v-slot:item.desc="{ props: { item } }">
        <TextArea :value="item.desc" @update="updated(item.pk, 'desc', $event)" />
      </template>
      <template v-slot:item.total_comments="{ props: { item } }">
        <Comments
          :totalComments="item.total_comments"
          :matterId="$route.params.matter || $route.params.projectId"
          :characterId="characterDetail.pk"
          :historyId="item.pk"
        />
      </template>
      <template v-slot:item.action="{ props: { item } }">
        <div class="d-flex">
          <BookmarkOrFlag
            :valueBookmark="item.bookmarked_pk"
            :endpoint="`/api/matters/${$$$matterID}/characters/${characterDetail.pk}/histories/${item.pk}`"
            routerMutation="ht_store/matter/character2/patchHistories"
            :pk="item.pk"
            :valueFlag="item.reported_object && item.reported_object.pk"
          />
          <Action :item="item" @remove="removeHistory(item.pk, $event)" />
        </div>
      </template>
    </TableGrid>
    <div class="d-flex align-center">
      <v-col cols="10" class="pa-0">
        <CreatedHistories />
      </v-col>
      <v-col cols="2 text-right">
        <ButtonLoadMore
          v-if="total_histories > 20 && total_histories > dataHistories.length"
          ref="refLoadMore"
          :loading="isLoadingHistories"
          @onPageChanged="paginationHistories"
        />
      </v-col>
    </div>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import ButtonLoadMore from "../../common/buttons/ButtonLoadMore";
import CreatedHistories from "./CreatedHistories";
import Comments from "./Comments";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

// Cell
import ChooseDateTimePicker from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseDateTimePicker";
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import Flag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Flag";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import { $$STORE_PREFIX } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  components: {
    TableGrid,
    ButtonLoadMore,
    CreatedHistories,
    ChooseDateTimePicker,
    TextArea,
    BookmarkOrFlag,
    Flag,
    Action,
    Comments
  },
  data() {
    return {
      isLoadingComment: false,
      isLoadingSendComment: false,
      headers: [
        { text: "", value: "drag", active: true },
        { text: "Date and Time", value: "date", active: true },
        { text: "Description", value: "desc", active: true },
        { text: "Comments", value: "total_comments", active: true },
        { text: "Action", value: "action", active: true }
      ]
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/character2", [
      "dataHistories",
      "total_histories",
      "characterDetail",
      "isLoadingHistories"
    ]),
    ...mapGetters("ht_store/project/members", ["members"])
  },
  methods: {
    ...mapActions("ht_store/matter/character2", [
      "patchHistoriesCharacters",
      "deleteHistoriesCharacters",
      "getHistoriesCharacters",
      "updateBookmarkHistoryRequest"
    ]),
    async paginationHistories({ page, setLoading }) {
      setLoading(true);
      const payload = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        characterId: this.characterDetail.pk,
        page,
        type: "paging"
      };
      await this.getHistoriesCharacters(payload);
      setLoading(false);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    updated(historiesId, name, value) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        characterId: this.characterDetail.pk,
        historiesId,
        body: {
          [name]: value
        }
      };
      this.patchHistoriesCharacters(data);
    },
    async removeHistory(historyId, close) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        characterId: this.characterDetail.pk,
        historiesId: historyId
      };
      try {
        await this.deleteHistoriesCharacters(data);
        close();
      } catch (error) {
        close();
      }
    },
    updateBookmarkHistory(historyId, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          characterId: this.characterDetail.pk,
          historyId
        },
        body: {
          bookmarked_pk: value
        }
      };
      this.updateBookmarkHistoryRequest(data);
    }
  }
};
</script>
