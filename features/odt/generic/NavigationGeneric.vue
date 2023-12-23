<template>
  <div>
    <template v-if="selections">
      <div class="d-flex align-center flex-wrap">
        <template v-for="(selection, index) in selections">
          <template v-if="index !== 0">
            <v-icon :key="`arrow-${selection.id}`" x-small class="mx-2">
              mdi-chevron-double-right
            </v-icon>
          </template>
          <div
            :key="selection.id"
            @click="selectedPage($event, selection.id)"
            class="caption text-capitalize cursor--pointer"
          >
            {{ selection.name }}
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { EVENTS_NAME } from '~/features/odt/generic/genericCore'

export default {
  name: 'NavigationGeneric',
  props: {
    selections: {},
  },
  methods: {
    selectedPage(evt, pageId) {
      this.$trigger(EVENTS_NAME.SELECTED_PAGE, pageId)
    },
  },
}
</script>

<style scoped></style>
