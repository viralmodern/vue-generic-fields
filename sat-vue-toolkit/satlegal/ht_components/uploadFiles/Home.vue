<template>
  <v-row no-gutters>
    <v-col>
      <v-col cols="12" class="text-xs-center">
        <div class="text-h5 font-wight-bold">{{ title }}</div>
        <div>{{ subTitle }}</div>
      </v-col>
      <DragDrop
        :accept="accept"
        :regExpFiles="regExpFiles"
        :multiple="multiple"
        @uploadFiles="evt => $emit('uploadFiles', evt)"
      />
    </v-col>
  </v-row>
</template>
<script>
import DragDrop from "./DragDrop";
export default {
  components: {
    DragDrop
  },
  props: {
    regExpFiles: RegExp,
    accept: String,
    multiple: Boolean,
    title: String,
    subTitle: String
  }
};
</script>
