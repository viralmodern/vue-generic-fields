<template>
<div>
  {{value}}
</div>
</template>

<script>


  export default {
    name: "ShowCode",
    props: {
      value: {},
      predicate: {},
      rows: {}
    },
    watch: {
     /* value: {
        immediate: true,
        deep: true,
        handler (v) {
          let q = $$queryStringConvertRulesFilter(v)

          const { queryStringParams, values } = q
          let totalFilter = values.length
          console.log('$$queryStringConvertRulesFilter', queryStringParams, totalFilter);
          return this.$trigger('applyFilter', {queryStringParamsFilter: queryStringParams, totalFilter})
          /!*let dataGroup = { ...this.rows }
          if(totalFilter === 0) return this.$trigger('resultsCombined', {dataGroup, totalFilter })
          let predicate = this.predicate["value"]
          for (let group in dataGroup) {
            let groupItem = { ...dataGroup[group] }
            let list = [...groupItem["results"]]
            let newResults = $$filterDataByFuse({ list, queryStringParams, predicate })
            console.log('VALUES', newResults)
            groupItem["results"] = [...newResults]
            dataGroup[group] = {...groupItem}
            this.$trigger('resultsCombined', { dataGroup , totalFilter})
          }*!/
        }
      }*/
    }
  }
</script>

<style scoped>

</style>
