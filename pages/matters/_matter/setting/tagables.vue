<template>
  <v-card class="mb-4">
    <v-card-title class="text-capitalize">
      Tagables
    </v-card-title>
    <v-card-subtitle>
      Archiving the matter will make it entirely read-only. It is hidden from
      All Matters and doesn't show up in searches. The matter cannot be written
      to. Archive project can be written to when unarchive by matter admin.
    </v-card-subtitle>
    <v-card-text>
      <ListAllTagblesMatter />
    </v-card-text>
  </v-card>
</template>

<script>
import ListAllTagblesMatter from '~/components/matters/matter/settings/tagables/ListAllTagblesMatter'
export default {
  components: { ListAllTagblesMatter },
  mounted() {
    this.$eventHub.$emit(this.$eventBusTypes.setBreadcrumbsMatterSetting, {
      link: false,
      text: 'labels'
    })
  }
}
</script>

<style scoped></style>
