<template>
  <div class="d-flex align-center sub-item-tab">
    <v-btn
      depressed
      text
      small
      class="text-capitalize caption"
      rounded
      :active-class="isFrozen ? `orange--text` : `primary--text`"
      :input-value="isFrozen || activeSub"
      @click="onChangeSub"
    >
      {{ subLabel }}
      <!--      <v-icon small class="sub-item-tab&#45;&#45;icon mr-n4">mdi-dots-vertical</v-icon>-->
    </v-btn>
  </div>
</template>

<script>
import { EVENTS_NAME } from '~/features/odt/generic/genericCore'

export default {
  name: 'LinkSubItemGeneric',
  props: {
    isFrozen: {
      type: Boolean,
      default: () => false,
    },
    subLabel: {
      type: String,
      default: () => 'Item',
    },
    subId: {
      type: [String, Number],
      default: () => '',
    },
    activeSub: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    onChangeSub() {
      let { subId } = this
      if (subId) {
        this.$trigger(EVENTS_NAME.CHANGE_SUB, subId)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.sub-item-tab {
  /*border: solid 1px red;*/
  .sub-item-tab--icon {
    opacity: 0;
    position: absolute;
    right: 0px;
  }
  &:hover {
    .sub-item-tab--icon {
      opacity: 1;
    }
  }
}
</style>
