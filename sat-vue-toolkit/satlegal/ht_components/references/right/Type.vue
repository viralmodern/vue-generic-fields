<template>
  <div>
    <SelectInline
      :item="typeReferencesJoin"
      :items="appConfigs.typeReferences"
      keyText="name"
      keyColor="color"
      class="select"
      @select="select"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SelectInline from "../../menus/SelectInline";

export default {
  components: {
    SelectInline
  },
  props: {
    item: Number
  },
  computed: {
    typeReferencesJoin() {
      return (
        (this.appConfigs.typeReferences || []).find(
          x => x.value === this.item
        ) || {}
      );
    },
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    ...mapActions("ht_store/matter/references/detail", ["updateReferencesRequest"]),
    select({ value }) {
      if (value !== this.item) {
        const data = {
          column: "type",
          value: value
        };
        this.updateReferencesRequest(data);
      }
    },
  }
};
</script>

