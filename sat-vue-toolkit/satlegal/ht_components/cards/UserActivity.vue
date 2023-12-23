<template>
  <v-card>
    <v-row no-gutters>
      <div>
        <ActivityTimelineLine :icon="action.icon" />
      </div>
      <v-col>
        <v-card-text class="pb-1">
          <v-row no-gutters class="ma-0">
            <v-col grow>
              <ActivityExecutor
                :task="task"
                :imageUrl="executor.imageUrl"
                :name="executor.name"
                :department="executor.department"
              />
            </v-col>
            <v-col shrink class="text-right">
              <ActivityExecutedDate
                class="text-xs-right"
                :date="executedDate"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-col>
          <v-card-text class="pt-0 pb-1">
            <ActivityContent
              :destinationObject="destinationObject"
              :action="action"
            />
          </v-card-text>
          <v-card-text class="pt-0" v-if="!!action.changes">
            <ActivityChanges
              v-for="(change, index) in action.changes"
              :title="change.title"
              :from="change.from"
              :to="change.to"
              :key="index"
            />
          </v-card-text>
          <v-card-text class="pt-0" v-if="!!action.message">
            <CommentMessage :message="action.message" />
          </v-card-text>
          <v-card-text class="pt-0" v-if="!!action.viewDetail">
            <router-link :to="action.viewDetail.link">{{
              action.viewDetail.text
            }}</router-link>
          </v-card-text>
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ActivityExecutor from "./ActivityExecutor";
import ActivityExecutedDate from "./ActivityExecutedDate";
import ActivityContent from "./ActivityContent";
import CommentMessage from "../messages/CommentMessage";
import ActivityTimelineLine from "../shapes/ActivityTimelineLine";
import ActivityChanges from "./ActivityChanges";
export default {
  components: {
    ActivityExecutor,
    ActivityExecutedDate,
    ActivityContent,
    CommentMessage,
    ActivityTimelineLine,
    ActivityChanges
  },
  props: {
    executor: Object,
    action: Object,
    destinationObject: Object,
    executedDate: String,
    task: String
  }
};
</script>

<style scoped></style>
