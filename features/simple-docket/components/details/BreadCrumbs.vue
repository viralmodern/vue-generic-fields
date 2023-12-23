<template>
  <v-breadcrumbs class="pa-0 pb-2" :items="items">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
    <template v-slot:item="{ item }">
      <!--      <nuxt-link :to="item.text" v-text="item.text"/>-->
      {{ item.disabled ? `#${docketId}` : item.text }}
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  data() {
    return {
      items: [
        {
          text: 'All Dockets',
          disabled: false,
          href: 'breadcrumbs_dashboard'
        },
        {
          text: `#${this.docketId}`,
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ]
    }
  },
  computed: {
    docketId() {
      try {
        console.log('docketId', this.$route.params.docket)
        return this.$route.params.docket
      } catch (e) {
        return 'N/A'
      }
    }
  }
}
</script>

<style scoped></style>
