<template>
    <SlickGrid :end-point="endPoint"
               :owner-pk="ownerPk"
               :height="height"
               :has-vote-row="false"
               bus-event-name="bus-characters-entries-matter"
               count-label-many="Characters"
               count-label-singular="Character"
               no-link-detail
               :attributes="attributes"
               main-cell-id="full_name"/>
</template>

<script>
    import {ATTRIBUTE_FIELDS} from "@/sat-vue-toolkit/components/slick-grid/configs/attribute";
    import SlickGrid from "@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue";
    import {getChoicesConfigByName} from "@/sat-vue-toolkit/satlegal/views/ui/mocks/appConfigs";
    import keyBy from 'lodash/keyBy'
    export default {
        name: "AllCharacters",
        components: {SlickGrid},
        props: {
          height: {
            type: String,
            default: () => `75vh`
          },
          ownerId: {}
        },
        data() {
            return {
                tagablesIssue: [],
                tagablesTags: [],
                matterMembers: [],
                workspaceMembers: [],
            }
        },
        async mounted() {
            let resIssue = await this.$api.get(`/api/matters/${this.matterId}/tagables/?type=legal-issue`)
            this.tagablesIssue = resIssue['data']

            let resTags = await this.$api.get(`/api/matters/${this.matterId}/tagables/?type=tag`)
            this.tagablesTags = resTags['data']

            let resMembers = await this.$api.get(`/api/matters/${this.matterId}/members`)
            this.matterMembers = resMembers['data']

            let resWorkspaceMembers = await this.$api.get(`/api/workspace/members/`)
            this.workspaceMembers = resWorkspaceMembers['data']
        },
        computed: {
            ownerPk() {
                try {
                    return this.ownerId || this.$store.getters['ht_store/user/currentUser']['pk']
                } catch (e) {
                    return ''
                }
            },
            matterId() {
                return this.$route.params.projectId || this.$route.params.matter
            },
            endPoint() {
                return `/api/matters/${this.matterId}/characters/`
            },
            membersList() {
                let workspaceMembers = keyBy(this.workspaceMembers, mb => mb.user.pk)
                return this.matterMembers.map(mb => {
                    let temp = {}
                    if(workspaceMembers[mb.user]) {
                        temp = {...workspaceMembers[mb.user], ...workspaceMembers[mb.user]['user']}
                        delete temp['user']
                        return temp
                    }
                    return mb
                })
            },
            attributes() {
                let characterTypes = getChoicesConfigByName('Character.CharacterType');
                let favorable = getChoicesConfigByName('Character.Favorable');
                let disclosedBy = getChoicesConfigByName('Character.DisclosedBy');
                let credibility = getChoicesConfigByName('CommonLevel');
                let characterPosition = getChoicesConfigByName('Character.CharacterPosition');
                let characterLocated = getChoicesConfigByName('Character.CharacterLocated');
                let characterAvailability = getChoicesConfigByName('Character.CharacterAvailability');
                let characterServed = getChoicesConfigByName('Character.CharacterServed');
                let valueLevel = getChoicesConfigByName('CommonLevel');
                let relevantLelvel = getChoicesConfigByName('CommonLevel');
                return [
                    {
                      name: "full_name",
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        required: true,
                      readOnly: true
                    },
                    {
                      name: "avatar",
                      type: ATTRIBUTE_FIELDS.PICTURE.TYPE,
                      width: 100,
                      list: [],
                      groupBy: false,
                      isFileAttachment: true,
                      multiple: false,
                      required: true,
                    },
                    {
                        name: "first_name",
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        required: true,
                    },

                    {
                        name: "last_name",
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        required: true,
                    },

                    {
                        name: "emails",
                        type: ATTRIBUTE_FIELDS.LABELS.TYPE,
                        width: 200,
                        shortLabelTitle: 'emails',
                        multiple: true,
                        chips: true,
                        vBind: {'append-icon': ''}
                    },
                    {
                        name: "phone",
                        type: ATTRIBUTE_FIELDS.LABELS.TYPE,
                        width: 200,
                        shortLabelTitle: 'phones',
                        attachColor: false,
                        multiple: true,
                        chips: true,
                        vBind: {'append-icon': ''}
                    },
                    {
                        name: "location",
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,

                    },
                    {
                        label: "Character Type",
                        name: "character_types",
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: characterTypes,
                        returnObject: false,
                        itemText: 'label',
                        itemValue: 'value',
                        multiple: true,
                        chips: true,
                    },
                    {
                      name: "favorable",
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: favorable,
                        groupBy: true,
                    },
                    {
                        name: "disclosed_by",
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: disclosedBy
                    },
                    {
                        name: "credibility",
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: credibility,
                        groupBy: true,
                    },
                    {
                        name: "position",
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: characterPosition
                    },
                    {
                        name: "located",
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: characterLocated,
                        groupBy: true,
                    },
                    {
                        name: "availability",
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: characterAvailability,
                        groupBy: true,
                    },
                    {
                        name: "served",
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: characterServed,
                        groupBy: true,
                    },
                    {
                        label: "Related to Legal Issue",
                        name: "legal_issues",
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.tagablesIssue,
                        itemText: 'name',
                        itemValue: 'pk',
                        itemColor: 'color',
                        chips: true,
                        multiple: true,
                    },
                    {
                        label: "Date of Birth", name: "birthday",
                        type: ATTRIBUTE_FIELDS.DATE.TYPE,
                        width: 200,
                        list: []
                    },
                    {
                        name: "age",
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        list: [],
                        width: 200,
                        readOnly: true
                    },
                    {
                        name: "background",
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,
                        list: []
                    },
                    {
                        label: "Value Important Index",
                        name: "important",
                        type: ATTRIBUTE_FIELDS.PROGRESS.TYPE,
                        width: 200,
                        list: []
                    },
                    {
                        label: "Relevant Index", name: "relevant",
                        type: ATTRIBUTE_FIELDS.PROGRESS.TYPE,
                        width: 200,
                        list: []
                    },
                    {
                        label: "Value Level", name: "value_level",
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: valueLevel,
                        groupBy: true,
                    },
                    {
                        label: "Relevant Level",
                        name: "relevant_level",
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: relevantLelvel,
                        groupBy: true,
                    },
                    {
                        label: "Tags", name: "tags",
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: this.tagablesTags,
                        itemText: 'name',
                        itemValue: 'pk',
                        itemColor: 'color',
                        chips: true,
                        multiple: true,
                        groupBy: true,

                    },
                    {
                        label: "Note",
                        name: "total_notes",
                        type: ATTRIBUTE_FIELDS.NOTE.TYPE,
                        width: 200,
                        list: [],
                        disableCreate: true

                    },
                    {
                        label: "Deposition",
                        // name: "deposition",
                        name: "p_depositions",
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        itemText: 'name',
                        itemValue: 'pk',
                        chips: true,
                        multiple: true,
                        width: 200,
                        list: [],
                        readOnly: true,
                    },
                    {
                        label: "Members", name: "members",
                        type: ATTRIBUTE_FIELDS.ASSIGN_MEMBER.TYPE,
                        width: 200,
                        innerScope: true,
                        list: this.membersList,
                        itemText: 'name',
                        itemValue: 'pk',
                        itemAvatar: 'avatar',
                        returnObject: false,
                        multiple: true,
                        groupBy: true,
                    },
                    {
                        label: "Discovery Request",
                        name: "request_sets",
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: [],
                        readOnly: true,
                    },

                ]
            }
        }
    }
</script>

<style scoped>

</style>
