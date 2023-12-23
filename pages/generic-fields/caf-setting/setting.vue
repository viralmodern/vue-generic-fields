<template>
  <v-card color="transparent">
    <div>
      <PortalDropDownFieldsAttributes
        :to-model="toModel"
        v-model="attributes"
      />
      <div class="d-flex align-center pa-4">
        <v-menu :close-on-content-click="false" offset-x>
          <template v-slot:activator="{ on }">
            <p
              class="ma-0 pa-0 d-flex align-center cusor--pointer text-primary"
              v-on="on"
            >
              Add Attributes: &nbsp;
              <v-icon>mdi-plus</v-icon>
            </p>
          </template>
          <portal-target name="PortalDropDownFieldsAttributes"></portal-target>
        </v-menu>
      </div>
    </div>
    <v-divider />
    <!-- <div class="my-4 pa-4">
       <v-chip v-for="(item, index) in attributes" :key="index" class="ma-1">
         <v-icon small left>{{ item.type | getIcon }}</v-icon>
         {{ item.name }}
         <v-icon right @click="editAttribute(item)">mdi-dots-vertical</v-icon>
       </v-chip>
     </div>-->
    <DialogEditAttribute
      :attribute-name="attributeName"
      v-model="uiEditAttribute"
      :attributeID="attributeIDSelected"
      :entity="entity"
      @close="closeDialogEdit"
    />
    <CurdModel $$endpoint="/api/workspace/attributes/" :pk="attributeID">
      <div slot-scope="{ data: post, loading, update }">
        <TableGrid
          hide-default-footer
          hide-default-header
          @clickRow="({ row, item }) => (attributeID = item.pk)"
          :show-attribute="false"
          :headers="headers"
          :desserts="attributes"
          :loading="loading"
          :to-model="toModel"
        >
          <template v-slot:item.attribute_name="{ props: { row, item } }">
            <v-edit-dialog
              @save="update({ name: item.name })"
              :return-value.sync="item.name"
            >
              <div class="text-no-wrap">
                {{ item.name }}
              </div>
              <template v-slot:input>
                <div class="px-4">
                  <v-text-field
                    v-model="item.name"
                    label="Edit"
                    single-line
                  ></v-text-field>
                </div>
              </template>
            </v-edit-dialog>
          </template>
          <template
            v-slot:item.attribute_description="{ props: { row, item } }"
          >
            <v-edit-dialog :return-value.sync="item.name">
              Lorem ipsum dolor sit amet
              <template v-slot:input>
                <div class="px-4">
                  <v-textarea></v-textarea>
                </div>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.attribute_created_by="{ props: { row, item } }">
            <DataMember :pk="item.creator">
              <template slot-scope="{ data: post, loading }">
                <AvatarItem
                  class="cusor--pointer"
                  :title="post.name"
                  :src="post.avatar"
                />
              </template>
            </DataMember>
          </template>
          <template v-slot:item.attribute_type="{ props: { row, item } }">
            <v-autocomplete
              v-model="item.type"
              small-chips
              :items="attributesType"
              @change="(val) => update({ type: val })"
              item-value="id"
              item-text="label"
            >
              <template v-slot:selection="data">
                <v-chip>
                  <v-icon small left>{{ data.item.icon }}</v-icon>
                  {{ data.item.label }}
                </v-chip>
              </template>
            </v-autocomplete>
          </template>
          <template v-slot:item.attribute_value="{ props: { row, item } }">
            <div style="width: 150px;">
              Lorem ipsum dolor sit amet
            </div>
          </template>
          <template v-slot:item.attribute_visibility="{ props: { row, item } }">
            <v-switch :ripple="false" />
          </template>
        </TableGrid>
      </div>
    </CurdModel>
  </v-card>
</template>

<script>
import PortalDropDownFieldsAttributes from '../../../features/portals/PortalDropDownFieldsAttributes'
import {
  getAttributeByProp,
  getListAttribute
} from '../../../features/generic-fields/fields_config'
import DialogEditAttribute from '../../../features/generic-fields/components/DialogEditAttribute'
import TableGrid from '../../../components/utils/TableGrid'
import DataMember from '../../../components/utils/DataMember'
import ChooseItems from '../../../components/utils/ChooseItems'
import AvatarItem from '../../../components/utils/AvatarItem'
import CurdModel from '../../../features/generic-fields/components/CurdModel'

export default {
  components: {
    CurdModel,
    AvatarItem,
    ChooseItems,
    DataMember,
    TableGrid,
    DialogEditAttribute,
    PortalDropDownFieldsAttributes
  },
  props: {
    toModel: {}
  },
  data() {
    return {
      attributes: [],
      uiEditAttribute: false,
      entity: {},
      attributeIDSelected: null,
      attributeName: '',
      attributeID: null,
      headers: [
        {
          text: 'Attribute Name',
          value: 'attribute_name'
        },
        {
          text: 'Description',
          value: 'attribute_description'
        },
        {
          text: 'Created By',
          value: 'attribute_created_by'
        },
        {
          text: 'Attribute Type',
          value: 'attribute_type'
        },
        {
          text: 'Attribute Value',
          value: 'attribute_value'
        },
        {
          text: 'Visibility?',
          value: 'attribute_visibility'
        }
        /*{
            text: "Action",
            value: "action"
          }*/
      ],
      desserts: [{}],
      attributesType: getListAttribute()
    }
  },
  methods: {
    editAttribute(item) {
      this.uiEditAttribute = true
      this.attributeName = getAttributeByProp({
        type: item.type,
        prop: 'component'
      })
      this.attributeIDSelected = item.pk
      this.entity = { name: item.name }
    },
    closeDialogEdit({ item }) {
      try {
        let _index = this.attributes.findIndex((i) => i.pk === item.pk)
        if (_index >= 0) {
          this.attributes[_index] = item
        }
      } catch (e) {
        console.log('closeDialogEdit', e.message)
      }
    },
    saveName() {
      console.log('saveName', arguments)
    }
  },
  filters: {
    getIcon(val) {
      return getAttributeByProp({ type: val, prop: 'icon' })
    }
  }
}
</script>

<style scoped></style>
