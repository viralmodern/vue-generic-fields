<template>
  <MenuShowHideFields icon="mdi-filter" v-model="uiShowMenu"
                      title="Filter"
                      @close="reduceFilter">
    <template v-slot:activator="{on}">
      <btn-link v-on="on"
                icon="mdi-filter"
                :label="`Filter ${totalFilter ? `(${totalFilter})` : ``}`"
                :input-value="totalFilter"/>
    </template>
    <FilterBuilder v-if="uiShowMenu"
                   :attributes="attributes"
                   v-model="queryStringParamsFilter"/>
  </MenuShowHideFields>
</template>

<script>
  import MenuShowHideFields from "./MenuShowHideFields.vue"
  import FilterBuilder from "@/sat-vue-toolkit/components/FilterBuilder/FilterBuilder.vue"
  import BtnLink from "@/sat-vue-toolkit/components/BtnLink.vue"

  export default {
    name: "MenuFilterBuilder",
    props: {
      attributes: {},
      value: {

      }
    },
    data() {
      return {
        uiShowMenu: false
      }
    },
    components: { BtnLink, FilterBuilder, MenuShowHideFields },
    computed: {
      totalFilter() {
        try {
          return Object.keys(this.queryStringParamsFilter).filter(k => k !== 'predicate').length
        }catch (e) {
          return false
        }
      },
      queryStringParamsFilter :{
        get() {
          return this.value
        },
        set(v) {
          try {
            let {queryStringParamsFilter} = v
            console.log('APPLY_FILTER', queryStringParamsFilter)
            this.$emit('input', queryStringParamsFilter)
            this.$trigger('applyFilter')
          }catch (e) {

          }
        }
      }
    },
    methods: {
      reduceFilter() {

      }
    }
  }
</script>

<style scoped>

</style>
