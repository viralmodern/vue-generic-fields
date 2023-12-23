<template>
  <div>
    <p>
      <router-link to="#" class="title">
        {{ item.caseName }}
      </router-link>
    </p>
    <strong>Docket Number:</strong> {{ item.docketNumber }} <br />
    <strong>Date Filed:</strong> {{ item.dateFiled | $$formatDate }}<br />
    <strong>Date Terminated:</strong> {{ item.dateTerminated | $$formatDate
    }}<br />
    <strong>Nature of Suit:</strong> {{ item.suitNature }}<br />
    <strong>Cause:</strong> {{ item.cause }}<br />
    <strong>Jury Demand:</strong> {{ item.juryDemand }}<br />
    <strong>Assigned To:</strong> {{ item.assignedTo }}<br />
    <strong>Parties:</strong> {{ item.party | $$arrToString }}<br />
    <strong>Attorneys:</strong> {{ item.attorney | $$arrToString }}<br />
    <!--    {{item}}-->
    <p></p>
  </div>
</template>

<script>
import { $$arrToString } from '@/sat-vue-toolkit/functions'
import mx_dateTime from '~/mixins/mx_dateTime'
import { TYPE_ODT_SEARCH } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

// let a = $$strName()
export default {
  name: 'SearchThumnailCaseNameDocket',
  mixins: [mx_dateTime],
  filters: {
    $$arrToString,
  },
  props: {
    typeOdtSearch: {
      default: () => TYPE_ODT_SEARCH.OPINIONS,
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped></style>
