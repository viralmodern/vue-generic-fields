<template>
  <v-col cols="12">
    <ByzantineNote :listNotes="notes" @create="create" @edit="edit" @remove="remove" />
    <v-col cols="12" justify-center align-center class="text-xs-center mt-2">
      <v-pagination
        v-if="totalPagination > 1"
        v-model="page"
        :length="totalPagination"
        :total-visible="7"
      ></v-pagination>
    </v-col>
  </v-col>
</template>
<script>
import ByzantineNote from "../../../cards/ByzantineNote";
export default {
  props: {
    notes: Array,
    totalPagination: Number,
    dataRow: Object,
    matterId: Number,
    rowId: Number
  },
  components: {
    ByzantineNote
  },
  data() {
    return {
      page: 1
    };
  },
  watch: {
    page: {
      handler(v) {
        this.$emit("paging", v);
      }
    }
  },
  methods: {
    create(e) {
      const params = {
        matterId: this.matterId,
        rowId: this.rowId,
        bodyRequest: {
          title: e.title,
          text: e.description
        }
      };
      this.$emit("create", params);
    },
    edit(id, e) {
      const { members, deadline } = this.dataRow;
      const params = {
        matterId: this.matterId,
        rowId: this.rowId,
        notesId: id,
        bodyRequest: {
          title: e.title,
          text: e.description,
          pk: id,
          creator: !members ? this.notes[0].creator : members[0],
          created: deadline
        }
      };
      this.$emit("edit", params);
    },
    remove(id) {
      const params = {
        id,
        matterId: this.matterId,
        rowId: this.rowId
      };
      this.$emit("remove", params);
    }
  }
};
</script>
