<template>
  <div>
    <template v-if="row">
      <AttributeDetail
        :item="row"
        :end-point="endPointUrl"
        :is-owner-row="isOwnerRow"
        :main-cell-id="mainCellId"
        :attributes="attributes"
        @input="$emit('input', false)"
      />
    </template>
  </div>
</template>

<script>
import AttributeDetail from '@/sat-vue-toolkit/components/slick-grid/attributes/AttributeDetail.vue'
import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import {
  MatterPriority,
  MatterRiskLevel,
  MatterStage,
} from '@/sat-vue-toolkit/satlegal/views/ui/mocks/matterConfigs'
export default {
  name: 'FormFieldsMatter',
  components: { AttributeDetail },
  props: {
    matterId: {
      type: [String, Number],
      default: () => '',
    },
    value: {},
  },
  data() {
    return {
      row: null,
      mainCellId: 'name',
      matterTypes: [],
      clients: [],
      courts: [],
    }
  },
  mounted() {
    this.fetchRowEntry()
    this.fetchEntriesList()
  },
  methods: {
    async fetchRowEntry() {
      try {
        let res = await this.$api.get(`/api/matters/${this.matterId}/`)
        this.row = res['data']
      } catch (e) {}
    },
    async fetchEntriesList() {
      // let resTypes = await this.$api.get('/api/matter-types/')
      // this.matterTypes = resTypes['data']

      let resClients = await this.$api.get('/api/clients/', {
        params: { ungroup: true },
      })
      this.clients = resClients['data']['results']

      let resCourts = await this.$api.get('/api/courts/')
      this.courts = resCourts['data']
    },
  },
  computed: {
    endPointUrl() {
      return `/api/matters/${this.matterId}/`
    },
    isOwnerRow() {
      return true
    },
    attributes() {
      return [
        {
          label: 'Matter Name',
          name: 'name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          required: true,
        }, // N/A
        {
          label: 'clients',
          name: 'clients',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          width: 200,
          list: this.clients,
          itemText: 'email',
          itemValue: 'pk',
          multiple: false,
          groupBy: true,
        }, // N/A
        {
          label: 'intro',
          name: 'intro',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        }, // N/A
        {
          label: 'Court District',
          name: 'jurisdiction',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          width: 200,
          list: this.courts,
          itemText: 'short_name',
          itemValue: 'id',
          groupBy: true,
        }, // N/A
        {
          label: 'claims',
          name: 'claims',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'complaints',
          name: 'complaints',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'members',
          name: 'members',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        }, // N/A
        {
          label: 'Docket Number',
          name: 'docket_number',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A

        {
          label: 'Matter Types',
          name: 'types',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          width: 200,
          list: this.matterTypes,
          itemText: 'name',
          itemValue: 'pk',
          multiple: true,
          chips: true,
          groupBy: true,
        }, // N/A
        {
          label: 'activate',
          name: 'activate',
          type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
          width: 200,
          list: [
            { label: 'Activate', value: 'True' },
            { label: 'None activate', value: 'False' },
          ],
          groupBy: true,
        }, // N/A
        {
          label: 'archive',
          name: 'archive',
          type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        }, // N/A
        {
          label: 'priority',
          name: 'priority',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 200,
          list: MatterPriority,
          groupBy: true,
        }, // N/A
        {
          label: 'risk_level',
          name: 'risk_level',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 200,
          list: MatterRiskLevel,
          groupBy: true,
        }, // N/A
        {
          label: 'Is Manager',
          name: 'is_manager',
          type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'Is Assignee',
          name: 'is_assignee',
          type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'Jury Demand',
          name: 'jury_demand',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 200,
          list: [
            { label: 'Yes', value: 'True' },
            { label: 'No', value: 'False' },
          ],
          groupBy: true,
        }, // N/A
        {
          label: 'Date Filled',
          name: 'date_filled',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          // readOnly: true,
        }, // N/A
        {
          label: 'Start Date',
          name: 'start_date',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        }, // N/A
        {
          label: 'est_time',
          name: 'est_time',
          type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        }, // N/A
        {
          label: 'Next Courts',
          name: 'next_courts',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        }, // N/A

        {
          label: 'Done Cards',
          name: 'done_cards',
          type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'Process',
          name: 'process',
          type: ATTRIBUTE_FIELDS.PROGRESS.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'Judge',
          name: 'judge',
          type: ATTRIBUTE_FIELDS.ASSIGN_MEMBER.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        }, // N/A
        {
          label: 'Total cards',
          name: 'total_cards',
          type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'Matter Stage',
          name: 'stage',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 200,
          list: MatterStage,
          groupBy: true,
        }, // N/A
        {
          label: 'Color',
          name: 'color',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        }, // N/A
        {
          label: 'Time tracking',
          name: 'time_tracked',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        }, // N/A
        {
          label: 'Total time tracking',
          name: 'total_time_tracking',
          type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        }, // N/A
      ]
    },
  },
}
</script>

<style scoped></style>
