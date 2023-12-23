<template>
  <div class="ner-results-sticky">
    <v-list dense>
      <v-subheader>
        <strong class="font_courier">{{ title }}</strong>
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
      <template v-for="(results, group) in ents">
        <v-list-group
          :value="true"
          :key="`ner-${group}`"
          active-class="primary--text"
        >
          <template v-slot:activator>
            <v-list-item-title>
              {{ group }}
              {{ results.length ? `(${results.length})` : `` }}
            </v-list-item-title>
          </template>
          <template v-for="(result, i) in results">
            <v-divider v-if="i !== 0" />
            <v-list-item
              @click="changeItemNer($event, result)"
              :key="i"
              dense
              link
              :input-value="showAll || val.includes(result)"
              active-class="primary--text"
            >
              <v-list-item-content>
                <div
                  v-html="result"
                  class="ner-result-item cursor--pointer caption font_courier"
                ></div>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-group>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'ThumbListNer',
  props: {
    ents: {},
    title: {
      default: () => 'Named Entity Recognitions',
    },
  },
  data() {
    return {
      val: [],
      showAll: true,
    }
  },

  methods: {
    openAllMark() {
      let showAll = !this.showAll
      this.showAll = showAll
      if (!showAll) {
        document
          .querySelectorAll('.text-content-ner')[0]
          .classList.remove('show-all')
      } else {
        document
          .querySelectorAll('.text-content-ner')[0]
          .classList.add('show-all')
      }
      let list = Array.from(
        document.querySelectorAll('.text-content-ner mark.entity')
      )
      this.val = []
      list.forEach((item) => {
        if (showAll) {
          item.classList.add('active-entity')
        } else {
          item.classList.remove('active-entity')
        }
      })
    },
    resetActiveEntity() {
      document
        .querySelectorAll('.text-content-ner')[0]
        .classList.remove('show-all')
      let list = Array.from(document.querySelectorAll('.active-entity'))
      list.forEach((item) => {
        item.classList.remove('active-entity')
      })
    },
    setValueItem(result) {
      if (!this.val.includes(result)) {
        this.val.push(result)
      }
    },
    changeItemNer(e, textContent) {
      this.val = []
      this.showAll = false
      this.resetActiveEntity()
      this.setValueItem(textContent)
      let list = Array.from(
        document.querySelectorAll('.text-content-ner mark.entity')
      )
      let temp = list
        .filter((item) => {
          return item.firstChild.textContent.trim() === textContent
        })
        .forEach((item, index) => {
          item.classList.add('active-entity')
          if (index === 0) {
            // item.scrollIntoView()
            this.$vuetify.goTo(item, { offset: 60 })
            // this.scrollToTargetAdjusted(item)
          }
        })
      // console.log(temp)
    },
  },
}
</script>

<style scoped lang="scss">
.ner-result-item {
}

.ner-results-sticky {
  /*position: sticky;*/
  /*top: 80px;*/
}
</style>
