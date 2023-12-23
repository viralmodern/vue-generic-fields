<template>
  <div class="optional-labels-field">
    <v-card flat>
      <v-row class="my-0">
        <v-col cols="12" class="pt-0">
          <v-switch :ripple="false"
                    hide-details
                    label="Multiple selection"/>
          <v-switch :ripple="false"
                    hide-details
                    label="Allow creating new labels"/>


        </v-col>
        <v-col cols="12">
          <v-card flat>
            <v-list dense>
              <v-subheader class="justify-space-between">
                <span>
                  Labels
                </span>
                <v-btn input-value="true"
                       active-class="primary--text"
                       depressed
                       small
                       rounded
                       class="caption text-transform-capitalize">
                  <v-icon small left>mdi-plus</v-icon>
                  Add Label
                </v-btn>
              </v-subheader>
              <v-list-item>
                <v-list-item-action>
                  <ChooseColor disabled-caret/>
                </v-list-item-action>
                <v-list-item-title>Foobar</v-list-item-title>
              </v-list-item>
              <v-divider/>
              <v-list-item>
                <v-list-item-action>
                  <ChooseColor disabled-caret/>
                </v-list-item-action>
                <v-list-item-title>Buzz</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  import ChooseColor from "~/components/utils/ChooseColor"
  export default {
    name: "LabelsFormatOptional",
    components: { ChooseColor },
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
      }
    }
  }
</script>

<style scoped>

</style>
