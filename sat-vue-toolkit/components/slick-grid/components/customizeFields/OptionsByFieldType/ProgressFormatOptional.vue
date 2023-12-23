<template>
  <div class="progress-number-field">
    <v-card flat>
      <v-row class="my-0">
        <v-col cols="6"
               class="py-0">
          <v-text-field :value="optionalField[types.startValue]"
                        @input="data => setValueOptional({[types.startValue]: Number(data)})"
                        label="Start Value"
                        type="number"/>
        </v-col>
        <v-col cols="6"
               class="py-0">
          <v-text-field :value="optionalField[types.endValue]"
                        @input="data => setValueOptional({[types.endValue]: Number(data)})"
                        label="End Value"
                        type="number"/>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import {optionalFieldOptionsMixin} from "./optionalFormatMixin"

export default {
  name: "ProgressFormatOptional",
  mixins: [optionalFieldOptionsMixin],
  data() {
    return {
      types: {
        startValue: 'startValue',
        endValue: 'endValue',
      }
    }
  }
}
</script>

<style scoped>

</style>
