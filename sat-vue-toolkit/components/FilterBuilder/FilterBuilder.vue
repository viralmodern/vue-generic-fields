<template>
  <v-card tile max-width="55vw" flat>
    <v-card-text>
      <div v-if="hasFilters">
        <template v-for="(item, index) in allFilter">
          <FilterBuilderItem :attributes="attributes"
                             :disabled-predicate="index > 1"
                             :predicate="predicate"
                             :is-attribute-starts="index === 0"
                             :item="item"
                             :value="item"
                             :key="item.id"
                             @input="updateRule"
                             @changePredicate="changePredicate"/>
        </template>
      </div>
      <keep-alive v-else>
        <div>
          <p class="ma-0 pa-0">
            No Filters Applied
          </p>
          <p class="text-caption ma-0">
            Add a new filter to single out the items you want to see.
          </p>
        </div>
      </keep-alive>
      <div class="mt-2"></div>
      <v-divider/>
      <div class="mt-2"></div>
      <div class="d-flex">
        <FilterBuilderAddNew/>
        <v-spacer/>
        <v-btn small
               :disabled="isExistRules"
               color="primary"
               class="text-capitalize caption"
               @click="applyFilter">Apply</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  import {
    $$queryStringConvertRulesFilter,
    $PREDICATE, OPERATIONS
  } from "@/sat-vue-toolkit/components/slick-grid/configs/operations"
  import { v4 as uuid } from "uuid"
  import FilterBuilderItem from "./FilterBuilderItem"
  import FilterBuilderAddNew from "./FilterBuilderAddNew"
  import { $$existQueryRouteParams } from "@/sat-vue-toolkit/components/slick-grid/helpers/queryParams"
  let filterStructure = {
    id: uuid(),
    predicate: null,
    attribute: null,
    operator: null,
    value: {
      valueBefore: '',
      valueAfter: '',
    },
    isAttributeStarts: false
  }
  export default {
    name: "FilterBuilder",
    components: {
      FilterBuilderAddNew,
      FilterBuilderItem
    },
    props: {
      attributes: {
        type: Array,
        default: () => []
      },
      value: {}
    },

    data () {
      return {
        predicate: $PREDICATE.$and,
        allFilter: [],
        models: {}
      }
    },
    events: {
      addNewFilter (event, param) {
        let predicate = this.predicate
        this.allFilter.push({ ...filterStructure, id: uuid(), predicate})
      },
      removeFilter (event, filter) {
        this.allFilter = this.allFilter.filter(rule => rule.id !== filter.id)
      },
      updateFilter (event, { filter, params }) {
        this.allFilter = this.allFilter.map(rule => {
          let r = { ...rule }
          if (rule.id === filter.id) {
            if (typeof params === "object") {
              for (let i in params) {
                r[i] = params[i]
              }
            }
          }
          return r
        })
      }
    },
    computed: {
      hasFilters () {
        try {
          return this.allFilter.length > 0
        } catch (e) {
          return false
        }
      },
      isExistRules() {
        let { queryStringParamsFilter } = $$queryStringConvertRulesFilter(this.allFilter)
        return $$existQueryRouteParams(queryStringParamsFilter, this.value)
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(v) {
          // todo init filter rules
          this.initRules(v)
        }
      }
    },
    methods: {
      initRules(value) {
        try {
          console.log('INIT_RULES_FILTER', value, this.allFilter)
          if(!value || !Object.keys(value).length) return
          let params = {...value}
          if(!Object.keys(params).length) return
          let predicate = $PREDICATE[params['predicate']]
          this.predicate = predicate || this.predicate
          let queryRules = {...params}
          delete queryRules['predicate']
          let ks = Object.keys(queryRules)
          let rules = []
          ks.forEach(k => {
            let p = k.split('.')
            let attributeName = p[0]
            let attributePos = this.attributes.findIndex(attribute => attribute.name == attributeName)
            let attribute = this.attributes[attributePos]
            let operatorType = p[1]
            let operator = OPERATIONS[operatorType]
            let strValue = queryRules[k]
            let valueSplit = strValue.split(',')
            let value = {}
            value['valueBefore'] = valueSplit[0] || ''
            value['valueAfter'] = valueSplit[1] || ''
            let rule = { ...filterStructure, id: uuid(), predicate, attribute, operator, value}
            rules.push(rule)
          })
          this.allFilter = [...rules]
          console.error('RULES', rules)
        }catch (e) {

        }
      },
      updateRule() {
        console.log(arguments)
      },
      changePredicate (predicate) {
        console.log(arguments)
        this.predicate = predicate
        this.allFilter = this.allFilter.map(filter => {
          let rule = {...filter}
          rule['predicate'] = predicate
          return rule
        })
      },
      applyFilter() {
        let queryStringParamsFilter = {}
        if(!this.allFilter.length) {
          queryStringParamsFilter = {}
        }else {
          let data= $$queryStringConvertRulesFilter(this.allFilter)
          queryStringParamsFilter = {...data['queryStringParamsFilter']}
        }
        if(!this.isExistRules) {
          this.$emit('input', {queryStringParamsFilter})
        }

      },

    }
  }
</script>

<style lang="scss"></style>
