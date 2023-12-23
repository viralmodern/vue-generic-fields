<template>
  <div>
    <!--    <MenuOptionsDocket v-model="uiShowMenu" @clickItem="clickItem"/>-->
    <MenuOptionsAbsolute
      :list="optionsDocument"
      @click-item="clickItem"
      v-model="uiShowMenu"
    />
    <v-card>
      <v-list three-line dense>
        <v-subheader>
          Documents
          <v-spacer />
          <v-btn
            text
            small
            class="text-capitalize text-caption"
            color="primary"
            @click="createDocuments"
          >
            New Documents
            <v-icon small right>mdi-plus</v-icon>
          </v-btn>
        </v-subheader>
        <template v-for="(item, index) in items">
          <v-divider v-if="index !== 0" />

          <v-list-item
            :key="`doc_item_${item.pk}`"
            active-class="primary--text"
            :to="getPathDoc(item.pk)"
            :input-value="rowSelected && rowSelected['pk'] == item['pk']"
          >
            <v-list-item-avatar color="primary" class="white--text" :size="25">
              <template v-if="item.thumbnail">
                <v-img :src="item.thumbnail"></v-img>
              </template>
              <template v-else>
                <span style="font-size: 75%">{{
                  item.file_name | $$strName
                }}</span>
              </template>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.file_name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <div class="d-flex align-center">
                  <TimeAgo
                    class="text-caption"
                    :datetime="new Date(item.created)"
                  />

                  <div class="mx-1"></div>
                  <v-chip label x-small>
                    {{ documentTypes[item.document_type]['label'] }}
                  </v-chip>
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                color="primary"
                small
                icon
                :id="`document_id_${item.pk}`"
                @click="clickOption($event, `document_id_${item.pk}`, item)"
              >
                <v-icon small>mdi-link-variant</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
    <v-navigation-drawer
      fixed
      right
      width="45vw"
      @input="input"
      v-model="uiShowModalDetail"
    >
      <template v-if="rowSelected">
        <AttributeDetail
          :item="rowSelected"
          :end-point="`${endPoint}${rowSelected.pk}`"
          is-owner-row
          bus-event-name="form-updated-document"
          main-cell-id="file_name"
          :attributes="attributes"
          @updated="updatedDocument"
          v-model="uiShowModalDetail"
        >
          <template v-slot:attach-header> </template>
        </AttributeDetail>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import TimeAgo from '@/sat-vue-toolkit/components/TimeAgo/TimeAgo.vue'
import { getChoicesConfigByName } from '@/mock/appConfigs'
import keyBy from 'lodash/keyBy'
import MenuOptionsAbsolute from '@/sat-vue-toolkit/components/MenuOptionsAbsolute.vue'
import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import AttributeDetail from '@/sat-vue-toolkit/components/slick-grid/attributes/AttributeDetail.vue'
import { $$strName } from '@/sat-vue-toolkit/functions'

export default {
  name: 'DocsTreeSideBar',
  components: {
    AttributeDetail,
    MenuOptionsAbsolute,
    TimeAgo,
  },
  filters: {
    $$strName,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    matterId: {},
    docketEntry: {},
  },
  data() {
    return {
      uiShowMenu: null,
      uiShowAddDocuments: false,
      uiShowModalDetail: false,
      optionsDocument: [
        {
          text: 'Edit',
          icon: 'mdi-pencil',
        },
        {
          text: 'Download PDF',
          icon: 'mdi-download',
        },
      ],
      rowSelected: null,
    }
  },
  mounted() {},
  computed: {
    documentTypes() {
      let choices = getChoicesConfigByName(
        'MatterDocketEntryDocument.DocumentType'
      )
      return keyBy(choices, 'value')
    },
    endPoint() {
      return `/api/matters/${this.matterId}/docket-entries/${this.docketEntry}/documents/`
    },
    attributes() {
      let documentTypes = getChoicesConfigByName(
        'MatterDocketEntryDocument.DocumentType'
      )
      return [
        {
          name: 'file_name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          required: true,
        },
        {
          name: 'thumbnail',
          type: ATTRIBUTE_FIELDS.PICTURE.TYPE,
          isFileAttachment: true,
          multiple: false,
          width: 200,
          list: [],
          groupBy: false,
        },

        {
          name: 'description',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        },
        {
          name: 'document_type',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 200,
          list: documentTypes,
          itemValue: 'value',
          itemText: 'label',
          required: true,

          groupBy: false,
        },
        {
          name: 'file',
          type: ATTRIBUTE_FIELDS.ATTACHMENT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          isFileAttachment: true,
          innerScope: true,
          multiple: false,
          required: true,
        },
        {
          name: 'attachment_number',
          type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          multiple: false,
          required: false,
        },
        {
          name: 'document_number',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          multiple: false,
          required: false,
        },
        {
          name: 'pacer_doc_id',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          multiple: false,
          required: false,
        },
      ]
    },
    parentPath() {
      let { params } = this.$route
      let path = `/matters/${params.matter}/caf/simple-docket/${params.docket}/document`
      return path
    },
  },
  methods: {
    getPathDoc(documentId) {
      let { params } = this.$route
      if (params.hasOwnProperty('document')) {
        return { params: { document: documentId } }
      } else {
        return `${this.parentPath}/${documentId}/view/pdf`
      }
    },
    clickOption(e, id, row) {
      try {
        e.preventDefault()
        this.uiShowMenu = `#${id}`
        this.rowSelected = row
        this.$eventHub.$emit('form-selected-document', row)
        e.stopPropagation()
      } catch (e) {}
    },
    clickItem({ text }) {
      if (text == 'Edit') {
        this.uiShowModalDetail = true
        document.documentElement.classList.add('no_scroll')
      }
    },
    input(isShow) {
      if (!isShow) {
        try {
          if (!document.querySelector('.slickGridApp')) {
            document.documentElement.classList.remove('no_scroll')
          }
        } catch (e) {}
      }
    },
    createDocuments() {
      // this.uiShowAddDocuments = true
      let attributes = this.attributes,
        endPoint = this.endPoint,
        busEventName = 'form-added-document',
        countLabelSingular = 'Document'
      this.$trigger('uiShowAttributeModalCreateNew', {
        attributes,
        endPoint,
        countLabelSingular,
        busEventName,
      })
    },
    updatedDocument(row) {},
  },
}
</script>

<style scoped lang="scss">
.content_text_editable {
  overflow: hidden;
}

.text_editable {
  display: block;
  /*border: solid 1px red;*/
  flex: 1;
  width: 100%;
  overflow: hidden;
  white-space: normal;

  &[contenteditable='true'] {
    border: solid 1px rgba(0, 0, 0, 0.3);
  }

  &[contenteditable='false'] {
    white-space: nowrap;
  }
}
</style>
