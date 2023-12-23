<template>
  <div>
    <p class="text-h5">
      <span v-html="detail.matter_name"></span>
    </p>
    <p class="text-h6">
      {{ detail.court }}
    </p>
    <p class="mb-0">
      <strong>Filed:</strong>
      {{ detail.date_filed | $$formatFullDate }}
    </p>
    <p class="mb-0">
      <strong>Precedential Status:</strong>
      {{ getDetailPrecedentialStatus }}
    </p>
    <p class="mb-0">
      <strong>Citations:</strong>
      {{ detail.citations }}
      <!--              386 U.S. 738, 87 S. Ct. 1396, 18 L. Ed. 2d 493, 1967 U.S. LEXIS 1569-->
    </p>
    <p class="mb-0">
      <strong>Docket Number:</strong> {{ detail.docket_number }}
    </p>
    <p class="mb-0">
      <strong>Supreme Court Database ID:</strong>
      {{ detail.scdb_id }}
    </p>
    <p><strong>Author:</strong> {{ detail.author_str }}</p>
  </div>
</template>

<script>
import {
  $$arrToString,
  $$formatFullDate,
  $$countArr,
  $$lastArrItem,
} from '~/sat-vue-toolkit/functions'
export default {
  name: 'DetailThumbNailViewODT',
  filters: {
    $$arrToString,
    $$formatFullDate,
    $$countArr,
    $$lastArrItem,
  },
  props: {
    detail: {},
  },
  computed: {
    getDetailPrecedentialStatus() {
      return this.$store.getters['appConfigs/getDetailChoicesConfigByName'](
        'PrecedentialStatus',
        this.detail.cluster__precedential_status
      )
    },
  },
  methods: {},
}
</script>

<style scoped></style>
