<template>
  <v-navigation-drawer
    app
    class="drawer_default"
    style="z-index: 4"
    width="45vw"
    right
    v-model="uiShowDialog"
  >
    <div>
      <div class="pa-4">
        <p class="title d-flex align-center mb-0">
          {{ taskName }}
          <v-spacer />
          <v-btn icon>
            <v-icon>
              mdi-dots-vertical
            </v-icon>
          </v-btn>
          <v-btn icon @click="uiShowDialog = false" right>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </p>
        <v-toolbar-title class="d-flex">
          <v-spacer />
          <v-btn
            text
            class="text-transform-unset"
            active-class="primary--text"
            value="attributes"
            @click="model = 'attributes'"
            :input-value="model === 'attributes'"
          >
            Attributes
          </v-btn>
          <v-btn
            text
            value="activities"
            active-class="primary--text"
            class="text-transform-unset"
            :input-value="model === 'activities'"
            @click="model = 'activities'"
          >
            Activities
          </v-btn>
          <v-btn
            text
            value="comments"
            active-class="primary--text"
            class="text-transform-unset"
            :input-value="model === 'comments'"
            @click="model = 'comments'"
          >
            Comments
          </v-btn>
          <v-spacer />
        </v-toolbar-title>
        <v-divider />
        <div class="mb-4"></div>
        <div v-show="model === 'attributes'">
          <template v-for="attribute in attributes">
            <AttributesCardBase
              :key="attribute.pk"
              :attr-type="attribute.type"
              :attr-name="attribute.name"
            />
          </template>
        </div>
        <div v-show="model === 'activities'">
          <ActivitiesTask />
        </div>
        <div v-show="model === 'comments'">
          <CommentsTask />
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>
<script>
import mx_taskboard from '../../mixins/mx_taskboard'
import AttributesCardBase from '../../../generic-fields/components/AttributesCardBase'
import CommentsTask from './CommentsTask'
import ActivitiesTask from './ActivitiesTask'

export default {
  name: 'TaskDetailDialog',
  components: { ActivitiesTask, CommentsTask, AttributesCardBase },
  mixins: [mx_taskboard],
  data() {
    return {
      uiShowDialog: false,
      model: 'attributes',
      task: {}
    }
  },
  mounted() {
    let _self = this
    this.$eventHub.$on('task-detail-dialog', function(item) {
      _self.uiShowDialog = true
      _self.task = item
      console.log('KHOACAVE', item)
    })
  },
  computed: {
    taskName() {
      try {
        return this.task.text
      } catch (e) {
        return 'N/A'
      }
    }
  }
}
</script>

<style scoped>
.drawer_default >>> .v-navigation-drawer__content {
  overflow-y: auto !important;
}
</style>
