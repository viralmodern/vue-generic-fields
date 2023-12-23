<template>
  <v-menu offset-x left>
    <template v-slot:activator="{ on }">
      <v-btn class="text-lowercase primary" outlined small v-on="on">
        <span class="primary--text">{{ totals }} file(s)</span>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(i, index) in attachement"
        :key="index"
        @click="$emit('download')"
      >
        <v-icon class="mr-2 text--secondary">cloud_download</v-icon>
        <v-list-item-title>{{ i.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  props: {
    attachement: Array,
    totals: Number
  }
};
</script>
