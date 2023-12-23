<template>
  <div class="mx-n3">
    <v-card flat>
      <v-card-text>
        <div class="d-flex">
          <div>
            <div style="width: 350px">
              <v-text-field
                style="font-size: 12px"
                class="input_name"
                :height="25"
                v-model="subName"
                label="Sub Name"
                filled
                rounded
                dense
                hide-details
              />
              <!--<p contentEditable="true" class="subtitle-1 ma-0">
                {{subName}}
              </p>-->
            </div>
          </div>
          <v-spacer />
          <div
            class="flex-grow-1 overflow-x-hidden d-flex align-center justify-end"
          >
            <template v-for="action in subActions">
              <v-btn
                :active-class="`${action.color}--text`"
                rounded
                v-on="action.on"
                text
                depressed
                :disabled="action.disabled"
                :input-value="true"
                small
                class="caption text-capitalize mr-2"
              >
                <v-icon small v-if="action.icon" left>{{ action.icon }}</v-icon>
                {{ action.label }}
              </v-btn>
            </template>
          </div>
        </div>
      </v-card-text>
      <slot name="field_dictionary"></slot>
    </v-card>
  </div>
</template>

<script>
import { SUB_ACTIONS } from './generic.json'
import { EVENTS_NAME } from '~/features/odt/generic/genericCore'

export default {
  name: 'SubOptionsGeneric',
  props: {
    sub: {},
  },
  computed: {
    subName: {
      get() {
        let { sub } = this
        return sub ? sub.name : ''
      },
      set(v) {
        this.updateSub(v)
      },
    },
    subActions() {
      let { sub } = this
      let isFrozenSub = sub && sub.isFrozen
      return [
        {
          ...SUB_ACTIONS.COPY_URL,
          disabled: false,
          on: {},
        },
        {
          ...SUB_ACTIONS.DELETE,
          disabled: isFrozenSub,
          on: {
            click: this.deleteSub,
          },
        },
      ]
    },
  },
  methods: {
    async deleteSub(evt) {
      evt.preventDefault()
      await this.$trigger(EVENTS_NAME.DELETE_SUB)
      evt.stopPropagation()
    },
    updateSub(name) {
      let options = {
        name,
      }
      this.$trigger(EVENTS_NAME.UPDATE_SUB, { options })
    },
  },
}
</script>

<style scoped lang="scss">
.active_editable {
  border-bottom: solid 1px;
}
.input_name {
  .v-input__slot {
    font-size: 12px;
    min-height: 40px !important;
  }
}
</style>
