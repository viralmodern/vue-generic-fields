<template>
  <v-dialog
    overlay-opacity="0.4"
    max-width="800px"
    persistent
    v-model="uiShowModal"
  >
    <template v-slot:activator="{ on }">
      <btn-link v-on="on" label="Sign In" icon="mdi-login" />
    </template>
    <OdtJwtAuthenticateIframe v-model="uiShowModal" />
    <v-btn icon absolute top right dark @click="closeModal">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-dialog>
</template>

<script>
import BtnLink from '~/sat-vue-toolkit/components/BtnLink'
import OdtJwtAuthenticateIframe from '~/features/odt/OdtJwtAuthenticateIframe'
export default {
  name: 'ModalAuthIframe',
  components: { OdtJwtAuthenticateIframe, BtnLink },
  data() {
    return {
      uiShowModal: false,
    }
  },
  methods: {
    closeModal() {
      this.uiShowModal = false
    },
  },
}
</script>

<style scoped></style>
