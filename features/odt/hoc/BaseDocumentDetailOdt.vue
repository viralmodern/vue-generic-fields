<template>
  <ThePanelsDraggable
    :height="height"
    draggable=".panel-item"
    handle=".drag-handler-icon"
  >
    <template v-for="panel in panels">
      <div class="panel-item" :key="panel.uuidField">
        <ThePanelResizableBase
          height="68vh"
          :dark="true"
          :color="panel.color"
          :label="panel.label"
        >
          <slot :name="panel.name"> </slot>
        </ThePanelResizableBase>
      </div>
    </template>
  </ThePanelsDraggable>
</template>

<script>
import ThePanelsDraggable from '~/features/odt/ThePanelsDraggable'
import ThePanelResizableBase from '~/features/odt/ThePanelResizableBase'
import TextViewODT from '~/features/odt/TextViewODT'

export default {
  name: 'BaseDocumentDetailOdt',
  components: { TextViewODT, ThePanelResizableBase, ThePanelsDraggable },
  props: {
    height: {
      default: () => '70vh',
    },
    text: {},
  },
  computed: {
    panels() {
      return this.$store.getters['uiDocumentDetailOdt/panels'].filter(
        (p) => !p.hide
      )
    },
    rootPath() {
      // @kenz2e
      let {
        params: { docket, entry, document },
      } = this.$route
      return `${this.$$rootPathDocketOdt}/${docket}/${entry}/document/${document}`
    },
  },
  methods: {
    onSelection(content) {
      this.$router.push({
        path: `${this.rootPath}/search`,
        query: { q: content },
      })
    },
  },
}
</script>

<style scoped></style>
