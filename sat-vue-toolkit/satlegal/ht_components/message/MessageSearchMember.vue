<template>
  <v-list-item class="text-xs-center">
    <span class="mt-5 text-body-1">
      There is no
      <span class="font-weight-bold">{{message}}</span>
      matched with your search pattern. Please consider adding {{message}} first. Click
      <router-link :to="linkMember || '' ">here</router-link>
      to {{message}} characters
    </span>
  </v-list-item>
</template>
<script>
export default {
  props: {
    message: String,
    linkMember: String
  }
};
</script>
