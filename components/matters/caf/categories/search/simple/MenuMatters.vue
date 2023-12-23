<template>
  <v-menu offset-y left :close-on-content-click="false" v-model="showMenu">
    <template v-slot:activator="{ on }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            class="text-capitalize"
            @click="showMenu = true"
            small
            depressed
          >
            <v-icon small left>mdi-folder</v-icon>
            Matters {{ totalSelected }}
            <v-icon small right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <span>Matters</span>
      </v-tooltip>
    </template>
    <v-card v-if="showMenu" :loading="pending" max-width="250">
      <v-autocomplete
        background-color="white"
        v-model="selected"
        :items="list"
        solo
        dense
        multiple
        return-object
        hide-details
        prepend-inner-icon="mdi-magnify"
        color="blue-grey lighten-2"
        placeholder="Search matters"
        item-text="name"
        item-value="matterID"
      >
        <template v-slot:selection="data">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-chip
                small
                v-on="on"
                label
                dark
                draggable
                :color="data.item.priorityColor"
                >{{ data.item.name | $$strName }}
              </v-chip>
            </template>
            {{ data.item.name }}
          </v-tooltip>
        </template>
        <template v-slot:item="data">
          <v-list-item-avatar color="primary" size="25">
            <span
              class="white--text font-weight-bold"
              style="font-size: 65%;"
              >{{ data.item.name | $$strName }}</span
            >
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
            <v-list-item-subtitle
              v-html="data.item.jurisdictionTitle"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-card>
  </v-menu>
</template>

<script>
import { Matter } from '../../../../../../models/matter'
import { $$strName } from '@/sat-vue-toolkit/functions'

export default {
  filters: {
    $$strName,
  },
  data: () => ({
    showMenu: false,
    selected: [],
    list: [],
    pending: false,
  }),
  async mounted() {
    await this.fetchList()
  },
  computed: {
    totalSelected() {
      return this.selected.length > 0 ? '+' + this.selected.length : ''
    },
  },
  methods: {
    remove() {},
    change(item) {
      try {
      } catch (e) {}
    },
    fetchList() {
      this.pending = true
      this.$axios
        .get('/api/matters/?ungroup=true')
        .then((rs) => {
          this.list = rs.data.results.map((matter) => new Matter(matter))
          this.co
        })
        .catch((err) => {})
        .finally(() => {
          this.pending = false
        })
    },
  },
  watch: {
    selected(n) {},
  },
}
</script>

<style scoped></style>
