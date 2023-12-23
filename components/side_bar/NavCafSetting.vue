<template>
  <div>
    <v-list shaped dense>
      <v-subheader>
        Default CAF
        <div class="flex-grow-1"></div>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn small icon color="primary" @click="uiShowQuickSearch = true">
              <v-icon v-on="on">mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Add CAF</span>
        </v-tooltip>
      </v-subheader>
      <v-list-item
        active-class="primary--text"
        v-for="(caf, i) in AllCafs"
        :key="i"
        link
        :to="path_caf + '/' + slugPath(caf.text)"
      >
        <v-list-item-icon class="mr-2 caption">
          #
        </v-list-item-icon>
        <v-list-item-content
          class="caption"
          v-text="caf.text"
        ></v-list-item-content>
        <v-list-item-action class="my-0" @click="openMenu($event, caf)">
          <v-icon small>mdi-dots-vertical</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <MenuCafOptions ref="menu-options"></MenuCafOptions>
    <QuickAllCAF
      v-if="uiShowQuickSearch"
      @close="uiShowQuickSearch = false"
    ></QuickAllCAF>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuCafOptions from '../matters/caf/utils/MenuCafOptions'
import QuickAllCAF from '../matters/caf/categories/QuickAllCAF'
import slugify from 'slugify'
import mx_matterId from '~/mixins/mx_matterId'
export default {
  name: 'NavCafSetting',
  components: {
    QuickAllCAF,
    MenuCafOptions,
  },
  mixins: [mx_matterId],
  data() {
    return {
      active: null,
      openMenuOptions: false,
      uiShowQuickSearch: false,
    }
  },
  computed: {
    ...mapGetters({
      matterDetail: 'matters/matterDetail',
    }),
    path_caf() {
      const {
        params: { matter },
      } = this.$route
      return `/matters/${matter}/caf`
    },
    AllCafs() {
      return this.$store.getters['matter/cafs/findCafByMatter'](
        this.$$matterId
      ).filter((caf) => caf.activate)
    },
  },
  methods: {
    openMenu(e, item) {
      e.preventDefault()
      this.openMenuOptions = true
      console.log(this.$refs['menu-options'])
      this.$refs['menu-options'].show(e)
      this.active = item
      return false
    },
    slugPath(text) {
      return slugify(text).toLowerCase()
    },
  },
}
</script>

<style scoped lang="scss">
.btn_x_none {
  opacity: 0;
}

.btn_x_show {
}

.hover_item {
  .btn_x_show.active {
    opacity: 1;
  }

  &:hover {
    .btn_x_show {
      opacity: 1;
    }
  }
}
</style>
