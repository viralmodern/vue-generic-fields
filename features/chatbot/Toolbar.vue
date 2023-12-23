<template>
  <v-toolbar color="purple lighten-2" dark>
    <!--<button @click="eventClickPages" class="button button-clear item">reload with pages</button>
    <span class="line">|</span>
    <button @click="eventClickFew" class="button button-clear item">reload with few</button>
    <span class="line">|</span>
    <button @click="eventClickEmpty" class="button button-clear item">reload with empty</button>-->
    <!-- <v-avatar size="25">
      <v-icon>mdi-message</v-icon>
    </v-avatar>-->
    <v-badge bottom color="green" dot offset-x="10" offset-y="10">
      <v-avatar size="25">
        <v-icon>mdi-message</v-icon>
      </v-avatar>
    </v-badge>
    <div class="mx-2"></div>
    <v-toolbar-title>
      @DocketBot
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon text @click="closeChatBot">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { LOAD_TYPES, setLoadType } from './util'
import pic from 'assets/img/logo_thumb.png'
export default {
  name: 'ToolBarChatBot',
  props: {
    avatar: {
      default: () => pic,
    },
  },
  methods: {
    closeChatBot() {
      this.$trigger('closeChatBot')
    },
    eventClickEmpty() {
      setLoadType(LOAD_TYPES.EMPTY)
      this.reload()
    },

    eventClickPages() {
      setLoadType(LOAD_TYPES.PAGES)
      this.reload()
    },

    eventClickFew() {
      setLoadType(LOAD_TYPES.FEW)
      this.reload()
    },

    reload() {
      window.location.reload()
    },
  },
}
</script>

<style lang="scss" scoped></style>
