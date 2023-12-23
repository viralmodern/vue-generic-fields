<template>
  <div>
    <TopBarUSAHouseOfCommitteesDetailOdt />
    <nuxt-child />
  </div>
</template>

<script>
import TopBarUSAHouseOfCommitteesDetailOdt from '~/features/odt/TopBarUSAHouseOfCommitteesDetailOdt'
export default {
  components: { TopBarUSAHouseOfCommitteesDetailOdt },
}
</script>

<style scoped></style>
