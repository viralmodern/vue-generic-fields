<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="1300">
      <v-card class="px-2">
        <v-card-title class="text-h5">{{ title }}</v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row class="px-3 py-2" no-gutters>
            <v-col cols="12">
              <v-row no-gutters class="justify-space-between">
                <div class="pr-2">
                  <v-select
                    :items="dataUser"
                    v-model="user"
                    :rules="[v => !!v || 'required']"
                    prepend-icon="perm_identity"
                    item-text="fullName"
                    item-value="id"
                    label="Users"
                  ></v-select>
                </div>
                <div class="pl-2">
                  <v-row no-gutters class="align-center">
                    <v-btn
                      icon
                      class="primary"
                      @click="getFirstAndLastDay('prev')"
                    >
                      <v-icon>chevron_left</v-icon>
                    </v-btn>
                    <v-text-field
                      readonly
                      label="Week"
                      v-model="firstAndLastDayWeek"
                      append-icon="date_range"
                      class="week"
                    ></v-text-field>
                    <v-btn
                      icon
                      class="primary"
                      @click="getFirstAndLastDay('next')"
                    >
                      <v-icon>chevron_right</v-icon>
                    </v-btn>
                  </v-row>
                </div>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="dataForm[firstAndLastDayWeek]"
                class="elevation-1"
                hide-actions
              >
                <template slot="headerCell" slot-scope="props">
                  <span>{{ props.header.text }}</span>
                  <br v-if="props.header.weekDayIndex" />
                  <span v-if="props.header.weekDayIndex">{{
                    listDateOfWeek[props.header.weekDayIndex - 1] | formatMMMDD
                  }}</span>
                </template>
                <template slot="items" slot-scope="props">
                  <td style="padding:0px 10px">
                    <v-select
                      class="custom-text-field"
                      :items="dataAssignedTome.list"
                      v-model="props.item.project"
                      :rules="[v => !!v || 'required']"
                      @change="changTaskByNameProject"
                      item-text="project.name"
                      item-value="id"
                      label="Project"
                    ></v-select>
                  </td>
                  <td style="padding:0px 10px">
                    <v-select
                      class="custom-text-field"
                      :items="status"
                      v-model="props.item.status"
                      :rules="[v => !!v || 'required']"
                      item-text="status"
                      item-value="id"
                      label="Status"
                    ></v-select>
                  </td>
                  <td style="padding:0px 10px">
                    <v-select
                      class="custom-text-field"
                      :items="dataTaskProject"
                      v-model="props.item.task"
                      :rules="[v => !!v || 'required']"
                      item-text="name"
                      item-value="id"
                      label="Task"
                    ></v-select>
                  </td>
                  <td>
                    <v-text-field
                      class="custom-text-field"
                      placeholder="00:00"
                      v-model="props.item.monday"
                      mask="##:##"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      class="custom-text-field"
                      placeholder="00:00"
                      v-model="props.item.tuesday"
                      mask="##:##"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      class="custom-text-field"
                      placeholder="00:00"
                      v-model="props.item.wednesday"
                      mask="##:##"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      class="custom-text-field"
                      placeholder="00:00"
                      v-model="props.item.thursday"
                      mask="##:##"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      class="custom-text-field"
                      placeholder="00:00"
                      v-model="props.item.friday"
                      mask="##:##"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      class="custom-text-field"
                      placeholder="00:00"
                      v-model="props.item.saturday"
                      mask="##:##"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      class="custom-text-field"
                      placeholder="00:00"
                      v-model="props.item.sunday"
                      mask="##:##"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-icon small @click="removeRows(props.item)"
                      >delete</v-icon
                    >
                  </td>
                </template>
                <template slot="footer">
                  <td :colspan="headers.length">
                    <v-btn color="primary" @click="addRows">
                      <v-icon>mdi-plus</v-icon>Add row
                    </v-btn>
                  </td>
                </template>
                <template slot="no-data"
                  >Click Add Row button to start adding time entry</template
                >
              </v-data-table>
            </v-col>
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  props: {
    isShow: Boolean,
    title: String
  },
  data() {
    return {
      valid: true,
      user: "",
      status: [{ status: "Active" }, { status: "InActive" }],
      firstAndLastDayWeek: "",
      listDateOfWeek: [],
      dataForm: {},
      headers: [
        {
          text: "Project",
          sortable: false
        },
        { text: "Status", sortable: false },
        { text: "Task", sortable: false },
        { text: "Monday", sortable: false, weekDayIndex: 1 },
        { text: "Tuesday", sortable: false, weekDayIndex: 2 },
        { text: "Wednesday", sortable: false, weekDayIndex: 3 },
        { text: "Thurday", sortable: false, weekDayIndex: 4 },
        { text: "Friday", sortable: false, weekDayIndex: 5 },
        { text: "Saturday", sortable: false, weekDayIndex: 6 },
        { text: "Sunday", sortable: false, weekDayIndex: 7 },
        { text: "Action", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters("ht_store/user", ["dataUser"]),
    ...mapGetters("ht_store/project", ["dataAssignedTome"]),
    ...mapGetters("ht_store/task", ["dataTaskProject"])
  },
  methods: {
    clear() {
      this.user = "";
      this.firstAndLastDayWeek = "";
      this.listDateOfWeek = [];
      this.dataForm = {};
    },
    cancel() {
      this.$emit("closeModal");
      this.clear();
      this.$refs.form.resetValidation();
    },
    addRows() {
      const data = {
        week: "",
        project: "",
        status: "",
        task: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
      };
      this.dataForm[this.firstAndLastDayWeek] = [
        ...this.dataForm[this.firstAndLastDayWeek],
        data
      ];
    },
    removeRows(item) {
      const index = this.dataForm[this.firstAndLastDayWeek].indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.dataForm[this.firstAndLastDayWeek].splice(index, 1);
    },
    async add() {
      if (this.$refs.form.validate()) {
        this.addWeekInObject();
        let result = [];
        Object.keys(this.dataForm).map(
          e =>
            (result = [
              ...result,
              ...this.dataForm[e].map(e => ({ ...e, userId: this.user }))
            ])
        );
        this.$emit("submit");
      }
    },
    addWeekInObject() {
      this.dataForm[this.firstAndLastDayWeek] = this.dataForm[
        this.firstAndLastDayWeek
      ].map(e => ({
        ...e,
        week: this.firstAndLastDayWeek
      }));
    },
    getFirstAndLastDay(status) {
      if (this.$refs.form.validate()) {
        this.addWeekInObject();
        if (status === "next") {
          const date = this.listDateOfWeek[6].add(1, "d");
          this.getDayOfWeek(date);
        }
        if (status === "prev") {
          const date = this.listDateOfWeek[0].startOf("week").isoWeekday(1);
          this.getDayOfWeek(date);
        }
        this.$refs.form.resetValidation();
      }
    },
    getDayOfWeek(date) {
      let dayOfWeek = [date.toDate()];
      while (dayOfWeek.length < 7) dayOfWeek.push(date.add(1, "d").toDate());
      this.listDateOfWeek = dayOfWeek.map(d => moment(d));
      this.firstAndLastDayWeek = this.formatFirstAndLastDayOfWeek(
        dayOfWeek[0],
        dayOfWeek[6]
      );
      if (!this.dataForm[this.firstAndLastDayWeek]) {
        this.dataForm = {
          ...this.dataForm,
          [this.firstAndLastDayWeek]: []
        };
      }
    },
    formatFirstAndLastDayOfWeek(first, last) {
      return `${moment(first).format("MM/DD/YYYY")} - ${moment(last).format(
        "MM/DD/YYYY"
      )}`;
    },
    changTaskByNameProject(id) {
      this.getTasksByProjectId(id);
    },
    ...mapActions("ht_store/user", ["getListUserRequest"]),
    ...mapActions("ht_store/project", ["getDataAssignedTome"]),
    ...mapActions("ht_store/task", ["getTasksByProjectId"])
  },
  mounted() {
    this.getListUserRequest();
  },
  watch: {
    isShow(val) {
      if (val) {
        this.getDayOfWeek(moment(new Date()).isoWeekday(1));
      }
    }
  }
};
</script>

<style scoped>
.week {
  flex: unset;
}
.custom-text-field /deep/ label {
  font-size: 13px !important;
}
.custom-text-field /deep/ input {
  font-size: 13px !important;
}
.custom-text-field /deep/ .v-select__selections {
  font-size: 13px !important;
}
</style>
