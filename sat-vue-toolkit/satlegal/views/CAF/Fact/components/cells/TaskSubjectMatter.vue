<template>
  <td>
    <v-row no-gutters>
      <ChooseSubject
        @searchText="searchText"
        :items="filterListItems"
        :itemlists="subject"
        :value="dataRow"
        title="Subjects"
        labelSearch="Search subject"
        @chooseValue="chooseValue"
      >
        <template slot="showMessageSearch">
          <span class="mt-5 text-body-1">
            There is no location is matched with your search pattern.
            Consider to add new location using bellow button.
          </span>
        </template>
      </ChooseSubject>
    </v-row>
  </td>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ChooseSubject from "../../../menus/ChooseSubject";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      searchQuery: ""
    };
  },
  components: {
    ChooseSubject
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", ["updateTask"]),
    searchText(text) {
      this.searchQuery = text;
    },
    chooseValue(val) {
      const isSome = this.dataRow.subjectMatter.some(x => x === val.id);
      const subjects = !isSome
        ? [...this.dataRow.subjectMatter, val.id]
        : this.dataRow.subjectMatter.filter(x => x !== val.id);
      const data = {
        taskId: this.dataRow.id,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        body: {
          subjects
        }
      };
      this.updateTask(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/tags", ["subject"]),
    filterListItems() {
      if (this.searchQuery) {
        return this.subject.filter(x => {
          return x.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      } else {
        return this.subject;
      }
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.input-size {
  width: 130px;
  font-size: 13px;
}
</style>
