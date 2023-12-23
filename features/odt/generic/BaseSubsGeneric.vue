<template>
  <div>
    <v-toolbar dense flat v-if="page" height="38px">
      <v-toolbar-items>
        <template v-for="(sub, index) in subs">
          <LinkSubItemGeneric
            :key="sub.id"
            :class="{ 'ml-n4': index === 0, 'mr-1': true }"
            :is-frozen="sub.isFrozen"
            :sub-label="sub.name"
            :sub-id="sub.id"
            :active-sub="sub.active"
          />
        </template>
      </v-toolbar-items>
      <v-spacer />
      <div class="mr-n4">
        <LinkCreateSubItemGeneric :page-id="pageId" />
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import LinkSubItemGeneric from '~/features/odt/generic/LinkSubItemGeneric'
import LinkCreateSubItemGeneric from '~/features/odt/generic/LinkCreateSubItemGeneric'

export default {
  name: 'BaseSubsGeneric',
  components: { LinkCreateSubItemGeneric, LinkSubItemGeneric },
  props: {
    page: {},
    subs: {},
  },
  computed: {
    pageId() {
      let { page } = this
      let hasPage = Boolean(page)
      let isObject = typeof page === 'object'
      if (!hasPage || !isObject) {
        return false
      }
      return page.id
    },
  },
}
</script>

<style scoped></style>
