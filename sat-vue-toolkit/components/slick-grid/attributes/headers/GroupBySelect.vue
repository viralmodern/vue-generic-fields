<template>
  <div class="caption font-weight-bold pr-4">
     {{getGroupActive | itemLabel}}
  </div>
</template>

<script>
    const getItemValueKey = (v) => {
        if(v.hasOwnProperty('pk')) {
            return 'pk'
        }else if(v.hasOwnProperty('value')) {
            return 'value'
        }else if(v.hasOwnProperty('id')) {
            return 'id'
        } else {
            return 'name'
        }
    }
    export default {
        name: "GroupBySelect",
        props: {
            info: {
                type: [String, Object, Array, Date],
                default: ''
            },
            list: {
                type: [String, Object, Array, Date],
                default: () => []
            },

        },
        computed: {
            getGroupActive() {
                return this.list.filter(l => {
                    let k = getItemValueKey(l)
                    return l[k] == this.info
                })[0] || {}
            }
        },

        filters: {
            itemLabel(v) {
                try {
                    return v.label || v.name || v.short_name || v.email || 'No group'
                }catch (e) {
                    return 'No group'
                }
            }
        }
    }
</script>

<style scoped>

</style>
