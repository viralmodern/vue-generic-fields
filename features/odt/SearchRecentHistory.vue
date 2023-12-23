<template>
  <div>
    <v-text-field
      @keydown.enter="searchVisit"
      @click="openVisit"
      hide-details
      v-model.trim="val"
      :placeholder="placeholder"
      prepend-inner-icon="mdi-magnify"
      v-bind="(appendIcon && { appendIcon: appendIcon }) || {}"
      flat
      single-line
      style="font-size: 16px"
      rounded
      :height="25"
      solo-inverted
      @click:append="$emit('click-append')"
    />
    <MenuOptionsAbsolute
      offset-y
      clearable
      v-model="activatorId"
      @clear-item="clearVisit"
      @click-item="clickVisit"
      :list="recentVisit"
    >
      <template v-slot:append>
        <v-list dense class="py-0" v-if="q">
          <v-list-item dense @click="searchVisit">
            <v-list-item-title>
              <v-btn icon small>
                <v-icon small>mdi-magnify</v-icon>
              </v-btn>
              <span class="caption">{{ q }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </MenuOptionsAbsolute>
  </div>
</template>

<script>
import MenuOptionsAbsolute from '@/sat-vue-toolkit/components/MenuOptionsAbsolute.vue'
export default {
  name: 'SearchRecentHistory',
  components: { MenuOptionsAbsolute },
  props: {
    placeholder: {
      type: String,
      default: () => 'Search',
    },
    recentVisit: {
      type: Array,
      default: () => [],
    },
    activatorIdContainer: {
      default: () => null,
    },
    search: {
      type: String,
      default: () => '',
    },
    appendIcon: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      q: '',
      activatorId: null,
    }
  },
  computed: {
    val: {
      get() {
        return this.q
      },
      set(v) {
        this.q = v
        this.activatorId = this.activatorIdContainer
      },
    },
  },
  watch: {
    search: {
      immediate: true,
      handler(v) {
        try {
          this.q = v
        } catch (e) {}
      },
    },
  },
  methods: {
    openVisit(e) {
      console.log('OPEN_VISIT')
      e.preventDefault()
      this.activatorId = this.activatorIdContainer
    },
    createVisitItem(text) {
      let visit = {
        icon: 'mdi-history',
        text,
      }
      // todo check include visit
      let isExist =
        this.recentVisit.filter(
          (v) => v.text.toLowerCase() === text.toLowerCase()
        ).length > 0
      if (isExist) return
      // todo create recent visit
      let visitItems = [visit, ...this.recentVisit]
      this.$emit('update-visit', { visitItems })
    },
    clearVisit({ item, index }) {
      try {
        // todo emit clear recent visit
        let visitItems = this.recentVisit.filter(
          (visit, visitIndex) => visitIndex !== index
        )
        this.$emit('update-visit', { visitItems, deleted: true })
      } catch (e) {}
    },
    clickVisit({ text }) {
      this.q = text
      this.searchVisit()
    },
    searchVisit(e) {
      if (!this.q) return
      this.createVisitItem(this.q)
      let query = { q: this.q }
      this.$emit('search-visit', e, { query })
    },
  },
}
</script>

<style scoped></style>
