<template>
  <v-navigation-drawer fixed
                       right
                       width="45vw"
                       disable-route-watcher
                       @input="input"
                       v-model="uiShowModal">
    <div class="fill-height">
      <AttributeDetail :item="row"
                       :row="row"
                       :endPoint="endPointUrl"
                       :isOwnerRow="isOwnerRow"
                       :mainCellId="mainCellId"
                       :attributes="attributes"
                       :hasReportRow="hasReportRow"
                       :disabled-bookmark-row="disabledBookmarkRow"
                       :disabledOwnerRow="disabledOwnerRow"
                       :busEventName="busEventName"
                       :group="group"
                       :isOffline="isOffline"
                       :groupType="groupType"
                       :userAccount="userAccount"
                       @updated="updated"
                       @errored="errored"
                       v-model="uiShowModal"/>
    </div>
  </v-navigation-drawer>
</template>

<script>
    import AttributeDetail from "./AttributeDetail";

    export default {
        name: "TheModalAttributeDetail",
        components: {AttributeDetail},
        data() {
            return {
                uiShowModal: false,
                hasReportRow: true,
                disabledBookmarkRow: false,
                disabledOwnerRow: false,
                row: {},
                attributes: [],
                mainCellId: null,
                isOwnerRow: null,
                endPoint: null,
                busEventName: null,
                group: null,
                groupType: null,
                userAccount: null,
                $$execute: null,
                isOffline: false,

            }
        },
      events: {
          uiShowAttributeModalDetail(evt, { row, $$execute, isOffline, attributes, disabledOwnerRow, mainCellId, isOwnerRow, endPoint, busEventName, group, groupType, hasReportRow, disabledBookmarkRow, userAccount }) {
            const vm = this
            // document.documentElement.classList.add('no_scroll')
            console.error("ATTRIBUTES", attributes)
            vm.uiShowModal = true
            vm.row = row
            vm.attributes = [...attributes]
            vm.mainCellId = mainCellId
            vm.isOwnerRow = isOwnerRow
            vm.endPoint = endPoint
            vm.busEventName = busEventName
            vm.groupType = groupType
            vm.group = group
            vm.hasReportRow = hasReportRow
            vm.disabledBookmarkRow = disabledBookmarkRow
            vm.disabledOwnerRow = disabledOwnerRow
            vm.userAccount = userAccount
            if($$execute) {
              vm.$$execute = $$execute
            }
            if (isOffline) {
              vm.isOffline = isOffline
            }
          }
        },
        mounted() {

        },
        computed: {
            endPointUrl() {
                try {
                    return `${this.endPoint}${this.row.pk}/`
                }catch (e) {
                    return `${this.endPoint}/`
                }
            }
        },
        methods: {
          input(isShow) {
            if (!isShow) {
              try {
                if(!document.querySelector('.slickGridApp')) {
                  // document.documentElement.classList.remove('no_scroll')
                }
              }catch (e) {

              }
            }
          },
          updated(data) {
            console.log('updated', data)
            let {$$execute} = this
            if($$execute && typeof $$execute === "function") {
              $$execute(data)
            }
          },
          errored() {
            console.log('errored')
          }
        }
    }
</script>

<style scoped>

</style>
