<template>
  <div class="content_card fill-height">
    <div class="content_card--title">
      <v-card-text>
        <div class="d-flex align-center">
          <p class="text-left subtitle-2 ma-0 text-wrap"
             style="word-break: break-all" v-html="mainTextContent">
          </p>
          <div class="flex-grow-1"></div>
          <template v-if="hasReportRow && val">
            <Report :end-point="endPoint"
                    :total-reports="val.total_reports"
                    @reported="updateReport"
                    :reported-object="val.reported_object"/>
            <div class="mx-1"></div>
          </template>
          <Bookmark v-if="!disabledBookmarkRow"
                    :end-point="endPoint"
                    @bookmarked="updateBookmark"
                    :bookmarked="val['bookmarked_pk']"/>
          <v-btn icon small @click="$emit('input', false)">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </div>
        <slot name="attach-header">
        </slot>
      </v-card-text>
    </div>
    <v-card-text class="px-0 pt-0">
      <TopViewModeAttributeDetail :value="mode"
                                  @input="onChangeTab"/>
    </v-card-text>
    <!--      <div>-->
    <keep-alive>
      <div v-if="mode === PANEL_MODE.OUTLINE.type">
        <v-slide-y-transition hide-on-leave>
          <v-card flat>
            <v-card-text>
              <template v-for="(attribute, index) in reduceAttribute">
<!--                <div :key="`item-card-${attribute['name']}-item`">-->
                  <keep-alive>
                    <div class="row" :key="`item-card-${attribute['name']}-item`">
                      <template v-if="index !== 0">
                        <v-col cols="12" md="12" sm="12" lg="12">
                          <v-divider/>
                        </v-col>
                      </template>
                      <v-col cols="12" md="3" class="py-0">
                        <div class="d-flex align-center">
                          <v-icon small :title="attribute.type | getTitleAttribute">
                            {{attribute.type | getIconAttribute}}
                          </v-icon>
                          <div class="mx-1"></div>
                          <div class="caption">
                            {{attribute.label }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6" class="py-0">

                        <slot :name="`field-detail-${attribute['name']}`"
                              :value="val[attribute['name']]"
                              :isOwnerRow="isOwnerRow"
                              :cell-pk="`row-item-${val['pk']}-${attribute['type']}-card--${attribute['name']}`"
                              :end-point="getEndPoint(attribute)">
                          <component :is="attribute.type | getCardLayout"
                                     :isOwnerRow="isOwnerRow"
                                     :row="val"
                                     :value="val[attribute['name']]"
                                     :attribute="attribute"
                                     :class="{['field_'+attribute.type]: true}"
                                     :cell-pk="`row-item-${val['pk']}-${attribute['type']}-card--${attribute['name']}`"
                                     :id="`row-item-${val['pk']}-${attribute['type']}-card--${attribute['name']}`"
                                     :disabledOwnerRow="disabledOwnerRow"
                                     :end-point="getEndPoint(attribute)"
                                     @updateContent="$$$$$data => updateContent($$$$$data, attribute)">
                          </component>
                        </slot>

                      </v-col>

                    </div>
                  </keep-alive>
<!--                </div>-->
              </template>
            </v-card-text>
          </v-card>
        </v-slide-y-transition>
      </div>
      <div v-else>
        <v-slide-y-transition hide-on-leave>
          <TooltipContentPanel :row="val"
                               :attributes="reduceAttribute"/>
        </v-slide-y-transition>
      </div>
    </keep-alive>
    <!--      </div>-->
  </div>
</template>

<script>
  import mxCoreSlickGrid from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxCoreSlickGrid"
  import mxPermissionRow from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxPermissionRow"
  import { Report, Bookmark } from "@/sat-vue-toolkit/components"
  import { reduceAttributes } from "@/sat-vue-toolkit/components/slick-grid/helpers/attributes"
  import TopViewModeAttributeDetail from "~/sat-vue-toolkit/components/slick-grid/attributes/TopViewModeAttributeDetail"
  import TooltipContentPanel from "~/sat-vue-toolkit/components/Common/TooltipContentPanel"
  import { PANEL_MODE } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"

  export default {
    name: "AttributeDetail",
    props: {
      item: {
        type: Object,
        default: () => ({})
      },
      row: {
        type: Object,
        default: () => ({})
      },

      attributes: {
        type: [Object, Array, String],
        default: () => []
      },
      mainCellId: {
        type: [Object, Array, String, Number],
        default: () => "pk"
      },
      hasReportRow: {
        type: Boolean,
        default: () => true
      },
      disabledBookmarkRow: {
        type: Boolean,
        default: () => false
      },
      disabledOwnerRow: {
        type: Boolean,
        default: () => false
      },
      isOffline: {
        type: Boolean,
        default: () => false
      },

      endPoint: {
        type: String,
        default: () => ""
      },
      busEventName: {
        type: String,
        default: () => "bus-add-row"
      },
      busEventLoadRow: {
        type: String,
        default: () => "bus-load-row"
      },
      busEventUpdateRow: {
        type: String,
        default: () => "bus-update-row"
      },
      busEventDeletedRow: {
        type: String,
        default: () => "busDeletedRow"
      },
      busEventHoverCell: {
        type: String,
        default: () => "busEventHoverCell"
      },
      group: {
        default: () => "ungroup"
      },
      groupType: {
        default: () => ""
      },
      userAccount: {
        type: [String, Number],
        default: () => ""
      }
    },
    mixins: [mxCoreSlickGrid, mxPermissionRow],
    data () {
      return {
        val: {},
        mode: PANEL_MODE.OUTLINE.type,
        PANEL_MODE
      }
    },
    watch: {
      item: {
        immediate: true,
        handler (v) {
          this.val = v
        }
      }
    },
    computed: {
      reduceAttribute () {
        let { attributes } = this
        let tempAttributes = reduceAttributes([...attributes])
        return tempAttributes
      },
      primaryAttribute () {
        let { mainCellId, reduceAttribute = [] } = this
        return reduceAttribute.filter(attribute => attribute["name"] === mainCellId)[0] || {}
      }
    },
    components: {
      TooltipContentPanel,
      TopViewModeAttributeDetail,
      Report,
      Bookmark
    },
    methods: {
      onChangeTab (tab) {
        this.mode = tab
      }
    }

  }
</script>

<style scoped lang="scss">
  .field_HEATMAP {
    height: 35px;
  }
</style>
