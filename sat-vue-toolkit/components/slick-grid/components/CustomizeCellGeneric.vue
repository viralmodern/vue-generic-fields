<template>
  <BaseFieldGeneric :attribute="attribute"
                    :main-cell-id="mainCellId"
                    @sort-field="sortField">
    <template
      #default="{
      isMainCellId,
      isPinned,
      hasSort,
      isHide,
      attributeWidth,
      attributeLabel,
      attributeName,
      sortField,
      sortIndexLabel,
      isSortDown,
      faviconLink,
      getClassCell,
    }">
      <div class="gird-virtual-list--cell" v-ripple
           :data-column="attributeName"
           :data-id="attributeName"
           :class="{'main_cell_row': isMainCellId, [attributeName]: true}"
           :style="{width: `${attributeWidth}px`}">
        <template v-if="isMainCellId">
          <div class="main-cell-setting--table d-flex align-center px-1">
            <div class="task-row-index caption text-center">
              <div class="task-row-counter">
                <slot name="row-index">
                  <!--                {{rowIndex}}-->
                </slot>
              </div>
              <div class="task-row-selected"
                   :class="{'task-row-selected--active': rowSelected}"
                   @click="clickRowSelected">
                <v-icon small :color="rowSelected ? 'primary' : ''">
                  {{rowSelected ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'}}
                </v-icon>
              </div>
              <div class="task-row-draggable"
                   title="Open Entry"
                   @click="clickRowDetail">
                <v-icon small>
                  mdi-open-in-new
                </v-icon>
              </div>
            </div>
            <div v-if="isOwnerRow" class="task-row-actions">
              <slot name="task-row-actions"></slot>
            </div>
          </div>
        </template>
        <div class="item--cell caption"
             :class="getClassCell">
          <template v-if="isMainCellId">
            <slot name="vote-row"></slot>
            <slot name="report-row"></slot>
            <template v-if="faviconLink">
              <slot name="faviconLink"></slot>
            </template>
          </template>
          <slot>

          </slot>
          <template v-if="faviconLink && !isMainCellId">
            <slot name="faviconLinkCell"></slot>
          </template>
        </div>
        <template v-if="isMainCellId">
          <slot name="link-detail"></slot>
          <slot name="pinned-row"></slot>
          <slot name="bookmark-row"></slot>
        </template>
      </div>
    </template>
  </BaseFieldGeneric>
</template>

<script>
  import { BaseFieldGeneric } from "./BaseFieldGeneric"

  export default {
    name: "CustomizeCellGeneric",
    props: {
      attribute: {
        type: Object,
        default: () => ({})
      },
      mainCellId: {
        type: String,
        default: () => ''
      },
      rowSelected: {
        type: Boolean,
        default: () => false
      },
      isOwnerRow: {
        type: Boolean,
        default: () => false
      },
    },
    components: {
      BaseFieldGeneric
    },
    methods: {
      sortField() {

      },
      clickRowSelected() {
        this.$emit('selectedRow')
      },
      clickRowDetail() {
        this.$emit('clickRowDetail')
      }
    },

  }
</script>

<style scoped>

</style>
