<template>
  <div>
    <v-chip class="pa-0" v-for="item in listRelatedFacts" :key="item.id" label>{{item.title}}</v-chip>
    <MenuListFacts
      @select="select"
      :list="listFacts"
      title="List facts"
      labelSearch="Search facts..."
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MenuListFacts from "@/sat-vue-toolkit/satlegal/views/CAF/Fact/components/menus/MenuListFacts";
export default {
  components: {
    MenuListFacts
  },
  props: {
    relatedFacts: Array
  },
  computed: {
    listRelatedFacts() {
      const map = [];
      (this.relatedFacts || []).forEach(id => {
        const populate = (this.dataFactsReSearch || []).find(j => j.id === id);
        if (populate) map.push(populate);
      });
      return map;
    },
    listFacts() {
      const clone = JSON.parse(JSON.stringify(this.dataFactsReSearch || []));
      const list = clone.map(x => {
        if (x.characters) {
          const map = [];
          x.characters.forEach(idCharacter => {
            const populateCharacter = (this.character || []).find(
              j => j.id === idCharacter
            );
            if (populateCharacter) map.push(populateCharacter);
          });
          x.characters = map;
        }
        if ((this.relatedFacts || []).includes(x.id)) {
          x.check = true;
        } else {
          x.check = false;
        }
        return x;
      });
      return list;
    },
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/project/research/facts", ["dataFactsReSearch"])
  },
  methods: {
    select({ check, id: idSelect }) {
      let data;
      if (check) {
        data = {
          relatedFacts: this.relatedFacts.filter(id => id !== idSelect)
        };
      } else {
        data = {
          relatedFacts: [...this.relatedFacts, idSelect]
        };
      }
      this.updateEvidencesRequest(data);
    },
    ...mapActions("ht_store/matter/discovery/evidences/detail", [
      "updateEvidencesRequest"
    ])
  }
};
</script>
