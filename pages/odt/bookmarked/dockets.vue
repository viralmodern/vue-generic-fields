<template>
  <div>
    <slot name="breadcrumbs" :link="{ text: 'Dockets', to: 'dockets' }"></slot>
    <GridBookmarksOdt end-point="/api/dockets/bookmarks/" />
  </div>
</template>

<script>
import GridBookmarksOdt from '~/features/odt/GridBookmarksOdt'
export default {
  components: { GridBookmarksOdt },
  head() {
    return {
      title: 'Bookmark Dockets',
    }
  },
}
</script>

<style scoped></style>
