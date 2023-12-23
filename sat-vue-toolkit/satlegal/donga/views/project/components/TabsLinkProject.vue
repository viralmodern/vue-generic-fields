<template>
  <div class="tab_link_pro layout justify-center white">
    <v-btn
      value="recent"
      v-for="item in links"
      :key="item.name"
      :to="{ name: item.name, exact: !!item.exact }"
    >
      <span>{{ item.meta.title }}</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "TabsLinkProject",
  props: {
    links: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>
