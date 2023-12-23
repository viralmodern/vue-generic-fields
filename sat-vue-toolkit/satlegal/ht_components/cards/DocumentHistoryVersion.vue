<template>
  <v-row no-gutters class="justify-center align-center">
    <v-col cols="7">
      <v-icon size="17">mdi-attach_file</v-icon>
      <span class="subheading font-weight-bold mx-1">{{ item.name }}</span>
    </v-col>
    <v-col cols="3">
      <div v-if="index == 0">
        <span
          v-if="item.status == 'approve'"
          class="success--text subheading mx-1"
          >CURRENT</span
        >
        <span v-else class="error--text subheading mx-1">CURRENT</span>
      </div>
      <div v-else>
        <span
          v-if="item.status == 'approve'"
          class="success--text subheading mx-1"
          >APPROVED</span
        >
        <span v-else class="error--text subheading mx-1">NEGATIVE</span>
      </div>
    </v-col>
    <v-col cols="1" class="ml-1">
      <v-btn icon small :href="item.link" target="blank">
        <v-icon size="17">mdi-save_alt</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    item: Object,
    index: Number
  }
};
</script>
