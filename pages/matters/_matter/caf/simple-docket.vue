<template>
  <div>
    <keep-alive>
      <nuxt-child v-if="$$docketID" />
      <BaseDocketEntries v-else>
        <v-container>
          <v-stepper>
            <v-stepper-header>
              <v-stepper-step complete editable step="1">
                <SetupCreateDocket />
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2">
                Use Docket Entries
              </v-stepper-step>
            </v-stepper-header>
          </v-stepper>
        </v-container>
      </BaseDocketEntries>
    </keep-alive>
  </div>
</template>

<script>
import SetupCreateDocket from '../../../../features/simple-docket/SetupCreateDocket'
import mx_docket from '../../../../mixins/mx_docket'
import BaseDocketEntries from '../../../../features/simple-docket/BaseDocketEntries'
export default {
  components: { BaseDocketEntries, SetupCreateDocket },
  mixins: [mx_docket],
}
</script>

<style scoped></style>
