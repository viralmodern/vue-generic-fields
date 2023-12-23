<template>
  <div>
    <v-card tile flat>
      <template v-if="ld">
        <v-skeleton-loader
          ref="skeleton"
          :boilerplate="false"
          type="article"
          :tile="false"
          class="mx-auto"
        ></v-skeleton-loader>
      </template>
      <template v-else>
        <template v-if="detail">
          <TopBarDocumentDetailOdt
            :root-path="rootPath"
            :row="detail"
            :exclude-links="excludeLinks"
          >
            <template v-slot:left-attach-content>
              <BtnLinkInFormation
                disabled-bookmark-row
                end-point="/api/opinions/"
                :attributes="attributesOpinions"
                main-cell-id="matter_name"
                :row="detail"
                :is-owner-row="false"
              />
              <Bookmark
                :icon="false"
                :end-point="`/api/opinions/${$route.params.opinion}/`"
                :bookmarked="bookmarked"
                @bookmarked="onBookmarked"
              />
            </template>
          </TopBarDocumentDetailOdt>

          <v-container fluid>
            <draggable
              class="d-flex mx-n1 list-group-panel"
              draggable=".draggable-item-block"
              handle=".drag-handle-detail"
              group="layout-opinion"
              v-model="configsOpinionDetailLayout"
            >
              <template v-for="(item, index) in configsOpinionDetailLayout">
                <div
                  v-if="item.hint && item.hint === 'CONTENT'"
                  :key="index"
                  class="px-1 draggable-item-block"
                  style="flex: 1; max-width: 100%"
                >
                  <v-card flat class="fill-height" style="position: relative">
                    <v-btn
                      small
                      icon
                      absolute
                      class="drag-handle-detail drag-handle-detail--content"
                      :class="{ hide_base: !isNotNerCoreFerenceResolutionView }"
                    >
                      <v-icon>mdi-drag</v-icon>
                    </v-btn>
                    <keep-alive>
                      <div
                        :style="{
                          marginTop: !isNotNerCoreFerenceResolutionView
                            ? '-30px'
                            : '-26px',
                        }"
                      >
                        <nuxt-child
                          :detail="detail"
                          :colorsRake="colorsRake"
                          @updateRakes="getRakes"
                        >
                          <template v-slot:breadcrumbs-authorities>
                            <v-breadcrumbs
                              v-if="detail"
                              :items="linksBreadcrumbs"
                              class="pa-0 pb-2 mt-n1"
                            >
                              <template v-slot:item="{ item }">
                                <v-breadcrumbs-item :disabled="item.disabled">
                                  <router-link
                                    :to="item.to"
                                    v-if="!item.disabled"
                                    class="text-capitalize text-decoration-none caption"
                                    v-html="item.text"
                                  ></router-link>
                                  <div v-html="item.text" v-else></div>
                                </v-breadcrumbs-item>
                              </template>
                            </v-breadcrumbs>
                          </template>
                        </nuxt-child>
                      </div>
                    </keep-alive>
                  </v-card>
                </div>
                <div
                  v-if="item.hint && item.hint === 'PANEL'"
                  :key="index"
                  style="width: 420px; position: relative"
                  class="px-1 edit-resize-panel draggable-item-block"
                  ref="panelAuthorities"
                >
                  <v-card
                    v-if="isNotNerCoreFerenceResolutionView"
                    tile
                    flat
                    outlined
                    max-height="80vh"
                    class="overflow-y-auto toggle-panel-box"
                    style="position: sticky; top: 90px"
                  >
                    <v-btn
                      fab
                      x-small
                      width="25px"
                      height="25px"
                      ref="toggleElement"
                      class="toggle-panel-right-button"
                      depressed
                    >
                      <v-icon small class="toggle-panel-right-icon"
                        >mdi-chevron-double-right
                      </v-icon>
                    </v-btn>
                    <v-btn
                      small
                      icon
                      absolute
                      class="drag-handle-detail drag-handle-detail--panel"
                    >
                      <v-icon>mdi-drag</v-icon>
                    </v-btn>
                    <div class="toggle-panel-right-content">
                      <template v-if="isRakeView">
                        <ThumbListRake
                          :rakes="rakes"
                          :colors-rake="colorsRake"
                        />
                      </template>
                      <template v-else-if="isNerView">
                        <ThumbListNer :ents="ner.ents" />
                      </template>
                      <template v-else>
                        <div class="px-3 pt-3">
                          <v-btn
                            class="caption text-capitalize mb-1"
                            rounded
                            active-class="primary--text"
                            depressed
                            x-small
                            @click="tabActive = 0"
                            :input-value="
                              tabActive == 0 &&
                              $$countArr(detail.opinions_cited)
                            "
                          >
                            Authorities {{ detail.opinions_cited | totalPanel }}
                          </v-btn>
                          <v-btn
                            class="caption text-capitalize mb-1"
                            rounded
                            active-class="primary--text"
                            depressed
                            x-small
                            :input-value="
                              tabActive == 1 &&
                              $$countArr(detail.opinions_citing)
                            "
                            @click="tabActive = 1"
                          >
                            Cited By {{ detail.opinions_citing | totalPanel }}
                          </v-btn>
                        </div>
                        <ThumbListAuthoritiesOpinions
                          disabled-label
                          v-if="tabActive === 0"
                          label="Authorities"
                          :path="`${rootPath}/authorities`"
                          :list="detail.opinions_cited"
                          label-link-paging="View all Authorities"
                        />
                        <ThumbListAuthoritiesOpinions
                          disabled-label
                          v-if="tabActive === 1"
                          label="Cited By"
                          :list="detail.opinions_citing"
                          :path="`${rootPath}/cited`"
                          label-link-paging="View Citing Opinions"
                        />
                      </template>
                    </div>
                  </v-card>
                </div>
              </template>
            </draggable>
          </v-container>
        </template>
      </template>
    </v-card>
  </div>
