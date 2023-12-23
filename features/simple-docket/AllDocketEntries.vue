<template>
  <SlickGrid
    count-label-singular="Entry"
    count-label-many="Entries"
    :has-vote-row="false"
    :end-point="`/api/matters/${matterId}/docket-entries/`"
    :owner-pk="ownerPk"
    :height="height"
    bus-event-name="bus-docket-entries-matter"
    :attributes="attributes"
    main-cell-id="entry_number"
    :path-link-row-detail="`/matters/${matterId}/caf/simple-docket`"
  >
    <template v-slot:item.documents="{ item, groupByItem, attribute }">
      <div class="fill-height w-100 d-flex align-center">
        <v-btn
          depressed
          icon
          small
          @click="openModal(item, groupByItem, attribute)"
        >
          <v-icon small>mdi-attachment</v-icon>
        </v-btn>
        <div
          class="flex-grow-1 text-wrap text-left"
          style="word-break: break-all"
        >
          <template v-for="document in item.documents">
            <div :key="document.pk">
              <p>
                {{ document.description }}
              </p>
              <p>
                <router-link
                  v-if="document.file"
                  target="_blank"
                  :to="document.file"
                  :href="document.file"
                  >{{ document.file_name }}
                </router-link>
                <span v-else>{{ document.file_name }}</span>
              </p>
            </div>
          </template>
          <!--<template v-for="d in doc[item.pk]">
              <div :key="d.pk">
                <router-link target="_blank" :href="d.file" :to="d.file"
                  >{{ d.file_name }}
                </router-link>
              </div>
            </template>-->
        </div>
      </div>
    </template>
  </SlickGrid>
</template>
<script>
import keyBy from 'lodash/keyBy'
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { getChoicesConfigByName } from '@/components/cafs/mocks/appConfigs'
import {
  ATTRIBUTE_FIELDS,
  SLICK_GRID,
} from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'

export default {
  name: 'AllDocketEntries',
  components: {
    SlickGrid,
  },
  props: {
    height: {
      type: String,
      default: () => `${82}vh`,
    },
  },
  data() {
    return {
      color: SLICK_GRID.COLOR,
      matterMembers: [],
      labels: [],
      groupByItem: null,
      workspaceMembers: [],
      rowSelected: null,
    }
  },
  async mounted() {
    let resMembers = await this.$api.get(
      `/api/matters/${this.matterId}/members/`
    )
    this.matterMembers = resMembers['data']
    // tagables/?type=tag
    let resLabels1 = await this.$api.get(
      `/api/projects/${this.matterId}/labels/`
    )
    let resLabels = await this.$api.get(
      `/api/matters/${this.matterId}/tagables/?type=label`
    )
    this.labels = resLabels['data']
    let resMb = await this.$api.get(`/api/workspace/members/`)
    this.workspaceMembers = resMb['data']
    let vm = this
    this.$eventHub.$on('document-added-in-home', (dd) => {
      console.log('document-added-in-home', dd.row)
      vm.createdDocument(dd.row)
    })
  },
  computed: {
    ownerPk() {
      try {
        return this.$store.getters['auth/user']['pk']
      } catch (e) {
        return ''
      }
    },
    matterId() {
      return this.$route.params.matter
    },
    membersList() {
      let workspaceMembers = keyBy(this.workspaceMembers, (mb) => mb.user.pk)
      return this.matterMembers.map((mb) => {
        let temp = {},
          user = mb.user
        if (workspaceMembers[mb.user]) {
          temp = {
            ...workspaceMembers[mb.user],
            ...workspaceMembers[mb.user]['user'],
          }
          delete temp['user']
          temp['user'] = user
          return temp
        }
        return mb
      })
    },
    attributes() {
      let FiledBy = getChoicesConfigByName('MatterDocketEntry.FiledBy')
      let DocketEntryType = getChoicesConfigByName(
        'MatterDocketEntry.DocketEntryType'
      )
      let documentTypes = getChoicesConfigByName(
        'MatterDocketEntryDocument.DocumentType'
      )
      return [
        {
          label: 'Entry Number',
          name: 'entry_number',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          filledType: 'number',
          width: 150,
          list: [],
          groupBy: false,
          disableCreate: true,
        }, // N/A
        {
          label: 'Docket Documents',
          name: 'documents',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 450,
          list: [],
          groupBy: false,
          disableCreate: true,
          nestedChildren: [
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
          ],
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
          label: 'Type',
          name: 'entry_type',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 200,
          list: DocketEntryType,
          groupBy: true,
          multiple: false,
          required: true,
        }, // N/A
        {
          label: 'Date Added',
          name: 'date_added',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          width: 200,
          list: [],
          groupBy: false,
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
          label: 'Comment',
          name: 'docket_number',
          type: ATTRIBUTE_FIELDS.COMMENTS.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
          disableCreate: true,
        }, // N/A

        {
          label: 'Note',
          name: 'note_count',
          type: ATTRIBUTE_FIELDS.NOTE.TYPE,
          width: 200,
          list: [],
          multiple: true,
          groupBy: false,
          disableCreate: true,
        }, // N/A
        {
          label: 'Labels',
          name: 'labels',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          width: 200,

          list: this.labels,
          itemText: 'name',
          itemValue: 'pk',
          itemColor: 'color',

          multiple: true,
          groupBy: true,
          chips: true,
        }, // N/A
        {
          label: 'Attachments',
          name: 'attachments',
          type: ATTRIBUTE_FIELDS.ATTACHMENT.TYPE,
          multiple: true,
          width: 200,
          list: [],
          isFileAttachment: true,
          groupBy: false,
        }, // N/A
        {
          label: 'Members',
          name: 'members',
          type: ATTRIBUTE_FIELDS.ASSIGN_MEMBER.TYPE,
          itemText: 'name',
          itemValue: 'user',
          itemAvatar: 'avatar',
          returnObject: true,
          multiple: true,
          width: 200,
          list: this.membersList,
          groupBy: true,
          disableCreate: true,
        }, // N/A
        {
          label: 'Related',
          name: 'relations',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        }, // N/A
      ]
    },
  },
  methods: {
    openModal(row, groupByItem, attribute) {
      this.groupByItem = groupByItem
      this.rowSelected = row
      let attributes = attribute.nestedChildren,
        endPoint = `/api/matters/${this.matterId}/docket-entries/${row['pk']}/documents/`,
        busEventName = 'document-added-in-home',
        countLabelSingular = `Document`
      this.$trigger('uiShowAttributeModalCreateNew', {
        attributes,
        endPoint,
        countLabelSingular,
        busEventName,
      })
    },
    createdDocument(doc) {
      let currentRow = this.rowSelected,
        groupByItem = this.groupByItem
      currentRow['documents'] = [...currentRow['documents'], doc]
      this.$eventHub.$emit('bus-update-row', currentRow, groupByItem)
    },
  },
}
</script>

<style scoped></style>
