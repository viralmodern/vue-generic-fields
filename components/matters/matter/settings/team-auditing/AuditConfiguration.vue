<template>
  <div>
    <div class="mb-4">
      You can configure auditing for various events that occur in your project.
    </div>
    <enable-all-audit></enable-all-audit>
    <v-expansion-panels multiple v-model="value">
      <v-expansion-panel>
        <v-expansion-panel-header>
          Documentation Editor
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item dense>
              <v-list-item-action>
                <v-switch
                  ripple
                  color="primary"
                  :ripple="false"
                  value="red"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Article Created
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense>
              <v-list-item-action>
                <v-switch
                  color="primary"
                  :ripple="false"
                  value="red"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Article Deleted
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Landing Page, File Manager
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item dense>
              <v-list-item-action>
                <v-switch
                  ripple
                  color="primary"
                  :ripple="false"
                  value="red"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Article Created
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense>
              <v-list-item-action>
                <v-switch
                  color="primary"
                  :ripple="false"
                  value="red"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Article Deleted
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import EnableAllAudit from './EnableAllAudit'
export default {
  name: 'AuditConfiguration',
  components: { EnableAllAudit },
  data() {
    return {
      ex11: [
        'red',
        'indigo',
        'orange',
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
        'red darken-3',
        'indigo darken-3',
        'orange darken-3'
      ],
      value: []
    }
  },

  methods: {
    clickSwitch(e) {
      e.preventDefault()
      // alert(1)
      return false
    }
  }
}
</script>

<style scoped></style>
