<template>
  <div>
    <div></div>
    <SlickTable
      :items="item.analysis ? item.analysis.highlight : []"
      :headers="headers.filter(x=> x.visible)"
      @onEndDragRows="onEndDragRows"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :itemAnalysis="item"
          :index="parseInt(props.index)+1"
          @deleteAnalysis="deleteAnalysis"
        />
      </template>
      <template v-slot:top>
        <AddNewHightlight @addTaskHightLight="addTaskHightLight"/>
      </template>
    </SlickTable>
    <div class="py-2">
      <div class="subheading font-weight-bold">Assessment</div>
      <NotebookEditor
        placeholder="Type your note here..."
        :item="item.analysis ? item.analysis.assessment : '' "
        @change="changeText"
      />
    </div>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteConfirm"
      @cancel="isShowPopup= false"
      messageConfirm="Are you sure you want to delete this highlight?"
    />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import AnalysisId from "./AnalysisId";
import AnalysisFavorable from "./AnalysisFavorable";
import AnalysisObjection from "./AnalysisObjection";
import AnalysisTime from "./AnalysisTime";
import AnalysisTranscript from "./AnalysisTranscript";
import NotebookEditor from "../../editor/NotebookEditor"
import AnalysisAction from "./AnalysisAction";
import AddNewHightlight from "../../menus/AddNewHightlight";
import ConfirmItem from "../../dialogs/ConfirmItem";

export default {
  props: {
    item: Object
  },
  components: {
    SlickTable,
    AnalysisFavorable,
    AnalysisObjection,
    AnalysisTime,
    AnalysisTranscript,
    NotebookEditor,
    AddNewHightlight,
    AnalysisAction,
    ConfirmItem
  },
  data() {
    return {
      isShowPopup: false,
      hightlight: {},
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Id",
          value: "id",
          name: "id"
        },
        {
          visible: true,
          sortable: false,
          text: "Time",
          value: "time",
          name: "time"
        },
        {
          visible: true,
          sortable: false,
          text: "Transcript",
          value: "transcript",
          name: "transcript"
        },
        {
          visible: true,
          sortable: false,
          text: "Favorable",
          value: "favorable",
          name: "favorable"
        },
        {
          visible: true,
          sortable: false,
          text: "Objection",
          value: "objection",
          name: "objection"
        },
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action"
        }
      ]
    };
  },
  methods: {
    addTaskHightLight(val) {
      const data = {
        oldItem: this.item,
        newItem: {
          id: Math.random(),
          time: val.timeNow,
          transcript: val.transcript,
          favorable: val.favorable,
          objection: val.objection
        }
      };
      this.addTaskMatterHearing(data);
    },
    getDisplayComponent(columnName) {
      if (columnName === "id") {
        return AnalysisId;
      }
      if (columnName === "time") {
        return AnalysisTime;
      }
      if (columnName === "transcript") {
        return AnalysisTranscript;
      }
      if (columnName === "favorable") {
        return AnalysisFavorable;
      }
      if (columnName === "objection") {
        return AnalysisObjection;
      }
      if (columnName === "action") {
        return AnalysisAction;
      }
      return "td";
    },
    onEndDragColumns(data) {
      this.headers = data;
    },
    onEndDragRows(data) {
      this.moveRows({ id: this.item.id, moveResult: data });
    },
    changeText(text){
      const data = {id: this.item.id, text};
      this.updateTextAssessmentRequest(data)
    },
    ...mapMutations("ht_store/matter/hearing", ["moveRows", "addTaskMatterHearing"]),
    ...mapActions("ht_store/matter/hearing/analysis", ["updateTextAssessmentRequest"]),
    deleteAnalysis(id) {
      const data = {
        parent: this.item.id,
        childrent: id
      };
      this.hightlight = data;
      this.isShowPopup = true;
    },
    deleteConfirm() {
      this.deleteTaskMatterHearing(this.hightlight);
      this.isShowPopup = false;
    },
    ...mapMutations("ht_store/matter/hearing", [
      "moveRows",
      "addTaskMatterHearing",
      "deleteTaskMatterHearing"
    ])
  }
};
</script>
