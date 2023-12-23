<template>
  <div>
    <ExampleTestingCenter/>
  </div>
</template>
<script>
    // todo: init bus event, axios provider
    import '../../slick-grid'
    import ExampleTestingCenter from "@/sat-vue-toolkit/components/slick-grid/demo/ExampleTestingCenter";
    /**/
    export default {
        name: "BaseAppExample",
        components: {ExampleTestingCenter}
    }
</script>

<style scoped>

</style>
