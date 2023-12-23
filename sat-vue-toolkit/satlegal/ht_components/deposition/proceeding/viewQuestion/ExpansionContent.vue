<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(question, index) in dataQuestionFilter"
      :key="index"
    >
      <v-expansion-panel-header class="header-panel">
        <template v-slot:actions>
          <v-row no-gutters>
            <v-col cols="6" class="title-expan">{{ question.name }}</v-col>
            <v-col cols="6" justify="end" align="end" class="col-select-icon">
              <v-row no-gutters>
                <SelectInlineIcon
                  :item="result_progress_join(question)"
                  :items="result_progress"
                  keyText="name"
                  keyColor="color"
                  class="select"
                  @select="
                    updateQuestions({
                      question_pk: question.pk,
                      val: $event.id,
                      name: 'progress'
                    })
                  "
                  @click.native.stop
                />
                <SelectInlineIcon
                  :item="progress_proceeding_join(question)"
                  :items="progress_proceeding"
                  keyText="name"
                  keyColor="color"
                  class="select"
                  @select="
                    updateQuestions({
                      question_pk: question.pk,
                      val: $event.id,
                      name: 'result_progress'
                    })
                  "
                  @click.native.stop
                />
              </v-row>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-divider></v-divider>
      <v-expansion-panel-content class="expansion">
        <v-col cols="12" class="mt-2 ma-0 pa-0">
          <v-textarea
            name="input-7-1"
            class="ma-0 pa-2 custom-text-field"
            label="Question"
            :value="question.question"
            @change="
              updateQuestions({
                question_pk: question.pk,
                val: $event,
                name: 'question'
              })
            "
          ></v-textarea>
          <v-textarea
            name="input-7-1"
            class="ma-0 pa-2 custom-text-field"
            label="Answer"
            :value="question.answer"
            @change="
              updateQuestions({
                question_pk: question.pk,
                val: $event,
                name: 'answer'
              })
            "
          ></v-textarea>
        </v-col>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import SelectInlineIcon from "../../../menus/SelectInlineIcon";
import { result_progress, progress_proceeding } from "../../../../config";

export default {
  components: {
    SelectInlineIcon
  },
  props: {
    dataQuestions: Array,
    item: Object
  },
  data() {
    return {
      result_progress,
      progress_proceeding
    };
  },
  computed: {
    dataQuestionFilter() {
      return (this.dataQuestions || []).filter(x => x.list_pk === this.item.pk);
    }
  },
  methods: {
    result_progress_join(question) {
      return this.result_progress.find(x => x.id === question.progress);
    },
    progress_proceeding_join(question) {
      return this.progress_proceeding.find(
        x => x.id === question.result_progress
      );
    },
    updateQuestions(evt) {
      var { depositionId, projectId } = this.$route.params;
      var req = {
        [evt.name]: evt.val,
        matterId: projectId,
        depositionId,
        list_pk: this.item.pk,
        question_pk: evt.question_pk,
        proceeding_pk: this.item.pk
      };
      this.$emit("updateQuestions", req);
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  /* border-style: unset; */
}
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
.expansion /deep/ .v-expansion-panel-content__wrap {
  padding: 0px;
  margin: 0px;
}
.header-panel /deep/ .v-expansion-panel-header__icon {
  width: 100%;
  justify-content: space-between;
}
.col-select-icon {
  justify-content: end;
  align-items: end;
  display: grid;
}
</style>
