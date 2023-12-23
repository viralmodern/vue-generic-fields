<template>
  <div>
    <slot
      name="breadcrumbs"
      :link="{ text: 'Dockets Entries', to: 'dockets-entries' }"
    ></slot>
    <GridBookmarksOdt end-point="/api/dockets/1/docket-entries/bookmarks/" />
  </div>
</template>

<script>
import GridBookmarksOdt from '~/features/odt/GridBookmarksOdt'
export default {
  components: { GridBookmarksOdt },
  head() {
    return {
      title: 'Bookmark Dockets Entries',
    }
  },
}
</script>

<style scoped></style>
