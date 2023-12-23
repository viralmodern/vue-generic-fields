<template>
  <v-main>
    <v-container fluid>
      <v-card flat tile>
        <v-card-title class="text-h5">
          Dashboard
        </v-card-title>
        <v-card-text>
          Law practice management software made easy.
          <nuxt-link to="/matters">All Matters</nuxt-link>
        </v-card-text>
      </v-card>
      <v-card flat tile>
        <v-card-title class="text-h5">
          ODT
        </v-card-title>
        <v-card-text>
          Search millions of opinions by case name, topic, or citation.
          <p>
            406 Jurisdictions. Sponsored by the Non-Profit Free Law Project.
          </p>
          <nuxt-link to="/odt/opinions">All Opinions</nuxt-link>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import ListMatterAssigned from '~/components/dashboard/ListMatterAssigned'
import ListMatterManaged from '~/components/dashboard/ListMatterManaged'

export default {
  components: { ListMatterManaged, ListMatterAssigned },
  layout: 'app',
  head() {
    return {
      title: 'Dashboard',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description',
        },
      ],
    }
  },
  mounted() {},
  computed: {},
}
</script>
