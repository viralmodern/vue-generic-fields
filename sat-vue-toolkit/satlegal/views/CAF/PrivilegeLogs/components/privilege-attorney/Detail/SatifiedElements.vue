<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      :items-per-page="5"
      :page.sync="page"
      hide-default-footer
      @page-count="pageCount = $event"
      :total-visible="5"
    >
      <template v-slot:item.is_communication="{ item }">
        <ChipJoinMenuSelectBox
          v-if="Object.keys(item).includes('is_communication')"
          :value="item.is_communication"
          keyValue="value"
          keyText="label"
          :dataList="
                appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
              "
          @onClickChip="
                 $emit('updateSelectBox',{
                  ...$event,
                  title: 'Is Communication',
                  name: 'is_communication',
                  pk: item.pk,
                  keyValue: 'value',
                  keyText: 'label',
                  value: item.is_communication,
                  dataList:
                    appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
                });

              "
        />
      </template>
      <template v-slot:item.is_confidential="{ item }">
        <ChipJoinMenuSelectBox
          v-if="Object.keys(item).includes('is_confidential')"
          :value="item.is_confidential"
          keyValue="value"
          keyText="label"
          :dataList="
                appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
              "
          @onClickChip="
                $emit('updateSelectBox',{
                  ...$event,
                  title: 'Is Confidential',
                  name: 'is_confidential',
                  pk: item.pk,
                  keyValue: 'value',
                  keyText: 'label',
                  value: item.is_confidential,
                  dataList:
                    appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
                });

              "
        />
      </template>
      <template v-slot:item.is_legal_related="{ item }">
        <ChipJoinMenuSelectBox
          v-if="Object.keys(item).includes('is_legal_related')"
          :value="item.is_legal_related"
          keyValue="value"
          keyText="label"
          :dataList="
                  appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
                "
          @onClickChip="
                  $emit('updateSelectBox',{
                    ...$event,
                    title: 'Is Legal Related',
                    name: 'is_legal_related',
                    pk: item.pk,
                    keyValue: 'value',
                    keyText: 'label',
                    value: item.is_legal_related,
                    dataList:
                      appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
                  });
  
                "
        />
      </template>
    </v-data-table>
    <div class="d-flex align-center justify-end" style="height:60px">
      <div class="pagination-custody-item">
        <v-pagination v-model="page" :length="pageCount" circle></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script>
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";

export default {
  mixins: [appConfigMixin],
  props: {
    // headers: Array,
    desserts: Array,
    privilegeId: Number
  },
  components: {
    ChipJoinMenuSelectBox
  },
  data() {
    return {
      headers: [
        {
          text: "Is a communication?",
          value: "is_communication",
          headerValue: "satified_elements",
          color: "cyan"
        },
        {
          text: "Is confidential?",
          value: "is_confidential",
          headerValue: "satified_elements",
          color: "green"
        },
        {
          text: "Is legal assistance?",
          value: "is_legal_related",
          headerValue: "satified_elements",
          color: "purple"
        }
      ],
      page: 1,
      pageCount: 0
    };
  },
  methods: {}
};
</script>
