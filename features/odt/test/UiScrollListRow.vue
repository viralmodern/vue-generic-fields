<template>
  <v-card>
    <v-card-text>
      <div class="d-flex align-start w-100">
        <p class="ma-0">{{ index }}</p>
        <div class="mx-4"></div>
        <p class="ma-0" @click="onClickName">{{ source.full_name }}</p>
        <v-spacer />
        <v-checkbox
          dense
          hide-details
          class="pa-0 ma-0"
          @click="onChange"
          :value="source.checked"
          :input-value="source.checked"
          :ripple="false"
        ></v-checkbox>
      </div>
    </v-card-text>
    <v-card-text>
      {{ source }}
    </v-card-text>
  </v-card>
</template>

<script>
import { childRowMixin } from './mixins/scroll'

export default {
  name: 'UiScrollListRow',
  props: {
    index: {
      // index of current item
      type: Number,
    },
    source: {
      // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {}
      },
    },
  },
  mixins: [childRowMixin],
  methods: {
    onChange(e) {
      let val = e.target.checked
      let checked = !Boolean(this.source['checked'])
      this.dispatch(
        'UiScrollList',
        'checkBoxValueChange',
        this.source.pk,
        checked
      )
    },
    onClickName() {
      this.dispatch(
        'UiScrollList',
        'checkBoxValueChange',
        this.source.pk,
        false
      )
    },
  },
}
</script>

<style scoped></style>
