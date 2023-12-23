<template>
  <div class="text-subtitle-2 font-weight-bold pr-2">
    {{info}}
    <span v-if="info">{{info}}</span>
    <span v-else class="grey--text">No Text</span>
  </div>
</template>

<script>
    export default {
        name: "GroupByText",
        props: {
            info: {
                type: [String, Object, Array, Date],
                default: ''
            }
        },
    }
</script>

<style scoped>

</style>
