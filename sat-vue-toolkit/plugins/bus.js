export default {
    install (Vue, { eventBus }) {
        if (eventBus === undefined || eventBus.$emit === undefined) {
            console.log('eventBus',eventBus)
            throw Error('busNotDefined')
        }
        Vue.prototype.$eventHub = eventBus
        Vue.prototype.$eventBusTypes = {
            "setBreadcrumbsMatterSetting": "set-breadcrumbs-matter-setting",
            "openQuickAllCAF": "openQuickAllCAF",
            "uiShowLoginForm": "uiShowLoginForm",
            "selectedCountry": "selectedCountry",
            "uiShowAttributeModalDetail": "uiShowAttributeModalDetail",
        }
    },
}
