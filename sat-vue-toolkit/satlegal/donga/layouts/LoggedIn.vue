<template>
  <MainLayout>
    <router-view></router-view>
    <PortalAttributeActions/>
  </MainLayout>
</template>

<script>
  import MainLayout from "../../ht_components/layouts/MainLayout";
  import PortalAttributeActions from "../../../components/slick-grid/PortalAttributeActions";
  export default {
    name: "LoggedIn",
    components: {
        PortalAttributeActions,
      MainLayout: MainLayout
    },
  }


</script>
