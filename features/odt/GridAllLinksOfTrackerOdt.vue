<template>
  <div>
    <SlickGrid
      count-label-singular="Link"
      count-label-many="Links"
      :has-vote-row="false"
      :end-point="endPoint"
      :owner-pk="ownerPk"
      :height="height"
      :show-quick-add-row="false"
      bus-event-name="bus-odt-tracker-links"
      :attributes="attributes"
      main-cell-id="link"
      no-link-detail
      no-group
      disabled-bookmark-row
      disabled-add-new-column
      :has-report-row="false"
    >
      <template v-slot:right-header>
        <div class="w-100 d-flex">
          <v-spacer />
          <v-btn
            @click="openModal"
            rounded
            small
            depressed
            color="primary"
            class="text-capitalize caption"
            >Add multiple
          </v-btn>
        </div>
        <div class="mx-1"></div>
        <v-btn
          rounded
          :loading="loadingAutoGet"
          :disabled="loadingAutoGet"
          @click="handleAutoGet"
          small
          depressed
          color="primary"
          class="text-uppercase caption"
        >
          autoget
        </v-btn>
      </template>
    </SlickGrid>
    <DrawerPicker v-model="uiShowPanel">
      <template v-if="uiShowModalAutoGet">
        <v-card flat>
          <v-card-title class="sticky_title">
            Docket with keywords:
            <div class="mx-1"></div>
            <v-chip
              small
              class="mr-2"
              v-for="keyword in keyWords"
              :key="keyword"
            >
              {{ keyword }}
            </v-chip>
            <v-spacer />
            <v-btn
              :loading="loadingAutoGet"
              :disabled="loadingAutoGet || !linksAutoGet.length"
              rounded
              small
              color="primary"
              @click="updateLinksAutoGet"
              >Submit
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div>
              <p>
                <a
                  class="caption text-decoration-none"
                  :href="linkAutoGetSearch"
                  v-if="linkAutoGetSearch"
                  target="_blank"
                >
                  {{ linkAutoGetSearch }}
                </a>
                <strong class="caption ml-2" v-if="labelResults">{{
                  labelResults
                }}</strong>
              </p>
            </div>
            <v-virtual-scroll
              height="550"
              :items="linksAutoGet"
              item-height="64"
            >
              <template v-slot="{ item, index }">
                <v-list-item :key="item" class="pl-0">
                  <v-list-item-content>
                    <a
                      target="_blank"
                      :style="{ color: `${getError(index) && `red`}` }"
                      class="caption text-decoration-none"
                      :href="item"
                      >{{ item }}</a
                    >
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-btn icon @click="deleteLinkAutoGet(item, index)" small>
                      <v-icon color="red" small>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-icon>
                </v-list-item>
                <v-divider />
              </template>
            </v-virtual-scroll>
          </v-card-text>
        </v-card>
      </template>
      <template v-if="uiShowModal">
        <FormModel
          @submitted="submitted"
          @submitting=""
          @errored=""
          :endpoint="`${endPoint}create-multi/`"
        >
          <template #default="{ submit: createPost, submitting, rules, error }">
            <v-card flat tile :loading="submitting">
              <v-card-title> Enter links url</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="createPost(post)">
                  <v-textarea
                    autofocus
                    v-model="links"
                    placeholder="Paste here..."
                    :error-messages="error.links"
                  />
                  <div class="d-flex">
                    <v-spacer />
                    <v-btn
                      :loading="submitting"
                      :disabled="submitting"
                      type="submit"
                      class="text-capitalize"
                      color="primary"
                      >Save
                    </v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </template>
        </FormModel>
      </template>
    </DrawerPicker>
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'

import {
  ATTRIBUTE_FIELDS,
  TYPE_ODT_SEARCH,
} from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import { $$getCourtByUrlId } from '@/mock/AllCourts'
import { $$arrToString } from '@/sat-vue-toolkit/functions'
import BtnLink from '@/sat-vue-toolkit/components/BtnLink.vue'
import { find } from 'linkifyjs'
import FormModel from '~/sat-vue-toolkit/components/FormModel'
import DrawerPicker from '~/components/utils/DrawerPicker.vue'

