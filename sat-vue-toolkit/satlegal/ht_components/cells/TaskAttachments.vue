<template>
  <td>
    <a href="#" @click="showDialog=true">{{dataRow.attachment.length}} attachments(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <ProjectAttachment
            :dataAttachment="dataRow.attachment"
            @addFilesAttachment="addFiles"
            @removeAttachment="remove"
            @updateRateAttachment="updateRate"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import { mapActions } from "vuex";
import ProjectAttachment from "../cards/ProjectAttachment";

export default {
  components: {
    ProjectAttachment
  },
  data() {
    return {
      showDialog: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    addFiles(files) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "addFiles",
          files: files.map(x => ({
            id: Math.random(),
            coverPhoto: {
              imageUrl: x.dataURL
            },
            rate: false,
            name: x.name,
            createAt: new Date().toISOString()
          }))
        }
      };
      this.updateTask(data);
    },
    remove(id) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "removeFile",
          id
        }
      };
      this.updateTask(data);
    },
    updateRate(id) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "updateRate",
          id
        }
      };
      this.updateTask(data);
    },
    ...mapActions("ht_store/task/list", ["updateTask"])
  }
};
</script>
