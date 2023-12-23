<template>
  <div>
    <!--<input class="search_box_filter w-100"
           type="number"
           @input="change"
           placeholder="/="/>-->
    <v-text-field hide-details
                  :value="value"
                  type="number"
                  @input="change" label="0,1,2..."/>
  </div>
</template>

<script>
  export default {
    name: "FilterRuleValueNumber",
    props: {
      value: {

      }
    },
    methods: {
      change(value) {
        this.$emit("input", {k: '', data: {value}})
      }
    }
  }
</script>

<style scoped>

</style>
