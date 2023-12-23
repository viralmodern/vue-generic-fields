<template>
  <div>
    <v-card flat>
      <v-card-text>
        <p>Pages</p>
        <v-treeview
          dense
          hoverable
          activatable
          ref="treeModel"
          :active.sync="active"
          :items="pages"
          item-key="id"
        >
          <template v-slot:prepend="{ item, open }">
            <v-icon>
              <template v-if="item.children.length">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </template>
              <template v-else> mdi-file-document-outline</template>
            </v-icon>
          </template>
          <template v-slot:label="{ item, open }">
            <div class="d-flex align-center label-tree-item">
              {{ item.name }}
              <div class="flex-grow-1"></div>
              <div class="action-tree-item">
                <v-btn x-small icon @click="openFormAddPage($event, item.id)">
                  <v-icon small>mdi-plus</v-icon>
                </v-btn>
                <v-btn
                  x-small
                  icon
                  @click="onHandleSetting($event, `edit-${item.id}`)"
                  :id="`edit-${item.id}`"
                >
                  <v-icon small> mdi-dots-vertical</v-icon>
                </v-btn>
              </div>
            </div>
          </template>
        </v-treeview>
        <p></p>
        <LinkAddPageGeneric @click="openFormAddPage" />
        <v-menu
          v-model="uiShowSettingMenu"
          absolute
          v-bind="activatorNodeId"
          close-on-content-click
        >
          <v-card>
            <v-list dense>
              <v-subheader> Page Options</v-subheader>
              <template v-for="action in actionsPage">
                <v-list-item dense v-on="action.on">
                  <v-list-item-icon class="mr-1">
                    <v-icon small :color="action.color">
                      {{ action.icon }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ action.label }}
                  </v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-menu>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { SETTINGS } from '~/features/odt/helpers/odt.json'
import LinkAddPageGeneric from './LinkAddPageGeneric'
import { EVENTS_NAME } from './genericCore'
import { fieldsGeneric } from '~/features/odt/generic/fieldsGeneric'

let { RENAME, MOVE_PAGE, DELETE, ADD } = SETTINGS
export default {
  name: 'TreeGeneric',
  components: { LinkAddPageGeneric },
  props: {
    pages: {
      type: Array,
      default: () => [],
    },
    selectionPageId: {},
  },
  data() {
    return {
      tree: [],
      selection: [],
      uiShowSettingMenu: false,
      activatorNodeId: null,
      strSelectedPageId: null,
    }
  },
  computed: {
    active: {
      get() {
        let { selectionPageId } = this
        return selectionPageId ? [selectionPageId] : []
      },
      async set(v) {
        let selectedPageId = v[0]
        // if (Boolean(selectedPageId)) {
        this.$trigger(EVENTS_NAME.SELECTED_PAGE, selectedPageId)
        this.updateTree()
        // }
      },
    },
    actionsPage() {
      return [
        {
          ...RENAME,
          color: '',
        },
        {
          ...ADD,
          color: '',
          label: 'Add Page',
        },
        {
          ...MOVE_PAGE,
          color: '',
        },
        {
          ...DELETE,
          on: {
            click: this.deletePage,
          },
        },
      ]
    },
    attributesPage() {
      return [
        {
          ...fieldsGeneric.name,
          label: 'Page Name',
          required: true,
        },
      ]
    },
    configsCreateNewPage() {
      let { attributesPage } = this
      return {
        attributes: attributesPage,
        busEventName: EVENTS_NAME.ADD_PAGE,
        countLabelSingular: 'Page',
        isOffline: true,
        disableAddNewToMany: true,
      }
    },
  },
  methods: {
    async openFormAddPage(evt, nodeId) {
      evt.preventDefault()
      let { configsCreateNewPage } = this
      if (nodeId) {
        await this.$trigger(EVENTS_NAME.SELECTED_PAGE, nodeId, true)
      }
      this.$trigger('uiShowAttributeModalCreateNew', {
        ...configsCreateNewPage,
      })
      // this.updateTree()
      evt.stopPropagation()
    },
    onHandleSetting(evt, id) {
      evt.preventDefault()
      this.strSelectedPageId = `#${id}`
      this.show(evt, `#${id}`)
      // evt.stopPropagation()
    },
    async deletePage(evt) {
      evt.preventDefault()
      let { strSelectedPageId } = this
      let nodeId = strSelectedPageId.replace('#edit-', '')
      this.$trigger(EVENTS_NAME.DELETE_PAGE, nodeId)
      // this.updateTree()
      evt.stopPropagation()
    },
    updateTree() {
      try {
        // this.$refs.treeModel.updateAll()
        this.$refs.treeModel.updateAll(true)
      } catch (e) {
        console.log(e.message)
      }
    },
    show(e, id) {
      this.uiShowSettingMenu = false
      this.activatorNodeId = {
        positionX: e.clientX,
        positionY: e.clientY,
      }
      this.$nextTick(() => {
        this.uiShowSettingMenu = true
      })
    },
  },
}
</script>

<style scoped lang="scss">
.label-tree-item {
  .action-tree-item {
    opacity: 0;
  }

  &:hover {
    .action-tree-item {
      opacity: 1;
    }
  }
}
</style>
