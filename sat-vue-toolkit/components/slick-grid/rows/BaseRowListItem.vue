<template>
  <div :id="`item-list-${id}`" class="row_list_item">
    <div class="d-flex row--container">
      <div class="gird-virtual-list--row--parent">
        <div class="gird-virtual-list--row">
          <div class="drag-handle drag-row-outside">
            <v-icon>
              mdi-drag-vertical
            </v-icon>
          </div>
          <v-card flat class="cell--pr d-flex" tile>
            <template v-for="attribute in attributesInList">
                <template v-if="!attribute.hide">
                    <div class="gird-virtual-list--cell"
                         :key="`${id}-${attribute.name}-row`"
                         v-ripple
                         :data-column="attribute.name"
                         :data-id="attribute.name"
                         :class="{'main_cell_row': attribute.name === mainCellId, [attribute.name]: true, ['field_'+attribute.type]: true}">
                      <template v-if="attribute['name'] === mainCellId">
                        <div class="main-cell-setting--table d-flex align-center px-1">
                          <div class="task-row-index caption text-center">
                            <div class="task-row-counter">
                              {{rowIndex}}
                            </div>
                            <div class="task-row-draggable"
                                 title="Detail" @click="$emit('clickRowDetail', item)">
                              <v-icon small>
                                mdi-open-in-new
                              </v-icon>
                            </div>
                          </div>
                          <div v-if="isOwnerRow" class="task-row-actions">
                            <component :is="'ACTIONS' | getCellLayout"
                                       :isOwnerRow="isOwnerRow"
                                       attributeType="ACTIONS"
                                       :readOnly="false"
                                       :actions="actionsRow"
                                       :id="`${id}-actions-cell`"
                                       :cell-pk="`${id}-actions-cell`"></component>
                          </div>
                        </div>
                      </template>
                      <div class="item--cell caption"
                           :class="attribute.type | getClassCell">
                        <template v-if="attribute['name'] === mainCellId">
                          <template v-if="!disabledVoteRow">
                            <Vote :end-point="endPoint"
                                  :total-votes="item.total_votes"
                                  :voted-object="item.voted_object"/>
                          </template>
                          <template v-if="hasReportRow">
                            <Report :end-point="endPoint"
                                    @reported="updateReport"
                                    :total-reports="item.total_reports"
                                    :reported-object="item.reported_object"/>
                            <div class="mx-1"></div>
                          </template>
                        </template>
                        <template v-if="attribute['name'] === mainCellId && attribute['faviconLink']">
                          <FaviconThumbnail :attribute="attribute"
                                            :row="item"/>
                        </template>
                        <slot :name="'item.' + attribute['name']">
                          <component :is="attribute.type | getCellLayout"
                                     :isOffline="isOffline"
                                     :isOwnerRow="isOwnerRow"
                                     :value="item[attribute['name']]"
                                     :attribute="attribute"
                                     :row="item"
                                     showRowTextContent
                                     :uniqueId="uniqueId"
                                     :busEventName="busEventName"
                                     :busEventLoadRow="busEventLoadRow"
                                     :busEventUpdateRow="busEventUpdateRow"
                                     :busEventDeletedRow="busEventDeletedRow"
                                     :busEventHoverCell="busEventHoverCell"
                                     :cellPk="`${id}-${attribute['type']}-cell--${attribute.name}`"
                                     :id="`${id}-${attribute['type']}-cell--${attribute.name}`"
                                     :disabledOwnerRow="disabledOwnerRow"
                                     @updateContent="$$$$$data => updateContent($$$$$data, attribute)"
                                     :endPoint="getEndPoint(attribute)"
                                     :pinned-row="pinnedRow"
                                     :pinned-row-id="pinnedRowId"
                                     class="slot-item-cell cell_list"
                                     :class="{['cell_list--'+attribute.name]: true}"
                                     :title="attribute.label">
                          </component>
                        </slot>
                      </div>
                      <template v-if="attribute['name'] === mainCellId">
                        <div class="d-flex flex-wrap link-main-cell fill-height" v-if="!noLinkDetail">
                          <router-link :to="`${pathLink}/${item[uniqueId]}`"
                                       class="text-decoration-unset d-flex align-center px-2 link-main-cell--link w-100">
                            <v-icon x-small small class="hide_base">mdi-pencil</v-icon>
                          </router-link>
                        </div>
                        <template v-if="pinnedRow">
                          <PinnedEntry :end-point="endPoint"
                                       :row="item"
                                       @pinned="updatePinned"
                                       :session-id="pinnedRowId"
                                       :pinned="item['pinned']"/>
                        </template>
                        <template v-if="!disabledBookmarkRow">
                          <Bookmark :end-point="endPoint"
                                    @bookmarked="updateBookmark"
                                    :bookmarked="item['bookmarked_pk']"/>
                        </template>
                      </template>
                    </div>
