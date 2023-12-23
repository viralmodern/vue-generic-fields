<template>
  <div class="w-100 cursor--pointer d-flex align-center px-1"
       @click="change">
    <v-badge :content="total"
             :title="commented ? 'Commented' : ''"
             :value="!!total"
             color="primary"
             overlap>
      <v-icon small
              :color="commented ? 'primary' : 'default'">mdi-message
      </v-icon>
      <template v-slot:badge>
        {{ total | nFormatter }}
      </template>
    </v-badge>

  </div>
</template>

<script>
import {nFormatter} from "@/sat-vue-toolkit/filters";
import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"

export default {
  name: "CommentsCell",
  filters: {nFormatter},
  mixins: [mxAttributeItem],
  computed: {
    comment() {
      try {
        return this.$store.getters['comments/findCommentByEndpoint'](this.endPoint)
      } catch (e) {
        return null
      }
    },
    total() {
      try {
        return this.$store.getters['comments/findCommentByEndpoint'](this.endPoint)['totalComments']
      } catch (e) {
        return null
      }
    }
  },
  methods: {
    change(e) {
      try {
        this.$eventHub.$emit('menu-cell-comments', {endPoint: this.endPoint, title: this.rowId})
      } catch (e) {

      }
    }
  }
}
</script>

<style scoped>

</style>
