<template>
  <v-main>
    <v-card flat>
      <DocketEntryDetail ref="docketDetail" :$$endpoint="docketEntryPath">
        <template
          slot-scope="{ detail, matter, loading, error, documentSelected }"
        >
          <v-container fluid>
            <v-skeleton-loader
              v-if="loading"
              type="card-avatar, article, actions"
            ></v-skeleton-loader>
            <v-card v-else-if="!error" flat :loading="loading">
              <v-card-text class="py-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="text-h5">
                      <!--                  Notice (Other) - Document #136-->
                      {{ matter.name }} - {{ matter.description }}
                      <v-btn
                        icon
                        @click="
                          $eventHub.$emit('alert-curd', {
                            type: 'success',
                            text: 'Docket Bookmarked',
                          })
                        "
                      >
                        <v-icon>mdi-bookmark</v-icon>
                      </v-btn>
                    </div>
                    <p class="mb-0">
                      {{ matter.jurisdictionTitle }}
                    </p>
                    <p class="mb-0 text-caption">
                      <strong>Docket Number:</strong>
                      <nuxt-link to="#">
                        #{{ matter.docket_number }}
                      </nuxt-link>
                    </p>
                    <p class="mb-0 text-caption">
                      <strong>Date Filed:</strong>
                      {{ detail.date_added }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-toolbar dense flat>
                      <v-spacer />
                      <div class="d-flex">
                        <v-btn small icon>
                          <v-icon small>mdi-tag</v-icon>
                        </v-btn>
                        <div class="flex-grow-1">
                          <template v-for="label in detail.labels">
                            <v-chip
                              label
                              :color="`#${label.color}`"
                              small
                              dark
                              class="mr-2"
                            >
                              {{ label.name }}
                            </v-chip>
                          </template>
                        </div>
                      </div>
                      <DocketEntryAssignMembers :items="detail.members" />
                      <v-badge
                        :content="detail.comment_count"
                        :value="detail.comment_count"
                        overlap
                      >
                        <v-btn small icon @click="openComment">
                          <v-icon small>mdi-comment</v-icon>
                        </v-btn>
                      </v-badge>
                    </v-toolbar>
                    <div>
                      <!--{{detail}}-->
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="3">
                    <ListDirectoriesDocket
                      :items="detail.documents"
                      :matter-id="$route.params.matter"
                      :docket-entry="$route.params.docket"
                    />
                  </v-col>
                  <v-col cols="12" md="9">
                    <TopBarDocketDetail :links="pathsLink" />
                    <!--                    <ContentDocketDetail document=""/>-->
                    <nuxt-child :documents="detail.documents" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <NotesForm :end-point="`${docketEntryPath}notes/`" />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-container>
        </template>
      </DocketEntryDetail>
    </v-card>
  </v-main>
</template>

<script>
import ListDirectoriesDocket from '../../../../../features/simple-docket/ListDirectoriesDocket.vue'
import TopBarDocketDetail from '../../../../../features/simple-docket/TopBarDocketDetail.vue'
import ButtonTooltip from '../../../../../components/utils/ButtonTooltip.vue'
import BreadCrumbs from '../../../../../features/simple-docket/components/details/BreadCrumbs.vue'
import DocketEntryAssignMembers from '../../../../../features/simple-docket/components/details/DocketEntryAssignMembers.vue'
import DocketEntryDetail from '../../../../../features/simple-docket/components/details/DocketEntryDetail'
import NotesForm from '@/sat-vue-toolkit/components/slick-grid/attributes/notes/NotesForm.vue'
import uniqBy from 'lodash/uniqBy'
import map from 'lodash/map'
import toLower from 'lodash/toLower'

const requireComponent = require.context(
  // The relative path of the components folder
  '@/pages/matters/_matter/caf/simple-docket/_docket/document/_document/view',
  // Whether or not to look in subfolders
  false
)
const listFileName = uniqBy(
  map(requireComponent.keys(), (fileName) => {
    return toLower(fileName.replace('./', '').replace('.vue', ''))
  })
)

export default {
  components: {
    NotesForm,
    DocketEntryDetail,
    DocketEntryAssignMembers,
    BreadCrumbs,
    ButtonTooltip,
    TopBarDocketDetail,
    ListDirectoriesDocket,
  },
  computed: {
    docketEntryPath() {
      try {
        return `/api/matters/${this.$route.params.matter}/docket-entries/${this.$route.params.docket}/`
      } catch (e) {
        return null
      }
    },
    totalComments() {
      try {
        return this.$store.getters['comments/findCommentByEndpoint'](
          this.docketEntryPath
        )['totalComments']
      } catch (e) {
        return null
      }
    },
    pathsLink() {
      console.log(this.$route)
      let { name, path, params } = this.$route
      let parentPath = `/matters/${params.matter}/caf/simple-docket/${params.docket}/document/${params.document}`
      return listFileName.map((item) => {
        let temp = {}

        temp['text'] = item
        temp['to'] = `${parentPath}/view/${item}`
        // temp['name'] = `${name}-view-${item}`
        return temp
      })
    },
  },
  mounted() {
    this.$eventHub.$on('closed-comment', (data) => {
      document.documentElement.classList.remove('no_scroll')
      if (data) {
        if (data['total']) {
          console.log(this.$refs.docketDetail)
          // this.$refs.docketDetail.load()
        }
      }
    })
  },
  methods: {
    openComment() {
      this.$eventHub.$emit('menu-cell-comments', {
        endPoint: `${this.docketEntryPath}null/comments/`,
        title: this.$route.params.docket,
      })
    },
    openDetailDocket() {},
  },
}
</script>

<style scoped></style>
