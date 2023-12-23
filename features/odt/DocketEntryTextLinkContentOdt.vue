<template>
  <div>
    <p class="mb-1">
      <router-link
        class="caption text-decoration-none"
        :to="path"
        v-html="title"
      />
    </p>
    <p class="ma-0">
      <v-chip small class="mr-2">{{ filedByText }}</v-chip>
      <v-chip v-if="readingTime" small class="mr-2">
        {{ readingTime }}
      </v-chip>
      <v-chip small v-if="hasPages">
        {{ pages }}
      </v-chip>
    </p>
  </div>
</template>

<script>
export default {
  name: 'DocketEntryTextLinkContentOdt',
  props: {
    path: {},
    title: {},
    filedByText: {},
    readingTime: {},
    hasPages: {},
    pages: {},
  },
}
</script>

<style scoped></style>
