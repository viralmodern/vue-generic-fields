<template>
  <div class="d-flex w-100">
    <UserDetail :pk="value">
    </UserDetail>

  </div>
</template>

<script>
    import {UserDetail} from "@/sat-vue-toolkit/components";
    import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"

    export default {
        name: "MemberCell",
        components: {UserDetail},
        mixins: [mxAttributeItem]
    }
</script>

<style scoped>

</style>