export default {
  name: 'GridAllLinksOfTrackerOdt',
  components: { DrawerPicker, FormModel, BtnLink, SlickGrid },
  filters: {
    $$arrToString,
    $$getCourtByUrlId,
  },
  data() {
    return {
      uiShowModal: false,
      uiShowModalAutoGet: false,
      errorLinks: null,
      links: '',
      loadingAutoGet: false,
      linksAutoGet: [],
      linkAutoGetSearch: '',
      totalSearchResult: 0,
      errorsAutoGet: {},
    }
  },
  props: {
    type: {
      default: () => TYPE_ODT_SEARCH.RECAP,
    },
    height: {
      default: () => `${80}vh`,
    },
    endPoint: {
      type: String,
      default: `/api/trackers/`,
    },
    detail: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    post() {
      try {
        let strLinks = this.links
        let ls = find(strLinks)
        let links = ls.map((l) => l.value)
        return { links }
      } catch (e) {
        return false
      }
    },
    ownerPk() {
      try {
        return this.$store.getters['auth/user']['pk']
      } catch (e) {
        return ''
      }
    },
    attributes() {
      let {
        params: { tracker },
      } = this.$route
      return [
        {
          name: 'link',
          type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
          width: 450,
          list: [],
          required: true,
        }, // N/A
        {
          name: 'last_synced',
          type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
          width: 250,
          list: [],
          readOnly: true,
        }, // N/A
        {
          name: 'docket',
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          width: 250,
          list: [],
          readOnly: true,
          pathLink: function () {
            // let tracker = this['pk']
            let docket = this['docket']
            return `/odt/t/${tracker}/dockets/${docket}/`
          },
        }, // N/A
      ]
    },
    keyWords() {
      return this.detail.keywords || []
    },
    labelResults() {
      let { totalSearchResult } = this
      if (!totalSearchResult) {
        return false
      }
      let isMany = totalSearchResult >= 2
      return `(${totalSearchResult} ${(isMany && `Cases`) || `Case`})`
    },
    uiShowPanel: {
      get() {
        let { uiShowModal, uiShowModalAutoGet } = this
        return uiShowModal || uiShowModalAutoGet
      },
      set(show) {
        let { uiShowModal, uiShowModalAutoGet } = this
        if (show) {
          if (uiShowModal) {
            this.uiShowModalAutoGet = false
          } else if (uiShowModalAutoGet) {
            this.uiShowModal = false
          }
        } else {
          this.uiShowModal = false
          this.uiShowModalAutoGet = false
        }
      },
    },
  },
  methods: {
    closeModal() {
      this.uiShowModal = false
      this.uiShowModalAutoGet = false
    },
    openModal() {
      this.uiShowModal = true
    },
    async handleAutoGet() {
      let {
        params: { tracker },
      } = this.$route
      try {
        this.loadingAutoGet = true
        let res = await this.$api.get(`/api/trackers/${tracker}/docket-links/`)
        this.totalSearchResult = res['data']['links'].length
        this.linksAutoGet = res['data']['links']
        this.linkAutoGetSearch = res['data']['search_url']
        this.uiShowModalAutoGet = true
        this.errorsAutoGet = {}
      } catch (e) {
      } finally {
        this.loadingAutoGet = false
      }
    },
    submitted(links) {
      console.log(arguments)
      this.links = ''
      this.$eventHub.$emit('bus-odt-tracker-links', { rows: links })
    },
    deleteLinkAutoGet(link, index) {
      if (!window.confirm(`Want to delete ${link}`)) {
        return
      }
      let { errorsAutoGet } = this
      let links = [...this.linksAutoGet]
      links = links.filter((l) => {
        return l.localeCompare(link) !== 0
      })
      this.linksAutoGet = [...links]
      let tempErrorsAutoGet = { ...errorsAutoGet }
      delete tempErrorsAutoGet[index]
      this.errorsAutoGet = { ...tempErrorsAutoGet }
    },
    async updateLinksAutoGet() {
      try {
        let { endPoint, linksAutoGet } = this
        this.loadingAutoGet = true
        let res = await this.$api.post(`${endPoint}create-multi/`, {
          links: linksAutoGet,
        })
        this.linksAutoGet = []
        console.log(res)
        this.$eventHub.$emit('bus-odt-tracker-links', { rows: res['data'] })
        this.errorsAutoGet = []
        this.closeModal()
      } catch (e) {
        if (e.response) {
          let error = e.response.data
          let errors = error['links']
          let { errorsAutoGet } = this
          let tempErrorsAutoGet = {}
          errors.forEach((v, i) => {
            tempErrorsAutoGet[i] = true
          })
          this.errorsAutoGet = { ...tempErrorsAutoGet }
        }
      } finally {
        this.loadingAutoGet = false
      }
    },
    getError(index) {
      return Boolean(this.errorsAutoGet[index])
    },
  },
}
</script>

<style lang="scss">
.theme--dark {
  .sticky_title {
  }
}
</style>
<style scoped lang="scss">
.sticky_title {
  position: sticky;
  top: 0px;
  background: #ffffff;
  z-index: 2;
}
</style>
