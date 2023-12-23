<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row no-gutters class="align-center">
        <v-btn class="my-2" color="primary" @click="isShowAdd = true">
          <span>Add Notes</span>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <ByzantineCreateNote
          ref="refCreateNote"
          @submit="data => $emit('create', data)"
          :isShow="isShowAdd"
          :isLoadingAdd="isLoadingAdd"
          @closeModel="isShowAdd = false"
          nameButton="Add"
        />
        <ByzantineCreateNote
          ref="refUpdateNote"
          @submit="data => $emit('edit', itemEdit.id, data)"
          :isShow="isShowEdit"
          :isLoadingAdd="isLoadingAdd"
          :propTitle="itemEdit.title"
          :propDescription="itemEdit.content"
          @closeModel="isShowEdit = false"
          nameButton="Save"
        />
      </v-row>
    </v-col>
    <span v-if="!listNotes.length"
      >There is no note for display, click Add notes button to start
      adding.</span
    >
    <v-col
      v-else
      cols="12"
      class="mt-1"
      v-for="item in listNotes"
      :key="item.id"
    >
      <ByzantineNoteComment
        @remove="id => $emit('remove', item.id)"
        @edit="edit(item)"
        :id="item.id"
        :avatar="item.avatar"
        :peopleWrite="item.peopleWrite"
        :createdAt="item.createdAt"
        :title="item.title"
        :content="item.content"
      />
    </v-col>
  </v-row>
</template>

<script>
import ByzantineNoteComment from "./ByzantineNoteComment";
import ByzantineCreateNote from "../menus/ByzantineCreateNote";
export default {
  props: {
    listNotes: Array,
    isLoadingAdd: Boolean,
  },
  components: {
    ByzantineCreateNote,
    ByzantineNoteComment
  },
  data() {
    return {
      isShowAdd: false,
      isShowEdit: false,
      itemEdit: {}
    };
  },
  methods: {
    edit(data) {
      this.itemEdit = data;
      this.isShowEdit = true;
    },
    closeAdd() {
      this.$refs.refCreateNote.close();
    },
    closeUpdate() {
      this.$refs.refUpdateNote.close();
    },
  }
};
</script>
