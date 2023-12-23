<template>
  <div class="d-flex align-center justify-start w-100 fill-height" :title="$$attribute.label">
    <v-checkbox dense
                hide-details
                class="pa-0 ma-0"
                :ripple="false"
                @click="change"
                :disabled="!editableCell"
                v-model="checked"
                :input-value="checked"/>
  </div>
</template>

<script>
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"

  export default {
    name: "CheckboxCard",
    mixins: [mxAttributeItem],
    data() {
      return {
        checked: false
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(v){
          this.checked = !!v
        }
      }
    },
    methods: {
      async change(ev) {
        try {
          // let val = this.checked ? 1 : 0
          let val = ev.target.checked ? 1 : 0
          this.$$execute({val})
        } catch (e) {
        }
      }
    }
  }
</script>

<style scoped>

</style>
