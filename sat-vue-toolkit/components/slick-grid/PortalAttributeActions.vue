<template>
  <div>
    <!--Todo: notification-->
    <AlertCURD/>
    <!--TODO: cell interactive-->
    <template v-for="(cpn, index) in namesPortal">
      <component :key="`portal-${cpn}-${index}`"
                 :is="cpn"></component>
    </template>
    <!--TODO: comments interactive-->
    <DialogQuickViewComments/>
    <!--TODO: Modal attribute detail-->
    <TheModalAttributeDetail/>
    <!--TODO: Modal create new attribute-->
    <TheModalAttributeCreateNew/>
    <!--TODO: Entries Settings-->
    <SnackbarEntriesSettings/>
    <!--TODO: Modal Compare Entries-->
    <TheModalCompareEntriesRows/>
  </div>
</template>

<script>
    import AlertCURD from "../AlertCURD";
    import DialogQuickViewComments from "./attributes/comments/DialogQuickViewComments";
    import TheModalAttributeDetail from "./attributes/TheModalAttributeDetail";
    import TheModalAttributeCreateNew from "./attributes/TheModalAttributeCreateNew";
    import upperFirst from 'lodash/upperFirst'
    import camelCase from 'lodash/camelCase'
    import uniqBy from 'lodash/uniqBy'
    import map from 'lodash/map'
    import keys from 'lodash/keys'
    import { registerCellsComponentAttributes,registerOptionalComponentAttributes } from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"
    import SnackbarEntriesSettings from "~/sat-vue-toolkit/components/slick-grid/components/SnackbarEntriesSettings"
    import TheModalCompareEntriesRows
      from "~/sat-vue-toolkit/components/slick-grid/components/TheModalCompareEntriesRows"

    const view = (name) => {
        return function (resolve) {
            return require([`./attributes/portals/${name}.vue`], resolve)
        }
    }
    const requireComponent = require.context(
        './attributes/portals',
        false,
    )
    const componentsName = uniqBy(
        map(requireComponent.keys(), (fileName) => {
            const componentName = upperFirst(
                camelCase(
                    // Strip the leading `./` and extension from the filename
                    fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
                )
            )
            return componentName
        })
    )
    const getCellsComponentAttributes = (() => {
        let obj = {}
        for (let i = 0; i < componentsName.length; i++) {
            obj[componentsName[i]] = view(componentsName[i])
        }
        return obj
    })()
    let namesPortal = keys(getCellsComponentAttributes)
    registerCellsComponentAttributes()
    // setting fields create
    registerOptionalComponentAttributes()
    export default {
        name: "PortalAttributeActions",
        data() {
            return {
                namesPortal
            }
        },
        components: {
          TheModalCompareEntriesRows,
          SnackbarEntriesSettings,
            TheModalAttributeCreateNew,
            TheModalAttributeDetail,
            DialogQuickViewComments,
            ...getCellsComponentAttributes,
            AlertCURD
        }
    }
</script>

<style scoped>

</style>
