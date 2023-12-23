<template>
  <portal to="PortalDropDownFieldsAttributes">
    <v-card max-width="450px">
      <v-autocomplete
        :multiple="multiple"
        flat
        autofocus
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        small-chips
        hide-selected
        dense
        :item-value="itemValue"
        :item-text="itemText"
        solo
        hide-no-data
        hide-details
        style="font-size: 14px;"
        label="Choose Attribute Type"
        @change="change"
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            small
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="remove(data.item)"
          >
            <v-icon left small>
              {{ data.item.icon }}
            </v-icon>
            {{ data.item[itemText] }}
          </v-chip>
        </template>
        <template v-slot:item="data">
          <v-list-item-icon>
            <v-icon>
              {{ data.item | attributeIcon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-html="data.item[itemText]"></v-list-item-title>
          </v-list-item-content>
        </template>
      </v-autocomplete>
      <v-divider />
      <v-dialog persistent v-model="uiShowAddNewAttr" width="500">
        <template v-slot:activator="{ on }">
          <v-btn
            class="text-transform-unset text-caption"
            v-on="on"
            text
            block
            depressed
            color="primary"
          >
            <v-icon left>mdi-plus</v-icon>
            Create New Attribute
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <div class="text-subtitle-1">
              Create New Attribute
            </div>
            <v-spacer />
            <v-btn icon @click="uiShowAddNewAttr = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <ChooseItems
              :create-new-search="false"
              :items="listAttribute"
              list-icon
              close-on-content-click
              item-value="id"
              item-text="label"
              item-icon="icon"
              v-model="attributesChoose"
            >
              <template v-slot:content="props">
                <v-btn
                  v-on="props.on"
                  class="text-transform-unset"
                  depressed
                  block
                >
                  <v-icon left>
                    {{ props.selected | text_field_icon }}
                  </v-icon>
                  {{ props.selected | text_field_type }}
                </v-btn>
              </template>
            </ChooseItems>
            <div class="mb-4"></div>
            <AttributesCreateNewBase
              :to-model="toModel"
              @saved="saved"
              @cancel="cancel"
              :attr-type="attributeTypeValueComponent"
              :attr-name="attributeTypeNameComponent"
            />
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-dialog>
    </v-card>
  </portal>
</template>

<script>
import {
  getIconAttributeIcon,
  WORKSPACE_MODEL_ATTRIBUTES,
} from '../generic-fields/fields_config'
import _ from 'lodash'
import ChooseItems from '../../components/utils/ChooseItems'
import AttributesCreateNewBase from '../generic-fields/components/AttributesCreateNewBase'
import mx_genericFields from '../generic-fields/mixins/mx_genericFields'
export default {
  name: 'PortalDropDownFieldsAttributes',
  components: { AttributesCreateNewBase, ChooseItems },
  mixins: [mx_genericFields],
  data() {
    return {
      select: [],
      attributes: this.value,
      loading: false,
      search: '',
      multiple: false,
      uiShowAddNewAttr: false,
      attributesChoose: null,
      itemValue: 'pk',
      itemText: 'name',
    }
  },
  props: {
    value: {},
    toModel: {
      type: String,
    },
  },
  async mounted() {},
  computed: {
    items: {
      get() {
        try {
          console.log('items_attributes', this.attributes)
          return this.attributes.filter(
            (attr) => attr.to_model === this.toModel
          )
        } catch (e) {
          console.error('attributes', e.message)
          return []
        }
      },
      set(val) {
        console.error('ATTRIBUTES', val)
      },
    },
    listAttribute() {
      return _.map(
        _.keys(WORKSPACE_MODEL_ATTRIBUTES),
        (k) => WORKSPACE_MODEL_ATTRIBUTES[k]
      )
    },
    attributeTypeValueComponent() {
      try {
        return this.attributesChoose.id
      } catch (e) {
        console.log('attributeTypeValueComponent', e.message)
        return ''
      }
    },
    attributeTypeNameComponent() {
      try {
        return this.attributesChoose.component
      } catch (e) {
        console.log('attributeTypeNameComponent', e.message)
        return ''
      }
    },
  },
  methods: {
    remove(item) {
      if (this.multiple) {
        const index = this.select.indexOf(item.id)
        if (index >= 0) {
          this.select.splice(index, 1)
        }
      } else {
        this.select = null
      }
    },
    selectItem({ items }) {
      console.log('selectItem', items)
      this.attributesChoose = items
    },
    change() {
      console.log('ARGUMENTS', arguments)
    },
    saved(data) {
      this.$$getAttributes()
    },
    cancel() {
      this.uiShowAddNewAttr = false
    },
  },
  filters: {
    text_field_type(selected) {
      try {
        return selected.label
      } catch (e) {
        return 'Choose Attribute Type'
      }
    },
    text_field_icon(selected) {
      try {
        return selected.icon
      } catch (e) {
        return ''
      }
    },
    attributeIcon(item) {
      return getIconAttributeIcon({ type: item.type })
    },
  },
  watch: {
    attributes: {
      handler(n) {
        this.$emit(
          'input',
          n.filter((attr) => attr.to_model === this.toModel)
        )
      },
      // immediate: true
    },
    toModel: {
      handler(n) {
        this.$$getAttributes()
      },
      immediate: true,
    },
  },
}
</script>

<style scoped></style>
