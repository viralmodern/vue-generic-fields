<template>
  <v-navigation-drawer fixed
                       right
                       width="40vw"
                       @input="input"
                       style="z-index: 12;"
                       v-model="uiShowModal">
    <div class="fill-height">
      <div class="px-4">
        <AttributeCreateNew :attributes="attributes"
                            :endPoint="endPoint"
                            :busEventName="busEventName"
                            :disabledHeader="disabledHeader"
                            :attachHeader="attachHeader"
                            :group="group"
                            :groupType="groupType"
                            :mainCellId="mainCellId"
                            :disableAddNewToMany="disableAddNewToMany"
                            :countLabelSingular="countLabelSingular"
                            @submitted="submitted"
                            :is-offline="isOffline"
                            v-model="uiShowModal"/>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
  import AttributeCreateNew from "./AttributeCreateNew"

  export default {
    name: "TheModalAttributeCreateNew",
    components: { AttributeCreateNew },
    data () {
      return {
        uiShowModal: false,
        attributes: null,
        endPoint: null,
        busEventName: null,
        group: null,
        groupType: null,
        mainCellId: null,
        disableAddNewToMany: null,
        countLabelSingular: null,
        attachHeader: null,
        disabledHeader: false,
        isOffline: false,
        $$execute: null,
      }
    },
    events: {
      uiShowAttributeModalCreateNew(evt, data) {
        const vm = this
        vm.uiShowModal = true
        document.documentElement.classList.add("no_scroll")
        if (data) {
          if (data["attributes"]) {
            vm.attributes = data["attributes"]
          }
          if (data["endPoint"]) {
            vm.endPoint = data["endPoint"]
          }
          if (data["busEventName"]) {
            vm.busEventName = data["busEventName"]
          }
          if (data.hasOwnProperty("group")) {
            vm.group = data["group"]
          }
          if (data["groupType"]) {
            vm.groupType = data["groupType"]
          }
          if (data["mainCellId"]) {
            vm.mainCellId = data["mainCellId"]
          }
          if (typeof data["disableAddNewToMany"] === "boolean") {
            vm.disableAddNewToMany = data["disableAddNewToMany"]
          }
          if (data["countLabelSingular"]) {
            vm.countLabelSingular = data["countLabelSingular"]
          }
          if (data["attachHeader"]) {
            vm.attachHeader = data["attachHeader"]
          }
          if (data["disabledHeader"]) {
            vm.disabledHeader = data["disabledHeader"]
          }
          if (data["isOffline"]) {
            vm.isOffline = data["isOffline"]
          }
          if (data["$$execute"]) {
            vm.$$execute = data["$$execute"]
          }

        }
      }
    },
    methods: {
      input (isShow) {
        if (!isShow) {
          // this.attributes = null
          // this.endPoint = null
          this.busEventName = null
          this.group = null
          this.groupType = null
          this.mainCellId = null
          this.disableAddNewToMany = null
          this.countLabelSingular = null
          this.attachHeader = null
          this.disabledHeader = false
          this.isOffline = false
          this.$$execute = null
          document.documentElement.classList.remove("no_scroll")
          try {
            if (!document.querySelector(".slickGridApp")) {
              document.documentElement.classList.remove("no_scroll")
            }
          } catch (e) {

          }
        }
      },
      submitted (data) {
        let {$$execute} = this
        if($$execute && typeof $$execute === "function") {
          console.error('$$execute', data)
          $$execute(data)
        }
        // this.$eventHub.$emit("form-added", row)
      }
    }
  }
</script>

<style scoped>

</style>
