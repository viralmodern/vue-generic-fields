<template>
  <div>
    <TopBarUSACongressBillsOdt />
    <nuxt-child />
  </div>
</template>

<script>
import TopBarUSACongressBillsOdt from '~/features/odt/TopBarUSACongressBillsOdt'

export default {
  components: { TopBarUSACongressBillsOdt },
}
</script>

<style scoped></style>
