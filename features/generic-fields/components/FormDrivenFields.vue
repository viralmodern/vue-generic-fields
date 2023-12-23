<template>
  <v-card flat>
    <div class="portal_list">
      <PortalListAttachModel v-model="toModel" />
      <PortalDropDownFieldsAttributes
        v-model="attributes"
        :to-model="toModel"
      />
    </div>
    <v-card-text>
      <p class="title_head">
        Name Your Matter
      </p>
      <div class="d-flex align-center">
        <v-text-field single-line outlined dense>
          <template v-slot:append-outer>
            <ChooseColor />
          </template>
        </v-text-field>
      </div>
      <p class="title_head">
        Attach to Model
      </p>
      <div>
        <portal-target name="PortalListAttachModel"></portal-target>
      </div>
      <div class="mb-4"></div>
      <p class="title_head">
        Attributes in This Model &nbsp;
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn
              class="primary--text"
              v-on="on"
              style="text-transform: none"
              depressed
            >
              <v-icon left>mdi-plus</v-icon>
              Add an Attribute
            </v-btn>
          </template>
          <portal-target name="PortalDropDownFieldsAttributes"></portal-target>
        </v-menu>
      </p>
      <div>
        <template v-for="item in $$attributesByToModel">
          <v-hover v-slot:default="{ hover }">
            <v-chip :key="item.pk" class="ma-1 cusor--pointer">
              <v-icon small left>{{ item | attributeIcon }}</v-icon>
              {{ item.name }}
              <MenuOptionAttribute
                :cls-hover="hover ? 'show_base' : 'hide_base'"
                @change="
                  ({ type }) => attributeAction({ type, attribute: item })
                "
                :class="{ show_base: hover, hide_base: !hover }"
                :key="`mn-${item.pk}`"
              />
            </v-chip>
          </v-hover>
        </template>
      </div>
    </v-card-text>
    <DialogEditAttribute
      :attribute-name="attributeName"
      v-model="uiEditAttribute"
      :attributeID="attributeIDSelected"
      :entity="entity"
      @close="closeDialogEdit"
    />
  </v-card>
</template>

<script>
import ChooseColor from '../../../components/utils/ChooseColor'
import PortalDropDownFieldsAttributes from '../../portals/PortalDropDownFieldsAttributes'
import ChooseItems from '../../../components/utils/ChooseItems'
import mx_genericFields from '../mixins/mx_genericFields'
import {
  getAttributeComponentName,
  getIconAttributeIcon
} from '../fields_config'
import MenuOptionAttribute from './MenuOptionAttribute'
import DialogEditAttribute from './DialogEditAttribute'
import PortalListAttachModel from '../../portals/PortalListAttachModel'

export default {
  name: 'FormDrivenFields',
  components: {
    PortalListAttachModel,
    DialogEditAttribute,
    MenuOptionAttribute,
    ChooseItems,
    PortalDropDownFieldsAttributes,
    ChooseColor
  },
  data() {
    return {
      uiShowAddAttribute: false,
      uiEditAttribute: false,
      attributeSelect: {},
      toModel: 'card.card'
    }
  },
  async mounted() {
    this.$$getAttributes()
  },
  mixins: [mx_genericFields],
  computed: {
    $$attributesByToModel() {
      try {
        return this.attributes.filter((attr) => attr.to_model === this.toModel)
      } catch (e) {
        console.log('$$attributesByToModel', e.message)
        return []
      }
    },
    attributeIDSelected() {
      try {
        return this.attributeSelect.pk
      } catch (e) {
        return null
      }
    },
    entity() {
      try {
        return {
          name: this.attributeSelect.name
        }
      } catch (e) {
        return {}
      }
    },
    attributeName() {
      try {
        return getAttributeComponentName({ type: this.attributeSelect.type })
      } catch (e) {
        return ''
      }
    }
  },
  methods: {
    saved() {},
    async attributeAction({ type, attribute }) {
      console.log('attributeAction', attribute)
      switch (type) {
        case 'edit':
          this.attributeSelect = attribute
          return (this.uiEditAttribute = true)
        case 'remove_scope':
          return 0
        default:
          await this.$$delAttribute({ attributeID: attribute.pk })
          break
      }
    },
    closeDialogEdit() {
      this.uiEditAttribute = false
      this.$$getAttributes()
    }
  },
  filters: {
    attributeIcon(item) {
      return getIconAttributeIcon({ type: item.type })
    }
  }
}
</script>

<style scoped></style>
