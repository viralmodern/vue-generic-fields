<template>
  <div>
    <div class="overflow-hidden overflow-x-auto d-flex">
      <v-card flat height="78vh">
        <ThePanelResizableBase label="Opinions Actions">
          <ContentPanelOpinionsActionsOfJurisdiction />
        </ThePanelResizableBase>
      </v-card>
      <div class="mx-1"></div>
      <v-card width="55%" flat style="flex: 1">
        <GridAllOpinionsOfJurisdiction height="72vh" />
      </v-card>
    </div>
  </div>
</template>

<script>
import GridAllOpinionsOfJurisdiction from '~/features/odt/GridAllOpinionsOfJurisdiction'
import ThePanelResizableBase from '~/features/odt/ThePanelResizableBase'
import ContentPanelOpinionsActionsOfJurisdiction from '~/features/odt/ContentPanelOpinionsActionsOfJurisdiction'

export default {
  components: {
    ContentPanelOpinionsActionsOfJurisdiction,
    ThePanelResizableBase,
    GridAllOpinionsOfJurisdiction,
  },
}
</script>

<style scoped></style>
