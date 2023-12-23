<template>
  <v-dialog persistent v-model="dialog" width="700">
    <template v-slot:activator="{ on }">
      <v-btn outlined color="primary" v-on="on">
        <v-icon class="mr-2">mdi-add_circle_outline</v-icon>Add New Fact
      </v-btn>
    </template>
    <v-card>
      <div class="primary">
        <v-row no-gutters class="justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">Add new fact</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="dialog = false">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-row no-gutters>
            <v-col cols="6" class="pa-2">
              <v-col cols="12" no-gutters>
                <v-col cols="12">
                  <v-text-field
                    v-model="name"
                    label="Name"
                    :rules="[v => !!v || 'This field is required']"
                  ></v-text-field>
                </v-col>
                <div>
                  <v-row no-gutters class="justify-center align-center">
                    <v-col cols="12">
                      <v-menu
                        v-model="menu"
                        transition="scale-transition"
                        offset-y
                        :close-on-content-click="false"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-on="on"
                            v-model="date"
                            label="Date"
                            persistent-hint
                            readonly
                            append-icon="date_range"
                          ></v-text-field>
                        </template>
                        <v-date-picker @change="changeDate" no-title v-model="date" width="290"></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12">
                      <span class="ml-3 mr-3">Disputed:</span>
                      <v-switch
                        class="switch"
                        v-model="disputed"
                        color="primary"
                        @change="changeDisputed"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </div>

                <div>
                  <v-select
                    :items="character"
                    item-text="email"
                    item-value="id"
                    return-object
                    placeholder="Character"
                    multiple
                    @change="changeCharacters"
                  >
                    <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index === 0" class="chip--select-multi" small>
                        <v-avatar>
                          <UserAvatar
                            :name="item.avatar.name"
                            :imageUrl="(item.avatar || {}).imageUrl"
                            :avatarSize="30"
                          />
                        </v-avatar>
                        <span>{{ item.avatar.nickName }}</span>
                      </v-chip>
                      <span
                        v-if="index === 1"
                        class="grey--text caption"
                      >(+{{ filters.value.length - 1 }} others)</span>
                    </template>
                    <template slot="item" slot-scope="{ item }">
                      <UserAvatar
                        :name="item.avatar.name"
                        :imageUrl="(item.avatar || {}).imageUrl"
                        :avatarSize="35"
                      />&nbsp;
                      <span>{{ item.avatar.name }}</span>
                    </template>
                  </v-select>
                </div>

                <div>
                  <v-text-field
                    v-model="important"
                    :rules="[
                      v => v <= 100 || 'Value less than or equal to 100'
                    ]"
                    label="Important"
                    @change="changeImportant"
                    mask="###"
                    append-icon="announcement"
                  ></v-text-field>
                </div>

                <div>
                  <span>Issue</span>
                  <ProjectLabels
                    :labels="valueIssue"
                    :listLabels="issue"
                    @addLabel="createdLabelIssue"
                    @updateLabel="
                      updateTagsRequest({
                        ...$event,
                        matterId:$route.params.matter || $route.params.projectId,
                        type: 'issue'
                      })
                    "
                    @removeLabel="
                      removeTagsRequest({
                        id: $event,
                        matterId:$route.params.matter || $route.params.projectId,
                        type: 'issue'
                      })
                    "
                    @choseLabel="choseLabel"
                    title="Create Issue"
                    keyColor="color"
                    keyText="name"
                    nameAdd="Creat new issue"
                  />
                </div>
              </v-col>
            </v-col>
            <v-col cols="6" class="pa-2">
              <v-col cols="12">
                <div>
                  <v-menu
                    ref="menuTimePicker"
                    v-model="menuTimePicker"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="time"
                        label="Time"
                        readonly
                        append-icon="access_time"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menuTimePicker"
                      v-model="time"
                      @click:minute="saveTime(time)"
                    ></v-time-picker>
                  </v-menu>
                </div>

                <div>
                  <v-select
                    :items="typeFacts"
                    :rules="[v => !!v || 'This field is required']"
                    label="Type"
                    item-text="name"
                    item-value="id"
                    return-object
                    @change="changeTypeFacts"
                  ></v-select>
                </div>

                <div>
                  <v-select
                    :items="favorables"
                    :rules="[v => !!v || 'This field is required']"
                    label="Favorables"
                    item-text="name"
                    item-value="id"
                    return-object
                    @change="changeFavorables"
                  ></v-select>
                </div>

                <div>
                  <v-text-field
                    v-model="relevant"
                    :rules="[
                      v => v <= 100 || 'Value less than or equal to 100'
                    ]"
                    label="Relevant"
                    @change="changeRelevant"
                    mask="###"
                    append-icon="link"
                  ></v-text-field>
                </div>

                <div>Link Component</div>
              </v-col>
            </v-col>
          </v-row>

          <v-row >
            <v-col>
              <v-textarea
                @change="changeCauseOfActions"
                solo
                v-model="causeOfActions"
                label="Cause Of Actions..."
                rows="3"
              ></v-textarea>
            </v-col>
            <v-col>
              <v-textarea
                @change="changeReliefSought"
                solo
                v-model="reliefSought"
                label="Relief Sought..."
                rows="3"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false">Cancel</v-btn>
        <v-btn class="v-btn theme--light primary" @click="postCreateFactsItem">Create fact</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { typeFacts, favorables } from "../../config";
