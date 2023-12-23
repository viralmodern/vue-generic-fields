<template>
  <v-container fluid>
    <slot name="header"></slot>
    <div class="content_explorer d-flex">
      <div class="lef_sidebar">
        <FileListOdt
          height="94vh"
          :root-path="rootPath"
          :v-bind="{ flat: true }"
        />
      </div>
      <keep-alive>
        <div class="right_content" v-if="hasDocument">
          <nuxt-child />
        </div>
      </keep-alive>
    </div>
  </v-container>
</template>

<script>
import FileListOdt from '~/features/odt/FileListOdt'

export default {
  components: { FileListOdt },
  computed: {
    rootPath() {
      return `/odt/deposition/explorer`
    },
    hasDocument() {
      try {
        return this.$route.params.document
      } catch (e) {
        return false
      }
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
