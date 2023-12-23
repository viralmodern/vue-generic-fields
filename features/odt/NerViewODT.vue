<template>
  <v-card tile flat class="box_content_ner pa-2">
    <div class="text-content-ner show-all" v-html="content"></div>
  </v-card>
</template>

<script>
export default {
  name: 'NerViewODT',
  props: {
    content: {
      default: () => '',
    },
  },
}
</script>
<style lang="scss">
pre {
  word-break: break-all;
  white-space: pre-wrap;
}
.text-content-ner {
  &:not(.show-all) {
    mark.entity {
      &:not(.active-entity) {
        background: transparent !important;
        & > span {
          display: none;
        }
      }
    }
  }
}

mark.entity.active-entity {
  /*border: solid 1px red;*/
}
</style>
<style scoped lang="scss">
.box_content_ner {
  border: solid 1px rgba(0, 0, 0, 0.05);
}
</style>
