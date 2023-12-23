<template>
  <div>
    <SlickTable
      :items="items"
      :headers="headers"
      groupRows="characterRow"
      groupColumns="characterColumn"
      @onEndDragRows="onEndDragRows"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @onChange="$emit('onChange', {id:props.dataRow.id,[props.column.name]:$event})"
        />
      </template>
      <template v-slot:top></template>
    </SlickTable>
  </div>
</template>

<script>
import SlickTable from "../slick-table/SlickTable2";
import TdCharacter from "../research/facts/cells/TdCharacter";
import TdPersonalKnowledge from "../research/facts/cells/TdPersonalKnowledge";
import TdMentalStage from "../research/facts/cells/TdMentalStage";
import TdCredibility from "../research/facts/cells/TdCredibility";

export default {
  components: {
    SlickTable,
    TdCharacter,
    TdPersonalKnowledge,
    TdMentalStage,
    TdCredibility
  },
  props: {
    items: Array
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Character",
          value: "character",
          name: "character"
        },
        {
          visible: true,
          sortable: false,
          text: "PersonalKnowledge",
          value: "personalKnowledge",
          name: "personalKnowledge"
        },
        {
          visible: true,
          sortable: false,
          text: "Credibility",
          value: "credibility",
          name: "credibility"
        },
        {
          visible: true,
          sortable: false,
          text: "MentalStage",
          value: "mentalstage",
          name: "mentalstage"
        }
      ]
    };
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "character") {
        return TdCharacter;
      }
      if (columnName === "personalKnowledge") {
        return TdPersonalKnowledge;
      }
      if (columnName === "credibility") {
        return TdCredibility;
      }
      if (columnName === "mentalstage") {
        return TdMentalStage;
      }
      return "td";
    },
    onEndDragRows() {}
  }
};
</script>
