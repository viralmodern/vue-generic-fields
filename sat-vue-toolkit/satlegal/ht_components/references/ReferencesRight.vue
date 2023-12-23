<template>
  <v-row no-gutters>
    <v-col cols="12" class="pa-2">
      <span class="text-caption font-weight-bold">Subject master :</span>
      <v-row no-gutters class="align-center">
        <Subject :item="items.subject_master" />
      </v-row>
    </v-col>

    <v-col cols="12" class="pa-2">
      <span class="text-caption font-weight-bold">Tags :</span>
      <v-row no-gutters class="align-center">
        <Tag :item="items.tag" />
      </v-row>
    </v-col>

    <v-col cols="12" class="pa-2">
      <span class="text-caption font-weight-bold">Type :</span>
      <v-row no-gutters class="align-center">
        <Type :item="items.type" />
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import Subject from "./right/Subject";
import Tag from "./right/Tag";
import Type from "./right/Type";
export default {
  props: {
    items: Object
  },
  components: {
    Subject,
    Tag,
    Type
  }
};
</script>
