<template>
  <v-card>
    <FormMatterHearing :disableAction="true" @onChangeValue="onChangeValue" :item="item"/>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
import FormMatterHearing from "../../forms/FormMatterHearing";
export default {
  props: {
    item: Object
  },
  components: {
    FormMatterHearing
  },
  methods: {
    ...mapActions("ht_store/matter/hearing", ["updateMatterHearingRequest"]),
    onChangeValue(data) {
      const validate = Object.keys(data).filter(x => {
        if (x === "description") {
          return false;
        }
        return !data[x];
      }).length;
      if (!validate) {
        this.updateMatterHearingRequest({ id: this.item.id, ...data });
      }
    }
  }
};
</script>
