<template>
  <v-card :flat="true" :loading="loading" min-height="350px">
    <v-card-title>
      <v-spacer />
      <btn-link
        :input-value="true"
        @click="toggleMask"
        :label="mask ? `Hide all` : `Show all`"
      />
    </v-card-title>
    <div class="px-3">
      <NerCoreferenceResolution v-if="detail" :ner="detail" />
    </div>
  </v-card>
</template>

<script>
import NerCoreferenceResolution from '~/features/odt/NerCoreferenceResolution'
import mxNerBaseDetail from '~/features/odt/mixins/mxNerBaseDetail'
import BtnLink from '~/sat-vue-toolkit/components/BtnLink'
export default {
  components: { BtnLink, NerCoreferenceResolution },
  mixins: [mxNerBaseDetail],
  head() {
    return {
      title: 'Coreference Resolution',
    }
  },
  data() {
    return {
      mask: true,
    }
  },
  methods: {
    toggleMask() {
      try {
        let mask = this.mask
        let elm = document.getElementById(
          'all-npl-content-coreference-resolution'
        )
        if (mask) {
          elm.classList.add('not-show-all')
        } else {
          elm.classList.remove('not-show-all')
        }
        this.mask = !mask
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
