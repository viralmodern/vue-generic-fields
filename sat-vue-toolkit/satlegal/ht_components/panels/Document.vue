<template>
  <v-row  no-gutters>
    <v-data-table
      :headers="headers"
      :items="dataTableDocument"
      :loading="loading"
      :pagination.sync="pagination"
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.title }}</td>
        <td class="text-xs-left">
          <ExhibitChip :itemChip="props.item.documentType"/>
        </td>
        <td class="text-xs-left">{{ fullDate(props.item.date) }}</td>
        <td class="text-xs-left">{{ props.item.characters }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">
          <v-col v-if="props.item.attachement && props.item.attachement.length">
            <MenuExhibitDocument
              :attachement="props.item.attachement"
              :totals="props.item.attachement.length"
              @download="download"
            />
          </v-col>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-right pt-2">
      <v-pagination v-model="pagination.page" :total-visible="7" :length="pages"></v-pagination>
    </div>
  </v-row>
</template>
<script>
import moment from "moment";
import ExhibitChip from "../chips/ExhibitChip";
import MenuExhibitDocument from "../menus/MenuExhibitDocument";

export default {
  components: {
    ExhibitChip,
    MenuExhibitDocument
  },
  props: {
    dataTableDocument: Array,
    loading: Boolean
  },
  data() {
    return {
      pagination: {},
      headers: [
        { text: "Title", align: "left", value: "title" },
        { text: "Type", align: "left", value: "type" },
        { text: "Date", align: "left", value: "date" },
        { text: "Characters", align: "left", value: "characters" },
        { text: "Description", align: "left", value: "description" },
        {
          text: "Attachment",
          align: "left",
          value: "attachement",
          sortable: false
        }
      ]
    };
  },
  methods: {
    download() {
      return null;
    }
  },
  computed: {
    fullDate() {
      return date => moment(date).format("MM/DD/YYYY");
    },
    pages() {
      if (
        !this.pagination ||
        !this.pagination.rowsPerPage ||
        !this.dataTableDocument.length
      )
        return 0;
      return Math.ceil(
        this.dataTableDocument.length / this.pagination.rowsPerPage
      );
    }
  },
  watch: {
    pagination: {
      handler() {
        this.$emit("getData", this.pagination);
      },
      deep: true
    }
  }
};
</script>
