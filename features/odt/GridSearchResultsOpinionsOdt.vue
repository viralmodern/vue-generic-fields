<template>
  <div>
    <SlickGrid
      count-label-singular="Result"
      count-label-many="Results"
      :has-vote-row="false"
      :has-report-row="false"
      :end-point="endPoint"
      :owner-pk="ownerPk"
      :height="height"
      :items="dataGroup"
      disabled-add-new-column
      :show-quick-add-row="false"
      :show-button-quick-add-modal="false"
      :ui-show-add-row-modal="false"
      :attributes="attributes"
      main-cell-id="entry_number"
      no-link-detail
      disabled-sort
      no-query-params
      :items-per-page="200"
    >
      <template v-slot:item.documents="{ item }">
        <div class="w-100">
          <template v-if="item.documents.length">
            {{ item.documents[0] }}
          </template>
        </div>
      </template>
      <template v-slot:right-header></template>
    </SlickGrid>
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import {
  ATTRIBUTE_FIELDS,
  TYPE_ODT_SEARCH,
} from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import { $$arrToString } from '@/sat-vue-toolkit/functions'
let textContent =
  'Alice waited a little, half expecting to see it again, but it did not\n' +
  'appear, and after a minute or two she walked on in the direction in\n' +
  "which the March Hare was said to live. 'I've seen hatters before,' she\n" +
  "said to herself; 'the March Hare will be much the most interesting, and\n" +
  "perhaps as this is May it won't be raving mad--at least not so mad as\n" +
  "it was in March.' As she said this, she looked up, and there was the Cat\n" +
  'again, sitting on a branch of a tree.\n' +
  '\n' +
  "'Did you say pig, or fig?' said the Cat.\n" +
  '\n' +
  "'I said pig,' replied Alice; 'and I wish you wouldn't keep appearing and\n" +
  "vanishing so suddenly: you make one quite giddy.'\n" +
  'She had not gone much farther before she came in sight of the house\n' +
  'of the March Hare: she thought it must be the right house, because the\n' +
  'chimneys were shaped like ears and the roof was thatched with fur. It\n' +
  'was so large a house, that she did not like to go nearer till she had\n' +
  'nibbled some more of the lefthand bit of mushroom, and raised herself to\n' +
  'about two feet high: even then she walked up towards it rather timidly,\n' +
  "saying to herself 'Suppose it should be raving mad after all! I almost\n" +
  "wish I'd gone to see the Hatter instead!'\n" +
  '\n' +
  '\n' +
  '\n' +
  '\n' +
  'CHAPTER VII. A Mad Tea-Party\n' +
  '\n' +
  'There was a table set out under a tree in front of the house, and the\n' +
  'March Hare and the Hatter were having tea at it: a Dormouse was sitting\n' +
  'between them, fast asleep, and the other two were using it as a\n' +
  "cushion, resting their elbows on it, and talking over its head. 'Very\n" +
  "uncomfortable for the Dormouse,' thought Alice; 'only, as it's asleep, I\n" +
  "'It wasn't very civil of you to sit down without being invited,' said\n" +
  'the March Hare.'
let keyWord = 'hare'
export default {
  name: 'GridSearchResultsOpinionsOdt',
  components: { SlickGrid },
  filters: {
    $$arrToString,
  },
  data() {
    return {
      textContent,
      keyWord,
    }
  },
  props: {
    type: {
      default: () => TYPE_ODT_SEARCH.RECAP,
    },
    dataGroup: {
      default: () => {
        return {
          '': {
            count: 1,
            results: [
              {
                entry_number: 1,
                search_results: {
                  text_content:
                    '...There was a table set out under a tree in front of the house, and the\n' +
                    'March Hare and the Hatter were having tea at it: a Dormouse was sitting\n' +
                    'between them, fast asleep, and the other two were using it as a\n' +
                    "cushion, resting their elbows on it, and talking over its head. 'Very\n" +
                    "uncomfortable for the Dormouse,' thought Alice; 'only, as it's asleep, I\n" +
                    "'It wasn't very civil of you to sit down without being invited,' said\n" +
                    'the March Hare...',
                  pk: 6,
                  link_text: 'Exhibit document 2',
                  badge_count: '45 pages',
                  key_word: keyWord,
                },
                concordance_plot: {
                  text_content: textContent,
                  key_word: keyWord,
                },
                date_filed: new Date().toString(),
              },
            ],
          },
        }
      },
    },
    height: {
      default: () => `${80}vh`,
    },
    docketId: {
      type: String,
      default: () => '1',
    },
  },
  computed: {
    endPoint() {
      return `/api/dockets/${this.docketId}/docket-entries/`
    },
    ownerPk() {
      try {
        return this.$store.getters['auth/user']['pk']
      } catch (e) {
        return ''
      }
    },
    attributes() {
      let entryTypes = this.$store.getters['appConfigs/getChoicesConfigByName'](
        'DocketEntryType'
      ).map((t) => ({ ...t, value: t.value.toString() }))
      let filedBy = this.$store.getters['appConfigs/getChoicesConfigByName'](
        'DocketEntry.FiledBy'
      ).map((t) => ({ ...t, value: t.value.toString() }))
      console.log({ entryTypes, filedBy })
      return [
        {
          name: 'entry_number',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 180,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'search_results',
          type: ATTRIBUTE_FIELDS.CONTENT_SEARCH.TYPE,
          width: 350,
          pathLink: '/odt/dockets/4355835/5/document',
          pathLinkValue: 'pk',
          pathLinkText: 'pk',
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'concordance_plot',
          type: ATTRIBUTE_FIELDS.CONCORDANCE_PLOT.TYPE,
          width: 350,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A

        {
          name: 'date_filed',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          width: 150,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'entry_type',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 150,
          list: entryTypes,
          groupBy: true,
          readOnly: true,
        }, // N/A
        {
          name: 'filed_by',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 150,
          list: filedBy,
          groupBy: true,
          readOnly: true,
        }, // N/A

        {
          name: 'description',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 400,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'document_quantity',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'page_quantity',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A

        {
          name: 'estimated_reading_time',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'Waiting Time Between Entries',
          name: 'waiting_time',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'Accumulate Waiting Time',
          name: 'accumulated_waiting_time',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
      ]
    },
  },
}
</script>

<style scoped></style>
