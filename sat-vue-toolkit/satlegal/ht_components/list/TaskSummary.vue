<template>
  <v-row no-gutters class="align-center">
    <div class="pr-2" v-if="deadline">
      <font-awesome-icon class="text--secondary" icon="clock" />
      <span
        style="text-transform: capitalize;"
        class="text--secondary"
      >&nbsp;{{deadline | formatDMY}}</span>
    </div>
    <div class="pr-2" v-if="hasDescription">
      <font-awesome-icon class="text--secondary" icon="align-right" />
    </div>
    <div class="pr-2" v-if="numberOfComments">
      <font-awesome-icon class="text--secondary" icon="mdi-comment" />
      <span class="text--secondary">&nbsp;{{numberOfComments}}</span>
    </div>
    <div class="pr-2" v-if="numberOfAttachments">
      <font-awesome-icon class="text--secondary" icon="paperclip" />

      <span class="text--secondary">&nbsp;{{numberOfAttachments}}</span>
    </div>
    <div v-if="isShowChecklist">
      <font-awesome-icon class="text--secondary" icon="check-square" />
      <span class="text--secondary">&nbsp;{{checklist.done}}/{{checklist.total}}</span>
    </div>
  </v-row>
</template>

<script>
export default {
  props: {
    deadline: String,
    hasDescription: Boolean,
    numberOfComments: Number,
    numberOfAttachments: Number,
    checklist: {
      total: Number,
      done: Number
    }
  },
  computed: {
    isShowChecklist() {
      return this.checklist && Object.keys(this.checklist).length;
    }
  }
};
</script>
