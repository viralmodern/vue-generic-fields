<template>
  <div>
    <SlickGrid :end-point="`/api/matters/${matterId}/docket-entries/`"
               :owner-pk="ownerPk"
               :height="`${72}vh`"
               bus-event-name="bus-docket-entries-matter"
               :attributes="attributes"
               main-cell-id="entry_number">
      <template v-slot:item.documents="{item}">
        <div class="fill-height w-100 d-flex align-center">
          <v-btn depressed icon small @click="openModal(item.pk)">
            <v-icon small>mdi-attachment</v-icon>
          </v-btn>
          <div class="flex-grow-1 text-wrap" style="word-break: break-all">
            <template v-for="document in item.documents">
              <div :key="document.pk">
                <router-link target="_blank"
                             :to="document.file"
                             :href="document.file">{{document.file_name}}
                </router-link>
              </div>
            </template>
            <template v-for="d in doc[item.pk]">
              <div :key="d.pk">
                <router-link target="_blank"
                             :href="d.file"
                             :to="d.file">{{d.file_name}}
                </router-link>
              </div>
            </template>
          </div>
        </div>
      </template>
    </SlickGrid>
    <v-dialog v-model="uiShowAddDocuments"
              max-width="45vw"
              persistent>
      <FormCreateDocumentsDocket :matter="matterId"
                                 @uploaded="uploaded"
                                 v-model="uiShowAddDocuments"
                                 :docket-entry="docketEntry"/>
    </v-dialog>
    <v-dialog v-model="uiShowPreviewNote"
              fullscreen
              max-width="45vw"
              persistent>
      <v-card>
        <v-card-title>
          Create New Documents
          <v-spacer/>
          <v-btn icon @click="$emit('input', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <EditorDocs/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    import SlickGrid from "../../../components/slick-grid/SlickGrid";
    import {ATTRIBUTE_FIELDS} from "../../../components/slick-grid/configs/attribute";
    import {getChoicesConfigByName} from "./mocks/appConfigs";
    import FormCreateDocumentsDocket from "./components/FormCreateDocumentsDocket";
    import EditorDocs from "../../../components/slick-grid/attributes/notes/EditorDocs";

    export default {
        components: {EditorDocs, FormCreateDocumentsDocket, SlickGrid},
        data() {
            return {
                members: [],
                labels: [],

                uiShowAddDocuments: false,
                uiShowPreviewNote: false,
                docketEntry: null,
                doc: {},
            }
        },

        computed: {
            matterId() {
                return this.$route.params.projectId
            },
            ownerPk() {
                try {
                    return this.$store.getters['ht_store/user/currentUser']['pk']
                } catch (e) {
                    return ''
                }
            },

            attributes() {

                let FiledBy = getChoicesConfigByName('MatterDocketEntry.FiledBy')
                let DocketEntryType = getChoicesConfigByName('MatterDocketEntry.DocketEntryType')
                return [
                    {
                        label: 'Docket Number',
                        name: 'entry_number',
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 300,
                        list: [],
                        readOnly: true,
                        groupBy: false
                    }, // N/A
                    {
                        label: 'Docket Documents',
                        name: 'documents',
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false
                    }, // N/A
                    {
                        label: 'Date Added',
                        name: 'date_added',
                        type: ATTRIBUTE_FIELDS.DATE.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false
                    }, // N/A
                    {
                        label: 'Filed by',
                        name: 'filed_by',
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        multiple: false,
                        list: FiledBy,
                        groupBy: true,
                        required: true,
                    }, // N/A
                    {
                        label: 'Description',
                        name: 'description',
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    }, // N/A
                    {
                        label: 'Pacer Link',
                        name: 'pacer_link',
                        type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                    }, // N/A
                    {
                        label: 'Type',
                        name: 'entry_type',
                        type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                        width: 200,
                        list: DocketEntryType,
                        groupBy: true,
                        required: true,
                    }, // N/A
                    {
                        label: 'Comment',
                        name: 'docket_number',
                        type: ATTRIBUTE_FIELDS.COMMENTS.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                        readOnly: true
                    }, // N/A

                    {
                        label: 'Note',
                        name: 'note_count',
                        type: ATTRIBUTE_FIELDS.NOTE.TYPE,
                        width: 200,
                        list: [],
                        multiple: true,
                        groupBy: false,
                        readOnly: true,
                    }, // N/A
                    {
                        label: 'Labels',
                        name: 'labels',
                        type: ATTRIBUTE_FIELDS.COMBOBOX.TYPE,
                        width: 200,

                        list: this.labels,
                        itemText: 'name',
                        itemValue: 'pk',

                        multiple: true,
                        groupBy: true,
                        chips: true
                    }, // N/A
                    {
                        label: 'Attachments',
                        name: 'attachments',
                        type: ATTRIBUTE_FIELDS.ATTACHMENT.TYPE,
                        multiple: true,
                        width: 200,
                        list: [],
                        isFileAttachment: true,
                        groupBy: false
                    }, // N/A
                    {
                        label: 'Members',
                        name: 'members',
                        type: ATTRIBUTE_FIELDS.ASSIGN_MEMBER.TYPE,
                        itemText: 'user',
                        itemValue: 'user',
                        width: 200,
                        list: this.members,
                        groupBy: true
                    }, // N/A
                    {
                        label: 'Related',
                        name: 'relations',
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false
                    }, // N/A
                ]
            }
        },
        async mounted() {
            let resMembers = await this.$api.get(`/api/matters/${this.matterId}/members/`)
            this.members = resMembers['data']
            let resLabels = await this.$api.get(`/api/labels/`)
            this.labels = resLabels['data']['results']
        },
        methods: {
            openModal(docketEntry) {
                this.uiShowAddDocuments = true
                this.docketEntry = docketEntry
            },
            uploaded(row) {
                let currentDocs = this.doc[this.docketEntry] ? [...this.doc[this.docketEntry], row] : [row]
                let dd = {
                    [this.docketEntry]: currentDocs
                }
                this.doc = {...this.doc, ...dd}
            }
        }
    }
</script>

<style scoped>

</style>
