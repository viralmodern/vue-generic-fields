<template>
  <BaseCafCharactersEntries>
    <template v-slot:default="{ ownerPk }">
      <nuxt-child :owner-pk="ownerPk" />
    </template>
  </BaseCafCharactersEntries>
</template>

<script>
import BaseCafCharactersEntries from '~/components/matters/caf/categories/characters/BaseCafCharactersEntries'
export default {
  components: { BaseCafCharactersEntries }
}
</script>

<style scoped></style>
