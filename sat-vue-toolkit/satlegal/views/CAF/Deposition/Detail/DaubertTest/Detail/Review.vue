<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      :items-per-page="5"
      :page.sync="page"
      hide-default-footer
      @page-count="pageCount = $event"
      :total-visible="5"
    >
      <template v-slot:item.publication_name="{ item }">
        <TextArea
          :value="item.publication_name"
          @update="$emit('updateReviews',item.pk,daubertId, 'publication_name', $event)"
        />
      </template>
      <template v-slot:item.date="{ item }">
        <YearSelect
          width="50px"
          :max="new Date().getFullYear()"
          border-unset
          placeholder="Select year"
          hide-details
          :value="Number((item.date || '').split('-')[0])"
          @update="$emit('updateReviews',item.pk,daubertId, 'date', `${$event}-01-01`)"
        />
      </template>
      <template v-slot:item.publisher="{ item }">
        <TextArea
          :value="item.publisher"
          @update="$emit('updateReviews',item.pk,daubertId, 'publisher', $event)"
        />
      </template>
      <template v-slot:item.desc="{ item }">
        <TextArea
          :value="item.desc"
          @update="$emit('updateReviews',item.pk,daubertId, 'desc', $event)"
        />
      </template>
      <template v-slot:item.labels="{ item }">
        <Label
          :value="item.labels.map(x => x.pk)"
          @update="$emit('updateReviews',item.pk,daubertId, 'labels', $event)"
        />
      </template>
      <template v-slot:item.attachments="{ item }">
        {{item.attachments.length}}
        <AddIcon
          @onClickIcon="onShowPopupAttachment(item.pk, item.attachments)"
          icon="mdi-attachment"
        />
      </template>
      <template v-slot:item.actions="{ item }">
        <Action :item="item" @remove="$emit('removeReviews',daubertId,item.pk, $event)" />
      </template>
    </v-data-table>
    <div class="d-flex align-center justify-space-between" style="height:60px">
      <FormCreateReview
        :daubertId="daubertId"
        @onAddNewCustodyItemSuccess="$emit('onAddNewCustodyItemSuccess')"
        :detail="true"
      />
      <div class="pagination-custody-item">
        <v-pagination v-model="page" :length="pageCount" circle></v-pagination>
      </div>
    </div>
    <Attachments
      :value="[]"
      :isShowPopup="isShowPopupAttachment"
      :reviewId="reviewIdAttachment"
      :daubertId="daubertId"
      :dataAttachments="dataAttachments"
      @closePopup="isShowPopupAttachment = false;"
      :isShowRightPopup="isShowRightPopup"
    />
  </v-container>
</template>

<script>
import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import YearSelect from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/YearSelect";
import Label from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Label";
import Attachments from "../Attachments";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import FormCreateReview from "../FormCreateReview";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    // headers: Array,
    desserts: Array,
    daubertId: Number,
    isShowRightPopup: Boolean
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/daubertTest", ["dataAttachments"])
  },
  components: {
    TextArea,
    YearSelect,
    Label,
    Attachments,
    AddIcon,
    FormCreateReview,
    Action
  },
  data() {
    return {
      headers: [
        {
          text: "Publication Name",
          value: "publication_name",
          headerValue: "reviews",
          color: "cyan"
        },
        {
          text: "Date",
          value: "date",
          headerValue: "reviews",
          color: "green"
        },
        {
          text: "Publisher",
          value: "publisher",
          headerValue: "reviews",
          color: "purple"
        },
        {
          text: "Description",
          value: "desc",
          headerValue: "reviews",
          color: "deep-purple"
        },
        {
          text: "Labels",
          value: "labels",
          headerValue: "reviews",
          color: "indigo"
        },
        {
          text: "Attachments",
          value: "attachments",
          headerValue: "reviews",
          color: "blue"
        },
        {
          text: "Actions",
          value: "actions",
          headerValue: "reviews",
          color: "error"
        }
      ],
      isShowPopupAttachment: false,
      reviewIdAttachment: 0,
      daubertIdAttachment: 0,
      page: 1,
      pageCount: 0
    };
  },
  methods: {
    onShowPopupAttachment(reviewId, attachments) {
      this.reviewIdAttachment = reviewId;
      this.getDataAttachments(attachments);
      this.isShowPopupAttachment = true;
    },
    ...mapMutations("ht_store/matter/deposition/daubertTest", [
      "getDataAttachments"
    ])
  }
};
</script>
