<template>
  <div>
    <div class="d-flex">
      <v-spacer/>
      <template v-for="action in actions">
        <v-btn v-on="action.on"
               v-bind="action.attrs"
               class="caption">
          {{action.label}}
        </v-btn>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FormCustomizeFieldActions",
    props: {
      actions: {
        type: [Object, Array],
        default: () => []
      }
    }
  }
</script>

<style scoped>

</style>