</template>

<script>
import {
  $$arrToString,
  $$formatFullDate,
  $$lastArrItem,
  $$countArr,
} from '~/sat-vue-toolkit/functions'
import { $$resizeElement } from '~/sat-vue-toolkit/functions/resize'

import DetailThumbNailViewODT from '~/features/odt/DetailThumbNailViewODT'
import BtnLinkInFormation from '~/features/odt/BtnLinkInFormation'
import { mxOpinions } from '~/features/odt/mixins/attributesOpinions'
import ThumbListAuthoritiesOpinions from '~/features/odt/ThumbListAuthoritiesOpinions'
import ThumbListRake from '~/features/odt/ThumbListRake'
import ThumbListNer from '~/features/odt/ThumbListNer'
import BtnLink from '~/sat-vue-toolkit/components/BtnLink'
import TopBarDocumentDetailOdt from '~/features/odt/TopBarDocumentDetailOdt'
import draggable from 'vuedraggable'
import {
  mutations,
  actions,
  opinionDetail,
} from '~/features/odt/store/opinionOdtDetail'
import Bookmark from '@/sat-vue-toolkit/components/Bookmark/Bookmark.vue'

export default {
  components: {
    Bookmark,
    TopBarDocumentDetailOdt,
    BtnLink,
    ThumbListNer,
    ThumbListRake,
    ThumbListAuthoritiesOpinions,
    BtnLinkInFormation,
    DetailThumbNailViewODT,
    draggable,
  },
  filters: {
    $$arrToString,
    $$formatFullDate,
    $$lastArrItem,
    totalPanel(v) {
      let total = $$countArr(v)
      return total ? `(${total})` : ``
    },
  },
  directives: {},
  mixins: [mxOpinions],
  data() {
    return {
      loadingDetail: false,
      rakes: [],
      ner: {},
      tabActive: 0,
    }
  },
  head() {
    return {
      title: this.opinionTitle,
    }
  },
  async mounted() {
    await this.getDetail()
    // this.$store.dispatch('userSettings/removeSettingsOptionsUser')
  },
  events: {
    updateNer(evt, data) {
      console.log('updateNer', data)
      this.getNer(data)
    },
  },
  computed: {
    ld() {
      return opinionDetail.loading
    },
    detail() {
      try {
        return opinionDetail.data
      } catch (e) {
        return null
      }
    },
    opinionTitle() {
      try {
        return this.detail['matter_name']
      } catch (e) {
        return false
      }
    },
    isOwnerRow() {
      try {
        return this.detail['creator'] === this.$store.getters['auth/userPk']
      } catch (e) {
        return false
      }
    },
    isRakeView() {
      const { name } = this.$route
      return name.startsWith('odt-opinions-opinion-rake')
    },
    isNerView() {
      const { name } = this.$route
      return name.startsWith('odt-opinions-opinion-ner')
    },
    isNotNerCoreFerenceResolutionView() {
      const { name } = this.$route
      let names = [
        'odt-opinions-opinion-ner-coreference-resolution',
        'odt-opinions-opinion-authorities',
        'odt-opinions-opinion-cited',
      ]
      return !names.includes(name)
    },
    isOpinionAuthoritiesView() {
      let names = ['odt-opinions-opinion-authorities']
      const { name } = this.$route
      return names.includes(name)
    },
    isOpinionCitedView() {
      let names = ['odt-opinions-opinion-cited']
      const { name } = this.$route
      return names.includes(name)
    },
    colorsRake() {
      return this.rakes.map((rake) => rake.color)
    },
    rootPath() {
      const {
        params: { opinion },
      } = this.$route
      return `/odt/opinions/${opinion}`
    },
    bookmarked() {
      try {
        return this.detail['bookmarked_pk']
      } catch (e) {
        return false
      }
    },
    excludeLinks() {
      try {
        return this.detail.pdf ? [] : ['pdf']
      } catch (e) {
        return []
      }
    },
    linksBreadcrumbs() {
      return [
        {
          text: 'All Opinions',
          disabled: false,
          // exact: true,
          to: '/odt/opinions',
        },
        {
          text: `${this.opinionTitle}`,
          disabled: false,
          // exact: true,
          to: `${this.rootPath}`,
        },
        {
          text: `${this.isOpinionAuthoritiesView ? 'Authorities' : 'Cited By'}`,
          disabled: true,
          // exact: true,
          to: `${this.rootPath}`,
        },
      ]
    },
    configsOpinionDetailLayout: {
      get() {
        return this.$store.getters['userSettings/configsOpinionDetailLayout']
      },
      async set(value) {
        let list = this.$store.getters[
          'userSettings/configsOpinionDetailLayout'
        ]
        let options = { LAYOUT_OPINION_DETAIL: list.reverse() }
        let res = await this.$store.dispatch(
          'userSettings/updateSettingsOptionsUser',
          options
        )
        if (res) {
          this.resizePanelRight()
        }
      },
    },
  },
  watch: {
    $route(r, pr) {
      try {
        if (r.params.opinion != pr.params.opinion) {
          this.getDetail()
        }
      } catch (e) {}
    },
  },
  methods: {
    resizePanelRight() {
      try {
        let toggleElement = this.$refs.toggleElement[0].$el
        $$resizeElement(this.$refs.panelAuthorities[0], 50, 420, toggleElement)
      } catch (e) {
        console.error('RESIZEABLE_VIEW', this.$refs.panelAuthorities, e.message)
      }
    },
    $$countArr,
    getRakes(rakes) {
      try {
        let keywords = rakes
        // keywords.push({phrase: '1', color: 'red'})
        // keywords.push({phrase: '5fc40fe2a3a9da916c2c362029775ac6', color: 'blue'})
        // keywords = getSESSION('RAKES')
        this.rakes = keywords
      } catch (e) {}
    },

    getNer(ner) {
      try {
        const { name } = this.$route
        if (
          name.localeCompare(
            'odt-opinions-opinion-ner-coreference-resolution'
          ) === 0
        ) {
        } else {
          this.ner = ner
        }
      } catch (e) {}
    },

    async getDetail() {
      try {
        this.loading = true
        mutations.updateDetail(null)
        const {
          params: { opinion },
        } = this.$route
        let res = await actions.fetchOpinionDetail(opinion, this.$api)
        this.loading = false
        this.resizePanelRight()
        return Promise.resolve(true)
      } catch (e) {
        this.loading = false
        return Promise.resolve(false)
      } finally {
      }
    },
    onBookmarked({ bookmarked }) {
      mutations.updateDetail({
        ...opinionDetail.data,
        bookmarked_pk: bookmarked,
      })
    },
  },
  destroyed() {
    this.tabActive = 0
    mutations.updateDetail(null)
  },
}
</script>

<style scoped lang="scss">
.toggle-panel-box {
  font-family: $font_courier;

  * {
    font-family: $font_courier !important;
  }

  .toggle-panel-right-button {
    position: sticky;
    z-index: 2;
    top: 10px;
    left: calc(100% - 30px);
    background: #ffffff;
    border: solid 1px rgba(0, 0, 0, 0.2);
  }

  .toggle-panel-right-content {
    transform: translateY(-25px);
  }

  &--close {
    .toggle-panel-right-content {
      opacity: 0;
      overflow: hidden;
    }
  }
}

.drag-handle-detail {
  position: sticky;
  top: 100px;
  left: calc(100% - 20px);
  z-index: 2;
  cursor: move;

  &.drag-handle-detail--panel {
    right: 30px;
    left: auto;
    position: absolute;
    top: 10px;
  }
}
.draggable-item-block {
  touch-action: none;
}
</style>
