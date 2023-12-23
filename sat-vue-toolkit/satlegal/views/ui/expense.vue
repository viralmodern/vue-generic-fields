<template>
  <div>
    <SlickGrid height="80vh"
               bus-event-name="expense-bus-matters"
               end-point="/api/expenses/"
               main-cell-id="name"
               :owner-pk="ownerPk"
               :attributes="attributes">

    </SlickGrid>
  </div>
</template>

<script>
    import SlickGrid from "../../../components/slick-grid/SlickGrid";
    import {ATTRIBUTE_FIELDS} from "../../../components/slick-grid/configs/attribute";
    import {appConfigsMatters, getChoicesConfigByName} from "./mocks/appConfigs";
    export default {
        components: {SlickGrid},
        data() {
          return {
              expensePaidStatus: getChoicesConfigByName('Expense.PaidStatus'),
              expenseBillableStatus: getChoicesConfigByName('Expense.BillableStatus'),
              legalActivitiesCode: getChoicesConfigByName('LegalActivitiesCode'),
              legalExpenseCode: getChoicesConfigByName('LegalExpenseCode'),
              relatableModel: appConfigsMatters.system.relatable_model,
              matterId: 55,
              clients: []
          }
        },
        async mounted() {
            let resClients = await this.$api.get('/api/clients/', {params: {ungroup: true}})
            this.clients = resClients['data']['results']
        },
        computed: {
            ownerPk() {
                try {
                    return this.$store.getters['ht_store/user/currentUser']['pk']
                } catch (e) {
                    return ''
                }
            },
            attributes() {
                return [
                    {
                        label: 'Name',
                        name: 'name',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        required: true,
                        groupBy: true,
                    },
                    {
                        label: 'billable_status',
                        name: 'billable_status',
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: this.expenseBillableStatus,
                        groupBy: true,
                    },
                    {
                        label: 'tax1',
                        name: 'tax1',
                        type: ATTRIBUTE_FIELDS.PROGRESS.TYPE,
                        width: 200,
                        list: [],
                        filledType: 'number',
                        required: false,
                        groupBy: false,
                    },
                    {
                        label: 'tax2',
                        name: 'tax2',
                        type: ATTRIBUTE_FIELDS.PROGRESS.TYPE,
                        width: 200,
                        list: [],
                        filledType: 'number',
                        required: false,
                        groupBy: false,
                    },
                    {
                        label: 'creator',
                        name: 'creator',
                        type: ATTRIBUTE_FIELDS.MEMBER.TYPE,
                        width: 200,
                        list: [],
                        readOnly: true,
                        groupBy: true,
                    },
                    {
                        label: 'paid_status',
                        name: 'paid_status',
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: this.expensePaidStatus,
                        required: false,
                        groupBy: true,
                    },
                    {
                        label: 'expense_date',
                        name: 'expense_date',
                        type: ATTRIBUTE_FIELDS.DATE.TYPE,
                        width: 200,
                        list: [],
                        required: false,
                        groupBy: false,
                    },
                    {
                        label: 'activity_code',
                        name: 'activity_code',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.legalActivitiesCode,
                        required: false,
                        groupBy: false,
                    },
                    {
                        label: 'expense_code',
                        name: 'expense_code',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.legalExpenseCode,
                        required: false,
                        groupBy: true,

                    },
                    {
                        label: 'billed_by_id',
                        name: 'billed_by_id',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        required: false,
                        groupBy: true,
                        readOnly: true,
                    },
                    {
                        label: 'created',
                        name: 'created',
                        type: ATTRIBUTE_FIELDS.DATE.TYPE,
                        width: 200,
                        list: [],
                        required: false,
                        groupBy: false,
                        readOnly: true,
                    },
                    {
                        label: 'client',
                        name: 'client',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.clients,
                        itemValue: 'pk',
                        itemText: 'email',
                        required: false,
                        groupBy: true,
                        readOnly: true,
                    },
                    {
                        label: 'receipts',
                        name: 'receipts',
                        type: ATTRIBUTE_FIELDS.ATTACHMENT.TYPE,
                        width: 200,
                        list: [],
                        required: false,
                        groupBy: false,
                        readOnly: true,
                    },
                    {
                        label: 'content_type',
                        name: 'content_type',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.relatableModel,
                        required: true,
                        groupBy: false,
                    },
                    {
                        label: 'object_id',
                        name: 'object_id',
                        type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
                        width: 200,
                        list: [],
                        required: true,
                        hiddenFormData: true,
                        groupBy: false,
                        value: this.matterId,
                    },
                    {
                        label: 'amount',
                        name: 'amount',
                        type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
                        width: 200,
                        list: [],
                    },
                    {
                        label: 'desc',
                        name: 'desc',
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,
                        list: [],
                    },
                    {
                        label: 'relations',
                        name: 'relations',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: [],
                    },







                ]
            }
        },
    }
</script>

<style scoped>

</style>
