<template>
  <v-row no-gutters>
    <v-col cols="12">
      <h3>Description</h3>
      <div class="pa-2">
        <v-textarea
          hide-details
          auto-grow
          :value="items.description"
          @change="updateCitationsRequest({ description: $event })"
          class="ma-0 pa-2 custom-text-field fieldDes"
          rows="1"
        ></v-textarea>
      </div>
    </v-col>
    <v-col cols="12">
      <h3>Differences between {{ dataMatter.title }} and {{ items.name }}</h3>
      <div class="pa-2">
        <AddListItem
          :list="items.differences"
          label="Each enter is a difference"
          hint="Add new  differences"
          @add="updateCitationsRequest({ differences: $event })"
          @update="updateCitationsRequest({ differences: $event })"
          @remove="updateCitationsRequest({ differences: $event })"
        />
      </div>
    </v-col>
    <v-col cols="12">
      <h3>Similarities between {{ dataMatter.title }} and {{ items.name }}</h3>
      <div class="pa-2">
        <AddListItem
          :list="items.similarities"
          label="Each enter is a similaritie"
          hint="Add new similarities"
          @add="updateCitationsRequest({ similarities: $event })"
          @update="updateCitationsRequest({ similarities: $event })"
          @remove="updateCitationsRequest({ similarities: $event })"
        />
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AddListItem from "../inputs/AddListItem";
export default {
  props: {
    items: Object
  },
  components: {
    AddListItem
  },
  methods: {
    ...mapActions("ht_store/matter/citations/detail", ["updateCitationsRequest"]) // eslint-disable-line
  },
  computed: {
    ...mapGetters("ht_store/matter", ["dataMatter"]) // eslint-disable-line
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.fieldDes {
  background: #eceff1;
}
.theme--dark.fieldDes {
  background: #909090;
}
</style>
