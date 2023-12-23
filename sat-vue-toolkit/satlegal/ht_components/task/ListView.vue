<template>
  <v-col cols="12">
    <v-progress-linear height="2" :indeterminate="true" v-if="loading"></v-progress-linear>
    <div v-else>
      <div v-if="!dataList.length">No task</div>
      <v-col cols="12" v-for="item in dataList" :key="item.pk">
        <v-row no-gutters class="align-center py-3">
          <v-col cols="12" sm="10">
            <v-row no-gutters class="align-center">
              <v-checkbox class="custom-checkbox" v-model="selected" :value="item.pk"></v-checkbox>
              <v-row no-gutters class="align-center">
                <strong v-if="item.due_date">
                  {{
                  item.due_date | formatMMMDD
                  }}
                </strong>
                <span>&nbsp;&nbsp;{{ item.name }}</span>
                <div v-if="item.labels">
                  <v-chip
                    v-for="label in item.labels"
                    :key="label.id"
                    :color="label.color"
                    text-color="white"
                    small
                  >{{ label.text }}</v-chip>
                </div>
              </v-row>
            </v-row>
          </v-col>
          <v-col cols="12" sm="2" class="success--text">
            <v-row no-gutters class="align-center justify-end">
              <span>{{ item.stage.name }}</span>
              <v-icon>mdi-more_vert</v-icon>
            </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-col>
    </div>
  </v-col>
</template>

<script>
export default {
  props: {
    dataList: Array,
    loading: Boolean
  },
  data() {
    return {
      selected: []
    };
  }
};
</script>

<style scoped>
.v-input {
  flex: unset;
}
.custom-checkbox {
  margin-top: 0px;
  padding-top: 0px;
}
.custom-checkbox /deep/ .v-messages {
  display: none;
}
.custom-checkbox /deep/ .v-input__slot {
  margin-bottom: 0px;
}
</style>
