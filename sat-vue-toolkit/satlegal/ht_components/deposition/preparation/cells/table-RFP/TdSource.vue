<template>
  <td>
    <MenuListSource
      :tag="dataRow[column.name]"
      :tags="dataSource"
      keyText="name"
      title="List source"
      nameAdd="Add new source"
      @add="addSource"
      @update="updateSource"
      @remove="removeSource"
      @chose="$emit('update', $event)"
      @onOpenMenu="callSourceRequest"
    />
  </td>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MenuListSource from "../../../../menus/MenuListSource";
export default {
  components: {
    MenuListSource
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/source", ["dataSource"]),
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [
      "dataDepositionDetail"
    ])
  },
  methods: {
    addSource({ name }) {
      const data = {
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk
        },
        body: {
          source: name
        }
      };
      this.addSourceRequest(data);
    },
    updateSource({ id: sourceId, name }) {
      const data = {
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
          sourceId
        },
        body: {
          source: name
        }
      };
      this.updateSourceRequest(data);
    },
    removeSource(sourceId) {
      const data = {
        matterId: this.dataDepositionDetail.matter,
        depositionId: this.dataDepositionDetail.pk,
        sourceId
      };
      this.removeSourceRequest(data);
    },
    ...mapActions("ht_store/matter/discovery/deposition/source", [
      "addSourceRequest",
      "updateSourceRequest",
      "removeSourceRequest"
    ]),
    callSourceRequest() {
      //here
    }
  }
};
</script>
