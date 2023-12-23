<template>
  <div>
    <SlickGrid :end-point="endPoint"
               :owner-pk="ownerPk"
               :height="height"
               :show-button-quick-add-modal="false"
               :uiShowAddRowModal="false"
               bus-event-name="bus-characters-entries-matter"
               :attributes="attributes"
               no-link-detail
               :has-vote-row="false"
               main-cell-id="full_name">
      <template v-slot:item.related_docket="{item, groupByItem, fieldMain}">
        <div class="fill-height">
          <div class="w-100 d-flex flex-wrap content_relation"
               :id="`${RELATIONS_ACTIVATOR.DOCKET}${item.pk}`">
            <RelationsList :items="getRelationsRow(item) | l_DOCKET"
                           @add-item="addRelation(item, RELATIONS_TYPES.DOCKET, groupByItem)"
                           :linkId="`${RELATIONS_ACTIVATOR.DOCKET}${item.pk}`"
                           label-add="New docket related"
                           color="#ff0000"/>
          </div>
        </div>
      </template>

      <template v-slot:item.related_deposition="{item, groupByItem}">
        <div class="fill-height">
          <div class="w-100 d-flex flex-wrap content_relation"
               :id="`${RELATIONS_ACTIVATOR.DEPOSITION}${item.pk}`">
            <RelationsList :items="getRelationsRow(item) | l_DEPOSITION"
                           @add-item="addRelation(item, RELATIONS_TYPES.DEPOSITION, groupByItem)"
                           :linkId="`${RELATIONS_ACTIVATOR.DEPOSITION}${item.pk}`"
                           label-add="new deposition related"
                           color="#0040ff"/>
          </div>
        </div>
      </template>
      <template v-slot:item.related_fact="{item, groupByItem}">
        <div class="fill-height">
          <div class="w-100 d-flex flex-wrap content_relation" :id="`${RELATIONS_ACTIVATOR.FACTS}${item.pk}`">
            <RelationsList :items="getRelationsRow(item) | l_FACTS"
                           @add-item="addRelation(item, RELATIONS_TYPES.FACTS, groupByItem)"
                           :linkId="`${RELATIONS_ACTIVATOR.FACTS}${item.pk}`"
                           label-add="new facts related"
                           color="#b94646"/>
          </div>
        </div>
      </template>
      <template v-slot:item.related_evidence="{item, groupByItem}">
        <div class="fill-height">
          <div class="w-100 d-flex flex-wrap content_relation"
               :id="`${RELATIONS_ACTIVATOR.EVIDENCES}${item.pk}`">
            <RelationsList :items="getRelationsRow(item) | l_EVIDENCES"
                           @add-item="addRelation(item, RELATIONS_TYPES.EVIDENCES, groupByItem)"
                           :linkId="`${RELATIONS_ACTIVATOR.EVIDENCES}${item.pk}`"
                           label-add="new evidences related"
                           color="#4000ff"/>
          </div>
        </div>
      </template>
      <template v-slot:item.request_set="{item, groupByItem}">
        <div class="fill-height">
          <div class="w-100 d-flex flex-wrap content_relation"
               :id="`${RELATIONS_ACTIVATOR.REQUEST_SET}${item.pk}`">
            <RelationsList :items="getRelationsRow(item) | l_REQUEST_SET"
                           @add-item="addRelation(item, RELATIONS_TYPES.REQUEST_SET, groupByItem)"
                           :linkId="`${RELATIONS_ACTIVATOR.REQUEST_SET}${item.pk}`"
                           label-add="new request set related"
                           color="#ff8000"/>
          </div>
        </div>
      </template>
    </SlickGrid>
    <v-menu :close-on-content-click="false"
            v-model="uiShowMenuDocketRelations"
            :activator="`#${RELATIONS_ACTIVATOR.DOCKET}${rowId}`" offset-y ref="menuDocket">
      <v-card max-width="300px">
        <v-autocomplete v-if="uiShowMenuDocketRelations"
                        :items="relationsDocket | l_results"
                        v-model="modelRelationsCharacters[rowId][RELATIONS_TYPES.DOCKET]"
                        :loading="modelRelationsCharacters[rowId][`${RELATIONS_TYPES.DOCKET}-submitting`]"
                        item-text="description"
                        multiple
                        :autofocus="uiShowMenuDocketRelations"
                        hide-selected
                        hide-details
                        hide-no-data
                        solo
                        small-chips
                        @change="(data) => changeRelationsList(data, RELATIONS_TYPES.DOCKET)"
                        item-value="pk">
        </v-autocomplete>
       <!-- <v-card-text>
          <v-btn text color="primary" @click="uiShowMenuDocketRelations = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menuDocket.save()">OK</v-btn>
        </v-card-text>-->
      </v-card>
    </v-menu>
    <v-menu v-model="uiShowMenuDepositionRelations" :close-on-content-click="false"
            :activator="`#${RELATIONS_ACTIVATOR.DEPOSITION}${rowId}`" offset-y>
      <v-card max-width="300px">
        <v-autocomplete v-if="uiShowMenuDepositionRelations"
                        :items="relationsDeposition | l_results"
                        v-model="modelRelationsCharacters[rowId][RELATIONS_TYPES.DEPOSITION]"
                        :loading="modelRelationsCharacters[rowId][`${RELATIONS_TYPES.DEPOSITION}-submitting`]"
                        item-text="name"
                        multiple
                        :autofocus="uiShowMenuDepositionRelations"
                        hide-selected
                        hide-no-data
                        solo
                        small-chips
                        hide-details
                        @change="(data) => changeRelationsList(data, RELATIONS_TYPES.DEPOSITION)"
                        item-value="pk"></v-autocomplete>
      </v-card>
    </v-menu>
    <v-menu v-model="uiShowMenuEvidenceRelations" :close-on-content-click="false"
            :activator="`#${RELATIONS_ACTIVATOR.EVIDENCES}${rowId}`" offset-y>
      <v-card max-width="300px">
        <v-autocomplete v-if="uiShowMenuEvidenceRelations"
                        :items="relationsEvidence | l_results"
                        v-model="modelRelationsCharacters[rowId][RELATIONS_TYPES.EVIDENCES]"
                        :loading="modelRelationsCharacters[rowId][`${RELATIONS_TYPES.EVIDENCES}-submitting`]"
                        item-text="name"
                        multiple
                        :autofocus="uiShowMenuEvidenceRelations"
                        hide-selected
                        hide-no-data
                        solo
                        small-chips
                        hide-details
                        @change="(data) => changeRelationsList(data, RELATIONS_TYPES.EVIDENCES)"
                        item-value="pk"></v-autocomplete>
      </v-card>
    </v-menu>
    <v-menu v-model="uiShowMenuFactsRelations" :close-on-content-click="false"
            :activator="`#${RELATIONS_ACTIVATOR.FACTS}${rowId}`" offset-y>
      <v-card max-width="300px">
        <v-autocomplete v-if="uiShowMenuFactsRelations"
                        :items="relationsFacts | l_results"
                        v-model="modelRelationsCharacters[rowId][RELATIONS_TYPES.FACTS]"
                        :loading="modelRelationsCharacters[rowId][`${RELATIONS_TYPES.FACTS}-submitting`]"
                        item-text="name"
                        multiple
                        :autofocus="uiShowMenuFactsRelations"
                        hide-selected
                        hide-no-data
                        solo
                        small-chips
                        hide-details
                        @change="(data) => changeRelationsList(data, RELATIONS_TYPES.FACTS)"
                        item-value="pk"></v-autocomplete>
      </v-card>
    </v-menu>
    <v-menu v-model="uiShowMenuRequestSetRelations" :close-on-content-click="false"
            :activator="`#${RELATIONS_ACTIVATOR.REQUEST_SET}${rowId}`" offset-y>
      <v-card max-width="300px">
        <v-autocomplete v-if="uiShowMenuRequestSetRelations"
                        :items="relationsRequestSet | l_results"
                        v-model="modelRelationsCharacters[rowId][RELATIONS_TYPES.REQUEST_SET]"
                        :loading="modelRelationsCharacters[rowId][`${RELATIONS_TYPES.REQUEST_SET}-submitting`]"
                        item-text="name"
                        multiple
                        :autofocus="uiShowMenuRequestSetRelations"
                        hide-selected
                        hide-no-data
                        solo
                        small-chips
                        hide-details
                        @change="(data) => changeRelationsList(data, RELATIONS_TYPES.REQUEST_SET)"
                        item-value="pk"></v-autocomplete>
      </v-card>
    </v-menu>

  </div>
