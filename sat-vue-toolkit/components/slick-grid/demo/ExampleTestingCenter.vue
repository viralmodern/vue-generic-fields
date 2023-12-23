<template>
  <div>
    <SlickGrid end-point="/api/testing-centers/"
               bus-event-name="new-testing-centers"
               height="75vh"
               :attributes="attributes"
               main-cell-id="name">
      <template v-slot:item.country="{item}">
        {{item.country}}
      </template>
    </SlickGrid>

  </div>
</template>

<script>
    import SlickGrid from "@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue";
    import {ATTRIBUTE_FIELDS} from "@/sat-vue-toolkit/components/slick-grid/configs/attribute";

    export default {
        name: "ExampleTestingCenter",
        components: {SlickGrid},
        mounted() {
            // todo: set Token
            let token = 1
            this.$api.defaults.headers.common["Authorization"] = `JWT ${token}`
        },
        data() {
            return {
                attributes: [
                    {
                        label: 'Country',
                        name: 'country',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        /*itemText: 'name',
                        itemValue: 'pk',*/
                        width: 200,
                        list: [
                            {
                                label: 'VietNam',
                                value: 'VI'
                            }
                        ],
                        groupBy: true

                    },
                    {
                        label: 'Labels',
                        name: 'labels',
                        type: ATTRIBUTE_FIELDS.LABELS.TYPE,
                        list: [],
                        width: 200,
                        groupBy: true
                    },

                    {
                        label: 'Created',
                        name: 'created',
                        type: ATTRIBUTE_FIELDS.DATE.TYPE,
                        readOnly: true,
                        width: 200
                    },
                    {
                        label: 'Name',
                        name: 'name',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200
                    },
                    {
                        label: 'Creator',
                        name: 'creator',
                        type: ATTRIBUTE_FIELDS.MEMBER.TYPE,
                        readOnly: true,
                        width: 200
                    },

                    {
                        label: 'Address Location ',
                        name: 'address',
                        type: ATTRIBUTE_FIELDS.LOCATION.TYPE,
                        width: 200
                    },

                    {
                        label: 'Instruction',
                        name: 'instruction',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        groupBy: false
                    },
                    {
                        label: 'Website',
                        name: 'website',
                        type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
                        width: 200,
                        groupBy: false
                    },

                    {
                        label: 'Description',
                        name: 'description',
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200
                    },

                    {
                        label: 'Comments',
                        name: 'comments',
                        type: ATTRIBUTE_FIELDS.COMMENTS.TYPE,
                        width: 200,
                        groupBy: false
                    },
                    {
                        label: 'Proofs',
                        name: 'proofs',
                        type: ATTRIBUTE_FIELDS.ATTACHMENT.TYPE,
                        list: [],
                        readOnly: true,
                        width: 200
                    },
                    {
                        label: 'Current Status',
                        name: 'current_status',
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: [
                            {
                                value: 'Z',
                                label: 'N/A'
                            },
                            {
                                value: 'A',
                                label: 'Active'
                            },

                        ],
                        groupBy: false

                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>
