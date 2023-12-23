<template>
  <div>
    <slot name="header"></slot>
    <v-container fluid>
      <div class="content_explorer d-flex">
        <div class="lef_sidebar">
          <FileListOdt
            height="94vh"
            :root-path="rootPath"
            :v-bind="{ flat: true }"
          />
        </div>
        <div class="right_content">
          <nuxt-child />
        </div>
      </div>
    </v-container>
  </div>
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
      return `${this.$$rootPathDocketOdt}/${docket}/depositions/explorer`
    },
  },
}
</script>

<style scoped lang="scss">
.content_explorer {
  /*border: solid 1px rgba(0,0,0,0.05);*/
  overflow: hidden;
  .lef_sidebar {
    position: sticky;
    top: 38px;
    border: solid 1px rgba(0, 0, 0, 0.05);
    width: 300px;
  }

  .right_content {
    width: calc(100% - 300px);
    border-top: solid 1px rgba(0, 0, 0, 0.05);
  }
}
</style>
