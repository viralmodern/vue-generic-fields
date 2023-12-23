<template>
  <div class="text-xs-center">
    <v-dialog persistent @input="closeModal" :value="isShowCreate" width="750">
      <v-card>
        <div class="primary">
          <v-row no-gutters class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">
              Create New Meeting
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="closeModal">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form">
            <v-row no-gutters>
              <v-col cols="6" class="px-1">
                <v-text-field
                  label="Meeting Name"
                  :rules="[v => !!v || 'Meeting name is required']"
                  v-model="meetingName"
                  append-icon="person_outline"
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="px-1">
                <v-combobox
                  v-model="matter"
                  :items="listMatter"
                  item-text="title"
                  item-value="id"
                  label="Select a matter"
                  return-object
                  :rules="[v => !!v || 'This is required']"
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="6" class="px-1">
                <DateMonthPicker
                  :rules="[v => !!v || 'This field is required']"
                  label="Date"
                  :min="new Date().toISOString()"
                  :value="date"
                  @change="date = $event"
                  append-icon="date_range"
                />
              </v-col>
              <v-col cols="6" class="px-1">
                <v-text-field
                  label="Location"
                  v-model="location"
                  append-icon="location_on"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="6" class="px-1">
                <TimePicker
                  :rules="[v => !!v || 'This field is required']"
                  :value="timeStart"
                  label="Time start"
                  @change="timeStart = $event"
                  append-icon="access_time"
                />
              </v-col>
              <v-col cols="6" class="px-1">
                <TimePicker
                  :rules="[v => !!v || 'This field is required']"
                  :value="timeEnd"
                  label="Time end"
                  @change="timeEnd = $event"
                  append-icon="access_time"
                />
              </v-col>
            </v-row>
            <div class="px-1">
              <v-textarea
                v-model="description"
                label="Description Meeting..."
                rows="3"
              ></v-textarea>
            </div>
          </v-form>
          <v-row no-gutters class="px-1">
            <v-col cols="12">
              <span class="title">Invite members</span>
            </v-col>
            <ProcessTheMemberMenu
              :listMembers="dataMembers"
              :detailMembers="memberJoin"
              title="Members"
              labelSearch="Search member..."
              messageFilter="person"
              @selectMember="removeMember"
              @addMembers="addMember"
            />
          </v-row>
          <div>
            <ColorPicker
              :isShowDialogColor="true"
              :color="defaultColor"
              @emitColorValue="colorLable = $event"
            />
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeModal">Close</v-btn>
          <v-btn class="v-btn theme--light primary" @click="createNewMeeting"
            >Create</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import moment from "moment";
import ProcessTheMemberMenu from "../menus/ProcessTheMemberMenu";
import ColorPicker from "../inputs/ColorPicker";
import TimePicker from "../menus/TimePicker";
import DateMonthPicker from "../menus/DateMonthPicker";
export default {
  components: {
    ProcessTheMemberMenu,
    ColorPicker,
    TimePicker,
    DateMonthPicker
  },
  props: {
    isShowCreate: Boolean,
    listMatter: Array,
    dataMembers: Array
  },
  data() {
    return {
      members: [],
      meetingName: "",
      location: "",
      description: "",
      date: moment().format("YYYY-MM-DD"),
      menuDatePicker: false,
      timeStart: "",
      timeEnd: "",
      matter: "",
      defaultColor: "#FF0000",
      colorLable: ""
    };
  },
  methods: {
    addMember(data) {
      this.members.push(data.id);
    },
    removeMember(data) {
      this.members = this.members.filter(id => id !== data.id);
    },
    saveTime(time) {
      this.$refs.menuTimePicker.save(time);
    },
    createNewMeeting() {
      if (this.$refs.form.validate()) {
        const data = {
          members: this.members,
          meetingName: this.meetingName,
          location: this.location,
          description: this.description,
          date: this.date,
          timeStart: this.timeStart,
          timeEnd: this.timeEnd,
          matter: this.matter.id,
          colorLable: this.colorLable.colorValue
        };
        this.$emit("createNewMeeting", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    closeModal() {
      this.$emit("closeModal");
    },
    clear() {
      this.members = [];
      this.meetingName = "";
      this.location = "";
      this.description = "";
      this.date = moment().format("YYYY-MM-DD");
      this.timeStart = "";
      this.timeEnd = "";
      this.matter = "";
      this.colorLable = "";
    }
  },
  computed: {
    formatDate() {
      return moment(this.date).format("MM/DD/YYYY");
    },
    memberJoin() {
      return this.dataMembers.filter(x => this.members.includes(x.id));
    }
  }
};
</script>
