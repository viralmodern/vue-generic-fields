<template>
  <div class="w-100">
    <v-list dense shaped>
      <v-subheader> Apps </v-subheader>
      <v-list-item link active-class="primary--text" to="/generic-fields">
        <v-list-item-icon class="mr-2 caption">
          <img width="15" src="~/assets/img/icons8-settings.svg" />
        </v-list-item-icon>
        <v-list-item-content class="caption">
          <div class="d-flex align-center">
            <p class="ma-0" style="height: 16px; line-height: 18px">Settings</p>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link active-class="primary--text" to="/matters">
        <v-list-item-icon class="mr-2 caption">
          <v-icon small>mdi-apps</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="caption">
          <div class="d-flex align-center">
            <p class="ma-0" style="height: 16px; line-height: 18px">
              All Matter
            </p>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list dense shaped>
      <v-subheader> Unread </v-subheader>
    </v-list>
    <v-list dense shaped>
      <v-subheader> Assigned to Me </v-subheader>
      <template v-if="assignedMatters.length > 0">
        <template v-for="m in assignedMatters">
          <v-list-item
            :to="`/matters/${m.pk}`"
            link
            :key="'mt-mrg-drw-' + m.pk"
          >
            <v-list-item-icon class="mr-2 caption"> # </v-list-item-icon>
            <v-list-item-content
              :style="`color: #${m.color}`"
              v-text="m.name"
            />
          </v-list-item>
        </template>
      </template>
      <v-list-item v-else>
        <v-list-item-icon class="mr-2 caption" v-text="'#'" />
        <v-list-item-content
          class="grey--text caption"
          v-text="'No matter assigned'"
        />
      </v-list-item>
    </v-list>

    <v-list shaped dense>
      <v-subheader> Managed by me </v-subheader>
      <template v-if="manageMatters.length > 0">
        <template v-for="m in manageMatters">
          <v-list-item
            :to="`/matters/${m.pk}`"
            link
            :key="'mt-mrg-drw-' + m.pk"
          >
            <v-list-item-icon class="mr-2 caption"> # </v-list-item-icon>
            <v-list-item-content
              :style="`color: #${m.color}`"
              class="caption"
              v-text="m.name"
            ></v-list-item-content>
            <v-list-item-action
              :id="`managed_matter_${m.pk}`"
              @click="openMenuOptions($event, `managed_matter_${m.pk}`, m)"
            >
              <v-icon small>mdi-dots-vertical</v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
      </template>
      <v-list-item v-else>
        <v-list-item-icon class="mr-2 caption" v-text="'#'" />
        <v-list-item-content
          class="grey--text caption"
          v-text="'No matter managed'"
        />
      </v-list-item>
    </v-list>

    <MenuOptionsAbsolute
      disabled-icon
      :list="optionsDocument"
      @click-item="clickItem"
      v-model="uiShowMenu"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuOptionsAbsolute from '@/sat-vue-toolkit/components/MenuOptionsAbsolute.vue'

export default {
  name: 'DrawerDashboard',
  components: { MenuOptionsAbsolute },
  data() {
    return {
      items: [
        {
          title: 'All Matter',
          icon: 'mdi-folder',
          icon1: 'mdi-view-dashboard',
          link: '/matters',
        },
      ],
      right: null,
      assignedMatters: [],
      manageMatters: [],
      optionsDocument: [
        { text: 'Assign Members' },
        { text: 'Settings' },
        { text: 'Change Color' },
      ],
      uiShowMenu: null,
    }
  },
  async created() {
    /*try {
      let result = await this.$axios.get(
        '/api/matters/?managed_by_me=true&ungroup=true'
      )
      this.manageMatters = result.data.results
    } catch (e) {
      /!*this.$_alertCURD({
        text: 'Fail to load managed matters.',
        type: 'error',
      })*!/
      this.$eventHub.$emit('alert-curd', {
        text: 'Fail to load managed matters.',
        type: 'error',
      })
    }
    try {
      let result = await this.$axios.get(
        '/api/matters/?assigned_to_me=true&ungroup=true'
      )
      this.assignedMatters = result.data.results
    } catch (e) {
      this.$eventHub.$emit('alert-curd', {
        text: 'Fail to load assigned matters.',
        type: 'error',
      })
    }*/
  },
  computed: {
    ...mapGetters({
      findMatterBookMark: 'matters/findMatterBookMark',
    }),
  },
  methods: {
    clickItem() {},
    openMenuOptions(e, id) {
      try {
        e.preventDefault()
        this.uiShowMenu = `#${id}`
        e.stopPropagation()
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
