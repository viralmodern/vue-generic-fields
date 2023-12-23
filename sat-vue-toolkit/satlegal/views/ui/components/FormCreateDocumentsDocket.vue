<template>
  <div>
    <v-card flat class="fill-height overflow-hidden">
      <v-card-text class="fill-height overflow-hidden px-0">
        <AttributeCreateNew :attributes="attributes"
                            :end-point="endpoint"
                            @input="$emit('input')"
                            count-label-singular="Document"/>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import { ATTRIBUTE_FIELDS } from "../../../../components/slick-grid/configs/attribute"
  import { getChoicesConfigByName } from "../mocks/appConfigs"
  import { $$labelByName } from "@/sat-vue-toolkit/functions"
  import AttributeCreateNew from "@/sat-vue-toolkit/components/slick-grid/attributes/AttributeCreateNew"
  export default {
    name: "FormCreateDocumentsDocket",
    components: {
      AttributeCreateNew,

    },
    filters: { $$labelByName },
    props: {
      matter: {},
      docketEntry: {},
      value: {}

    },
    data () {
      return {
      }
    },
    computed: {
      endpoint () {
        return `/api/matters/${this.matter}/docket-entries/${this.docketEntry}/documents/`
      },
      attributes () {
        let documentTypes = getChoicesConfigByName("MatterDocketEntryDocument.DocumentType")
        return [
          {
            name: "file_name",
            type: ATTRIBUTE_FIELDS.TEXT.TYPE,
            width: 200,
            list: [],
            groupBy: false,
            required: true
          },
          {
            name: "thumbnail",
            type: ATTRIBUTE_FIELDS.PICTURE.TYPE,
            isFileAttachment: true,
            multiple: false,
            width: 200,
            list: [],
            groupBy: false
          },

          {
            name: "description",
            type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
            width: 200,
            list: [],
            groupBy: false
          },
          {
            name: "document_type",
            type: ATTRIBUTE_FIELDS.LIST.TYPE,
            width: 200,
            list: documentTypes,
            itemValue: "value",
            itemText: "label",
            required: true,

            groupBy: false
          },
          {
            name: "file",
            type: ATTRIBUTE_FIELDS.ATTACHMENT.TYPE,
            width: 200,
            list: [],
            groupBy: false,
            isFileAttachment: true,
            multiple: false,
            required: true
          },
          {
            name: "attachment_number",
            type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
            width: 200,
            list: [],
            groupBy: false,
            multiple: false,
            required: false
          },
          {
            name: "document_number",
            type: ATTRIBUTE_FIELDS.TEXT.TYPE,
            width: 200,
            list: [],
            groupBy: false,
            multiple: false,
            required: false
          },
          {
            name: "pacer_doc_id",
            type: ATTRIBUTE_FIELDS.TEXT.TYPE,
            width: 200,
            list: [],
            groupBy: false,
            multiple: false,
            required: false
          },



        ]
      }
    },
    methods: {
      submitted (row) {
        this.$emit("uploaded", row)
      },
      onError () {
      }
    }
  }
</script>

<style scoped>

</style>
