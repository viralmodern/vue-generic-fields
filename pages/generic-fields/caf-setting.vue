<template>
  <GenericFieldsBaseViews>
    <v-container fluid>
      <CurdCaf $$endpoint="/api/users/me" :matter-id="matter">
        <template
          slot-scope="{ data: listCafByMatter, loading, update: updateCaf }"
        >
          <v-row>
            <v-col>
              <div>
                <CurdModel
                  $$endpoint="/api/matters"
                  :filter="{
                    ungroup: true,
                    managed_by_me: true,
                    search: searchMatter,
                  }"
                >
                  <template slot-scope="{ data: posts, loading, load }">
                    <div>
                      <v-autocomplete
                        @update:search-input="updateSearch"
                        :loading="loading"
                        class="pa-0 ma-0"
                        dense
                        v-model="matter"
                        :full-width="false"
                        small-chips
                        hide-details
                        :items="posts | allMatter"
                        item-value="pk"
                        item-text="name"
                        :menu-props="{ offsetY: true }"
                        label="Choose Matter"
                        outlined
                      >
                      </v-autocomplete>
                    </div>
                  </template>
                </CurdModel>
              </div>
            </v-col>
            <v-col>
              <div>
                <div>
                  <v-autocomplete
                    :disabled="!matter"
                    class="pa-0 ma-0"
                    return-object
                    dense
                    v-model="caf"
                    :full-width="false"
                    small-chips
                    hide-details
                    :items="listCafByMatter"
                    item-value="id"
                    item-text="text"
                    :menu-props="{ offsetY: true }"
                    label="Choose CAF"
                    outlined
                  >
                  </v-autocomplete>
                </div>
              </div>
            </v-col>
            <v-col>
              <template v-if="uiShowCafSetting">
                <div class="d-flex align-center">
                  <v-spacer />
                  <!--<v-switch @change="(val) => updateCaf({cafId: caf.id, data: {visibility: val}})"
                            v-model="caf.visibility"
                            hide-details
                            class="ma-0 pa-0"
                            :ripple="false"
                            label="Visibility?"
                            persistent-hint
                            color="primary"
                  ></v-switch>-->
                  <v-switch
                    @change="
                      (val) =>
                        updateCaf({ cafId: caf.id, data: { visibility: val } })
                    "
                    v-model="caf.visibility"
                    :label="`Visibility?`"
                  ></v-switch>
                  <div class="mx-2"></div>
                  <ChooseColor
                    v-model="caf.color"
                    @input="
                      (val) =>
                        updateCaf({ cafId: caf.id, data: { color: val } })
                    "
                  />
                </div>
              </template>
            </v-col>
          </v-row>
        </template>
      </CurdCaf>
      <v-card tile v-if="uiShowCafSetting">
        <v-divider />
        <v-tabs
          v-model="tab"
          slider-color="warning"
          background-color="transparent"
        >
          <v-tab
            exact
            v-for="(item, index) in items"
            :key="`${item.path}-${index}`"
            :to="`/generic-fields/caf-setting/${item.path}`"
            class="text-capitalize text-subtitle-2 black--text"
          >
            <v-icon small left>{{ item.icon }}</v-icon>
            {{ item.text }}
          </v-tab>
        </v-tabs>
        <nuxt-child
          :to-model="cafToModel"
          :caf-id="cafID"
          :title="cafTitle"
          :matter-id="matter"
        />
      </v-card>
    </v-container>
  </GenericFieldsBaseViews>
</template>

<script>
import GenericFieldsBaseViews from '../../features/generic-fields/components/GenericFieldsBaseViews'
import ChooseColor from '../../components/utils/ChooseColor'
import { ALL_CAF } from '../../mock/fields'
import _ from 'lodash'
import CurdModel from '../../features/generic-fields/components/CurdModel'
import CurdCaf from '../../components/utils/CurdCaf'

export default {
  components: { CurdCaf, CurdModel, ChooseColor, GenericFieldsBaseViews },
  layout: 'app',
  data() {
    return {
      color: null,
      caf: null,
      searchMatter: '',
      matter: null,
      tab: null,
      items: [
        {
          text: 'Setting',
          path: 'setting',
          icon: 'mdi-settings',
        },
        {
          text: 'Permission',
          path: 'permission',
          icon: ' mdi-security',
        },
        {
          text: 'Activities',
          path: 'activities',
          icon: 'mdi-flash',
        },
        {
          text: 'Information',
          path: '',
          icon: 'mdi-information',
        },
      ],
    }
  },
  computed: {
    uiShowCafSetting() {
      return !!this.caf
    },
    cafID() {
      try {
        return this.caf.id
      } catch (e) {
        return ''
      }
    },
    cafTitle() {
      try {
        return this.caf.text
      } catch (e) {
        return ''
      }
    },
    cafToModel() {
      try {
        return this.caf.to_model
      } catch (e) {
        return ''
      }
    },
    ALL_CAF() {
      return ALL_CAF
    },
  },
  methods: {
    updateSearch: _.debounce(function (text) {
      this.searchMatter = text
    }, 800),
    test() {
      console.log('TEST', arguments)
    },
  },
  filters: {
    allMatter(post) {
      console.log('allMatter', arguments)
      try {
        return post.results
      } catch (e) {
        return []
      }
    },
  },
}
</script>

<style scoped></style>
