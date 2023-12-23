<template>
  <v-main>
    <v-container fluid>
      <BaseMatterSetting>
        <nuxt-child />
      </BaseMatterSetting>
    </v-container>
  </v-main>
</template>
<script>
import BaseMatterSetting from '../../../components/matters/matter/BaseMatterSetting'

export default {
  name: 'setting',
  components: { BaseMatterSetting },
}
</script>

<style scoped></style>
