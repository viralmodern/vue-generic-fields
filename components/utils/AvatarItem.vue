<template>
  <div v-if="chip">
    <v-chip :color="color || 'indigo'" dark :small="smallChip">
      <v-avatar left>
        <img v-if="src" :src="src" alt="" />
        <div
          v-else-if="title"
          class="white--text font-weight-bold text-uppercase"
          style="font-size: 65%;"
        >
          {{ title | $$strName }}
        </div>
        <div
          v-else
          class="white--text font-weight-bold text-uppercase"
          style="font-size: 75%;"
        >
          N/A
        </div>
      </v-avatar>
      {{ title }}
    </v-chip>
  </div>
  <v-avatar
    :color="color || 'indigo'"
    :title="title"
    :size="size || 25"
    v-else-if="avatar"
  >
    <img v-if="src" :src="src" alt="" />
    <span
      v-else-if="title"
      class="white--text font-weight-bold text-uppercase"
      style="font-size: 65%;"
    >
      {{ title | $$strName }}
    </span>
    <span
      v-else
      class="white--text font-weight-bold text-uppercase"
      style="font-size: 75%;"
    >
      N/A
    </span>
  </v-avatar>
  <v-avatar :color="color || 'indigo'" :size="size || 30" v-else>
    <span
      class="white--text font-weight-bold text-uppercase"
      style="font-size: 75%;"
    >
      N/A
    </span>
  </v-avatar>
</template>
<script>
import { $$strName } from '@/sat-vue-toolkit/functions'

export default {
  name: 'AvatarItem',
  props: {
    title: {
      type: String,
    },
    src: {
      type: String,
    },
    color: {
      type: String,
    },
    size: {
      type: [String, Number],
    },
    avatar: {
      type: Boolean,
      default: true,
    },
    chip: {
      type: Boolean,
      default: false,
    },
    smallChip: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  filters: {
    $$strName,
  },
}
</script>

<style scoped></style>
