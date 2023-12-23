<template>
  <v-menu offset-y :allow-overflow="false"
          :close-on-content-click="false"
          :max-width="300"
          transition="slide-y-transition"
          right
          :open-on-click="false"
          :activator="activatorId"
          v-model="uiShowMenu">
    <v-card flat elevation="0">
      <v-card-text>
        <ContextFilterDialog :attribute="attribute"
                             :operations="operationsField"
                             @input="applyContext"
                             @cancel="cancelContext"/>
        <!--        <v-btn @click="applyContext">ok</v-btn>-->
      </v-card-text>
    </v-card>
  </v-menu>
</template>


<script>
  import { BUS_SOURCE } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"
  import ContextFilterDialog from "~/sat-vue-toolkit/components/ContextModal/filters/ContextFilterDialog"

  export default {
    name: "DropDownBaseFieldFilter",
    components: { ContextFilterDialog },
    data () {
      return {
        activatorId: "",
        uiShowMenu: false,
        attribute: {},
        $$execute: null,
        operationsField: null
      }
    },
    computed: {},
    mounted () {
      this.$events.on(BUS_SOURCE.FILTER_FIELD, this.onFieldSetting)
    },
    methods: {
      onFieldSetting (e, data) {
        let { attribute, evt, $$execute, operationsField } = data
        let strFieldId = attribute["strFieldId"]
        this.attribute = { ...attribute }
        this.$$execute = $$execute
        this.operationsField = operationsField
        this.show(`#${strFieldId}`, evt)
      },
      hide () {
        this.uiShowMenu = false
        this.activatorId = ""
        this.operationsField = []
      },
      show (id, evt) {
        try {
          this.activatorId = id
          this.$nextTick(() => {
            this.uiShowMenu = true
          })
        } catch (e) {
          console.log(e.message)
        }
      },
      applyContext (rule) {
        let { $$execute } = this
        if ($$execute && typeof $$execute === "function") {
          $$execute(rule)
          this.hide()
        }
      },
      cancelContext () {
        this.hide()
      }
    },
    filters: {}
  }
</script>

<style scoped lang="scss">

</style>
