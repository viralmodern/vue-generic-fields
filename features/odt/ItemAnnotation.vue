<template>
  <v-card tile>
    <v-card-text>
      <slot />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <template v-for="action in actions">
        <v-btn
          small
          rounded
          class="caption text-capitalize"
          :title="action.LABEL"
          icon
        >
          <v-icon small>{{ action.ICON }}</v-icon>
        </v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ANNOTATION_ACTIONS } from '~/features/odt/helpers/odt.json'

export default {
  name: 'ItemAnnotation',
  props: {
    actions: {
      type: Array,
      default: () => [
        ANNOTATION_ACTIONS.COMMENT,
        ANNOTATION_ACTIONS.CHANGE_COLOR,
        ANNOTATION_ACTIONS.CHANGE_TAGS,
        ANNOTATION_ACTIONS.REMOVE,
      ],
    },
  },
}
</script>

<style scoped></style>
