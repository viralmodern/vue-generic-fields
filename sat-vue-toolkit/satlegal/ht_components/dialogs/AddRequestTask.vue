<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" scrollable @input="cancel" width="500" persistent>
      <v-card>
        <div class="primary">
         <v-row no-gutters class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">
              Add New Request Task
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="cancel">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-card-text id="content">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row no-gutters>
              <v-text-field
                class="py-1"
                v-model="name"
                :rules="[v => !!v || 'This field is required']"
                label="Name request task"
                required
                append-icon="person_outline"
              ></v-text-field>
            </v-row>

            <v-row no-gutters>
              <v-select
                :items="appConfigs.litigationCode"
                v-model="litigation"
                label="Litigation"
                item-text="name"
                item-value="code"
                :rules="[v => !!v || 'This field is required']"
                :disabled="stageAdd.keyName === 'litigation' ? true : false"
              ></v-select>
            </v-row>

            <v-row no-gutters>
              <v-select
                :items="appConfigs.activitiesCode"
                v-model="activities"
                label="Activities"
                item-text="name"
                item-value="code"
                :rules="[v => !!v || 'This field is required']"
                :disabled="stageAdd.keyName === 'activities' ? true : false"
              ></v-select>
            </v-row>

            <v-row no-gutters>
              <SelectChip
                :items="appConfigs.itemStatus"
                label="Status"
                item-text="name"
                item-value="id"
                item-color="color"
                v-model="status"
                @change="status = $event"
                :disabled="stageAdd.keyName === 'status' ? true : false"
                :rules="[v => !!v || 'This field is required']"
              />
            </v-row>

            <v-row no-gutters>
              <v-select
                :items="dataRequestItem[1] && dataRequestItem[1].list"
                v-model="request_item"
                label="Request item"
                item-text="name"
                item-value="id"
                :rules="[v => !!v || 'This field is required']"
                return-object
              ></v-select>
            </v-row>

            <v-col>
              <DateMonthPicker
                label="Deadline"
                :min="new Date().toISOString()"
                :value="deadline"
                @change="deadline = $event"
                append-icon="date_range"
              />
            </v-col>
            <v-row no-gutters>
              <v-textarea
                v-model="desc"
                name="input-7-1"
                label="Description"
              ></v-textarea>
            </v-row>
          </v-form>
        </v-card-text>
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
import SelectChip from "../inputs/SelectChip";
import { mapGetters, mapActions } from "vuex";
import DateMonthPicker from "../menus/DateMonthPicker";
export default {
  props: {
    isShow: Boolean,
    isShowFieldRequestSet: Boolean,
    stageAdd: Object
  },
  data() {
    return {
      valid: true,
      name: "",
      desc: "",
      litigation: null,
      activities: null,
      status: null,
      request_item: null,
      deadline: "",
      menu: false,
      request_set: null
    };
  },
  components: {
    SelectChip,
    DateMonthPicker
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/status/requestSets", [
      "getDataCAFDiscovery"
    ]),
    cancel() {
      this.$refs.form.reset();
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          desc: this.desc,
          litigation: this.litigation,
          activities: this.activities,
          status: this.status,
          request: this.request_item.pk,
          deadline: this.deadline,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          request_set: this.request_item.request_set
        };
        this.$emit("add", data);
        this.cancel();
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestSets/requestItem", [
      "dataRequestItem"
    ]),
    ...mapGetters("ht_store/user", ["currentUser"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  watch: {
    stageAdd(val) {
      this.litigation = val.keyName === "litigation" ? val.code : {};
      this.activities = val.keyName === "activities" ? val.code : {};
      this.status = val.keyName === "status" ? val.id : null;
    }
  }
};
</script>
