<template>
  <v-autocomplete label="Operators"
                  outline
                  hide-details
                  placeholder="..."
                  item-text="title"
                  item-value="id"
                  dense
                  return-object
                  v-model="getOperation"
                  :disabled="!getActiveOperation"
                  :items="items"></v-autocomplete>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "OperationFilterOptions",
    props: ["item"],
    computed: {
      ...mapGetters("cafs/search/filterBuilder", ["operation"]),
      items() {
        try {
          let opr = this.item.filter_type.operation;
          return this.operation[opr];
        }catch (e) {
          return this.operation.operands
        }

      },
      getActiveOperation() {
        return !!this.item.filter_type;
      },
      getOperation: {
        get() {
          return this.item.operation
        },
        set(val) {
          this.updateOperationFilter({item: this.item, val});
        }
      }

    },
    methods: {
      ...mapActions("cafs/search/filterBuilder", ["updateOperationFilter"])
    }

  }
</script>

<style scoped>

</style>
