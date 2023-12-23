<template>
  <div :id="`item-table-${id}`"
          class="row-table-item"
       :class="{'row-table-item--active': rowSelected}">
    <div class="d-flex row--container">
      <div class="gird-virtual-list--row--parent">
        <div class="gird-virtual-list--row">
          <div class="drag-handle drag-row-outside">
            <v-icon>
              mdi-drag-vertical
            </v-icon>
          </div>
          <div class="row-content-attributes">
            <div class="row-content-attributes--pinned">
              <v-card flat class="cell--pr fill-height d-flex" tile>
                <template v-for="(attribute, index) in attributesPinned">
                  <keep-alive>
                    <CustomizeCellGeneric :attribute="attribute"
                                        :main-cell-id="mainCellId"
                                        :is-owner-row="isOwnerRow"
                                        :row-selected="rowSelected"
                                        @clickRowDetail="$emit('clickRowDetail', item)"
                                        @selectedRow="$emit('selectedRow', item)">
                    <template v-slot:row-index>
                      {{rowIndex}}
                    </template>
                    <template v-slot:pinned-row>
                      <template v-if="pinnedRow">
                        <PinnedEntry :end-point="endPoint"
                                     :row="item"
                                     @pinned="updatePinned"
                                     :session-id="pinnedRowId"
                                     :pinned="item['pinned']"/>
                      </template>
                    </template>
                    <template v-slot:bookmark-row>
                      <template v-if="!disabledBookmarkRow">
                        <Bookmark :end-point="endPoint"
                                  @bookmarked="updateBookmark"
                                  :bookmarked="item['bookmarked_pk']"/>
                      </template>
                    </template>
                    <template v-slot:faviconLink>
                      <FaviconThumbnail :attribute="attribute"
                                        :row="item"/>
                    </template>
                    <template v-slot:faviconLinkCell>
                      <FaviconAvatar value="https://www.google.com/s2/favicons?domain_url=https://www.24h.com.vn/"/>
                    </template>
                    <template v-slot:vote-row>
                      <template v-if="!disabledVoteRow">
                        <Vote :end-point="endPoint"
                              :total-votes="item.total_votes"
                              :voted-object="item.voted_object"/>
                      </template>
                    </template>
                    <template v-slot:report-row>
                      <template v-if="hasReportRow">
                        <Report :end-point="endPoint"
                                @reported="updateReport"
                                :total-reports="item.total_reports"
                                :reported-object="item.reported_object"/>
                        <div class="mx-1"></div>
                      </template>
                    </template>
                    <template v-slot:link-detail>
                      <div class="d-flex flex-wrap link-main-cell fill-height"
                           v-if="!noLinkDetail">
                        <router-link :to="`${pathLink}/${item[uniqueId]}`"
                                     class="text-decoration-unset d-flex align-center px-2 link-main-cell--link w-100">
                          <v-icon x-small small class="hide_base">mdi-pencil</v-icon>
                        </router-link>
                      </div>
                    </template>
                    <template v-slot:task-row-actions>
                      <component :is="'ACTIONS' | getCellLayout"
                                 :isOwnerRow="isOwnerRow"
                                 attributeType="ACTIONS"
                                 :readOnly="false"
                                 :actions="actionsRow"
                                 :id="`${id}-actions-cell`"
                                 :cell-pk="`${id}-actions-cell`"></component>
                    </template>
                    <template v-slot:default>
                      <slot :name="'item.' + attribute['name']">
                        <component :is="attribute.type | getCellLayout"
                                   :isOffline="isOffline"
                                   :isOwnerRow="isOwnerRow"
                                   :value="item[attribute['name']]"
                                   :attribute="attribute"
                                   :row="item"
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
                                   @showTooltip="$$data => $emit('showTooltip', $$data)"
                                   :pinned-row="pinnedRow"
                                   :pinned-row-id="pinnedRowId"
                                   :endPoint="getEndPoint(attribute)"
                                   :class="`cell_${attribute['name']}_row`"
                                   class="slot-item-cell cell_table">
                        </component>
                        <LinkTooltipCell :row="item"
                                         :attribute="attribute"
                                         :cellPk="`${id}-${attribute['type']}-cell--${attribute.name}`"
                                         :bus-event-hover-cell="busEventHoverCell"
                                         v-if="attribute.isHover"/>
                      </slot>
                    </template>
                  </CustomizeCellGeneric>
                  </keep-alive>
                </template>
              </v-card>
            </div>
            <div class="row-content-attributes--default">
              <v-card flat class="cell--pr fill-height d-flex" tile>
                <template v-for="(attribute, index) in attributesFree">
                    <keep-alive>
                      <CustomizeCellGeneric :attribute="attribute"
                                            :main-cell-id="mainCellId"
                                            :is-owner-row="isOwnerRow"
                                            :row-selected="rowSelected"
                                            @clickRowDetail="$emit('clickRowDetail', item)"
                                            @selectedRow="$emit('selectedRow', item)">
                        <template v-slot:default>
                          <slot :name="'item.' + attribute['name']">
                            <component :is="attribute.type | getCellLayout"
                                       :isOffline="isOffline"
                                       :isOwnerRow="isOwnerRow"
                                       :value="item[attribute['name']]"
                                       :attribute="attribute"
                                       :row="item"
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
                                       @showTooltip="$$data => $emit('showTooltip', $$data)"
                                       :pinned-row="pinnedRow"
                                       :pinned-row-id="pinnedRowId"
                                       :endPoint="getEndPoint(attribute)"
                                       :class="`cell_${attribute['name']}_row`"
                                       class="slot-item-cell cell_table">
                              <template v-slot:faviconLinkCell>
                                <FaviconAvatar value="https://www.google.com/s2/favicons?domain_url=https://www.24h.com.vn/"/>
                              </template>
                            </component>

                            <LinkTooltipCell :row="item"
                                             :attribute="attribute"
                                             :cellPk="`${id}-${attribute['type']}-cell--${attribute.name}`"
                                             :bus-event-hover-cell="busEventHoverCell"
                                             v-if="attribute.isHover"/>
                          </slot>
                        </template>

                      </CustomizeCellGeneric>
                    </keep-alive>
                </template>
              </v-card>
            </div>
          </div>
          <!--<v-card flat v-if="!disabledAddNewColumn"
                  class="gird-virtual-list&#45;&#45;cell border-radius-none"
                  style="width: 60px; opacity: 0;">
          </v-card>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mxCoreSlickGrid from "~/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxCoreSlickGrid"
  import mxBaseRowSlickGrid from "~/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxBaseRowSlickGrid"
  import mxPermissionRow from "~/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxPermissionRow"
  import CustomizeCellGeneric from "~/sat-vue-toolkit/components/slick-grid/components/CustomizeCellGeneric"
  import FaviconAvatar from "~/sat-vue-toolkit/components/Common/FaviconAvatar"

  export default {
    name: "BaseRowTableItem",
    components: { FaviconAvatar, CustomizeCellGeneric },
    mixins: [
      mxBaseRowSlickGrid,
      mxCoreSlickGrid,
      mxPermissionRow
    ],
  }
