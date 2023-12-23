<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <v-row>
      <v-col cols="9">
        <PdfViewerRegulation />
      </v-col>
      <v-col cols="3">
        <p class="mb-0">
          Previous
        </p>
        <p class="caption">
          <router-link to="#">
            § 101.4 National Security Council
          </router-link>
        </p>
        <p class="mb-0">
          Next Section
        </p>
        <p class="caption">
          <router-link to="#">
            § 101.6 Office of National Drug Control Policy
          </router-link>
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PdfViewerRegulation from '~/features/regulation/PdfViewerRegulation'

export default {
  components: { PdfViewerRegulation },
  mounted() {},
  computed: {
    items() {
      try {
        const { path } = this.$route
        let str = path.split('/').filter((t) => !!t)
        console.log(str)
        return str.map((t, index) => {
          let link = true
          let text = t.replace(/-/gi, ' ').capitalize()
          let disabled = index === str.length - 1
          let to = {
            path: `/${[...str].splice(0, index + 1).join('/')}`,
          }
          let href = `/${[...str].splice(0, index + 1).join('/')}`
          return { text, disabled, href }
        })
      } catch (e) {
        return []
      }
    },
  },
}
</script>

<style scoped></style>
