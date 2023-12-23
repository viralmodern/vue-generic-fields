<template>
  <v-card tile width="100%" :loading="$store.getters['userSettings/loading']">
    <div class="d-flex align-center">
      <v-menu
        max-height="45vh"
        allow-overflow
        offset-y
        top
        open-on-hover
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            width="50px"
            v-on="on"
            tile
            small
            dark
            color="#363636"
            height="30px"
            style="min-width: unset; min-height: unset"
            class="pa-0 ma-0"
          >
            <v-icon small>mdi-apps</v-icon>
          </v-btn>
        </template>
        <TheLitigationResearchList />
      </v-menu>
      <v-menu max-height="45vh" allow-overflow offset-y top open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn
            width="50px"
            v-on="on"
            tile
            small
            dark
            color="#363636"
            height="30px"
            style="min-width: unset; min-height: unset"
            class="pa-0 ma-0"
          >
            <v-icon small> mdi-view-headline </v-icon>
          </v-btn>
        </template>
        <PinMenuListPinned />
      </v-menu>
      <v-tabs
        style="width: calc(100% - 100px)"
        height="30px"
        class="tab-content-pin"
        dark
        background-color="#363636"
        show-arrows
      >
        <v-tabs-slider color="warning"></v-tabs-slider>
        <v-tab
          v-for="(item, index) in pinned"
          :key="`${item.path}-${index}`"
          exact
          :title="item.title"
          :to="item.fullPath"
        >
          <div
            class="text-capitalize caption text-no-wrap text-title-pin"
            v-html="item.title"
          ></div>
        </v-tab>
      </v-tabs>
    </div>
  </v-card>
</template>

<script>
import PinMenuListPinned from '~/features/odt/PinMenuListPinned'
import TheLitigationResearchList from '~/features/odt/TheLitigationResearchList'
export default {
  name: 'PinContainerOdt',
  components: { TheLitigationResearchList, PinMenuListPinned },
  computed: {
    pinned() {
      try {
        return this.$store.getters['userSettings/pinnedServe']
      } catch (e) {
        console.log('pinnedRoute', e.message)
        return []
      }
    },
  },
}
</script>

<style scoped lang="scss">
.tab-content-pin {
  /*border: solid 1px red;*/
  .text-title-pin {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
