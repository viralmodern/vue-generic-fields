<template>
  <DrawerPicker v-model="uiShowModal" width="75%">
    <template v-slot:header>
      <div class="d-flex align-center">
        <p class="caption d-flex align-center ma-0" v-if="publicTrackerDetail">
          <v-icon small left>mdi-filter</v-icon> {{ labelTracker.name }}
        </p>
        <p class="caption d-flex align-center ma-0" v-if="docketNumber">
          <v-icon small class="mx-2">mdi-chevron-double-right</v-icon>
          {{ labelLink }}
        </p>
        <v-spacer />
      </div>
    </template>
    <slot>
      <div class="fill-height">
        <SearchBuilderDocketTrackerOdt :is-docket="docketNumber" />
      </div>
    </slot>
    <template v-slot:footer>
      <div class="d-flex">
        <v-spacer />
        <v-btn color="primary" class="caption text-capitalize" rounded>
          Apply
        </v-btn>
      </div>
    </template>
  </DrawerPicker>
</template>

<script>
import DrawerPicker from '@/components/utils/DrawerPicker.vue'
import SearchBuilderDocketTrackerOdt from '~/features/odt/SearchBuilderDocketTrackerOdt.vue'
import SearchInput from '~/components/utils/SearchInput.vue'
import { docketTrackerMixin } from '~/features/odt/mixins/mxDocketOdt'

export default {
  name: 'ThePanelSearchInsideDocket',
  components: { SearchInput, SearchBuilderDocketTrackerOdt, DrawerPicker },
  mixins: [docketTrackerMixin],
  data() {
    return {
      uiShowModal: false,
    }
  },
  events: {
    $openSearchPanel(evt, data) {
      this.uiShowModal = true
    },
  },
}
</script>

<style scoped></style>
