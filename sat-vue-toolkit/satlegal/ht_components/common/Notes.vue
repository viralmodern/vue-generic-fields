<template>
  <div>
    <a href="#" @click="showModal">{{ totalNotes }} note(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card class="pa-2 pb-3">
        <v-col cols="12">
          <ByzantineNote
            ref="refByzantineNote"
            :listNotes="notes"
            :isLoadingAdd="isLoadingAdd"
            @create="create"
            @edit="edit"
            @remove="$emit('remove', {id: $event, page})"
          />
          <v-col
            cols="12"
            justify-center
            align-center
            class="text-xs-center mt-2"
          >
            <v-pagination
              v-if="isShowPagination"
              v-model="page"
              :length="totalPagination"
              :total-visible="7"
            ></v-pagination>
          </v-col>
        </v-col>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ByzantineNote from "../cards/ByzantineNote";
export default {
  props: {
    totalPagination: Number,
    isShowPagination: Boolean,
    totalNotes: Number,
    notes: Array,
    isLoadingAdd: Boolean,
  },
  components: {
    ByzantineNote
  },
  data() {
    return {
      page: 1,
      showDialog: false
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
    showModal() {
      this.showDialog = true;
      this.$emit("showModal");
    },
    create(value){
      const data = {
        body: {
          title: value.title,
          text: value.description,
        },
        page: this.page,
      }
      this.$emit('create', data);
    },
    edit(id, value){
      const data = {
        id,
        body: {
          title: value.title,
          text: value.description,
        },
        page: this.page,
      }
      this.$emit('edit', data)
    },
    closeAdd() {
      this.$refs.refByzantineNote.closeAdd();
    },
    closeUpdate() {
      this.$refs.refByzantineNote.closeUpdate();
    },
  }
};
</script>
