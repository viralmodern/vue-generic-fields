<template>
  <div>
    <SlickTable :items="dataEvidences" :headers="headers" @onEndDragRows="onEndDragRows">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
        />
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import SlickTable from "../slick-table/SlickTable2";

import TaskViewDetail from "../cells/evedences/TaskViewDetail";
import TaskAuthoredBy from "../cells/evedences/TaskAuthoredBy";
import TaskCreatedBy from "../cells/evedences/TaskCreatedBy";
import TaskDeclarantAvailable from "../cells/evedences/TaskDeclarantAvailable";
import TaskException from "../cells/evedences/TaskException";
import TaskExceptionType from "../cells/evedences/TaskExceptionType";
import TaskFavorable from "../cells/evedences/TaskFavorable";
import TaskLinkedRecords from "../cells/evedences/TaskLinkedRecords";
import TaskName from "../cells/evedences/TaskName";
import TaskOriginalDate from "../cells/evedences/TaskOriginalDate";
import TaskProvidedBy from "../cells/evedences/TaskProvidedBy";
import TaskTags from "../cells/evedences/TaskTags";
import TaskUnderOath from "../cells/evedences/TaskUnderOath";
import TaskDisputed from "../cells/evedences/TaskDisputed";
import TaskAdmissbility from "../cells/evedences/TaskAdmissbility";
import TaskMateriality from "../cells/evedences/TaskMateriality";
import TaskRelevance from "../cells/evedences/TaskRelevance";
import TaskObjectivityRange from "../cells/evedences/TaskObjectivityRange";
import TaskMaterialLevel from "../cells/evedences/TaskMaterialLevel";
import TaskAdmissibilityLevel from "../cells/evedences/TaskAdmissibilityLevel";
import TaskAdmissibility from "../cells/evedences/TaskAdmissbility";
import TaskRelevanceLevel from "../cells/evedences/TaskRelevanceLevel";
import TaskVeracityRange from "../cells/evedences/TaskVeracityRange";
import TaskObjectivityLevel from "../cells/evedences/TaskObjectivityLevel";
import TaskVeracityLevel from "../cells/evedences/TaskVeracityLevel";
import TaskAttachment from "../cells/evedences/TaskAttachment";

export default {
  components: {
    SlickTable,
    TaskViewDetail,
    TaskAuthoredBy,
    TaskCreatedBy,
    TaskDeclarantAvailable,
    TaskException,
    TaskExceptionType,
    TaskFavorable,
    TaskLinkedRecords,
    TaskName,
    TaskOriginalDate,
    TaskProvidedBy,
    TaskTags,
    TaskUnderOath,
    TaskDisputed,
    TaskAdmissbility,
    TaskMateriality,
    TaskRelevance,
    TaskMaterialLevel,
    TaskAdmissibilityLevel,
    TaskAdmissibility,
    TaskRelevanceLevel,
    TaskVeracityRange,
    TaskObjectivityLevel,
    TaskObjectivityRange,
    TaskVeracityLevel,
    TaskAttachment
  },
  props: {
    dataEvidences: Array
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "viewDetail") {
        return TaskViewDetail;
      }
      if (columnName === "name") {
        return TaskName;
      }
      if (columnName === "createby") {
        return TaskCreatedBy;
      }
      if (columnName === "providedBy") {
        return TaskProvidedBy;
      }
      if (columnName === "authoredBy") {
        return TaskAuthoredBy;
      }
      if (columnName === "originalDate") {
        return TaskOriginalDate;
      }
      if (columnName === "favorable") {
        return TaskFavorable;
      }
      if (columnName === "disputed") {
        return TaskDisputed;
      }
      if (columnName === "underOath") {
        return TaskUnderOath;
      }
      if (columnName === "exception") {
        return TaskException;
      }
      if (columnName === "declarantAvailable") {
        return TaskDeclarantAvailable;
      }
      if (columnName === "exceptionType") {
        return TaskExceptionType;
      }
      if (columnName === "materiality") {
        return TaskMateriality;
      }
      if (columnName === "materialLevel") {
        return TaskMaterialLevel;
      }
      if (columnName === "admissibilityLevel") {
        return TaskAdmissibilityLevel;
      }
      if (columnName === "admissibility") {
        return TaskAdmissibility;
      }
      if (columnName === "relevanceLevel") {
        return TaskRelevanceLevel;
      }
      if (columnName === "veracityRange") {
        return TaskVeracityRange;
      }
      if (columnName === "objectivityLevel") {
        return TaskObjectivityLevel;
      }
      if (columnName === "objectivityRange") {
        return TaskObjectivityRange;
      }
      if (columnName === "veracityLevel") {
        return TaskVeracityLevel;
      }
      if (columnName === "relevance") {
        return TaskRelevance;
      }
      if (columnName === "admissbility") {
        return TaskAdmissbility;
      }
      if (columnName === "tags") {
        return TaskTags;
      }
      if (columnName === "linkedrecords") {
        return TaskLinkedRecords;
      }
      if (columnName === "attachment") {
        return TaskAttachment;
      }
      return "td";
    },
    onEndDragRows() {},
    ...mapMutations("ht_store/matter/hearing", ["moveRows"])
  },
  computed: {
    ...mapGetters("ht_store/slick", ["visibleColumns"]),
    headers() {
      return this.visibleColumns.map(x => ({
        text: x.title,
        value: x.name,
        name: x.name,
        sortable: false
      }));
    }
  }
};
</script>
