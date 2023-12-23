<template>
  <div>
    <template v-for="(dd, index) in combinedRowsData">
      <keep-alive>
        <div class="task-list-group px-0">
          <component :is="headerLayout"
                     :attributes="fieldsConfig"
                     :isGrouped="!isUngroup"
                     :groupType="groupType"
                     :disabledAddNewColumn="disabledAddNewColumn"
                     :childInfo="index"
                     titleUngroup="Un Group"
                     :labelUnGroup="labelUnGroup"
                     :countLabelMany="countLabelMany"
                     :countLabelSingular="countLabelSingular"
                     :list="groupItems"
                     :noGroup="noGroup"
                     :hideAttributes="false"
                     :isExpanded="getExpandGroup(index)"
                     @collapse="onCollapse(index)"
                     @sort-field="sortField"
                     @show-context="showContext"
                     @setRuleFilterField="setRuleFilterField"
                     :mainCellId="mainCellId"
                     :totalTask="dd | $$totalTask"
                     :totalTaskServer="dd | $$totalTaskServer"/>
          <div v-show="getExpandGroup(index)" class="task-list-group--body">
              <draggable class="list-group"
                       draggable=".drag-item"
                       handle=".drag-handle"
                       ref="draggableData"
                       @end="(evt) => orderRow(evt, $$results(dd), index)"
                       group="a">
              <template v-for="(item, rowIndex) in $$results(dd)">
                <keep-alive>
                  <component class="drag-item"
                             :is="rowLayout"
                             :isOffline="isOffline"
                             :id="item | $$keyRow"
                             :userAccount="userAccount"
                             :disabledOwnerRow="disabledOwnerRow"
                             :ownerName="creatorName"
                             :pathLink="pathLinkRowDetail"
                             :countLabelMany="countLabelMany"
                             :countLabelSingular="countLabelSingular"
                             :item="item"
                             :uniqueId="uniqueId"
                             :rowIndex="rowIndex + 1"
                             :groupByItem="index"
                             :busEventName="busEventName"
                             :busEventLoadRow="busEventLoadRow"
                             :busEventUpdateRow="busEventUpdateRow"
                             :busEventDeletedRow="busEventDeletedRow"
                             :busEventHoverCell="busEventHoverCell"
                             :mainCellId="mainCellId"
                             :disabledVoteRow="disabledVoteRow"
                             :hasReportRow="hasReportRow"
                             :disabledAddNewColumn="disabledAddNewColumn"
                             :disabled-bookmark-row="disabledBookmarkRow"
                             :noLinkDetail="noLinkDetail"
                             @clickRowDetail="row => clickRow(row, index)"
                             :endPoint="`${endPoint}${item[uniqueId]}/`"
                             :pinned-row="pinnedRow"
                             :pinned-row-id="pinnedRowId"
                             :attributes="fieldsConfig"/>
                </keep-alive>
              </template>
            </draggable>
          </div>
          <div v-show="getExpandGroup(index)" class="task-list-group--footer">
            <template v-if="showQuickAddRow">
              <CreateNewRowGrid/>
            </template>
            <template v-if="!disabledAddNewRow">
              <template v-if="uiShowAddRowModal">
                <LinkAddRowModal :count-label-singular="countLabelSingular"
                                 @click="showAddRowModal(index)"/>
              </template>
            </template>
            <template v-if="showPagination">
              <PaginationGrid :loading="loading"
                              :options="dd"
                              @change="paginate"/>
            </template>
          </div>
        </div>
      </keep-alive>
    </template>

  </div>
</template>

<script>
  import baseViewProps from "../configs/props/baseViewProps"
  import { layoutMixin } from "./mixins/mxCoreLayout"
  import draggable from "vuedraggable"
  import { LAYOUT_TYPES } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"
  export default {
    name: "BaseKanbanView",
    props: {
      ...baseViewProps
    },
    data() {
      return {
        headerLayout: LAYOUT_TYPES.COLUMNS.HEADER_LAYOUT,
        rowLayout: LAYOUT_TYPES.COLUMNS.ROW_LAYOUT,
      }
    },
    components: {
      BaseHeaderColumnsItem:() => import("~/sat-vue-toolkit/components/slick-grid/headers/BaseHeaderColumnsItem"),
      BaseRowColumnsItem: () => import("~/sat-vue-toolkit/components/slick-grid/rows/BaseRowColumnsItem"),
      PaginationGrid: () => import("~/sat-vue-toolkit/components/slick-grid/attributes/PaginationGrid"),
      LinkAddRowModal: () => import("~/sat-vue-toolkit/components/slick-grid/attributes/LinkAddRowModal"),
      CreateNewRowGrid: () => import("~/sat-vue-toolkit/components/slick-grid/attributes/CreateNewRowGrid"),
      draggable
    },
    mixins: [layoutMixin]
  }
</script>

<style scoped lang="scss">
  .theme--dark {
    .dashboard-table-scroll_body {
      &.base_columns {
        .task-list-group {
          .task-list-group--body {
            background: transparent;
          }
        }
      }
    }
  }
</style>

