<template>
  <div>
    <div class="group_link_top">
      <v-btn
        small
        active-class="primary--text"
        :class="`auto_link_${item.text}`"
        text
        v-for="item in links"
        :key="item.to"
        exact
        :to="item.to"
      >
        {{ item.text }}
      </v-btn>
    </div>
    <v-divider />
  </div>
</template>

<script>
export default {
  name: 'TopBarDocketDetail',
  props: {
    links: {},
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.group_link_top {
  display: flex;
}
.auto_link_pdf {
  order: -3;
}
.auto_link_text {
  order: -2;
}
.auto_link_plus {
  order: -1;
}
.auto_link_summary {
  order: -1;
}

.auto_link_wordcloud {
  order: -1;
}
</style>
