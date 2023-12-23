<template>
  <div>
    <SlickGrid :end-point="endPoint"
               :owner-pk="ownerPk"
               :height="height"
               :show-button-quick-add-modal="false"
               :uiShowAddRowModal="false"
               bus-event-name="bus-characters-entries-matter"
               :attributes="attributes">
      <template v-slot:item.main-cell="{item}">
        <p class="ma-0 pa-0 text-caption" style="line-height: 2em">
          <!--          {{`${item.from_character['pk']}`}}-->
          {{`${item.first_name} ${item.last_name}`}}
        </p>
      </template>
      <template v-for="(character, index) in charactersByMatter"
                :slot="`item.${character.name}`"
                slot-scope="{item, fieldName, groupByItem}">
        <div class="map-head-item fill-height w-100"
             :key="`${index}-${fieldName}`"
             :id="`status-${item['pk']}-${item['pk']}-${fieldName}`">
          <v-card flat
                  @click="clickStatus({e: $event, k: `status-${item['pk']}-${item['pk']}-${fieldName}`, value: item['relationship_type'], row: item, free_character: fieldName, groupByItem})"
                  dark
                  class="map-head-item--content fill-height w-100 d-flex justify-center align-center text-uppercase font-weight-bold"
                  :color="getLabelByStatus(item['pk'], fieldName, item['relationship_type']) | l_color">
            <!--           {{fieldName}}-->
            {{getLabelByStatus(item['pk'], fieldName, item['relationship_type'])}}
          </v-card>
        </div>
      </template>
    </SlickGrid>
  </div>
</template>

<script>
    import {ATTRIBUTE_FIELDS} from "@/sat-vue-toolkit/components/slick-grid/configs/attribute";
    import SlickGrid from "@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue";
    import {getChoicesConfigByName} from "@/sat-vue-toolkit/satlegal/views/ui/mocks/appConfigs";
    import {STATUS} from "@/sat-vue-toolkit/components/slick-grid/configs/attribute";

    export default {
        name: "AllCharactersRelationshipMap",
        components: {SlickGrid},
        props: {
          height: {
            type: String,
            default: () => `72vh`
          },
          ownerId: {}
        },
        data() {
            return {
                charactersByMatter: [],
                rowSelected: null,
                characterSelected: null,
                groupByItem: null,
            }
        },
        async mounted() {
            const vm = this;
            let resCharacters = await this.$api.get(`/api/matters/${this.matterId}/partial-info-characters/`)
            let temp = []
            let characters = [...resCharacters['data']]
            let RelationshipType = this.relationshipType
            characters = characters.map((character, index) => {
                let itemTemp = {
                    label: `${character.first_name} ${character.last_name}`,
                    name: `${character.pk}`,
                    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
                    genericField: true,
                    readOnly: true,
                    width: 150,
                    list: RelationshipType
                }
                if (index <= 6) {
                    temp.push(itemTemp)
                }
                return itemTemp
            })
            this.charactersByMatter = characters
            // this.charactersByMatter = temp

            this.$eventHub.$on('choose-status-options', async function (data) {
                // choose-status-options
                // this.$eventHub.$off('choose-status-options')
                let relationship_type = data['value']['value'];
                try {
                    await vm.updateStatus(relationship_type)
                    let groupByItem = vm.groupByItem
                    vm.$eventHub.$emit('bus-load-row', vm.rowSelected['pk'], groupByItem)
                } catch (e) {

                } finally {

                }
            })
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
                // return `/api/matters/${this.matterId}/characters/`

                return `/api/matters/${this.matterId}/partial-info-characters/`
                // return `/api/matters/${this.matterId}/character-relationships/`
            },
            relationshipType() {
                return getChoicesConfigByName('CharacterRelationship.RelationshipType')
            },
            attributes() {
                return [
                    /*{
                        label: "First Name", name: "first_name",
                        type: ATTRIBUTE_FIELDS.TEXT.TYPE,
                        width: 200,
                        required: true,
                    },*/
                    ...this.charactersByMatter
                ]
            }
        },
        methods: {
            getLabelByStatus(to_character, free_character, relationship_type) {
                let status = STATUS['N/A']['LABEL']
                status = '-'
                try {
                    if (to_character == free_character) {
                        status = this.relationshipType.filter(temp => temp['value'] == relationship_type)[0]['label']
                    }
                } catch (e) {

                } finally {

                }
                return status
            },
            clickStatus({e, k, value, row, free_character, groupByItem}) {
                this.rowSelected = row;
                this.characterSelected = free_character;
                this.groupByItem = groupByItem;
                let items = this.relationshipType;
                this.$eventHub.$emit('menu-status-options', {e, k, items, value})
            },
            async updateStatus(relationship_type) {
                try {
                    let from_character = this.rowSelected['from_character']['pk'],
                        to_character = this.characterSelected;
                    to_character = parseInt(to_character);

                    let data = {from_character, to_character, relationship_type}
                    let res = await this.$api.post(`/api/matters/${this.matterId}/character-relationships/`, data)
                    return res['data']
                } catch (e) {
                    return false
                }
            }
        },
        filters: {
            l_color(v) {
                try {
                    return STATUS[v]['COLOR']
                } catch (e) {
                    return STATUS['N/A']['COLOR']
                }
            }
        },
        beforeDestroy() {
            this.$eventHub.$off('choose-status-options')
            this.$eventHub.$off('menu-status-options')
            this.charactersByMatter = []
            this.rowSelected = null
            this.characterSelected = null
            this.groupByItem = null

        }
    }
</script>

<style scoped lang="scss">
  .map-head-item {
    &--content {
      border-radius: 0px !important;
    }
  }
</style>
