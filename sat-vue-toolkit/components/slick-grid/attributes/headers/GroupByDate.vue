<template>
  <div>
    <div class="date--child-group text-subtitle-2 font-weight-bold pr-2">
      <template v-if="info">
        {{$formatDateTime(info, 'MMM Do YY, h:mm a')}}
      </template>
      <template v-else>
        No Date
      </template>
    </div>
  </div>
</template>

<script>
    import mx_dateTime from "@/sat-vue-toolkit/mixins/mxDateTime";

    export default {
        name: "GroupByDate",
        mixins: [mx_dateTime],
        props: {
            info: {
                type: [String, Object, Array, Date],
                default: ''
            }
        }
    }
</script>

<style scoped>
  .date--child-group {
    /*border: solid 1px blue;*/

  }
</style>
