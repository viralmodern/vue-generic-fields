<template>
  <div class="text-subtitle-2 pr-2 font-weight-bold">
    {{info}}
  </div>
</template>

<script>
    export default {
        name: "GroupByYSU",
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
