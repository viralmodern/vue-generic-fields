<template>
  <v-dialog :value="isShow" @input="cancel" width="500">
    <v-card>
      <v-card-title>
        <span class="text-h5">Manual upload signatures</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="px-2 py-3">
        <div v-for="item in itemEdit" :key="item.id">
          <SignaturesItem
            v-if="item.signatures ? !item.signatures.imageUrl : !false"
            :name="item.name"
            :role="item.role"
            :signatures="item.signatures"
            :avatar="item.avatar"
            @getFileUpload="getFileUpload({ id: item.id, ...$event })"
          />
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">CLOSE</v-btn>
        <v-btn color="primary" @click="upload">UPLOAD</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SignaturesItem from "../cards/SignaturesItem";

export default {
  data() {
    return {
      files: [],
      removeFunc: []
    };
  },
  props: {
    isShow: Boolean,
    itemEdit: Array
  },
  components: {
    SignaturesItem
  },
  methods: {
    cancel() {
      if (this.removeFunc.length) {
        this.removeFunc.map(x => x());
        this.removeFunc = [];
      }
      this.files = [];
      this.$emit("closeModal");
    },
    upload() {
      this.$emit("uploadManyManual", this.files);
      this.cancel();
    },
    getFileUpload(data) {
      const { id, file, remove } = data;
      this.files = [...this.files, { id, file }];
      this.removeFunc = [...this.removeFunc, remove];
    }
  }
};
</script>

<style scoped>
div /deep/ #dropzone {
  border: 1px solid silver;
  border-radius: 10px;
}
</style>
