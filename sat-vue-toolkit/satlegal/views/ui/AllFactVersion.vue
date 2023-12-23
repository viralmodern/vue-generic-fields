<template>
  <div>
    <SlickGrid :end-point="endPoint"
               ref="grid-fact-version"
               :owner-pk="ownerPk"
               bus-event-name="bus-new-fact-version"
               :height="height"
               :has-vote-row="false"
               :attributes="attributes"
               count-label-singular="Fact Version"
               count-label-many="Fact Version"
               main-cell-id="desc">
      <template v-slot:item.desc="{item, fieldName}"></template>
      <template v-for="(character, index) in charactersByMatter"
                :slot="`item.${character.name}`"
                slot-scope="{item, fieldName}">
        <CrtItem @change-option-cell="showMenuSources"
                 @change-text-cell="showMenuTextChange"
                 :key="index"
                 :item="getItemAttribute(item.pk, fieldName) || item"
                 :field-name="fieldName"/>
      </template>
    </SlickGrid>
    <v-menu open-delay="0"
            v-model="showMenu"
            :position-x="x"
            :position-y="y"
            absolute
            :close-on-content-click="false"
            offset-y>
      <v-card>
        <v-autocomplete :items="factSources"
                        solo
                        color="white"
                        multiple
                        small-chips
                        hide-details
                        :autofocus="showMenu"
                        v-model="source"
                        item-text="name"
                        item-value="pk"></v-autocomplete>
      </v-card>
    </v-menu>
    <v-menu open-delay="0"
            v-model="uiShowText"
            :position-x="x"
            :position-y="y"
            absolute
            :close-on-content-click="false"
            offset-y>
      <v-card>
        <v-textarea hide-details
                    solo
                    :loading="submitting"
                    dense
                    v-model="textContent"
                    @keydown.enter="updateContent"
                    @blur="blurContent"
                    label="Fact description"/>
      </v-card>
    </v-menu>


  </div>
</template>

<script>
    import SlickGrid from "../../../components/slick-grid/SlickGrid";
    import {ATTRIBUTE_FIELDS} from "../../../components/slick-grid/configs/attribute";
    import {getChoicesConfigByName} from "./mocks/appConfigs";
    import CrtItem from "./components/CrtItem";

    export default {
        components: {CrtItem, SlickGrid},
        name: 'AllFactVersion',
        props: {
          height: {
            type: String,
            default: () => `65vh`
          },
          ownerId: {}
        },
        data() {
            return {
                charactersByMatter: [],
                factSources: [],
                factTypes: getChoicesConfigByName('Fact.Type'),
                commonLevel: getChoicesConfigByName('CommonLevel'),

                // todo: menu
                showMenu: false,
                uiShowText: false,

                submitting: false,
                x: 0,
                y: 0,

                fieldName: '',
                rowId: '',
                model_attribute: {},
                text: '',
                fieldSources: [],

            }
        },

        computed: {
            matterId() {
              return this.$route.params.matter || this.$route.params.projectId
            },
            endPoint() {
                return `/api/matters/${this.matterId}/fact-versions/`
            },
            ownerPk() {
                try {
                    return this.ownerId || this.$store.getters['ht_store/user/currentUser']['pk']
                } catch (e) {
                    return ''
                }
            },
            textContent: {
                get() {
                    try {
                        return this.model_attribute[this.rowId][this.fieldName]['characters'][this.fieldName]['desc']
                    } catch (e) {
                        return ''
                    }
                },
                set(v) {
                    this.text = v
                }
            },

            source: {
                get() {
                    try {
                        return this.model_attribute[this.rowId][this.fieldName]['characters'][this.fieldName]['sources']
                    } catch (e) {
                        return ''
                    }
                },
                set(v) {
                    this.fieldSources = v
                }
            },


            attributes() {
                return [
                    {
                        label: "Fact Description",
                        name: "desc",
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false,
                        required: true,
                    },
                    {
                        label: "Similarities",
                        name: "similarities",
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false
                    },
                    ...this.charactersByMatter,
                    {
                        label: "Differences",
                        name: "differences",
                        type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
                        width: 200,
                        list: [],
                        groupBy: false
                    },
                ]
            },
        },
        async mounted() {

            let resCharacters = await this.$api.get(`/api/matters/${this.matterId}/partial-info-characters/`)
            let temp = []
            let characters = resCharacters['data']
            characters = characters.map((character, index) => {
                let itemTemp = {
                    label: `${character.first_name} ${character.last_name}`,
                    name: `${character.pk}`,
                    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                    genericField: true,
                    readOnly: true,
                    width: 300,
                }
                if (index === 0 || index === 1) {
                    temp.push(itemTemp)
                }
                return itemTemp
            })
            this.charactersByMatter = characters
            // this.charactersByMatter = temp

            let resFactSource = await this.$api.get(`/api/matters/${this.matterId}/tagables/?type=fact-source`)
            this.factSources = resFactSource['data']
            // partial-info-characters/
        },
        watch: {
            showMenu(v) {
                if(!v) {
                    if(this.fieldSources.length) {
                        console.log(this.fieldSources)
                        this.updateSource()
                    }
                }
            }
        },
        methods: {
            getItemAttribute(row, fieldName) {
                try {
                    return this.model_attribute[row][fieldName]
                }catch (e) {
                    return null
                }
            },
            showMenuSources(e, item, fieldName, rowId) {
                e.preventDefault()
                this.showMenu = false
                this.model_attribute = {}
                this.x = e.clientX
                this.y = e.clientY

                this.$nextTick(() => {
                    this.showMenu = true
                    if(this.model_attribute[rowId]) {
                        this.model_attribute[rowId][fieldName] = {...item}
                    }else {
                        this.model_attribute[rowId] = {
                            [fieldName]: {
                                ...item
                            }
                        }
                    }

                    this.fieldName = fieldName
                    this.rowId = rowId

                })
            },
            showMenuTextChange(e, item, fieldName, rowId) {
                e.preventDefault()
                this.uiShowText = false
                this.model_attribute = {}
                this.x = e.clientX
                this.y = e.clientY

                this.$nextTick(() => {
                    this.uiShowText = true
                    if(this.model_attribute[rowId]) {
                        this.model_attribute[rowId][fieldName] = {...item}
                    }else {
                        this.model_attribute[rowId] = {
                            [fieldName]: {
                                ...item
                            }
                        }
                    }
                    this.fieldName = fieldName
                    this.rowId = rowId

                })

            },
            updateContent() {
                let data = {desc: this.text}
                this.changeValue(data)
            },
            updateSource() {
                let data = {sources: this.fieldSources}
                this.changeValue(data)
            },
            blurContent() {

            },
            async changeValue(data) {
                if (this.submitting) return
                let model_attribute = {...this.model_attribute}
                let hasFieldName = Object.keys(model_attribute)[0]
                if (hasFieldName) {
                    let fieldName = this.fieldName;
                    let rowId = this.rowId;
                    try {
                        this.submitting = true
                        let res = await this.$api.patch(`${this.endPoint}${rowId}/opinions/${fieldName}/`, data)
                        this.$eventHub.$emit('alert-curd', {type: 'success', text: 'Character updated'})
                        model_attribute[rowId][fieldName]['characters'][fieldName] = res['data']
                        this.model_attribute = {...model_attribute}
                        // todo: reset
                        // this.text = ''
                        // this.fieldSources = []
                    } catch (e) {
                        this.$eventHub.$emit('alert-curd', {type: 'error', text: e.message})
                        // this.text = ''
                        throw e.message
                    } finally {
                        this.submitting = false
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
