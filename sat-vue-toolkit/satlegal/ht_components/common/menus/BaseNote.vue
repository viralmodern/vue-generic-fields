<template>
  <div>
    <div>
      <v-btn v-if="mode === 'list'" class="pa-0" text small color="primary" @click="mode = 'add'">
        <v-icon small>mdi-plus</v-icon>
        <span>Add Notes</span>
      </v-btn>
    </div>
    <div>
      <FormNote
        ref="refFormNote"
        v-if="['add', 'edit'].includes(mode)"
        :isLoadingAdd="isLoadingAdd"
        :dataFormNote="itemEdit"
        :textSubmit="mode === 'edit' ? 'Save' : 'Add'"
        :title="mode === 'edit' ? 'Update new note' : 'Create new note'"
        @close="
          mode = 'list';
          itemEdit = {};
        "
        @submit="
          mode === 'edit'
            ? $emit('edit', itemEdit.id, $event)
            : $emit('create', $event)
        "
      />
      <div class="list-note" v-if="mode === 'list'">
        <v-progress-linear
          class="my-2"
          v-if="isLoadingGet"
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="3"
        ></v-progress-linear>
        <span v-else-if="!listNotes.length">
          There is no note for display, click Add notes button to start
          adding.
        </span>
        <BaseNoteComment
          v-else
          v-for="item in listNotes"
          :key="item.id"
          @remove="id => $emit('remove', item.id)"
          @edit="edit(item)"
          :id="item.id"
          :avatar="item.avatar"
          :peopleWrite="item.peopleWrite"
          :createdAt="item.createdAt"
          :title="item.title"
          :content="item.content"
          :isDisabled="isDisabled"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseNoteComment from "./BaseNoteComment";
import FormNote from "./note/FormNote";
export default {
  props: {
    listNotes: Array,
    isLoadingAdd: Boolean,
    isLoadingGet: Boolean,
    isDisabled: {
      type: Boolean,
      default: () => false
    }
  },
  components: {
    BaseNoteComment,
    FormNote
  },
  data() {
    return {
      mode: "list",
      isShowAdd: false,
      isShowEdit: false,
      itemEdit: {}
    };
  },
  methods: {
    edit(data) {
      this.itemEdit = {
        id: data.id,
        title: data.title,
        content: data.content
      };
      this.mode = "edit";
    },
    closeForm() {
      this.mode = "list";
      this.itemEdit = {};
      this.$refs.refFormNote.clear();
    }
  },
  watch: {
    mode(val) {
      this.$emit("onChangeMode", val);
    }
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
</style>