</template>

<script>
    import {ATTRIBUTE_FIELDS} from "@/sat-vue-toolkit/components/slick-grid/configs/attribute";
    import SlickGrid from "../../../../sat-vue-toolkit/components/slick-grid/SlickGrid";
    import {appConfigsMatters} from "@/sat-vue-toolkit/satlegal/views/ui/mocks/appConfigs";
    import RelationsList from "@/sat-vue-toolkit/satlegal/views/ui/components/RelationsList.vue";
    import debounce from "lodash/debounce";
    import difference from "lodash/difference";
    import remove from "lodash/remove";

    const contentTypeModel = (() => {
        let relatedModel = appConfigsMatters.system.relatable_model
        let DOCKET = relatedModel.filter(model => model['label'] === 'MatterDocketEntry')[0]['value'];
        let DEPOSITION = relatedModel.filter(model => model['label'] === 'Deposition')[0]['value'];
        let FACTS = relatedModel.filter(model => model['label'] === 'Fact')[0]['value'];
        let EVIDENCES = relatedModel.filter(model => model['label'] === 'Evidence')[0]['value'];
        let REQUEST_SET = relatedModel.filter(model => model['label'] === 'RequestSet')[0]['value'];
        return {
            DOCKET, DEPOSITION, FACTS, EVIDENCES, REQUEST_SET
        }
    })()
    export default {
        name: "AllCharactersRelated",
        components: {RelationsList, SlickGrid},
        props: {
          height: {
            type: String,
            default: () => `72vh`
          },
          ownerId: {}
        },
        data() {
            return {
                RELATIONS_TYPES: contentTypeModel,
                workspaceMembers: [],
                characterRelations: {},
                uiShowMenuDocketRelations: false,
                uiShowMenuDepositionRelations: false,
                uiShowMenuFactsRelations: false,
                uiShowMenuEvidenceRelations: false,
                uiShowMenuRequestSetRelations: false,

                relationsDocket: {},
                relationsFacts: {},
                relationsDeposition: {},
                relationsEvidence: {},
                relationsRequestSet: {},
                modelRelationsCharacters: {},

                rowSelected: null,
                groupByItem: null,
                rowId: null,
                RELATION_ACTIVE: null,
                RELATIONS_ACTIVATOR: {
                    DOCKET: 'menu-docket-relations-row-',
                    DEPOSITION: 'menu-deposition-relations-row-',
                    FACTS: 'menu-facts-relations-row-',
                    EVIDENCES: 'menu-evidence-relations-row-',
                    REQUEST_SET: 'menu-request-set-relations-row-'
                }
            }
        },
        async mounted() {
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
                return this.$route.params.matter || this.$route.params.projectId
            },
            endPoint() {
                return `/api/matters/${this.matterId}/characters/`
                // return `/api/matters/${this.matterId}/characters/?slick_mode=2`
            },
            attributes() {
                return [
                    {
                        name: "full_name",
                        width: 300,
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        readOnly: true,
                    },
                    {
                        label: "Related Docket Entry",
                        name: "related_docket",
                        width: 300,
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                    },

                    {
                        label: "Related Depostion",
                        name: "related_deposition",
                        width: 300,
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                    },
                    {
                        label: "Related Facts",
                        name: "related_fact",
                        width: 300,
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                    },
                    {
                        label: "Related Evidences",
                        name: "related_evidence",
                        width: 300,
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                    },
                    {
                        label: "Related Request Set",
                        name: "request_set",
                        width: 300,
                        type: ATTRIBUTE_FIELDS.LIST.TYPE,
                    },

                ]
            },
        },
        methods: {
            getRelationsRow(item) {
                return item.relations_info ? item.relations_info.first_class_relations : []
            },
            addRelation(item, type, groupByItem) {
                this.rowId = null;
                this.rowSelected = null;
                this.groupByItem = null;
                this.$nextTick(() => {
                    this.rowId = item.pk;
                    this.rowSelected = item;
                    this.groupByItem = groupByItem;
                    this.RELATION_ACTIVE = type
                    let relationsSelected = this.getRelationsByRelationType(item, type)
                    this.initRelationByCharacter(item.pk, type, relationsSelected)
                })
            },
            getRelationsByRelationType(item, contentTypeModel) {
                let temp = this.getRelationsRow(item)
                let list = []
                list = temp.filter(item => item.content_type_id == contentTypeModel).map(relation => parseInt(relation['pk']))
                return list
            },
            initRelationByCharacter(rowId, relationType, relationsSelected) {
                try {
                    let model = {...this.modelRelationsCharacters},
                        character = rowId;
                    // console.log('relationsSelected', relationsSelected)
                    if (!model[character]) {
                        model[character] = {}
                        model[character][relationType] = relationsSelected
                        this.modelRelationsCharacters = model
                    }else if(model[character]) {
                        model[character][relationType] = relationsSelected
                        this.modelRelationsCharacters = model
                    }
                } catch (e) {
                    throw e.message
                }

            },
            async fetchDocketEntries() {
                if (this.relationsDocket['results']) return
                try {
                    let res = await this.$api.get(`/api/matters/${this.matterId}/docket-entries/`, {params: {ungroup: true}})
                    this.relationsDocket = res['data']
                } catch (e) {

                } finally {

                }
            },
            async fetchDeposition() {
                if (this.relationsDeposition['results']) return
                try {
                    let res = await this.$api.get(`/api/matters/${this.matterId}/depositions/`, {params: {ungroup: true}})
                    this.relationsDeposition = res['data']
                } catch (e) {

                } finally {

                }
            },
            async fetchFacts() {
                if (this.relationsFacts['results']) return
                try {
                    let res = await this.$api.get(`/api/matters/${this.matterId}/facts/`, {params: {ungroup: true}})
                    this.relationsFacts = res['data']
                } catch (e) {

                } finally {

                }
            },
            async fetchEvidences() {
                if (this.relationsEvidence['results']) return
                try {
                    let res = await this.$api.get(`/api/matters/${this.matterId}/evidences/`, {params: {ungroup: true}})
                    this.relationsEvidence = res['data']
                } catch (e) {

                } finally {

                }

            },
            async fetchRequestSet() {
                if (this.relationsRequestSet['results']) return
                try {
                    let res = await this.$api.get(`/api/matters/${this.matterId}/request-sets/`, {params: {ungroup: true}})
                    this.relationsRequestSet = res['data']
                } catch (e) {

                } finally {

                }
            },
            fetchRelationsList() {
                if (this.RELATION_ACTIVE === this.RELATIONS_TYPES.DOCKET) {
                    this.fetchDocketEntries()
                } else if (this.RELATION_ACTIVE === this.RELATIONS_TYPES.DEPOSITION) {
                    this.fetchDeposition()
                } else if (this.RELATION_ACTIVE === this.RELATIONS_TYPES.FACTS) {
                    this.fetchFacts()
                } else if (this.RELATION_ACTIVE === this.RELATIONS_TYPES.EVIDENCES) {
                    this.fetchEvidences()
                } else if (this.RELATION_ACTIVE === this.RELATIONS_TYPES.REQUEST_SET) {
                    this.fetchRequestSet()
                }
            },
            async postRelation(data) {
                try {
                    let res = await this.$api.post(`/api/matters/${this.matterId}/characters/${this.rowId}/relations/`, data)
                    return res['data']
                }catch (e) {
                    return false
                }
            },
            changeRelationsList: debounce(async function (values, relationType) {
                // todo submitting
                let model = {...this.modelRelationsCharacters}
                if(model[this.rowId][`${relationType}-submitting`]) return
                // todo post data
                let relationsSelected = this.getRelationsByRelationType(this.rowSelected, relationType)
                let items = difference(values, relationsSelected)
                let relations = items.map(value => ({content_type_id: relationType, object_id: value.toString()}))
                try {
                    model[this.rowId][`${relationType}-submitting`] = true
                    this.modelRelationsCharacters = {...model}
                    let res = await this.postRelation({relations})
                    if(res) {
                        // todo fetch row detail slick grid
                        this.fetchRowDetail()
                    }else {
                        // todo remove new relations added to model
                        remove(model[this.rowId][`${relationType}`], relation => items.includes(relation))
                        this.modelRelationsCharacters = {...model}
                    }
                }finally {
                    model[this.rowId][`${relationType}-submitting`] = false
                    this.modelRelationsCharacters = {...model}
                }
            }, 800),
            fetchRowDetail() {
                let groupByItem = this.groupByItem
                this.$eventHub.$emit('bus-load-row', this.rowId, groupByItem)
            },

        },
        watch: {
            rowId: {
                immediate: true,
                handler(v) {
                    if (!v) return
                    this.fetchRelationsList()
                }
            }
        },
        filters: {
            l_DOCKET(v) {
                try {
                    return v.filter(item => item.content_type_id == contentTypeModel.DOCKET)
                } catch (e) {
                    return []
                }
            },
            l_DEPOSITION(v) {
                try {
                    return v.filter(item => item.content_type_id == contentTypeModel.DEPOSITION)
                } catch (e) {
                    return []
                }
            },
            l_FACTS(v) {
                try {
                    return v.filter(item => item.content_type_id == contentTypeModel.FACTS)
                } catch (e) {
                    return []
                }
            },
            l_EVIDENCES(v) {
                try {
                    return v.filter(item => item.content_type_id == contentTypeModel.EVIDENCES)
                } catch (e) {
                    return []
                }
            },
            l_REQUEST_SET(v) {
                try {
                    return v.filter(item => item.content_type_id == contentTypeModel.REQUEST_SET)
                } catch (e) {
                    return []
                }
            },
            l_results(v) {
                try {
                    return v['results']
                } catch (e) {
                    return []
                }
            }

        }
    }
</script>

<style scoped>
  .content_relation {
    /*border: solid 1px red;*/
  }
</style>
