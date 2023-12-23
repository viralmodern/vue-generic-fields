<template>
  <router-link :to="to" class="link-detail">
    <div class="pa-2">
      <v-col>
        <v-row no-gutters class="justify-center">
          <span class="font-weight-bold">{{ title }}</span>
        </v-row>
      </v-col>
      <v-col class="mt-2">
        <span class="text--secondary" v-html="content"></span>
      </v-col>
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
    title: String,
    content: String,
    to: Object
  }
};
</script>
<style scoped>
.link-detail {
  text-decoration: none;
}
</style>
