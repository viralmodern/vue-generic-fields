export default {
    methods: {
        $_alertCURD({ text = '', type = 'warning' }) {
            this.$eventHub.$emit('alert-curd', { text, type })
        },
    },
}
