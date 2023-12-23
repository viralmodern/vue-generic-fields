<template>
  <v-menu
    transition="slide-y-transition"
    dense
    offset-y
    :close-on-content-click="false"
    max-height="45vh"
  >
    <template v-slot:activator="{ on }">
      <div class="text-capitalize d-flex align-center cusor--pointer" v-on="on">
        <v-icon small>mdi-swap-horizontal</v-icon>
        <div class="text-caption mx-1">
          Customize
        </div>
      </div>
    </template>
    <!--<v-card dense>
      <v-list dense>
        <v-list-item dense>
          <v-list-item-subtitle>
            Attributes
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list class="list-customize">
        <v-list-item v-for="n in getItems" :key="n.pk">
          <v-list-item-title>
            <v-chip label draggable>
              <v-icon small left>
                {{n.type | getIconAttribute}}
              </v-icon>
            </v-chip>
            <span class="text-caption" v-text="n.name"></span>
          </v-list-item-title>
          <v-list-item-action>
            <v-switch :ripple="false" hide-details color="primary"></v-switch>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>-->
    <CustomizeFieldsTableGrid
      :fields="getItems"
      item-value="pk"
      item-text="name"
      show-icon
    />
  </v-menu>
</template>
<script>
import mx_genericFields from '../../../generic-fields/mixins/mx_genericFields'
import { getAttributeByProp } from '../../../generic-fields/fields_config'
import CustomizeFieldsTableGrid from '../../../../components/matters/controls/CustomizeFieldsTableGrid'

export default {
  name: 'MenuAttributesConfig',
  components: { CustomizeFieldsTableGrid },
  mixins: [mx_genericFields],
  data() {
    return {
      active: '',
      list: [
        {
          title: 'List',
          to: 'list',
          query: {},
        },
        {
          title: 'Stages',
          to: 'stages',
        },
      ],
    }
  },
  created() {
    this.$$getAttributes()
  },
  computed: {
    getItems() {
      return this.$$getAttributesByToModel('card.card')
    },
  },
  watch: {},
  methods: {},
  filters: {
    getIconAttribute(type) {
      return getAttributeByProp({ type, prop: 'icon' })
    },
  },
}
</script>

<style scoped></style>
<style lang="scss">
.list-customize {
  .v-list-item--dense,
  .v-list--dense .v-list-item,
  .v-list-item {
    min-height: unset;
  }

  .v-list-item__action {
    margin: 0px;
    transform: scale(0.6);
  }
}
</style>
