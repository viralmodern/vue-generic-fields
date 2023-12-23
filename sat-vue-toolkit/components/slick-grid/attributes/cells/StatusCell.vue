<template>
  <div class="w-100 fill-height">
    <!--<v-btn block
           :color="label | getStatusColor"
           class="fill-height" dark
           style="height: 100%; border-radius: 0"
           depressed
           small
           @click="$$openDropDownSource">
      {{label}}
    </v-btn>-->
    <!--    {{label}}-->
    <div class="fill-height d-flex align-center px-1 py-1"
         @click="$$openDropDownSource">
      <v-chip class="text-center justify-center"
              v-if="label"
              x-small
              :color="label | getStatusColor"
              dark>
        <template v-if="$$attribute.groupBy">
          <router-link :to="chipLink" class="white--text link-hover">
            {{label}}
          </router-link>
        </template>
        <template v-else>
          {{label}}
        </template>
      </v-chip>
    </div>
  </div>
</template>


<script>
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  import { getStatusColor } from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"

  export default {
    name: "StatusCell",
    mixins: [mxAttributeItem],
    data () {
      return {
        val: ""
      }
    },
    computed: {
      label () {
        try {
          let { list, itemValue, itemText } = this.$$attribute
          let { val } = this
          return list.find(item => item[itemValue] == val)[itemText]
        } catch (e) {
          return false
        }
      },
      chipLink () {
        let { val, $route: { query } } = this
        let { name } = this.$$attribute
        return {
          query: {
            ...query,
            "group_by": name,
            "group_items": val
          }
        }
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (v) {
          this.val = v || ""
        }
      }
    },
    filters: {
      getStatusColor
    },
    destroyed () {
      this.val = ""
    }
  }
</script>

<style scoped lang="scss">
  .link-hover {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
