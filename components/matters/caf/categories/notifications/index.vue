<template>
  <base-caf>
    <v-card :elevation="0">
      <v-card-text>
        <card-unread />
      </v-card-text>
    </v-card>
  </base-caf>
</template>

<script>
import BaseCaf from '../../utils/BaseCaf'
import CardUnread from './CardUnread'

export default {
  name: 'index',
  components: { CardUnread, BaseCaf }
}
</script>

<style scoped></style>
