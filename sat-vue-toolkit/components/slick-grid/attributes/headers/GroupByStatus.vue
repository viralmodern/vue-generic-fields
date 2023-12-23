<template>
  <div class="pr-4">
    <v-chip small label dark :color="getGroupActive | colorLabel">
      {{getGroupActive | itemLabel}}
    </v-chip>
  </div>
</template>

<script>
    import {STATUS} from "../../configs/attribute";

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
        name: "GroupByStatus",
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
                    return v.label || v.name || v.short_name || 'No group'
                }catch (e) {
                    return 'No group'
                }
            },
            colorLabel(v) {
                try {
                    let status = v.label || v.name || v.short_name || 'No group'
                    return STATUS[status].COLOR
                }catch (e) {
                    return 'No group'
                }
            }
        }
    }
</script>

<style scoped>

</style>
