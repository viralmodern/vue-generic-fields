<template>
  <v-container fluid>
    <div>
      <div class="content-filter-entries d-flex">
        <v-card flat height="78vh" class="background-transparent">
          <ThePanelResizableBase label="Entries Actions">
            <ContentPanelTrackerUserActions :row="row" />
          </ThePanelResizableBase>
        </v-card>
        <div class="mx-1"></div>
        <v-card width="55%" flat style="flex: 1" class="background-transparent">
          <nuxt-child />
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import ThePanelResizableBase from '~/features/odt/ThePanelResizableBase'
import ContentPanelTrackerUserActions from '~/features/odt/ContentPanelTrackerUserActions'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { docketDetail } from '~/features/odt/store/docketOdtDetail'
export default {
  components: {
    TopBarOfTableOdt,
    ContentPanelTrackerUserActions,
    ThePanelResizableBase,
  },
  computed: {
    row() {
      return docketDetail.data
    },
  },
}
</script>

<style scoped lang="scss">
.content-filter-entries {
  overflow: hidden;
  overflow-x: auto;
}
</style>
