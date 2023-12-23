<template>
  <div class="lazy-item row_column_item" :id="`item-column-${id}`">
    <div class="row--container">
      <div class="gird-virtual-list--row--parent">
        <div class="gird-virtual-list--row" ref="card">
          <div class="drag-handle drag-row-outside">
            <v-icon>
              mdi-drag-vertical
            </v-icon>
          </div>
          <div class="cell--pr d-flex">
            <template v-for="(attribute, index) in attributes">
              <template v-if="!attribute.hide">
                <div class="gird-virtual-list--cell" :key="`${id}-${attribute.name}-row`" v-ripple
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
                                 class="slot-item-cell cell_column" :title="attribute.label">
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
                                   :session-id="pinnedRowId"
                                   @pinned="updatePinned"
                                   :pinned="item['pinned']"/>
                    </template>
                    <template v-if="!disabledBookmarkRow">
                      <Bookmark :end-point="endPoint"
                                @bookmarked="updateBookmark"
                                :bookmarked="item['bookmarked_pk']"/>
                    </template>
                  </template>
                </div>
                <v-spacer class="kiop" :key="`${id}-${attribute.name}-spacer`"
                          v-if="attribute['name'] === mainCellId"/>
              </template>
            </template>
          </div>
          <div class="both-shadow">
            <div class="both-shadow--content"
                 @click="expandedCard">
              <v-icon small>mdi-chevron-double-down</v-icon>
            </div>
          </div>
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
    name: "BaseRowColumnsItem",
    components: {
    },
    mixins: [
      mxBaseRowSlickGrid,
      mxCoreSlickGrid,
      mxPermissionRow
    ],
    methods: {
      expandedCard() {
        let el = this.$refs['card']
        el.classList.toggle('column-expanded')
      }
    }

}
</script>

<style lang="scss">
  .base_columns {
    .list-group {
        /*padding: 0px 10px;*/
    }
    .field_HEATMAP {
      height: 35px;
    }
  }
  .theme--dark {
    .base_columns {
      .gird-virtual-list--row--parent {
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: 2px 2px 8px rgba(255, 255, 255, 0.1);
      }
      .main_cell_row {
        border-color: transparent !important;
      }
      .both-shadow {
        background: #1e1e1e;
        box-shadow: 0px -16px 28px 0px rgba(30,30,30,1);
        &:after {
          background: unset;
        }
      }

    }
  }
</style>

<style scoped lang="scss">
  .theme--dark {
    .gird-virtual-list--row--parent {
      background: transparent;
    }
  }
  .row_column_item {
    margin-bottom: 20px;
    &:last-child {
      /*margin-bottom: 0px;*/
    }
  }
  .row--container {
    width: 100%;
  }
  .gird-virtual-list--row--parent {
    padding-left: 34px;
    padding-left: 0px;
    width: 100%;
    /*border: solid 1px blue;*/
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    border: solid 1px rgba(0,0,0,0.05);
    border-radius: 5px;
    background: #ffffff;
  }

  .gird-virtual-list--row {
    position: relative;
    width: 100%;
    // v-lazy
    /*border: solid 1px red;*/
    height: 250px;
    overflow: hidden;
    &.column-expanded {
      height: auto;
      .both-shadow {
        box-shadow: unset;
        background: unset;
        .both-shadow--content {
          i {
            transform: scale(1);
          }
          &:hover {
            i {
              transform: scale(-1);
            }
          }
        }
      }
    }
  }
  .both-shadow {
    /*border: solid 1px red;*/
    position: absolute;
    z-index: 2;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 15%;
    background: rgba(255,255,255, 1);
    box-shadow: 0px -16px 28px 0px rgba(255,255,255,1);
    display: flex;
    align-items: flex-end;
    &:after {
      content: '';
      height: 10px;
      width: 100%;
      display: block;
      background: rgba(255,255,255, 1);
    }
    .both-shadow--content {
      width: 100%;
      /*border: solid 1px red;*/
      display: flex;
      justify-content: flex-end;
      position: absolute;
      cursor: pointer;
      padding: 0px 10px 10px 0px;
      i {
        transform: scale(-1);
        transition: all 0.25s linear;
      }
      &:hover {
        i {
          transform: scale(1);
        }
      }
    }
  }

  .gird-virtual-list--cell {
    position: relative;
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    padding: 5px 10px;
    &:last-child {
      .item--cell {
        padding-right: 0px;
      }
    }
    &.main_cell_row {
      .item--cell {
        order: -1;
      }
    }
  }

  .item--cell {
    padding: 0 1px;
    overflow: hidden;
    align-self: stretch;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .cell--pr {
    flex-wrap: wrap;
  }
  .main-cell-setting--table {
    .task-row-counter {
      display: none;
    }
  }
  // todo drag
  .drag-row-outside {
    display: none;
  }
  .task-row-draggable {
    position: relative;
    z-index: 3;
    cursor: pointer;
  }
</style>