</script>
<style lang="scss">
  .theme--dark {
    .dashboard-table-scroll_body {
      &.base_table {

        .row-table-item:nth-child(odd) {
          .cell--pr {
            background: var(--ag-odd-row-background-color,#222628);
            .gird-virtual-list--cell {
              &.main_cell_row {
                background: var(--ag-odd-row-background-color,#222628);
              }
            }
            &:hover {
              background: #354553;
              .gird-virtual-list--cell {
                &.main_cell_row {
                  background: #354553;
                }
              }
            }
          }

        }
        .row-content-attributes--pinned {
          .cell--pr {
            .gird-virtual-list--cell:last-child {
              &:after {
                box-shadow: 1px 0 3px 4px rgba(255,255,255,.1);
                background: rgba(255,255,255,.2);
              }
            }
          }
        }

      }
    }
  }


</style>
<style lang="scss">
  .gird-virtual-list--row--parent {
    padding-left: 14px;
    padding-left: 0px;
    position: relative;
  }
  .row-table-item {
    &.row-table-item--active {
      .task-row-counter {
        opacity: 0;
      }
    }
  }
  .gird-virtual-list--row {
    display: flex;
    align-items: center;
    box-shadow: none;
    border-bottom: solid 1px rgba(0,0,0,0.05);
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
        .task-row-selected {
          opacity: 1;
        }
      }
      .drag-row-outside {
        opacity: 1;
      }
    }
  }
  .row-content-attributes {
    display: flex;
    .row-content-attributes--pinned {
      position: sticky;
      left: 0px;
      z-index: 2;
      .cell--pr {
        .gird-virtual-list--cell:last-child {
          &:after {
            content: '';
            width: 1px;
            height: 100%;
            box-shadow: 1px 0 3px 4px rgba(0,0,0,.05);
            background: rgba(0,0,0,.1);
          }
        }
      }
    }
    .row-content-attributes--default {
    }
  }
  .theme--dark {
    .gird-virtual-list--row {
      border-bottom: solid 1px rgba(255, 255, 255, 0.1);
      box-shadow: none !important;
      background: none;
    }
  }
  .gird-virtual-list--cell {
    position: relative;
    /*z-index: 1;*/
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-right: solid 1px rgba(0, 0, 0, 0.05);
    &:first-child {
      border-left: solid 1px rgba(0, 0, 0, 0.05);
    }
    &:last-child {
      .item--cell {
        padding-right: 0px;
      }
    }
    &.main_cell_row {
      position: sticky;
      justify-content: flex-start;
      transition: transform 0.25s linear;
      .item--cell {
        width: auto;
        flex-grow: 1;
      }
      .link-main-cell {
        flex: 1;
      }
    }

  }

  .item--cell--no_padding {
    .slot-item-cell {
      padding: 0px 0px;
    }
  }

  .slot-item-cell {
    padding: 0px 10px;

    &--no_padding {
      padding: 0px 0px;
    }
  }

  .item--cell {
    padding: 0 0px;
    /*position: relative;*/

    &--no_padding {
      padding: 0 0px;
    }

    overflow: hidden;
    align-self: stretch;
    width: 100%;
    display: flex;
    align-items: center;

  }

  .task-row-toggle {
    position: absolute;
    left: -31px;
    top: 0;
    width: 22px;
    height: 100%;
    cursor: pointer;
    border: 1px darkred;
    display: flex;
    align-items: center;
  }
  .task-row-index {
    position: relative;
    width: 35px;
    width: 40px;
    overflow: hidden;
    /*border: solid 1px red;*/
    display: flex;
    align-items: center;
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
      transform: translateX(-3px);
    }
    .task-row-selected {
      cursor: pointer;
      opacity: 0;
      transform: translateX(-2px);
      &.task-row-selected--active {
        opacity: 1;
        & ~ .task-row-counter {
          opacity: 0 !important;
        }
      }
    }
  }
  .task-row-actions {
    position: absolute;
    right: 0px;
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
  .main-cell-setting--table {
    border-right: solid 1px rgba(0, 0, 0, 0.05);
    height: 100%;
    position: relative;

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
    background: rgba(255, 255, 255, .9);


    &.outsider_color {
      background: rgba(247, 247, 247, 0.9) !important;
    }

    // other
    padding: 10px;
    overflow: hidden;
    margin: 0 0 0 0;
    align-self: stretch;

    &--content {
      max-width: 350px;
      display: flex;
      align-items: center;
    }
  }

  .cell--pr {
    flex: 1;
    align-self: stretch;
    &:hover {
      background: #f5f5f5;
      .gird-virtual-list--cell.main_cell_row {
        background: rgba(245, 245, 245, 0.8);
      }
    }
  }

  .theme--dark {
    .cell--pr {
      &:hover {
        background: #354553;
        .gird-virtual-list--cell.main_cell_row {
          background: #354553;
        }
      }
      .gird-virtual-list--cell {
        border-right-color: rgba(255, 255, 255, 0.1);
      }

    }
    .main-cell-setting--table {
      border-right-color: rgba(255,255,255, 0.1);
    }
  }

</style>
