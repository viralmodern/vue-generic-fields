<template>
  <BaseFieldGeneric :attribute="attribute"
                    :main-cell-id="mainCellId"
                    @sort-field="sortField"
                    @show-context="showContext" @setRuleFilterField="setRuleFilterField">
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
      showContext,
      clickFieldSetting,
      clickFieldFilter,
      strFieldId,
      sortIndexLabel,
      isSortDown,
      operationsField
    }">
      <div class="table-view-header-value header--cell"
           :class="{'main_cell_row': isMainCellId, [attributeName]: true}"
           :title="attributeLabel"
           :data-column="attributeName"
           :data-id="attributeName"
           :id="strFieldId"
           :style="{width: `${attributeWidth}px`}">

        <div class="d-flex justify-center name-content-field">
          <template v-if="isMainCellId">
            <div class="main-header-setting--table d-flex align-center justify-center text-header-cell">
              #
            </div>
          </template>
          <div class="d-flex align-center w-100 justify-start sort_cell_content"
               :class="{'has_sort': hasSort}">
            <div class="header-cell pl-2 font-weight-bold text-header-cell"
                 :class="{'pl-4': isMainCellId}">
              {{attributeLabel}} <sup>{{sortIndexLabel}}</sup>
            </div>
            <div class="mx-1"></div>
            <!--Sort field-->
            <v-btn @click="sortField"
                   x-small
                   icon
                   class="btn_sort_icon"
                   :class="{'sort-down-field': isSortDown}">
              <v-icon x-small
                      :color="`${hasSort ? 'primary': ''}`"
                      class="cursor--pointer">
                mdi-arrow-up
              </v-icon>
            </v-btn>
            <!--Setting field-->
            <v-btn x-small
                   icon
                   class="btn_setting_icon"
                   @click="clickFieldSetting">
              <v-icon small>mdi-dots-vertical</v-icon>
            </v-btn>
            <!--Filter field-->
          </div>
          <div class="resize-handle">
            <div class="resize-handle--content w-100 fill-height"></div>
          </div>
        </div>
        <template v-if="!disabledFilterRow">
          <div class="filter-content-field" ref="xyt">
            <div class="header-cell pl-2 pr-2" :class="{'pl-4': isMainCellId}">
              <div class="d-flex align-center">
                <slot name="filter-cell" :attributeLabel="attributeLabel"></slot>
                <div class="overflow-x-hidden flex-grow-1">
                  <FilterPanelOfFieldGeneric :operations="operationsField"/>
                </div>
                <v-btn x-small
                       icon
                       @click="showContext">
                  <v-icon small>mdi-filter</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </BaseFieldGeneric>
</template>

<script>
  import { BaseFieldGeneric } from "./BaseFieldGeneric"
  import FilterPanelOfFieldGeneric from "~/sat-vue-toolkit/components/slick-grid/components/FilterPanelOfFieldGeneric"

  export default {
    name: "CustomizeFieldGeneric",
    props: {
      attribute: {
        type: Object,
        default: () => ({})
      },
      mainCellId: {
        type: String,
        default: () => ""
      },
      disabledFilterRow: {
        type: Boolean,
        default: () => false
      }

    },
    components: {
      FilterPanelOfFieldGeneric,
      BaseFieldGeneric
    },
    methods: {
      sortField (data) {
        this.$emit("sort-field", data)
      },
      showContext(data) {
        this.$emit("show-context", data)
      },
      setRuleFilterField(data) {
        this.$emit("setRuleFilterField", data)
      },

    }
  }
</script>

<style scoped lang="scss">

  .header--cell {
    .btn_setting_icon {
      opacity: 0;
      visibility: hidden;
      margin-right: 5px;
    }

    &:hover {
      .btn_setting_icon, .btn_sort_icon {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .name-content-field {
    /*border: solid 1px red;*/
    padding: 5px 0px;
  }

  .filter-content-field {
    border-top: $border-light-color;
  }

  .theme--dark {
    .filter-content-field {
      border-top: $border-dark-color;
    }
  }
</style>
