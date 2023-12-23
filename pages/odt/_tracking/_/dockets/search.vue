<template>
  <v-container fluid>
    <GridSearchResultsDocketsOdt
      :docket-id="docketId"
      height="83vh"
      :includes-attributes="attributes"
    />
  </v-container>
</template>

<script>
import GridSearchResultsDocketsOdt from '~/features/odt/GridSearchResultsDocketsOdt'
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
export default {
  components: { GridSearchResultsDocketsOdt },
  computed: {
    docketId() {
      return 16974501
    },
    attributes() {
      if (!this.$$isTrackerDocketsOdt) return []
      return [
        {
          name: 'case_name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'docket_number',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
      ]
    },
  },
  mounted() {},
}
</script>

<style scoped></style>
