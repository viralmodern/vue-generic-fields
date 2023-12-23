<template>
  <div>
    <v-row no-gutters class="justify-end">
      <MenuConfigHeader :headers="headers" @checkbox="checkbox" />
    </v-row>
    <v-data-table
      :headers="headers.filter(x => x.check)"
      :loading="loading"
      :items="dataTable"
      :pagination.sync="pagination"
      :total-items="totals"
      class="elevation-1 filterable-table"
    >
      <template slot="items" slot-scope="props">
        <td v-if="checkTableBody.cardName" class="text-xs-left">
          {{ props.item.cardName }}
        </td>
        <td v-if="checkTableBody.labels" class="text-xs-left">labels</td>
        <td v-if="checkTableBody.duaDate" class="text-xs-left">dueDate</td>
        <td v-if="checkTableBody.members" class="text-xs-left">members</td>
        <td v-if="checkTableBody.progress" class="text-xs-left">progress</td>
        <td v-if="checkTableBody.checkList" class="text-xs-left">checkList</td>
        <td v-if="checkTableBody.citations" class="text-xs-left">citations</td>
        <td v-if="checkTableBody.tagging" class="text-xs-left">tagging</td>
        <td v-if="checkTableBody.location" class="text-xs-left">location</td>
        <td v-if="checkTableBody.people" class="text-xs-left">people</td>
        <td v-if="checkTableBody.timeEntries" class="text-xs-left">
          timeEntries
        </td>
        <td v-if="checkTableBody.favorable" class="text-xs-left">favorable</td>
        <td v-if="checkTableBody.risk" class="text-xs-left">risk</td>
        <td v-if="checkTableBody.vulnerability" class="text-xs-left">
          vulnerability
        </td>
        <td v-if="checkTableBody.treatment" class="text-xs-left">treatment</td>
        <td v-if="checkTableBody.attachment" class="text-xs-left">
          attachment
        </td>
        <td v-if="checkTableBody.notes" class="text-xs-left">notes</td>
        <td v-if="checkTableBody.comments" class="text-xs-left">comments</td>
        <td v-if="checkTableBody.cardActivities" class="text-xs-left">
          cardActivities
        </td>
        <td v-if="checkTableBody.subTasks" class="text-xs-left">subTasks</td>
        <td v-if="checkTableBody.estimation" class="text-xs-left">
          estimation
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-right pt-2">
      <v-pagination
        v-model="pagination.page"
        :total-visible="7"
        :length="pages"
      ></v-pagination>
    </div>
  </div>
</template>
<script>
import MenuConfigHeader from "../menus/MenuConfigHeader";

const headers = [
  { id: 1, text: "Card name", check: true, value: "cardName" },
  { id: 3, text: "Labels", check: true, value: "labels" },
  { id: 2, text: "Due date", check: true, value: "dueDate" },
  { id: 4, text: "Members", check: true, value: "members" },
  { id: 5, text: "Progress", check: true, value: "progress" },
  { id: 6, text: "Check List", check: false, value: "checkList" },
  { id: 7, text: "Citations", check: false, value: "citations" },
  { id: 8, text: "Tagging", check: false, value: "tagging" },
  { id: 9, text: "Location", check: false, value: "location" },
  { id: 10, text: "People", check: false, value: "people" },
  { id: 11, text: "Time entries", check: false, value: "timeEntries" },
  { id: 12, text: "Favorable", check: false, value: "favorable" },
  { id: 13, text: "Risk", check: false, value: "risk" },
  { id: 14, text: "Vulnerability", check: false, value: "vulnerability" },
  { id: 15, text: "Treatment", check: false, value: "treatment" },
  { id: 16, text: "Attachment", check: false, value: "attachment" },
  { id: 17, text: "Notes", check: false, value: "notes" },
  { id: 18, text: "Comments", check: false, value: "comments" },
  {
    id: 19,
    text: "Card activities",
    check: false,
    value: "cardActivities"
  },
  { id: 20, text: "Sub tasks", check: false, value: "subTasks" },
  { id: 21, text: "Estimation", check: false, value: "estimation" }
];

export default {
  components: {
    MenuConfigHeader
  },
  props: {
    dataTable: Array,
    loading: Boolean,
    totals: Number
  },
  data() {
    return {
      pagination: {},
      headers,
      checkTableBody: this.convertArrayToObject(headers)
    };
  },
  computed: {
    pages() {
      if (!this.pagination || !this.pagination.rowsPerPage || !this.totals)
        return 0;
      return Math.ceil(this.totals / this.pagination.rowsPerPage);
    }
  },
  methods: {
    checkbox(data) {
      this.headers.find(x => x.id === data.id).check = data.check;
    },
    convertArrayToObject(headers) {
      let object = {};
      headers.filter(x => x.check).map(x1 => (object[x1.value] = true));
      return object;
    }
  },
  watch: {
    pagination: {
      handler() {
        this.$emit("getData", this.pagination);
      },
      deep: true
    },
    headers: {
      handler(headers) {
        this.checkTableBody = this.convertArrayToObject(headers);
      },
      deep: true
    }
  }
};
</script>
