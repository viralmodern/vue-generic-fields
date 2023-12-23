<template>
  <div class="d-flex align-center">
    <slot :on="{ click }">
      <v-btn
        @click="click"
        depressed
        small
        active-class="primary--text"
        :input-value="true"
        class="text-capitalize caption"
      >
        Add Sub
        <v-icon right>mdi-plus</v-icon>
      </v-btn>
    </slot>
  </div>
</template>

<script>
import { EVENTS_NAME } from '~/features/odt/generic/genericCore'
import { fieldsGeneric } from '~/features/odt/generic/fieldsGeneric'

export default {
  name: 'LinkCreateSubItemGeneric',
  props: {
    pageId: {
      type: [String, Number, Boolean],
      default: () => '',
    },
  },
  computed: {
    attributes() {
      return [
        {
          ...fieldsGeneric.name,
          label: 'Sub Name',
          required: true,
        },
      ]
    },
    configsCreateNewSub() {
      let { attributes } = this
      return {
        attributes,
        busEventName: EVENTS_NAME.CREATE_SUB,
        countLabelSingular: 'Sub',
        isOffline: true,
        disableAddNewToMany: true,
      }
    },
  },
  methods: {
    click(e) {
      e.preventDefault()
      let { pageId, configsCreateNewSub } = this
      if (pageId) {
        this.$trigger('uiShowAttributeModalCreateNew', {
          ...configsCreateNewSub,
        })
      }
      e.stopPropagation()
    },
  },
}
</script>

<style scoped></style>
