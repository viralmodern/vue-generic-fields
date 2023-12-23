<template>
  <v-card flat>
    <v-card-text>
      <template v-for="row in combinedOptions">
        <p v-if="row.text" class="caption mb-0">
          <span v-html="row.text"/>
        </p>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
  import dotProp from "dot-prop"

  export default {
    name: "TooltipContentMedium",
    props: {
      options: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      combinedOptions () {
        let { k = [], item = {} } = this.options
        return k.map(value => {
          let text = dotProp.get(item, value)
          let textValue = value.toString()
          let strValue = textValue.split('.')
          return {
            value: strValue[0],
            text
          }
        })

      }
    }
  }
</script>

<style scoped>

</style>
