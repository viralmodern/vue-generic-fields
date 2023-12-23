<template>
  <v-row no-gutters>
    <v-row no-gutters>
      <v-chip
        style="height: 20px;"
        v-for="(chip, index) in arrChip"
        :key="index"
        :color="`#` + chip.color"
        text-color="white"
        >{{ chip.name }}</v-chip
      >
    </v-row>

    <v-col cols="12">
      <v-row no-gutters class="mt-2" align-center>
        <v-btn
          icon
          @click="$emit('updateCheckList', { name: 'done', $event: !done })"
        >
          <v-icon :color="done ? 'success' : ''" size="30"
            >check_circle_outline</v-icon
          >
        </v-btn>
        <v-textarea
          hide-details
          auto-grow
          :value="title"
          class="ma-0 pa-0 ml-3 mr-2 custom-text-field"
          rows="1"
          style="font-size: 19px"
          append-icon="edit"
          @change="$emit('updateCheckList', { name: 'title', $event })"
        ></v-textarea>
      </v-row>
    </v-col>

    <v-col cols="12" class="pa-2">
      <v-textarea
        hide-details
        auto-grow
        :value="desc"
        placeholder="description..."
        class="ma-0 pa-0 custom-text-field"
        rows="3"
        style="font-size: 13px"
        append-icon="edit"
        @change="$emit('updateCheckList', { name: 'desc', $event })"
      ></v-textarea>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    done: Boolean,
    arrChip: Array,
    title: String,
    desc: String
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
