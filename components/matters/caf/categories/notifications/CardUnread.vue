<template>
  <v-card max-width="500">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Notifications</v-toolbar-title>
      <v-spacer></v-spacer>
      <!--<v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>-->
      <v-text-field
        solo
        v-model="search"
        single-line
        light
        hide-details
        flat
        placeholder="Search"
        dense
        append-icon="mdi-magnify"
      ></v-text-field>
      <v-divider vertical></v-divider>
      <v-btn icon @click="uiShowAllAction = $event">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list two-line>
      <v-list-item v-if="!items.length">
        <v-list-item-content>
          <v-list-item-action-text
            >No notifications has been added!</v-list-item-action-text
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item-group
        v-model="selected"
        multiple
        active-class="primary--text"
      >
        <template v-for="(item, index) in items">
          <v-list-item :key="item.title">
            <template v-slot:default="{ active, toggle }">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                  <v-chip label x-small class="ml-2">{{ item.action }}</v-chip>
                </v-list-item-title>
                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.headline"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-text="item.subtitle"
                ></v-list-item-subtitle>
                <!--                <v-list-item-subtitle v-text="item.action"></v-list-item-subtitle>-->
              </v-list-item-content>
              <v-list-item-action>
                <!--                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>-->
                <v-icon v-if="!active" color="grey lighten-1"
                  >mdi-star-outline
                </v-icon>
                <v-icon v-else color="yellow">
                  mdi-star
                </v-icon>
              </v-list-item-action>
              <v-list-item-action>
                <v-btn
                  icon
                  @click="
                    uiShowAction = $event
                    resultActive = item
                  "
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <actions-user
      v-if="uiShowAction"
      @changeMenu="changeActionMember"
      icon
      :event="uiShowAction"
    >
      <v-list dense>
        <v-list-item link>
          Mark As Unread
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link @click="delUnread">
          Delete
        </v-list-item>
      </v-list>
    </actions-user>
    <actions-user
      v-if="uiShowAllAction"
      @changeMenu="changeAllUnread"
      icon
      :event="uiShowAllAction"
    >
      <v-list dense>
        <v-list-item link>
          Mark all as Read
        </v-list-item>
      </v-list>
    </actions-user>
  </v-card>
</template>

<script>
import ActionsUser from '../../../matter/settings/team-management/ActionsUser'

export default {
  name: 'CardUnread',
  components: { ActionsUser },
  data: () => ({
    selected: [2],
    list: [
      {
        action: '15 min',
        headline: 'Brunch this weekend?',
        title: 'Ali Connors',
        subtitle:
          "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        icon: 'mdi-send'
      },
      {
        action: '2 hr',
        headline: 'Summer BBQ',
        title: 'me, Scrott, Jennifer',
        subtitle: "Wish I could come, but I'm out of town this weekend.",
        icon: 'mdi-account-plus'
      },
      {
        action: '6 hr',
        headline: 'Oui oui',
        title: 'Sandra Adams',
        subtitle: 'Do you have Paris recommendations? Have you ever been?',
        icon: 'mdi-label'
      },
      {
        action: '12 hr',
        headline: 'Birthday gift',
        title: 'Trevor Hansen',
        subtitle:
          'Have any ideas about what we should get Heidi for her birthday?',
        icon: 'mdi-send'
      },
      {
        action: '18hr',
        headline: 'Recipe to try',
        title: 'Britta Holt',
        subtitle:
          'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        icon: 'mdi-email'
      }
    ],
    uiShowAction: false,
    uiShowAllAction: false,
    resultActive: null,
    search: ''
  }),
  computed: {
    items: {
      get() {
        let _search = this.search || ''
        return this.list.filter((field) => {
          if (field) {
            return field.title.toLowerCase().includes(_search.toLowerCase())
          }
        })
      }
    }
  },
  methods: {
    changeActionMember() {},
    changeAllUnread() {},
    delUnread() {
      try {
        let index = this.list.findIndex(
          (i) => i.title === this.resultActive.title
        )
        if (index >= 0) {
          this.list.splice(index, 1)
        }
      } catch (e) {
        console.log(e.message, this.resultActive)
      }
    }
  }
}
</script>

<style scoped></style>
