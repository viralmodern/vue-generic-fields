<template>
  <div class="task-list-header--parent">
    <div>
      <div class="task-list-header" v-show="isExpanded">
      <template v-for="attribute in attributes">
        <template v-if="!attribute.hide">
          <div v-ripple
               class="table-view-header-value header--cell"
               :class="{'main_cell_row': attribute.name === mainCellId, [attribute.name]: true}"
               :title="attribute.label"
               :data-column="attribute.name"
               :data-id="attribute.name"
               :style="{width: `${attribute.width}px`}"
               :key="attribute.name">

            <div class="d-flex justify-center fill-height">
              <template v-if="attribute.name === mainCellId">
                <div class="main-header-setting--table d-flex align-center justify-center text-header-cell">
                  #
                </div>
              </template>
              <div class="d-flex align-center w-100 justify-start sort_cell_content"
                   :class="{'has_sort': clnSort(attribute.sort),
                   'justify-center': isStackedColumns(attribute)}">
                <div class="header-cell text-uppercase pl-2 font-weight-bold text-header-cell"
                     :class="{'pl-4': attribute.name === mainCellId}">
                  {{attribute.label}}  <sup>{{attribute['sortIndexLabel']}}</sup>
                </div>
                <div class="mx-1"></div>
                <v-btn @click="sortField(attribute)"
                       x-small
                       icon
                       class="btn_sort_icon"
                       :class="{'sort-down-field': attribute.sort === 'DOWN'}">
                  <v-icon x-small
                          :color="`${attribute.sort ? 'primary': ''}`"
                          class="cursor--pointer">
                    mdi-arrow-up
                  </v-icon>
                </v-btn>
              </div>
              <div class="resize-handle">
                <div class="resize-handle--content w-100 fill-height"></div>
              </div>
            </div>
          </div>
        </template>
      </template>
      <div v-if="!disabledAddNewColumn" v-ripple
           class="cursor--pointer d-flex align-center justify-center header--cell"
           style="width: 60px">
        <div>
          <v-btn icon x-small
                 title="Add a column"
                 color="primary"
                 text
                 depressed>
            <v-icon>
              mdi-plus-circle
            </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import GroupByHeaderBase from "../attributes/headers/GroupByHeaderBase"
  import { SORT_TYPE } from "../configs/attribute"
  import mxBaseHeaderSlickGrid from "~/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxBaseHeaderSlickGrid"
  import { $$labelByName } from "~/sat-vue-toolkit/functions"

  export default {
    name: "HeaderTableView",
    components: { GroupByHeaderBase },
    mixins: [mxBaseHeaderSlickGrid],

    methods: {
      sortField (attribute) {
        let sortType, isSort
        if (attribute.sort === SORT_TYPE.DEFAULT.TYPE) {
          sortType = SORT_TYPE.UP.TYPE
          isSort = true
        } else if (attribute.sort === SORT_TYPE.UP.TYPE) {
          sortType = SORT_TYPE.DOWN.TYPE
          isSort = true
        } else if (attribute.sort === SORT_TYPE.DOWN.TYPE) {
          sortType = SORT_TYPE.DEFAULT.TYPE
          isSort = false
        } else {
          sortType = SORT_TYPE.UP.TYPE
          isSort = true
        }
        let name = attribute.name
        this.$emit("sort-field", { item: { sortType, name }, isSort })
      },
      clnSort (sortType) {
        return sortType === SORT_TYPE.UP.TYPE || sortType === SORT_TYPE.DOWN.TYPE
      }
    },
    filters: {
      $$labelByName,
      iconSort (sortType) {
        // mdi-sort-descending
        if (sortType === SORT_TYPE.UP.TYPE) {
          return "mdi-arrow-up"
        } else if (sortType === SORT_TYPE.DOWN.TYPE) {
          return "mdi-arrow-down"
        }
        return "mdi-arrow-up"

      },
      colorSort (sortType) {
        // mdi-sort-descending
        if (sortType === SORT_TYPE.UP.TYPE) {
          return "primary"
        } else if (sortType === SORT_TYPE.DOWN.TYPE) {
          return "primary"
        }
        return "default"
      }
    }
  }
</script>

<style scoped lang="scss">
  .task-list-header--parent {
    position: sticky;
    top: -25px;
    top: -3px;
    z-index: 3;
    padding-left: 14px;
  }
  .task-list-header {
    display: inline-flex;
    position: sticky;
    top: -10px;
    left: 0;
    z-index: 1;

  }
  .header--cell {
    border-right: solid 1px rgba(0, 0, 0, 0.05);
    border-top: solid 1px rgba(0, 0, 0, 0.05);
    border-bottom: solid 1px rgba(0, 0, 0, 0.05);
    padding: 0px 5px;
    position: relative;
    touch-action: pan-x;
    background: #ffffff;
    &:hover {
      .resize-handle {
        opacity: 1;
      }
    }
    &:first-child {
      border-left: solid 1px rgba(0, 0, 0, 0.05);
    }
    &:last-child {
      padding-right: 0px;
    }
    &.main_cell_row {
      position: sticky;
      left: 0;
      background: rgba(255, 255, 255, 0.8);
      padding-left: 44px;
    }
  }

  .header-cell {
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize !important;
    text-align: left;
    white-space: normal;
    font-size: 12px;
  }
  .text-header-cell {
    font-size: 10px;
  }
  .main-header-setting--table {
    width: 44px;
    width: 49px;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0;
    border-right: solid 1px rgba(0, 0, 0, 0.05);

  }
  .theme--dark {
    .header--cell {
      background: rgba(30, 30, 30, 0.8);
      border-color: rgba(255, 255, 255, 0.1);
    }
    .main-header-setting--table {
      border-color: rgba(255, 255, 255, 0.1);
    }
  }
</style>
