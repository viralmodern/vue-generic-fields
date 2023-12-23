<template>
  <v-list dense tile>
    <v-subheader class="black--text"
      >ALL CATEGORIES &nbsp;
      <strong v-if="countAllCategory"
        >({{ countAllCategory }})</strong
      ></v-subheader
    >
    <template v-for="(item, index) in categories">
      <v-list-item
        link
        :key="index"
        exact
        @click="$emit('clickCate')"
        :to="path_caf + '/' + slugPath(item.text)"
      >
        <v-list-item-title>{{ item.text }}</v-list-item-title>
        <v-list-item-action>
          <strong v-if="item.children.length">{{
            item.children.length
          }}</strong>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import LinkCategory from './LinkCategory'
import slugify from 'slugify'
import { countAllCaf } from '~/mock/fields'

export default {
  name: 'ListCategoryPanel',
  components: { LinkCategory },

  props: {
    categories: {
      type: Array
    },
    matter: {
      type: Object,
      default: {}
    }
  },
  computed: {
    path_caf() {
      const {
        params: { matter }
      } = this.$route
      return `/matters/${matter}/caf`
    },
    countAllCategory() {
      try {
        return countAllCaf(this.categories)
      } catch (e) {
        console.log('countAllCategory')
        return 'N/A'
      }
    }
  },
  methods: {
    slugPath(text) {
      // /matters/6/caf/search#case-investigation
      return slugify(text).toLowerCase()
    }
  }
}
</script>

<style scoped></style>
