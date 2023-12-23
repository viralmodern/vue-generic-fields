<template>
  <div class="date-number-field">
    <v-card flat>
      <v-row class="my-0">
        <v-col cols="6" class="py-0">
          <v-autocomplete label="Format"
                          return-object
                          :items="formatItems"
                          item-text="label"
                          :value="optionalField[types.dateFormat]"
                          @input="data => setValueOptional({[types.dateFormat]: data})"
                          item-value="value"/>
        </v-col>
        <v-col cols="6" class="py-0">
          <v-switch :ripple="false"
                    :input-value="optionalField[types.includeTime]"
                    :value="optionalField[types.includeTime]"
                    @change="data => setValueOptional({[types.includeTime]: data})"
                    label="Include Time"/>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  import { optionalFieldOptionsMixin } from "./optionalFormatMixin"

  export default {
    name: "DateFormatOptional",
    props: {
      formatItems: {
        type: Array,
        default: () => [
          {
            value: "1",
            label: "Mar 31st"
          },
          {
            value: "2",
            label: "2020-03-31 12:30:00"
          },
          {
            value: "3",
            label: "31/03/2020"
          },
          {
            value: "4",
            label: "03/31/2020"
          },
          {
            value: "5",
            label: "Mar 31st 2020"
          }

        ]
      },
    },
    data() {
      return {
        types: {
          dateFormat: 'dateFormat',
          includeTime: 'includeTime'
        },
        type: 'dateFormat',
        dateFormat: '#FF00FF',
        includeTime: '#FF00FFFF',
        val: {}
      }
    },
    mixins: [optionalFieldOptionsMixin],
  }
</script>

<style scoped>

</style>
