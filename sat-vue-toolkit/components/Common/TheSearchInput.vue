<template>
  <div class="d-flex align-center search-input py-1 px-2"
       style="background: #FAFAFA">
    <v-icon small>mdi-magnify</v-icon>
    <div class="mx-1"></div>
    <input type="text" :value="value" :placeholder="placeholder" @input="onSearch"/>
  </div>
</template>

<script>
  import debounce from "lodash/debounce"

  export default {
    name: "TheSearchInput",
    props: {
      placeholder: {
        default: () => "Search"
      },
      value: {

      }
    },
    methods: {
      onSearch: debounce(function (evt) {
        let searchText = evt.target.value
        this.$emit('input', searchText)
      }, 400),

    }
  }
</script>

<style scoped lang="scss">
  .search-input {
    border: solid 1px rgba(0,0,0,0.05);
    border-radius: 3px;
    height: 30px;
    input {
      display: block;
      border: none;
      outline: none;
      font-size: 12px;
      font-weight: normal;
      &:active, &:focus, &:visited, &:hover {
        border: none;
        outline: none;
      }
    }
  }
</style>
