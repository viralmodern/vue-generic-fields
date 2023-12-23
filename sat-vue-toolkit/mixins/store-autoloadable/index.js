export default function storeAutoloadable(path, module) {
    return {
        beforeCreate() {
            // console.log(this.$store)
            if (!this.$store.hasModule(path)) {
                this.$store.registerModule(path, module, {preserveState: !!this.$store.state[path]});
            }
        }
    }
}
