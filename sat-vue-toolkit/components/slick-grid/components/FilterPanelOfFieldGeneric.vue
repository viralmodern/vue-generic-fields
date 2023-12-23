<template>
  <div>
    <div class="filter-generic-panel">
      <!--<div class="filter-generic-panel&#45;&#45;icon">
        <v-icon small>mdi-magnify</v-icon>
      </div>-->
      <!--<div class="operation&#45;&#45;cell-options">
        <select :value="value" @input="changeValue">
          <template v-for="operation in operations">
            <option :value="operation.type">
              {{operation.label}}
              ({{operation.reg}})
            </option>
          </template>
        </select>
      </div>-->
      <div class="overflow-x-hidden pl-1 flex-grow-1 d-flex align-center filter-generic-panel--search">
        <input type="text"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FilterPanelOfFieldGeneric",
    props: {
      operations: {
        type: Array,
        default: () => []
      },
      value: {

      }
    },
    computed: {

    },
    methods: {
      changeValue(evt) {
        let value = evt.target.value
        this.$emit('input', {k: 'operator', value})
      }
    }
  }
</script>

<style scoped lang="scss">

  .filter-generic-panel {
    padding: 5px 0px;
    display: flex;
    input {
      display: block;
      width: 100%;
    }
  }
  .operation--cell-options {
    /*border: solid 1px red;*/
    width: 40px;
    overflow: hidden;
    select {
      display: block;
      padding: 5px;
    }
    option {
      display: block;
      padding: 5px;
    }
    &.show-label {

    }

  }
  .vvt {
    display: inline-block;
    vertical-align: middle;
    border: 0;
    color: #8899a8;
    width: 14px;
    height: 14px;
    background-position: 0 0;
    background-size: 14px 14px;
    padding: 0;
    font-size: 14px;
    text-align: center;
    line-height: 14px;
    font: 14px/1;
    &:before {
      content: "";
    }
  }
</style>
