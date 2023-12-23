<template>
  <v-menu offset-y
          transition="slide-y-transition"
          right
          :close-on-content-click="true"
          :activator="activatorId"
          :open-on-click="false"
          v-model="uiShowMenu" close-on-click>
    <v-card>
      <v-list dense>
        <template v-for="action in actionsFieldSetting">
          <v-list-item dense
                       v-on="action.on"
                       :disabled="action.DISABLED">
            <v-list-item-icon>
              <v-icon dense>
                {{action.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{action.label}}
            </v-list-item-title>
          </v-list-item>
        </template>
        <!--<template v-for="action in actionsField">
          <v-list-item dense
                       @click="fieldChange($event, action)"
                       :disabled="action.DISABLED">
            <v-list-item-icon>
              <v-icon dense>
                {{action.ICON}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{action.LABEL}}
            </v-list-item-title>
          </v-list-item>
        </template>-->
      </v-list>
    </v-card>
  </v-menu>
</template>


<script>
  import {
    getSourcesComponentAttributes
  } from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"
  import { BUS_SOURCE, BUS_EVENT } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"

  export default {
    name: "DropDownBaseFieldSetting",
    components: {
      ...getSourcesComponentAttributes
    },
    data() {
      return {
        activatorId: "",
        uiShowMenu: false,
        attribute: {}
      }
    },
    computed: {
      actionsField() {
        let {attribute} = this
        return attribute ? attribute['actionsField'] : []
      },
      actionsFieldSetting() {
        let {attribute} = this
        return attribute ? attribute['actionsFieldSetting'] : {}
      }
    },
    mounted () {
      this.$events.on(BUS_SOURCE.HEADER, this.onFieldSetting)
    },
    methods: {
      onFieldSetting(e, data) {
        let {attribute, evt} = data
        let strFieldId = attribute['strFieldId']
        this.attribute = {...attribute}
        this.show(`#${strFieldId}`, evt)
      },
      async fieldChange(evt, action) {
        evt.preventDefault()
        let {attribute} = this
        if(action.TYPE === 'EDIT') {
          console.error('XOP', attribute, action.TYPE)
          let {actionsFieldSetting: {EDIT}, name} = attribute
          EDIT.on.click()
        }else {
          await this.$trigger(BUS_EVENT.FIELD_SETTING_CHANGE, {attribute, action}, true)
        }
        this.hide()
        evt.stopPropagation()
      },
      hide() {
        this.uiShowMenu = false
        this.activatorId = ''
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
      }
    },
    filters: {

    }
  }
</script>

<style scoped>

</style>
