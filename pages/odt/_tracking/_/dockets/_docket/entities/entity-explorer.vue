<template>
  <v-container fluid>
    <v-row no-gutters style="flex-wrap: nowrap">
      <v-col cols="2" class="flex-grow-0 flex-shrink-0">
        <FileListOdt
          height="94vh"
          :root-path="rootPath"
          :v-bind="{ flat: true }"
        />
      </v-col>
      <v-divider vertical />
      <v-col
        cols="10"
        style="min-width: 100px"
        class="flex-grow-0 flex-shrink-1"
      >
        <nuxt-child />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FileListOdt from '~/features/odt/FileListOdt'

export default {
  components: { FileListOdt },
  computed: {
    rootPath() {
      let {
        params: { docket },
      } = this.$route
      console.log('ROUTE', this.$route)
      return `${this.$$rootPathDocketOdt}/${docket}/entities/entity-explorer`
    },
  },
}
</script>

<style scoped lang="scss"></style>
