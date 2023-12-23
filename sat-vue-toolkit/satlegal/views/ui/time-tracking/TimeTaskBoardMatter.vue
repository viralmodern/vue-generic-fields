<template>
  <div>
    <SlickGrid :end-point="`/api/users/satlegal-time-entries/`"
               :owner-pk="ownerPk"
               height="65vh"
               main-cell-id="desc"
               bus-event-name="timelines-matter"
               :attributes="attributes"/>
  </div>
</template>

<script>
    import SlickGrid from "../../../../components/slick-grid/SlickGrid";
    import {ATTRIBUTE_FIELDS} from "../../../../components/slick-grid/configs/attribute";
    import {appConfigsMatters} from "../mocks/appConfigs";

    export default {
        name: "TimeTaskBoardMatter",
        components: {SlickGrid},
        data() {
            return {
                projectId: 64,
                boards: [],
                cardsByBoard: [],
                cards: [],
                relatableModel: appConfigsMatters.system.relatable_model
            }
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
                        label: 'content_type_id',
                        name: 'content_type_id',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.relatableModel,
                        groupBy: false,
                    },
                    /*{
                        label: 'Task Board',
                        name: 'task_board',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.boards,
                        itemText: 'name',
                        itemValue: 'pk',
                        groupBy: false,
                    },*/

                    {
                        label: 'Task ID',
                        name: 'object_id',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.cards,
                        itemText: 'name',
                        itemValue: 'pk',
                        groupBy: true,
                    },
                    {
                        label: 'Task Name',
                        name: 'Task Name',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        readOnly: true,
                        groupBy: false,
                    },
                    {
                        label: 'Original Estimate Time',
                        name: 'Original Estimate Time',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    },
                    {
                        label: 'Estimate Time Remaining',
                        name: 'Estimate Time Remaining',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    },
                    {
                        label: 'Original Estimate Remaining',
                        name: 'Original Estimate Remaining',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    },
                    {
                        label: 'Time in Stage',
                        name: 'Time in Stage',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    },
                    {
                        label: 'Time Betweeen Stages',
                        name: 'Time Betweeen Stages',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    },

                    {
                        label: 'Assignee Time',
                        name: 'Assignee Time',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    },


                    {
                        label: 'Time Logged',
                        name: 'Time Logged',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                        readOnly: true,
                    },
                    {
                        label: 'Variance',
                        name: 'Variance',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    },


                    {
                        label: 'Start Time',
                        name: 'start_time',
                        type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    },
                    {
                        label: 'End Time',
                        name: 'end_time',
                        type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    },

                    {
                        label: 'Description',
                        name: 'desc',
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    },


                ]
            }
        },
        async mounted() {
            this.fetchCards()
        },
        methods: {
            async fetchCards() {
                let res = await this.$api.get(`/api/users/cards/`);
                this.cards = res['data']['results']
            }
        }
    }
</script>

<style scoped>

</style>
