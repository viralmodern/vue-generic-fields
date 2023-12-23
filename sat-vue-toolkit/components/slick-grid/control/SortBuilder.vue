<template>
  <MenuShowHideFields icon="mdi-sort" :title="title" v-model="uiShowMenu">
    <template v-slot:activator="{on}">
      <btn-link v-on="on"
                :input-value="typesSelected.length"
                icon="mdi-sort"
                :label="`Sort ${typesSelected.length ? `(${typesSelected.length})` : ``}`"/>
    </template>

    <v-card min-width="250px" v-if="uiShowMenu">
      <v-card-text>
        <draggable class="list-group-sort"
                   draggable=".drag-item"
                   handle=".drag-handle"
                   v-model="sortListModel"
                   group="a">
          <template v-for="(model, index) in sortModel">
            <div class="drag-item d-flex align-center" :key="`sort-line-item-${index}`">
              <div style="width: 100px;" class="overflow-hidden">
                <v-btn text small
                       class="text-caption text-capitalize drag-handle">
                  <v-icon small left>
                    mdi-drag
                  </v-icon>
                  <template v-if="index === Object.keys(sortModel)[0]">
                    Sort by
                  </template>
                  <template v-else>
                    Then by
                  </template>
                </v-btn>
              </div>
              <div class="mx-1"></div>
              <div style="width: 200px;">
                <v-autocomplete :items="fieldConfigs"
                                dense
                                label="Field"
                                v-model="sortModel[index]['name']"
                                item-disabled="disabled"
                                item-value="name"
                                item-text="label"/>
              </div>
              <template v-if="sortModel[index]['name']">
                <div class="mx-2"></div>
                  <div class="text-caption">
                    From
                  </div>
                <div class="mx-2"></div>
                <div style="width: 180px">
                  <!--<v-autocomplete dense
                                  label="Value"
                                  v-model="sortModel[index]['value']"
                                  item-text="label"
                                  item-value="value"
                                  :items="conditions"></v-autocomplete>-->

                  <v-radio-group v-model="sortModel[index]['value']" row dense>
                    <v-radio :label="conditions[0].label"
                             :value="conditions[0].value"></v-radio>
                    <v-radio :label="conditions[1].label"
                             :value="conditions[1].value"></v-radio>
                  </v-radio-group>

                </div>
                <div class="mx-1"></div>
              </template>
              <div class="flex-grow-1 text-right pl-4">
                <v-btn icon small @click="clearSort(index)">
                  <v-icon small>mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
          </template>
        </draggable>
        <div v-if="disabledSort">
          <p class="ma-0 pa-0">
            No Sorts Applied
          </p>
          <p class="text-caption ma-0">
            Add a new sort to single out the items you want to see
          </p>
        </div>
        <div class="mt-2"></div>
        <v-divider/>
        <div class="mt-2"></div>
        <v-btn max-width="unset"
               @click="newSortItem"
               depressed
               text
               small
               min-width="unset"
               width="unset"
               class="text-capitalize caption"
               style="border-radius: 0px;"
               color="primary">
          <v-icon x-small style="transform: translateY(1px)">mdi-plus</v-icon>
          New Sort
        </v-btn>
      </v-card-text>
    </v-card>
  </MenuShowHideFields>
</template>

