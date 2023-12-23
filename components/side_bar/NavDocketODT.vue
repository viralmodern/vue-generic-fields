<template>
  <div>
    <v-list shaped dense>
      <draggable
        class="list-group-panel"
        draggable=".draggable-item"
        handle=".drag-handle-draggable"
        group="a"
        v-model="myList"
      >
        <template v-for="(item, i) in myList">
          <template v-if="item.children">
            <v-list-group
              :data-drag="JSON.stringify(item)"
              :data-order="item.order"
              class="sub-group-header draggable-item"
              no-action
              :prepend-icon="item.icon"
              value="true"
            >
              <template v-slot:prependIcon>
                <v-icon small>{{ item.icon }}</v-icon>
              </template>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize caption"
                    >{{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action class="drag-handle-draggable my-0">
                  <v-btn icon small>
                    <v-icon small> mdi-drag-vertical</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
              <template v-for="(child, i) in item.children">
                <v-list-item v-if="!child.hide" :key="child.to" :to="child.to">
                  <v-list-item-icon class="mr-2">
                    <v-icon small>{{ child.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-capitalize"
                      v-text="child.text"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>
          </template>
          <v-list-item
            class="draggable-item"
            :data-drag="JSON.stringify(item)"
            :data-order="item.order"
            v-else
            active-class="primary--text"
            :class="`link_odt_${item.text}`"
            :to="item.to"
            :key="i"
          >
            <v-list-item-icon class="mr-2">
              <v-icon small v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="text-capitalize caption"
                v-text="item.text"
              ></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="drag-handle-draggable my-0">
              <v-btn icon small>
                <v-icon small>mdi-drag-vertical</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </draggable>
      <PublicTrackersThumbnail />
    </v-list>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import PublicTrackersThumbnail from '~/features/odt/PublicTrackersThumbnail'
export default {
  name: 'NavDocketODT',
  components: {
    PublicTrackersThumbnail,
    draggable,
  },
  computed: {
    myList: {
      get() {
        return this.$store.getters['userSettings/linksOdt']
      },
      set(value) {
        let options = { navOdt: value }
        this.$store.dispatch('userSettings/updateSettingsOptionsUser', options)
      },
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped></style>
<style lang="scss">
.draggable-item {
  &:hover {
    .drag-handle-draggable {
      opacity: 1;
    }
  }
}
.drag-handle-draggable {
  opacity: 0;
  cursor: move !important;
  * {
    cursor: move !important;
  }
}
.v-application--is-ltr .v-list-group--no-action {
  &.sub-group-header {
    .v-list-group__header {
      .v-list-group__header__prepend-icon {
        margin-right: 10px;
      }
    }

    .v-list-group__items {
      .v-list-item {
        padding-left: 47px;
      }
    }
  }
}
</style>
