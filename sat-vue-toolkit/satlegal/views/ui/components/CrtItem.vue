<template>
  <div class="w-100 fill-height d-flex flex-wrap align-content-center">
    <div class="cursor--pointer pa-2 w-100 d-flex text_content_box"
         @click="updateContent">
      <v-btn icon small label title="Add fact description" class="cursor--pointer">
        <v-icon x-small>
          mdi-pencil
        </v-icon>
      </v-btn>
      <div class="flex-grow-1 px-1" style="word-break: break-all">
        {{item['characters'][fieldName]['desc']}}
      </div>
    </div>
    <div @click="clickItem"
         class="cursor--pointer pa-1 d-flex chip_content_box w-100">
      <v-btn icon small label title="Add fact source">
        <v-icon small>mdi-plus</v-icon>
      </v-btn>
      <div class="flex-grow-1">
        <template v-for="source in item['characters'][fieldName]['sources']">
          <v-chip :color="`#${source.color}`"
                  label
                  dark
                  small
                  :key="`src-${source.pk}`"
                  class="ma-1">
            {{source.name}} {{source.color}}
          </v-chip>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "CrtItem",
        props: {
            item: {},
            fieldName: {},
        },
        data() {
          return {
              uiEditText: false
          }
        },
        methods: {
            clickItem(e) {
                e.preventDefault()
                let rowId = this.item.pk
                this.$emit('change-option-cell', e, this.item, this.fieldName, rowId)
                return false
            },
            updateContent(e) {
                e.preventDefault()
                let rowId = this.item.pk
                this.$emit('change-text-cell', e, this.item, this.fieldName, rowId)
                return false
            }
        }
    }
</script>

<style scoped>
  .text_content_box {
    /*border: solid 1px red;*/
  }
  .chip_content_box {
    /*border: solid 1px red;*/
  }
</style>
