<template>
  <v-card
    tile
    :max-height="height"
    v-bind="vBind || {}"
    min-height="100px"
    class="overflow-y-auto"
  >
    <v-list dense subheader>
      <v-subheader>
        Files Document ({{ list.length }})
        <v-spacer />
        <!-- <v-btn icon x-small
               style="z-index: 3;"
               @click="smallLeft">
          <v-icon x-small>
            {{uiShowList ? `mdi-chevron-double-left`: `mdi-chevron-double-right`}}
          </v-icon>
        </v-btn>-->
      </v-subheader>
      <template v-for="(file, index) in list">
        <v-divider v-if="index !== 0" />
        <v-list-item
          active-class="primary--text"
          dense
          :to="`${rootPath}/${file.pk}`"
          :key="index"
        >
          <v-list-item-content v-html="file.file" class="caption">
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import faker from 'faker'

const countFiles = 10
export default {
  name: 'FileListOdt',
  props: {
    vBind: {
      type: Object,
      default: () => ({}),
    },
    rootPath: {
      type: String,
      default: () => '/',
    },
    countFiles: {
      type: Number,
      default: () => countFiles,
    },
    list: {
      type: Array,
      default: () => {
        let list = []
        for (let i = 0; i < countFiles; i++) {
          let file = `${faker.name.findName()}.pdf`
          let pk = `doc-${i}`
          list.push({ file, pk })
        }
        return list
      },
    },
    height: {
      type: String,
      default: () => '55vh',
    },
  },
  data() {
    return {
      uiShowList: true,
    }
  },
  methods: {
    smallLeft() {
      this.uiShowList = !this.uiShowList
      this.$emit('collapse')
    },
  },
}
</script>

<style scoped></style>
