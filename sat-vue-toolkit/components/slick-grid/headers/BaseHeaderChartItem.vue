<template>
  <div class="task-list-header--parent d-flex align-center flex-wrap">
    <div class="main_group_control d-flex text-left">
      <div class="header--row--action">
        <v-btn icon :outlined="false" x-small @click.stop="clickCollapse"
               :color="itemStatus | colorStatusLabel">
          <v-icon small :color="itemStatus | colorStatusLabel">
            <template v-if="isExpanded">
              mdi-chevron-double-down
            </template>
            <template v-else>
              mdi-chevron-double-right
            </template>
          </v-icon>
        </v-btn>
      </div>
      <div class="mx-1"></div>
      <div class="header--row--main">
        <keep-alive>
          <slot name="main-group-by" v-show="isGrouped">
            <GroupByHeaderBase :group-type="groupType"
                               :attributeType="getAttributeType"
                               :list="getAttributeList"
                               :info="childInfo"/>
          </slot>
        </keep-alive>
        <div>
          <v-chip small label v-if="totalTask">
            <strong>
              {{`${totalTask} ${isManyTask ? countLabelMany : countLabelSingular}`}}
            </strong>
          </v-chip>
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
    name: "BaseHeaderChartItem",
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

<style lang="scss">
  .chip-header.v-chip .v-chip__content {
    display: flex;
  }
</style>
<style scoped lang="scss">
  .main_group_control {
    position: sticky;
    left: 0px;
    min-height: 25px;
  }

  .task-list-header {
    display: inline-flex;
    flex-grow: 1;
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: -10px;
    left: 0;
    z-index: 1;
    height: auto;
    border-bottom: solid 1px rgba(0, 0, 0, 0.05);

    &.theme--dark {
      border-bottom-color: rgba(255, 255, 255, 0.5);
      border-top: solid 1px rgba(255, 255, 255, 0.5);
    }
  }

  .header--row--action {
    transition: opacity .2s cubic-bezier(.785, .135, .15, .86) 0s;
    width: 20px;
    left: -25px;
    bottom: 0px;
  }

  .header--row--main {
    flex-grow: 1;
    left: 0;
    z-index: 1;
    min-width: 350px;
    display: flex;
    align-items: flex-end;
    padding: 0px 0px 0px 0px;
  }

  .header--row--fields {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  .header--row--settings {
    display: flex;
    justify-content: flex-end;
    width: 74px;
    padding-right: 15px;
    flex-shrink: 0;
    position: absolute;
    right: 0px;
    right: 0px;
  }

  .header--cell {
    padding: 0 1px;
    border-right: solid 1px rgba(0, 0, 0, 0.05);
    border-top: solid 1px rgba(0, 0, 0, 0.05);
    /*border-color: red;*/
    /*border: solid 1px red;*/
    padding: 5px 5px;
    /*border: solid 1px red !important;*/
    position: relative;
    touch-action: pan-x;

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

    &:hover {

    }

    &.main_cell_row {
      position: sticky;
      left: 0;
      background: rgba(255, 255, 255, 0.8);
    }
  }

  .theme--dark {
    .header--cell {
      background: rgba(30, 30, 30, 0.8);
      border-right-color: rgba(255, 255, 255, 0.5);
      border-left: solid 1px rgba(255, 255, 255, 0.5);
    }
  }

  .header-cell {
    /*border: solid 1px red;*/
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /*flex-grow: 1;*/
    text-align: center;

    /*font-size: 12px !important;*/
    /*line-height: 1.3em;*/
    text-transform: capitalize !important;
    text-align: left;
    white-space: normal;
    /*color: rgba(0,0,0,.6);*/
  }

</style>
