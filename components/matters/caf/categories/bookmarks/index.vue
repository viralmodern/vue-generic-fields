<template>
  <base-caf>
    <v-card :elevation="0">
      <v-card-title>
        <v-icon left> mdi-bookmark</v-icon>
        Bookmarks
      </v-card-title>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi, eos, error excepturi illo magni,
        molestiae nemo officia quod quos tempore totam! Adipisci hic id ipsa quisquam tempora ullam vel?
      </v-card-text>
      <v-card-text>
        <v-hover v-slot:default="{ hover }">
          <v-alert border="left"
                   colored-border
                   color="deep-purple accent-4"
                   elevation="2">
            <v-list-item>
              <v-list-item-icon>
                <v-avatar color="primary" class="white--text"
                          size="40"
                          title="viet@mailinator.com">
                  VH
                </v-avatar>
              </v-list-item-icon>
              <v-list-item-content>
                <div class="d-flex mb-4">
                  <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
                  <v-icon class="ml-2">mdi-map-marker</v-icon>
                  <v-chip class="ml-2">
                    <v-icon left>mdi-clock</v-icon>
                    02/12/2019
                  </v-chip>
                  <v-spacer></v-spacer>
                  <v-btn absolute right top text icon v-show="hover" @click="uiShowAction = $event">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </div>
                Aliquam eu nunc. Fusce commodo aliquam arcu. In consectetuer turpis ut velit. Nulla facilisi..
                Morbi mollis tellus ac sapien. Fusce vel dui. Praesent ut ligula non mi varius sagittis. Vivamus
                consectetuer
                hendrerit lacus. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
              </v-list-item-content>
              <v-list-item-action>
                <v-btn class="mt-2" text small icon v-show="hover" to="#bookmark/2" absolute bottom right>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-alert>
        </v-hover>

        <v-hover v-slot:default="{ hover }">
          <v-alert border="left"
                   colored-border
                   color="deep-purple accent-4"
                   elevation="2">
            <v-list-item>
              <v-list-item-icon>
                <v-avatar color="primary" class="white--text"
                          size="40"
                          title="viet@mailinator.com">
                  VH
                </v-avatar>
              </v-list-item-icon>
              <v-list-item-content>
                <div class="d-flex mb-4">
                  <v-breadcrumbs :items="items2" divider=">"></v-breadcrumbs>
                  <v-icon class="ml-2" color="warning">mdi-flag</v-icon>
                  <v-chip class="ml-2">
                    <v-icon left>mdi-clock</v-icon>
                    02/12/2019
                  </v-chip>
                  <v-spacer></v-spacer>
                  <v-btn absolute right top text icon v-show="hover" @click="uiShowAction = $event">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </div>
                Hendrerit lacus. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
              </v-list-item-content>
              <v-list-item-action>
                <v-btn text icon v-show="hover" to="#bookmark/2" small absolute bottom right class="mt-2">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-alert>
        </v-hover>


      </v-card-text>
    </v-card>
    <actions-user v-if="uiShowAction"
                  icon
                  :event="uiShowAction">
      <v-list dense>
        <v-list-item link>
          <v-list-item-content>
            Remove bookmark
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </actions-user>
  </base-caf>
</template>

<script>
  import BaseCaf from "../../utils/BaseCaf"
  import ActionsUser from "../../../matter/settings/team-management/ActionsUser"

  export default {
    name: "index",
    components: { ActionsUser, BaseCaf },
    data () {
      return {
        uiShowAction: false,
        items: [
          {
            text: "All matter",
            disabled: false,
            href: "breadcrumbs_dashboard"
          },
          {
            text: "D1",
            disabled: false,
            href: "breadcrumbs_link_1"
          },
          {
            text: "Court district/D. Alaska",
            disabled: true,
            href: "breadcrumbs_link_2"
          }
        ],
        items2: [
          {
            text: "All matter",
            disabled: false,
            href: "breadcrumbs_dashboard"
          },
          {
            text: "D1",
            disabled: false,
            href: "breadcrumbs_link_1"
          },
          {
            text: "Priority/Very low",
            disabled: true,
            href: "breadcrumbs_link_2"
          }
        ],

      }
    }
  }
</script>

<style scoped>

</style>