import UserAvatar from "../avatars/UserAvatar";
import ProjectLabels from "../cards/ProjectLabels";
export default {
  components: {
    UserAvatar,
    ProjectLabels
  },
  data() {
    return {
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menuTimePicker: false,
      time: new Date().toLocaleTimeString(),
      typeFacts,
      favorables,
      disputed: false,
      name: "",
      important: 0,
      relevant: 0,
      causeOfActions: "",
      reliefSought: "",
      valueIssue: [],
      resultTime: "",
      characters: null,
      typeFactsValue: null,
      valueFavorables: null,
      filters: {
        value: []
      }
    };
  },
  methods: {
    ...mapActions("ht_store/matter/tags", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),
    ...mapActions("ht_store/matter/tags", ["getDataTagsRequest"]),
    ...mapActions("ht_store/project/research/facts", ["createFactsItem"]),
    postCreateFactsItem() {
      const body = {
        name: this.name,
        time: new Date(
          moment(this.date).format("YYYY-MM-DD HH:mm:ss")
        ).toISOString(),
        subjects: [],
        characters: this.characters,
        cause_of_actions: this.causeOfActions,
        checklists: [],
        type: this.typeFactsValue.id,
        dispute: this.disputed,
        issues: this.valueIssue.map(e => e.id),
        linkedRecords: [],
        relief_sought: this.reliefSought,
        favorable: this.valueFavorables.id,
        important: this.important,
        relevant: this.relevant,
        tags: []
      };
      if (this.$refs.form.validate()) {
        this.createFactsItem({
          matterId: this.$route.params.matter || this.$route.params.projectId,
          body
        });
        this.dialog = false;
        this.$refs.form.reset();
      }
    },
    changeDate(e) {
      this.date = e;
      this.menu = false;
    },
    saveTime(time) {
      this.resultTime = time + ":" + moment().format("ss");
      this.$refs.menuTimePicker.save(this.resultTime);
    },
    changeCharacters(array) {
      this.filters.value = array;
      this.characters = array.map(e => e.id);
    },
    changeTypeFacts(object) {
      this.typeFactsValue = object;
    },
    changeDisputed(value) {
      this.disputed = value;
    },
    changeFavorables(object) {
      this.valueFavorables = object;
    },
    changeImportant(value) {
      this.important = value;
    },
    changeRelevant(value) {
      this.relevant = value;
    },
    changeCauseOfActions(value) {
      this.causeOfActions = value;
    },
    changeReliefSought(value) {
      this.reliefSought = value;
    },
    choseLabel(value) {
      var elementExists = this.valueIssue.some(x => x.id === value.id);
      if (elementExists) {
        this.valueIssue = this.valueIssue.filter(x => x.id !== value.id);
      } else {
        this.valueIssue = [...this.valueIssue, value];
      }
    },
    createdLabelIssue(e) {
      const data = {
        name: e.labelName,
        color: e.colorValue,
        type: "issue",
        matterId: this.$route.params.matter || this.$route.params.projectId,
        id: this.dataRow.id
      };
      this.addTagsRequest(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/matter/tags", ["issue"])
  },
  watch: {
    dialog(val) {
      if (val === true) {
        this.getDataTagsRequest({
          matterId: this.$route.params.matter || this.$route.params.projectId,
          type: "issue"
        });
      }
    }
  }
};
</script>
<style scoped>
.v-chip--x-small {
  font-size: 10px;
  height: 16px !important;
}
</style>
