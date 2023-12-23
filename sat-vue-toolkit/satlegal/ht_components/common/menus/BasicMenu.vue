<template>
  <v-menu
    :value="isShowMenu"
    :nudge-width="width"
    @input="$emit('closeMenu')"
    offset-y
    :close-on-content-click="false"
    absolute
    :position-x="positionX"
    :position-y="positionY"
  >
    <v-card>
      <v-card-title class="pa-2">
        <span style="font-size:18px">{{ title }}</span>
        <v-spacer></v-spacer>
        <v-btn small @click="$emit('closeMenu')" class="ma-0" icon>
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text
        :class="`pa-1 ${scrollable ? 'scrollable' : ''}`"
        :style="`max-height: ${maxHeight || ''}`"
      >
        <slot name="content"></slot>
      </v-card-text>
      <v-card-actions class="mx-2">
        <slot name="action"></slot>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    width: [String, Number],
    title: String,
    isShowMenu: Boolean,
    positionX: {
      type: Number,
      default: () => 0
    },
    positionY: {
      type: Number,
      default: () => 0
    },
    maxHeight: String,
    scrollable: Boolean
  }
};
</script>

<style scoped>
.scrollable {
  overflow-x: auto;
}
</style>
