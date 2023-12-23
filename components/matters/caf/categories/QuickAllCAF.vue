<template>
  <light-box>
    <v-card>
      <v-btn absolute fab small right @click="onClose" style="top: 10px;">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="2">
              <panel-cate-search style="position: sticky; top: 10px;">
                <v-card flat>
                  <search-input
                    v-model="query"
                    placeholder="Search caf"
                    @searchSubmit="searchSubmit"
                  />
                  <v-card-text>
                    <v-list dense shaped>
                      <template v-for="(cates, index) in cafByGroup">
                        <v-list-item
                          active-class="primary--text"
                          :key="index"
                          @click="clickCate(index)"
                          :input-value="cateActive === index"
                        >
                          <v-list-item-content class="text-capitalize">
                            {{ index }}
                          </v-list-item-content>
                          <v-list-item-action>
                            ({{ cates.length }})
                          </v-list-item-action>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-card-text>
                </v-card>
              </panel-cate-search>
            </v-col>
            <v-col cols="12" md="9" v-if="uiShowPreview">
              <CafPreviewDetail
                :title="titleCaf"
                @changeUse="changeUse"
                :item="cafActive"
                :description="descriptionCaf"
              ></CafPreviewDetail>
            </v-col>
            <v-col cols="12" md="10" v-else>
              <template v-if="getCafByCate.length">
                <CafsCategory
                  @openDetail="openCafDetail"
                  :title="getTitleCate"
                  :list="getCafByCate"
                />
              </template>
              <template v-else>
                <CafsCategory
                  @openDetail="openCafDetail"
                  title="All Featured"
                  :list="allCaf"
                />
              </template>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </light-box>
</template>

<script>
import LightBox from './modal/index'
import SearchInput from '../../../utils/SearchInput'
import PanelCateSearch from './PanelCateSearch'
import ListCategoryPanel from './modal/ListCategoryPanel'
import CafsCategory from './modal/CafsCategory'
import CafPreviewDetail from './modal/CafPreviewDetail'
import { mapGetters } from 'vuex'
import groupBy from 'lodash/groupBy'
import mx_matterId from '~/mixins/mx_matterId'

export default {
  name: 'QuickAllCAF',
  components: {
    CafPreviewDetail,
    CafsCategory,
    ListCategoryPanel,
    PanelCateSearch,
    SearchInput,
    LightBox
  },
  data() {
    return {
      query: '',
      categories: [],
      uiShowPreview: false,
      cafActive: null,
      cateActive: null,
      types: []
    }
  },
  mixins: [mx_matterId],
  computed: {
    ...mapGetters({
      findCafByMatter: 'matter/cafs/findCafByMatter'
    }),
    CAFS() {
      return this.$store.getters['matter/cafs/findCafByMatter'](this.$$matterId)
    },
    cafByGroup() {
      return groupBy(this.CAFS, 'caf_type')
    },
    allCaf: {
      get() {
        try {
          let _search = this.query || '',
            cateActive = this.cateActive
          let CAFS = this.CAFS
          if (cateActive)
            CAFS = CAFS.filter((caf) => caf.caf_type === cateActive)
          return CAFS.filter((field) => {
            if (field) {
              return field.text.toLowerCase().includes(_search.toLowerCase())
            }
          })
        } catch (e) {
          console.log(e.message)
          return []
        }
      }
    },

    getTitleCate() {
      try {
        return this.getCate.text
      } catch (e) {
        return ''
      }
    },
    getCafByCate() {
      try {
        return this.getCate.filter((field) => {
          if (field) {
            return field.text.toLowerCase().includes(this.query.toLowerCase())
          }
        })
      } catch (e) {
        return []
      }
    },
    titleCaf() {
      return this.cafActive.text
    },
    descriptionCaf() {
      try {
        return (
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
          '\n'
        )
      } catch (e) {
        return ''
      }
    }
  },
  async mounted() {},
  watch: {},
  methods: {
    onClose() {
      try {
        this.$emit('close')
      } catch (e) {
        console.log('onClose', e.message)
      }
    },
    searchSubmit(query) {
      console.log('query', query)
    },
    openCafDetail(caf) {
      this.uiShowPreview = true
      this.cafActive = caf
    },

    async changeUse(caf, isRemove) {
      try {
        let options = this.$store.getters['matter/cafs/options']
        let matterId = this.$$matterId,
          cafId = caf.id
        if (isRemove) {
          await this.$store.dispatch('matter/cafs/removeCaf', {
            matterId,
            cafId,
            options
          })
        } else {
          await this.$store.dispatch('matter/cafs/addCaf', {
            matterId,
            cafId,
            options
          })
        }

        this.uiShowPreview = false
      } catch (e) {
        console.log('cafActive', e.message)
        return false
      }
    },
    clickCate(index) {
      this.uiShowPreview = false
      if (this.cateActive == index) {
        this.cateActive = null
      } else {
        this.cateActive = index
      }
    }
  }
}
</script>

<style scoped></style>
