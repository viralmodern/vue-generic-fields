<template>
  <div class="fill-height d-flex align-center w-100">
    <v-autocomplete dense ref="cellComboboxList"
                    flat
                    solo
                    v-model="val"
                    :disabled="!isOwnerRow"
                    :items="$$attribute.list"
                    :multiple="$$attribute.multiple"
                    :small-chips="$$attribute.chips"
                    :item-text="$$attribute.itemText"
                    :item-value="$$attribute.itemValue"
                    :placeholder="$$attribute.label"
                    @blur="change"
                    :error="error"
                    :loading="submitting"
                    hide-details>
      <!-- <template v-slot:prepend-inner>
         <v-icon small>mdi-tag</v-icon>
       </template>-->
    </v-autocomplete>
  </div>
</template>

<script>
  import mxNotification from "../../../../mixins/mxNotification";
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"

  export default {
    name: "ComboboxCell",
    mixins: [mxNotification, mxAttributeItem],
    data() {
      return {
        val: null,
        error: false,
        submitting: false
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(v) {
          this.val = v
        }
      }
    },
    methods: {
      async change() {
        try {
          if(!this.val || !this.val.length) return
          this.submitting = true
          this.$$execute({val: this.val})
        }catch (e) {

        }finally {
          this.submitting = false
        }

      }
    }
  }
</script>

<style scoped>

</style>
