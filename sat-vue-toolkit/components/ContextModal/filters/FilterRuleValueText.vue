<template>
  <div>
    <!--<input class="search_box_filter w-100"
           @input="change"
           :value="value"
           type="text" placeholder="/="/>-->
    <v-text-field :value="value"
                  hide-details
                  @input="change" label="/="/>
  </div>
</template>

<script>
  export default {
    name: "FilterRuleValueText",
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
