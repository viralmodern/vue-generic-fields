<template>
  <div class="text-subtitle-2 font-weight-bold pr-2">
    {{info}} {{getGroupActive['label'] || 'N/A'}}
  </div>
</template>

<script>
    export default {
        name: "GroupByCheckbox",
        props: {
            info: {
                type: [String, Object, Array, Date],
                default: ''
            },
            list: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            getGroupActive() {
                return this.list.filter(l => l.value === this.info)[0] || {}
            }
        }
    }
</script>

<style scoped>

</style>
