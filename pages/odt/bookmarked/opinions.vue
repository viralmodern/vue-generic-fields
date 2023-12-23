<template>
  <div>
    <slot
      name="breadcrumbs"
      :link="{ text: 'Opinions', to: 'opinions' }"
    ></slot>
    <GridBookmarksOdt end-point="/api/opinions/bookmarks/" />
  </div>
</template>

<script>
import GridBookmarksOdt from '~/features/odt/GridBookmarksOdt'
export default {
  components: { GridBookmarksOdt },
  head() {
    return {
      title: 'Bookmark Opinions',
    }
  },
}
</script>

<style scoped></style>