<!--                    <v-spacer class="kiop" :key="`${id}-${attribute.name}-spacer`" v-if="attribute['name'] === mainCellId"/>-->
              </template>
            </template>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import mxBaseRowSlickGrid from "~/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxBaseRowSlickGrid"
    import mxCoreSlickGrid from "~/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxCoreSlickGrid"
    import mxPermissionRow from "~/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxPermissionRow"
    export default {
        name: 'BaseRowListItem',
        mixins: [mxCoreSlickGrid, mxBaseRowSlickGrid, mxPermissionRow],
        computed: {
          attributesInList() {
            let {mainCellId, attributes} = this
            function includesList (attribute) {
              return attribute.name == mainCellId || Boolean(attribute.showInList)
            }
            return attributes.filter(includesList)
          },
        },
    }
</script>

<style scoped lang="scss">
  .row_list_item {
    margin-bottom: 8px;
    /*border: solid 1px red;*/
    box-shadow: 2px 2px 5px rgba(0,0,0,0.04);
  }
  .row--container {

  }
  .gird-virtual-list--row--parent {
    padding-left: 34px;
    padding-left: 0px;
    flex-grow: 1;
  }

  .gird-virtual-list--row {
    display: flex;
    align-items: center;
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-left: 1px solid;
    border-right: 1px solid;
    border-color: rgba(0,0,0,0.05);
    position: relative;
    width: 100%;
    min-height: 100%;
    background: #fff;
    &:hover {
      .task-row-index {
        .task-row-counter {
          opacity: 0;
        }
        .task-row-draggable {
          opacity: 1;
        }
      }
      .drag-row-outside {
        opacity: 1;
      }
    }
    .cell--pr {
      flex: 1;
      /*border: solid 1px blue;*/
    }
    .main-cell-setting--table {
      border-right: solid 1px rgba(0, 0, 0, 0.05);
      height: 100%;
      position: relative;
      margin-right: 10px;
    }
    .task-row-index {
      position: relative;
      width: 35px;
      overflow: hidden;
      .task-row-counter {
        position: absolute;
        left: 5px;
      }
      .task-row-draggable {
        border: 1px darkred;
        padding: 0;
        opacity: 0;
        cursor: pointer;
        transform: translateX(-7px);
      }
    }
    .drag-row-outside {
      width: 20px;
      position: absolute;
      left: -18px;
      z-index: 9;
      cursor: move;
      display: flex;
      justify-content: center;
      opacity: 0;
    }
    .task-row-actions {
      position: absolute;
      right: 0px;
    }
  }

  .gird-virtual-list--cell {
    position: relative;
    align-self: stretch;
    display: flex;
    align-items: center;
    overflow: hidden;
    &.main_cell_row {
    }
    &:last-child {
      .item--cell {
      }
    }
  }

  .item--cell {
    padding: 0 5px;
    overflow: hidden;
    align-self: stretch;
    flex: 1;
    display: flex;
    align-items: center;


  }


  .task-row-draggable {


  }
  .task-row-index {
    /*border: solid 1px red;*/
    width: 40px;
  }
  .task-row-main {
    position: sticky;
    display: flex;
    align-items: center;
    min-width: 370px;
    flex-shrink: 1;
    flex-grow: 1;
    left: 0;
    margin: -1px 0;
    z-index: 3;
    transform: translate3d(0, 0, 0);
    border-left: solid 1px;
    /*background: rgba(255, 255, 255, .9);*/
    border-color: rgba(0,0,0,0.05);

    // other
    padding: 10px;
    overflow: hidden;
    margin: 0 0 0 0;
    align-self: stretch;
    &--content {
      /*max-width: 350px;*/
      display: flex;
      align-items: center;
      transition: all 0.2s linear;
      transform: translateX(-55px);
    }
    .vote_row {
      /*border: solid 1px red;*/
    }

  }
  .link_main_cell {
    color: unset;
  }
  .row_list_item {
    &:first-child {
      .gird-virtual-list--row {
        &.theme--dark {
          border-top: solid 1px rgba(255,255,255,0.05);
        }
      }
    }
  }
  .drag-row-icon {
    /*border: solid 1px red;*/

  }
</style>

<style lang="scss">
  .dashboard-table-scroll_body  {
    &.base_list {
      padding: 0 14px;
    }
  }
  .field_HEATMAP {
    /*min-width: 120px;*/
  }
  .row_list_item {
    .block-with-text {
      max-width: 300px;
      overflow: hidden;
      /*white-space: nowrap;*/
      text-overflow: ellipsis;
    }
    .main_cell_row {
      .block-with-text {
        max-width: unset;
        white-space: nowrap;
      }
    }
  }
  .theme--dark {
    .base_list {
      .row_list_item {
        margin-bottom: 8px;
        /*border: solid 1px red;*/
        box-shadow: 2px 2px 5px rgba(255,255,255,0.05);
      }
      .gird-virtual-list--row {
        background: unset;
        border-color: rgba(255,255,255,0.1);
        border-left-color: transparent;
        .main-cell-setting--table {
          border-color: rgba(255,255,255,0.1);
        }
      }
    }
  }
</style>
