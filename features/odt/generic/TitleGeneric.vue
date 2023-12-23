<template>
  <div>
    <template v-if="page">
      <p
        class="title"
        contentEditable="true"
        v-text="page.name"
        @input="changePageName"
      />
    </template>
  </div>
</template>

<script>
import { EVENTS_NAME } from '~/features/odt/generic/genericCore'
import debounce from 'lodash/debounce'

export default {
  name: 'TitleGeneric',
  props: {
    page: {},
  },
  methods: {
    changePageName: debounce(function (evt) {
      let pageName = evt.target.textContent
      console.log('PAGE_NAME', arguments)
      this.$trigger(EVENTS_NAME.UPDATE_PAGE, { name: pageName })
    }, 800),
  },
}
</script>

<style scoped></style>
