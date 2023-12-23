<template>
  <div>
    <SlickGrid :end-point="`/api/matters/${matterId}/facts/`"
               :owner-pk="ownerPk"
               bus-event-name="bus-new-fact"
               :height="height"
               :has-vote-row="false"
               :attributes="attributes"
               count-label-singular="Fact"
               count-label-many="Facts"
               no-link-detail
               main-cell-id="name">

    </SlickGrid>
  </div>
</template>

<script>
    import SlickGrid from "../../../components/slick-grid/SlickGrid";
    import {ATTRIBUTE_FIELDS} from "../../../components/slick-grid/configs/attribute";
    import {getChoicesConfigByName} from "./mocks/appConfigs";

    export default {
        components: {SlickGrid},
        name: 'AllFacts',
        props: {
          height: {
            type: String,
            default: () => `72vh`
          },
          ownerId: {}
        },
        data() {
            return {
                tagablesIssue: [],
                tagablesSubject: [],
                charactersByMatter: [],
                factSources: [],
                factTypes: getChoicesConfigByName('Fact.Type'),
                commonLevel: getChoicesConfigByName('CommonLevel'),
            }
        },

        computed: {
            matterId() {
                return this.$route.params.matter || this.$route.params.projectId
            },
            ownerPk() {
                try {
                  return this.ownerId || this.$store.getters['ht_store/user/currentUser']['pk']
                } catch (e) {
                    return ''
                }
            },

            attributes() {
                return [
                    {
                        label: "Name",
                        name: "name",
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                        required: true,
                    },
                    {
                      label: "Fact Type",
                      name: "type",
                      type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                      width: 200,
                      list: this.factTypes,
                      groupBy: true,
                      required: true,
                    },
                    {
                        label: "Time",
                        name: "time",
                        type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false
                    },
                    {
                        label: "Fact Description ",
                        name: "desc",
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false
                    },
                    {
                        label: "Subject Matter",
                        name: "subjects",
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.tagablesSubject,
                        itemText: 'name',
                        itemValue: 'pk',
                        multiple: true,
                        chips: true,
                        groupBy: false
                    },
                    {
                        label: "Characters",
                        name: "characters",
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.charactersByMatter,
                        itemText: 'first_name',
                        itemValue: 'pk',
                        multiple: true,
                        chips: true,
                        groupBy: true
                    },
                    {
                        label: "Cause of Action",
                        name: "cause_of_actions",
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false
                    },
                    {
                        label: "Location",
                        name: "location",
                        type: ATTRIBUTE_FIELDS.LOCATION.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                        required: false,
                    },

                    {
                        label: "Disputed",
                        name: "dispute",
                        type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
                        width: 200,
                        list: [
                            {
                                value: 'True',
                                label: 'Disputed'
                            },
                            {
                                value: false,
                                label: 'None Disputed'
                            },
                        ],
                        groupBy: true

                    },
                    {
                        label: "Legal Issue",
                        name: "legal_issues",
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        itemText: 'name',
                        itemValue: 'pk',
                        multiple: true,
                        chips: true,
                        width: 200,
                        list: this.tagablesIssue,
                        groupBy: true

                    },
                    {
                        label: "Relief Sought",
                        name: "relief_sought",
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false

                    },
                    {
                        label: "Favorable",
                        name: "favorable",
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: [
                            {
                                value: 1,
                                label: 'Plaintiff',
                            },
                            {
                                value: 2,
                                label: 'Defendant',
                            },
                            {
                                value: 3,
                                label: 'Non Party',
                            },

                        ],
                        groupBy: true
                    },
                    {
                        label: "Value Important Index",
                        name: "important",
                        type: ATTRIBUTE_FIELDS.PROGRESS.TYPE,
                        width: 200,
                        list: [],
                        groupBy: true

                    },
                    {
                        label: "Relevant Index",
                        name: "relevant",
                        type: ATTRIBUTE_FIELDS.PROGRESS.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false
                    },
                    {
                        label: "Value Level",
                        name: "value_level",
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: this.commonLevel,
                        groupBy: true

                    },
                    {
                        label: "Relevant Level",
                        name: "relevant_level",
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: this.commonLevel,
                        groupBy: true

                    },
                    {
                        label: "Important Level",
                        name: "important_level",
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: this.commonLevel,
                        groupBy: true

                    },

                    {
                        label: "Fact Source",
                        name: "sources",
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.factSources,
                        itemText: 'name',
                        itemValue: 'pk',
                        multiple: true,
                        chips: true,
                        groupBy: false

                    },
                    {
                        label: "Fact Interpretation",
                        name: "interpretation",
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false

                    },
                ]
            },
        },
        async mounted() {
            let resIssue = await this.$api.get(`/api/matters/${this.matterId}/tagables/?type=legal-issue`)
            this.tagablesIssue = resIssue['data']
            let resSubject = await this.$api.get(`/api/matters/${this.matterId}/tagables/?type=subject`)
            this.tagablesSubject = resSubject['data']
            let resCharacters = await this.$api.get(`/api/matters/${this.matterId}/partial-info-characters/`)
            this.charactersByMatter = resCharacters['data']
            let resFactSource = await this.$api.get(`/api/matters/${this.matterId}/tagables/?type=fact-source`)
            this.factSources = resFactSource['data']

            // partial-info-characters/


        }
    }
</script>

<style scoped>

</style>
