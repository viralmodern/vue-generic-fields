<template>
  <div>
    <SlickGrid
      disabled-add-new-row
      disabled-add-new-column
      no-link-detail
      no-query-params
      :height="height"
      :attributes="reduceAttributes"
    />
  </div>
</template>

<script>
import { fieldsPresidentialDocuments } from '~/features/odt/mixins/mxPresidentAmerican'
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'
import { ROUTES } from '~/features/odt/helpers/odt.json'
let {
  PresidentialDocumentsInformation,
  PresidentialDocumentsMoreInformation,
  PresidentialDocumentsReadingMetrics,
} = ROUTES.UsPresidents
export default {
  name: 'GridAllPresidentialDocuments',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${77.5}vh`,
    },
    rootPathLink: {
      type: String,
      default: () => ``,
    },
  },
  computed: {
    fieldsIncludes() {
      let { query } = this.$route
      let _by = query['by']
      let fieldsIncludes1 = [
        fieldsPresidentialDocuments.type.name,
        fieldsPresidentialDocuments.sub_type.name,
        fieldsPresidentialDocuments.abstract.name,
        fieldsPresidentialDocuments.agencies.name,
        fieldsPresidentialDocuments.document_number.name,
        fieldsPresidentialDocuments.citation.name,
        fieldsPresidentialDocuments.publication_date.name,
      ]
      if (_by === PresidentialDocumentsMoreInformation.path) {
        fieldsIncludes1 = [
          fieldsPresidentialDocuments.toc_doc.name,
          fieldsPresidentialDocuments.toc_subject.name,
          fieldsPresidentialDocuments.topics.name,
          fieldsPresidentialDocuments.disposition_notes.name,
          fieldsPresidentialDocuments.signing_date.name,
        ]
      } else if (_by === PresidentialDocumentsReadingMetrics.path) {
        fieldsIncludes1 = [
          fieldsPresidentialDocuments.document.name,
          fieldsPresidentialDocuments.page_length.name,
          fieldsPresidentialDocuments.reading_times.name,
        ]
      }
      console.error('KLMM', fieldsIncludes1)
      return fieldsIncludes1
    },
    reduceAttributes() {
      let { rootPathLink, fieldsIncludes } = this
      let isEnds = rootPathLink.endsWith('/')
      let fieldsFroze = [
        {
          ...fieldsPresidentialDocuments.title,
          pathLink: function () {
            if (isEnds) {
              return `${rootPathLink}${this.pk}`
            } else {
              return `${rootPathLink}/${this.pk}`
            }
          },
        },
      ]
      let fields = [
        { ...fieldsPresidentialDocuments.type },
        { ...fieldsPresidentialDocuments.sub_type },
        { ...fieldsPresidentialDocuments.abstract },
        { ...fieldsPresidentialDocuments.agencies },
        { ...fieldsPresidentialDocuments.document_number },
        { ...fieldsPresidentialDocuments.citation },
        { ...fieldsPresidentialDocuments.publication_date },
        { ...fieldsPresidentialDocuments.toc_doc },
        { ...fieldsPresidentialDocuments.toc_subject },
        { ...fieldsPresidentialDocuments.topics },
        { ...fieldsPresidentialDocuments.disposition_notes },
        { ...fieldsPresidentialDocuments.signing_date },
        { ...fieldsPresidentialDocuments.document },
        { ...fieldsPresidentialDocuments.page_length },
        { ...fieldsPresidentialDocuments.reading_times },
      ]
      let fieldsReduce = []
      console.log({ fields, fieldsIncludes })
      fieldsReduce = fields.filter((field) =>
        fieldsIncludes.includes(field.name)
      )
      return [...fieldsFroze, ...fieldsReduce]
    },
  },
}
</script>

<style scoped></style>
