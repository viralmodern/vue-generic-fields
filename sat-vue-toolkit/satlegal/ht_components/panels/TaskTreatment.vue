<template>
  <v-row no-gutters>
    <v-col md4 cols="12">
      <v-autocomplete
        v-if="taskDetail.selects"
        :value="taskDetail.selects.treatment"
        item-text="name"
        item-value="id"
        :items="dataSelect.treatment"
        label="Treatment"
        return-object
        @input="changeTreatment"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  methods: {
    changeTreatment(val) {
      this.changeTreatment(val);
    },
    ...mapActions("ht_store/task/detail/description", ["getDataTaskDetailRequest"]),
    ...mapActions("ht_store/task/detail", ["getDataSelectRequest"]),
    ...mapMutations("ht_store/task/detail/description", ["changeTreatment"])
  },
  computed: {
    ...mapGetters("ht_store/task/detail/description", ["taskDetail"]),
    ...mapGetters("ht_store/task/detail", ["dataSelect"])
  },
  mounted() {
    this.getDataSelectRequest();
    this.getDataTaskDetailRequest();
  }
};
</script>