<script>
    import MenuShowHideFields from "./MenuShowHideFields";

    import { v4 as uuid } from 'uuid';
    import draggable from 'vuedraggable'
    import values from 'lodash/values'
    import keyBy from 'lodash/keyBy'
    import keys from 'lodash/keys'
    import {SORT_TYPE} from "../configs/attribute";
    import BtnLink from "@/sat-vue-toolkit/components/BtnLink.vue"

    export default {
        name: "SortBuilder",
        props: {
            attributes: {
                type: Array,
                default: () => []
            },
            queryParams: {
              type: Object,
              default: () => ({})
            }
        },
        components: {
          BtnLink,
            MenuShowHideFields,
            draggable
        },
        data() {
            return {
                sortModel: {},
                conditions: [
                    {
                        value: SORT_TYPE.UP.TYPE,
                        label: SORT_TYPE.UP.LABEL,
                    },
                    {
                        value: SORT_TYPE.DOWN.TYPE,
                        label: SORT_TYPE.DOWN.LABEL,
                    },

                ],


            }
        },
        computed: {
            uiShowMenu: {
                get() {
                    return true
                },
                set(v) {
                    if (!v) {
                        this.resetFields()
                    }
                }
            },
            fieldConfigs() {
                return this.attributes.map(attribute => {
                    attribute.disabled = this.typesSelected.includes(attribute.name)
                    return attribute
                })
            },
            typesSelected() {
                return keys(keyBy(values(this.sortModel), 'name')).filter(item => item !== "")
            },
            title() {
                let l = this.typesSelected.length
                return `${l ? l : ''} Sort`
            },
          disabledSort() {
                return Object.keys(this.sortModel).length <= 0
            },
            sortListModel: {
                get() {
                    return values(this.sortModel)
                },
                set(v) {
                    this.sortModel = keyBy(v, 'id')
                }
            },
            ordering() {
              try {
                return this.queryParams.ordering
              }catch (e) {
                return false
              }
            }
        },
        watch: {
            attributes: {
                immediate: true,
                handler(v) {
                    if(this.uiShowMenu) {
                        console.log('initSortModel', v)
                        this.initSortModel(v)
                    }
                }
            }
        },
        methods: {
            initSortModel(v) {
                let md = {};
                let sortTypes = [SORT_TYPE.UP.TYPE, SORT_TYPE.DOWN.TYPE, SORT_TYPE.DEFAULT.TYPE]
                let sortAdded = v.filter(attribute => sortTypes.includes(attribute.sort)).sort((a, b) => a.sortIndex - b.sortIndex)
              if(sortAdded.length > 0) {
                // console.log('SORT_ADDED', sortAdded)
                for (let i = 0; i < sortAdded.length; i++) {
                  let _uuid = uuid(),  attributeName = sortAdded[i].name;
                  md[_uuid] = {
                    id: _uuid,
                    name: attributeName,
                    value: sortAdded[i].sort
                  }
                  this.sortModel = {...md}
                }


              }

            },
            newSortItem() {
                let md = this.sortModel
                let _uuid = uuid()
                md[_uuid] = {
                    id: _uuid,
                    name: '',
                    value: SORT_TYPE.UP.TYPE
                }
                this.sortModel = {...md}
            },
            clearSort(index) {
                let md = {...this.sortModel}
                delete md[index]
                this.sortModel = {...md}
            },
            resetFields() {
                let models = values(this.sortModel),
                    attributes = [...this.attributes];

                if(!models.length) {
                    let fields = attributes.map(attribute => {
                      attribute['sort'] = ''
                      attribute['sortIndex'] = -1
                      attribute['sortIndexLabel'] = ''
                      return attribute
                    })
                    return this.$emit('resetFields', {unset: true, fields})
                }

                let sortModelByName = keyBy(models, 'name'),
                    ordering = [];
                let fields = attributes.map(attribute => {
                    let attributeName = attribute.name, sort;
                    if(sortModelByName[attributeName]) {
                        sort = sortModelByName[attributeName].value
                    }else {
                        // sort = SORT_TYPE.DEFAULT.TYPE
                    }
                    let sortIndex = this.typesSelected.indexOf(attributeName)
                    let sortIndexLabel = sortIndex < 0 ? '' : sortIndex + 1
                    attribute['sort'] = sort
                    attribute['sortIndex'] = sortIndex
                    attribute['sortIndexLabel'] = sortIndexLabel
                    return attribute
                })
                ordering = this.typesSelected.map(attributeName => {
                    let isUp = sortModelByName[attributeName].value === SORT_TYPE.UP.TYPE
                    let isDown = sortModelByName[attributeName].value === SORT_TYPE.DOWN.TYPE
                    return isUp ? `${attributeName}` : isDown ? `-${attributeName}` : ``
                })
                // sortConfig
                let sortConfig = models.map(md => {
                    return {
                        sortType: md.value,
                        name: md.name
                    }
                })
                this.$emit('resetFields', {fields, ordering, sortConfig})
            }


        },
        filters: {}

    }
</script>

<style scoped>

</style>
<style>

</style>
