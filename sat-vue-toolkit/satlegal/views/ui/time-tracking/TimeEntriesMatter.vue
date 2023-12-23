<template>
  <div>
    <SlickGrid :end-point="`/api/users/satlegal-time-entries/`"
               :owner-pk="ownerPk"
               height="75vh"
               bus-event-name="timelines-matter"
               :attributes="attributes"/>
  </div>
</template>

<script>
    import SlickGrid from "../../../../components/slick-grid/SlickGrid";
    import {ATTRIBUTE_FIELDS} from "../../../../components/slick-grid/configs/attribute";
    import {appConfigsMatters} from "../mocks/appConfigs";
    export default {
        name: "TimelinesMatterGeneral",
        components: {SlickGrid},
        data() {
          return {
              matterId: 64,
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
                        label: 'Task Board',
                        name: 'content_type_id',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.relatableModel,
                        groupBy: false,
                    },
                    {
                        label: 'Task ID',
                        name: 'object_id',
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    },

                    {
                        label: 'Start Time',
                        name: 'start_time',
                        type: ATTRIBUTE_FIELDS.DATE.TYPE,
                        width: 200,
                        list: [],
                        readOnly: true,
                        groupBy: false,
                    },
                    {
                        label: 'End Time',
                        name: 'end_time',
                        type: ATTRIBUTE_FIELDS.DATE.TYPE,
                        width: 200,
                        list: [],
                        readOnly: true,
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
        }
    }
</script>

<style scoped>

</style>
