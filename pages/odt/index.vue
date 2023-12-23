<template>
  <v-container fluid>
    <v-card flat tile>
      <v-card-text>
        <p class="title">
          # Search millions of opinions by case name, topic, or citation,
          dockets.
        </p>
        <CardLinks :items="LINKS_ODT" />
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import CardLinks from '~/features/odt/CardLinks'
export default {
  components: { CardLinks },

  computed: {
    LINKS_ODT() {
      return this.$store.getters['uiOdt/linksOdt']
    },
  },
}
</script>

<style scoped></style>
