<template>
  <BaseCafFactsEntries>
    <template v-slot:default="{ ownerPk }">
      <nuxt-child :owner-pk="ownerPk" />
    </template>
  </BaseCafFactsEntries>
</template>

<script>
import BaseCafFactsEntries from '~/components/matters/caf/categories/facts/BaseCafFactsEntries'

export default {
  components: { BaseCafFactsEntries }
}
</script>

<style scoped></style>
