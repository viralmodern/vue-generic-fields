<template>
  <div>
    <SlickGrid :end-point="`/api/matters/${matterId}/timelines/`"
               :owner-pk="ownerPk"
               main-cell-id="name"
               height="80vh"
               bus-event-name="timelines-matter"
               :attributes="attributes"/>
  </div>
</template>

<script>
    import SlickGrid from "../../../../components/slick-grid/SlickGrid";
    import {ATTRIBUTE_FIELDS} from "../../../../components/slick-grid/configs/attribute";
    import {getChoicesConfigByName} from "../mocks/appConfigs";

    export default {
        name: "TimelinesMatterGeneral",
        components: {SlickGrid},
        data() {
            return {
                matterId: 64,
                legalActivitiesCode: getChoicesConfigByName('LegalActivitiesCode'),
                legalLitigationCode: getChoicesConfigByName('LegalLitigationCode'),
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
                        label: 'Name',
                        name: 'name',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        required: true,
                    },
                    /*{
                        label: 'object_id',
                        name: 'object_id',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 150,
                        list: [],
                        readOnly: true,
                    },
                    {
                        label: 'content_type_id',
                        name: 'content_type_id',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 150,
                        list: [],
                        readOnly: true,
                    },*/

                    {
                        label: 'Logged By',
                        name: 'logged_by',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 150,
                        list: [],
                        readOnly: true,

                    },

                    {
                        label: 'Logged For',
                        name: 'logged_for',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 150,
                        list: [],
                        readOnly: true,
                        groupBy: true,
                    },

                    {
                        label: 'Added On',
                        name: 'added_on',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 150,
                        list: [],
                        readOnly: true,
                    },
                    {
                        label: 'Taskboard',
                        name: 'taskboard',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 150,
                        list: [],
                        readOnly: true,
                    },
                    {
                        label: 'Task',
                        name: 'task',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 150,
                        list: [],
                        readOnly: true,
                        groupBy: true,
                    },
                    {
                        label: 'Description',
                        name: 'desc',
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    },
                    {
                        label: 'Comment',
                        name: 'comments',
                        type: ATTRIBUTE_FIELDS.COMMENTS.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                        readOnly: true,
                    },
                    {
                        label: 'Litigation Code',
                        name: 'litigation_code',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.legalLitigationCode,
                        groupBy: true,
                    },
                    {
                        label: 'Activities Code',
                        name: 'activities_code',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.legalActivitiesCode,
                        groupBy: true,
                    },
                    {
                        label: 'Source',
                        name: 'source',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: [
                            {value: 1, label: 'Timer Log'},
                            {value: 2, label: 'Manual Add'},
                        ],
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
                        label: 'Client',
                        name: 'client',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: true,
                    },
                    {
                        label: 'Duration',
                        name: 'duration',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                        readOnly: true,
                    },
                    {
                        label: 'Labels',
                        name: 'tags',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: [],
                        groupBy: true,
                    },
                    {
                        label: 'Billable?',
                        name: 'billable',
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: [
                            {value: 1, label: 'YES'},
                            {value: 0, label: 'NO'},
                        ],
                        groupBy: true,
                    },




                    {
                        label: 'Members',
                        name: 'members',
                        type: ATTRIBUTE_FIELDS.ASSIGN_MEMBER.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    },



                ]
            }
        }
    }
</script>

<style scoped>

</style>
