<template>
  <div class="rake-results-sticky">
    <v-list dense>
      <v-subheader>
        <strong class="font_courier">Keywords ({{ rakes.length }})</strong>
        <div class="mx-1"></div>
        <v-btn
          :input-value="showAll"
          @click="openAllMark"
          x-small
          rounded
          active-class="primary--text"
          class="caption font_courier text-capitalize"
          text
        >
          {{ showAll ? 'Hide' : 'Show' }} All
        </v-btn>
        <v-spacer />
      </v-subheader>
      <template v-for="(rake, index) in rakes">
        <v-card
          @click="changeRakeItem(rake)"
          :style="{ 'border-color': rake.phrase === val ? 'yellow' : '' }"
          flat
          :dark="rake.color | darkRake"
          :color="rake.color"
          :light="rake.color | darkRake | lightRake"
          class="rake-result-item caption font_courier d-inline-block pa-2 ma-1 cursor--pointer"
        >
          {{ rake.phrase }}
        </v-card>
      </template>
    </v-list>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
  name: 'ThumbListRake',
  props: {
    rakes: {
      type: Array,
      default: () => [],
    },
    colorsRake: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      val: null,
      showAll: true,
    }
  },
  filters: {
    darkRake(color) {
      return ['#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'].includes(
        color.toUpperCase()
      )
    },
    lightRake(isDark) {
      return !isDark
    },
  },
  methods: {
    openAllMark() {
      let showAll = !this.showAll
      this.showAll = showAll
      this.val = null
      let handler = document.querySelector('.rake_content_text_handle')
      let rake_active = document.querySelector('.rake_rank--active')
      if (rake_active) {
        rake_active.classList.remove('rake_rank--active')
      }

      if (handler) {
        if (!showAll) {
          handler.classList.remove('show-all')
        } else {
          handler.classList.add('show-all')
        }
      }
    },
    changeRakeItem(rake) {
      try {
        this.showAll = false
        if (document.querySelector('.rake_rank--active')) {
          document
            .querySelector('.rake_rank--active')
            .classList.remove('rake_rank--active')
        }
        if (document.querySelector('.rake_content_text_handle')) {
          document
            .querySelector('.rake_content_text_handle')
            .classList.remove('show-all')
        }
        let phrase = rake['phrase']
        let id = md5(rake['phrase'])
        let item = document.getElementById(id)
        item.classList.add('rake_rank--active')
        this.$vuetify.goTo(item, { offset: 70 })
        this.val = phrase
      } catch (e) {
        console.log(e.message)
      }
    },
  },
}
</script>

<style scoped>
.rake-results-sticky {
  position: sticky;
  top: 80px;
}
.rake-result-item {
  border: solid 1px rgba(0, 0, 0, 0.05);
}
</style>
