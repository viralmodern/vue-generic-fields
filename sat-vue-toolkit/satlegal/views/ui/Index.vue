<template>
  <div>
    <!--    Home Ui-->
    <div style="padding-left: 35px;">
      <v-btn :to="`/project/${projectID}/ui/matters`" text class="text-caption text-capitalize" color="primary">
        All Matters
      </v-btn>
      <v-btn :to="`/project/${projectID}/ui/docket`" text class="text-caption text-capitalize" color="primary">
        Docket Entries
      </v-btn>
      <v-btn :to="`/project/${projectID}/ui/expense`" text class="text-caption text-capitalize" color="primary">
        Expense Entries
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn v-on="on" text class="text-caption text-capitalize" color="primary">
            Time tracking
            <v-icon right>
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item :to="`/project/${projectID}/ui/timelines-matter`" class="text-caption text-capitalize">
            General
          </v-list-item>
          <v-list-item :to="`/project/${projectID}/ui/time-entries-matter`" class="text-caption text-capitalize">
            Time Entries
          </v-list-item>
          <v-list-item :to="`/project/${projectID}/ui/time-taskboard-matter`" class="text-caption text-capitalize">
            Taskboard Time
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn :to="`/project/${projectID}/ui/facts`" text class="text-caption text-capitalize" color="primary">
        All Facts
      </v-btn>
      <v-btn :to="`/project/${projectID}/ui/fact-version`" text class="text-caption text-capitalize" color="primary">
        Facts version
      </v-btn>
      <v-btn :to="`/project/${projectID}/ui/characters`" text class="text-caption text-capitalize" color="primary">
        Characters
      </v-btn>
      <v-btn :to="`/project/${projectID}/ui/characters-related`" text class="text-caption text-capitalize" color="primary">
        Characters related
      </v-btn>
      <v-btn :to="`/project/${projectID}/ui/characters-relationship-map`" text class="text-caption text-capitalize" color="primary">
        Characters relationship map
      </v-btn>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        computed: {
            projectID() {
                return this.$route.params.projectId
            }
        }
    }
</script>

<style scoped>

</style>
