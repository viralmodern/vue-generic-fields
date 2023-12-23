<template>
  <div>
    <SlickGrid end-point="/api/matters/"
               :owner-pk="ownerId"
               :has-vote-row="false"
               bus-event-name="bus-new-matter"
               :height="height"
               :attributes="attributes"
               count-label-many="Matters"
               count-label-singular="Matter"
               disable-add-new-to-many
               unique-id="pk"
               main-cell-id="name">
    </SlickGrid>
  </div>
</template>

<script>
  import { MatterPriority, MatterRiskLevel, MatterStage } from "./mocks/matterConfigs"
  import {ATTRIBUTE_FIELDS} from "@/sat-vue-toolkit/components/slick-grid/configs/attribute";
  import SlickGrid from "@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue";
  import {getChoicesConfigByName} from "@/sat-vue-toolkit/satlegal/views/ui/mocks/appConfigs";

  export default {
    components: { SlickGrid },
    name: "AllMatters",
    props: {
      height: {
        type: [String, Number],
        default: () => `76vh`
      },
      ownerPk: {
        type: [String, Number],
        default: () => ``
      }
    },
    data () {
      return {
        matterTypes: [],
        clients: [],
        courts: []
      }
    },

    computed: {
      ownerId () {
        try {
          return this.$store.getters['auth/user']['pk']
        } catch (e) {
          return ""
        }
      },
      attributesCharacter() {
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
            label: "Character Type",
            name: "character_types",
            type: ATTRIBUTE_FIELDS.LIST.TYPE,
            width: 200,
            list: characterTypes,
            value: 9,
            returnObject: false,
            itemText: 'label',
            itemValue: 'value',
            multiple: true,
            chips: true,
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
            label: "Discovery Request",
            name: "request_sets",
            type: ATTRIBUTE_FIELDS.LIST.TYPE,
            width: 200,
            list: [],
            readOnly: true,
          },

        ]
      },
      attributes () {
        return [
          {
            label: "Matter Name",
            name: "name",
            type: ATTRIBUTE_FIELDS.TEXT.TYPE,
            width: 200,
            list: [],
            groupBy: false,
            required: true
          }, // N/A
          {
            // label: "Docket Number",
            name: "docket_number",
            type: ATTRIBUTE_FIELDS.TEXT.TYPE,
            width: 200,
            list: [],
            groupBy: false,
          }, // N/A
          {
            label: "Court District",
            name: "jurisdiction",
            type: ATTRIBUTE_FIELDS.LIST.TYPE,
            width: 200,
            list: this.courts,
            itemText: "short_name",
            itemValue: "id",
            groupBy: true
          }, // N/A
          {
            // label: "clients",
            name: "clients",
            type: ATTRIBUTE_FIELDS.LIST.TYPE,
            width: 200,
            list: [],
            endPointList: '/api/clients/?ungroup=true',
            asyncSearch: true,
            itemText: "email",
            itemValue: "pk",
            itemAvatar: "avatar",
            multiple: true,
            groupBy: true,
            returnObject: false
          }, // N/A
          {
            // label: "Intro",
            name: "intro",
            type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
            width: 200,
            list: [],
            groupBy: false
          }, // N/A

          {
            // label: "claims",
            name: "claims",
            type: ATTRIBUTE_FIELDS.LIST.TYPE,
            width: 200,
            list: [],
            groupBy: false,
            disableCreate: true,
            itemText: 'name',
            itemValue: 'pk',
            asyncSearch: true,
            multiple: true,
            endPointList: (matter) => {
              return `/api/matters/${matter}/claims/`
            },
            nestedChildren: [
              {
                name: "name",
                type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                width: 200,
                list: [],
                required: true,
              },
              {
                name: "desc",
                type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                width: 200,
                list: [],
              },
              {
                name: "tags",
                type: ATTRIBUTE_FIELDS.LABELS.TYPE,
                width: 200,
                list: [],
                chips: true,
                multiple: true,
              },

            ]
          }, // N/A
          {
            // label: "complaints",
            name: "complaints",
            type: ATTRIBUTE_FIELDS.LIST.TYPE,
            width: 200,
            list: [],
            groupBy: false,
            readOnly: true
          }, // N/A
          {
            // label: "members",
            name: "members",
            type: ATTRIBUTE_FIELDS.LIST.TYPE,
            width: 200,
            list: [],
            groupBy: false
          }, // N/A

          {
            label: "Matter Types",
            name: "types",
            type: ATTRIBUTE_FIELDS.LIST.TYPE,
            width: 200,
            list: this.matterTypes,
            itemText: "name",
            itemValue: "pk",
            multiple: true,
            chips: true,
            groupBy: true,
            /*endPointList: '/api/matter-types/',
            nestedChildren: [
              {
                name: "name",
                type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                width: 200,
                list: [],
                groupBy: false,
                required: true
              },
              {
                name: "color",
                type: ATTRIBUTE_FIELDS.COLOR.TYPE,
                width: 200,
                list: [],
                groupBy: false,
                required: true
              },

            ]*/
          }, // N/A
          {
            // label: "activate",
            name: "activate",
            type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
            width: 200,
            list: [{ label: "Activate", value: "True" }, { label: "None activate", value: "False" }],
            groupBy: true
          }, // N/A
          {
            // label: "archive",
            name: "archive",
            type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
            width: 200,
            list: [],
            groupBy: false
          }, // N/A
          {
            // label: "priority",
            name: "priority",
            type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
            width: 200,
            list: MatterPriority,
            groupBy: true
          }, // N/A
          {
            // label: "risk_level",
            name: "risk_level",
            type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
            width: 200,
            list: MatterRiskLevel,
            groupBy: true
          }, // N/A
          {
            // label: "Is Manager",
            name: "is_manager",
            type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
            width: 200,
            list: [],
            groupBy: false,
            readOnly: true
          }, // N/A
          {
            // label: "Is Assignee",
            name: "is_assignee",
            type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
            width: 200,
            list: [],
            groupBy: false,
            readOnly: true
          }, // N/A
          {
            // label: "Jury Demand",
            name: "jury_demand",
            type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
            width: 200,
            list: [{ label: "Yes", value: "True" }, { label: "No", value: "False" }],
            groupBy: true
          }, // N/A
          {
            // label: "Date Filled",
            name: "date_filled",
            type: ATTRIBUTE_FIELDS.DATE.TYPE,
            width: 200,
            list: [],
            groupBy: false
            // readOnly: true,
          }, // N/A
          {
            // label: "Start Date",
            name: "start_date",
            type: ATTRIBUTE_FIELDS.DATE.TYPE,
            width: 200,
            list: [],
            groupBy: false
          }, // N/A
          {
            // label: "Estimate Time",
            name: "est_time",
            type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
            width: 200,
            list: [],
            groupBy: false
          }, // N/A
          {
            // label: "Next Courts",
            name: "next_courts",
            type: ATTRIBUTE_FIELDS.LIST.TYPE,
            width: 200,
            list: [],
            groupBy: false
          }, // N/A

          {
            // label: "Done Cards",
            name: "done_cards",
            type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
            width: 200,
            list: [],
            groupBy: false,
            readOnly: true
          }, // N/A
          {
            // label: "Process",
            name: "process",
            type: ATTRIBUTE_FIELDS.PROGRESS.TYPE,
            width: 200,
            list: [],
            groupBy: false,
            readOnly: true
          }, // N/A
          {
            // label: "Judge",
            name: "judge",
            type: ATTRIBUTE_FIELDS.LIST.TYPE,
            width: 200,
            list: [],
            disableCreate: true,
            endPointList: (matter) => {
              return `/api/matters/${matter}/characters/`
            },
            itemText: 'first_name',
            itemValue: 'pk',
            groupBy: false,
            // multiple: true,
            nestedChildren: [
              ...this.attributesCharacter
            ]
          }, // N/A
          {
            // label: "Total cards",
            name: "total_cards",
            type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
            width: 200,
            list: [],
            groupBy: false,
            readOnly: true
          }, // N/A
          {
            // label: "Matter Stage",
            name: "stage",
            type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
            width: 200,
            list: MatterStage,
            groupBy: true
          }, // N/A
          {
            // label: "Color",
            name: "color",
            type: ATTRIBUTE_FIELDS.COLOR.TYPE,
            width: 200,
            list: [],
            groupBy: false
          }, // N/A
          {
            // label: "Time tracking",
            name: "time_tracked",
            type: ATTRIBUTE_FIELDS.DATE.TYPE,
            width: 200,
            list: [],
            groupBy: false
          }, // N/A
          {
            // label: "Total time tracking",
            name: "total_time_tracking",
            type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
            width: 200,
            list: [],
            groupBy: false
          } // N/A
        ]
      }
    },
    async mounted () {
      // let resTypes = await this.$api.get("/api/matter-types/")
      // this.matterTypes = resTypes["data"]

      let resClients = await this.$api.get("/api/clients/", { params: { ungroup: true } })
      let resultsClients = resClients["data"]["results"]
      this.clients = [...resultsClients]

      let resCourts = await this.$api.get("/api/courts/")
      this.courts = resCourts["data"]

    }
  }
</script>

<style scoped>

</style>
