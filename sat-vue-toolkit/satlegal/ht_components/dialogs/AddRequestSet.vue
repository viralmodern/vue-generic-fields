<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="500" persistent>
      <v-card>
        <div class="primary">
          <v-row no-gutters class="pa-3" justify-center align-center>
            <div class="title font-weight-regular white--text">
              Create New Request Set
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="cancel">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="name"
              :rules="[v => !!v || 'This field is required']"
              label="Name"
              required
            ></v-text-field>
          </v-row>

          <v-select
            :items="members"
            item-text="email"
            item-value="id"
            return-object
            placeholder="Assigned Members"
            multiple
            @change="selectMembers"
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
              <span v-if="index === 1" class="grey--text caption"
                >(+{{ filters.value.length - 1 }} others)</span
              >
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

          <v-col cols="12">
            <v-menu
              v-model="menuDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-on="on"
                  v-model="deadline"
                  readonly
                  label="Deadline"
                  append-icon="date_range"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="deadline"
                @input="menuDate = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-row no-gutters class="my-1">
            <v-select
              v-model="priority"
              :items="evidencesLevel"
              label="Priority"
              item-value="id"
              item-text="name"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="index === 0"
                  :color="showClassColor(item.name)"
                  small
                  class="white--text"
                >
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption"
                  >(+{{ priority.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-row>

          <v-row no-gutters class="my-1">
            <v-select
              v-model="type"
              :items="typeAppRequest"
              label="Type request"
              :rules="[v => !!v || 'This field is required']"
              item-value="id"
              item-text="name"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="index === 0"
                  color="primary"
                  small
                  class="white--text"
                >
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption"
                  >(+{{ type.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-row>

          <v-textarea
            label="Description"
            v-model="description"
            class="ma-0 pa-2 custom-text-field fieldDes"
            rows="3"
          ></v-textarea>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn class="v-btn theme--light primary" @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import UserAvatar from "../avatars/UserAvatar";
import { evidencesLevel, typeAppRequest } from "../../config.js";
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      valid: true,
      menuDate: false,
      evidencesLevel,
      typeAppRequest,
      description: "",
      deadline: null,
      name: "",
      priority: null,
      filters: {
        value: []
      },
      assignee: [],
      type: null
    };
  },
  components: {
    UserAvatar
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/status/requestSets", ["createRequestSet"]),
    selectMembers(array) {
      this.filters.value = array;
      this.assignee = array.map(e => e.id);
    },
    cancel() {
      this.$emit("closeModal");
      this.$refs.form.reset();
    },
    add() {
      if (this.$refs.form.validate()) {
        const bodyRequest = {
          name: this.name,
          deadline: this.deadline,
          members: this.assignee,
          description: this.description,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          priority: this.priority,
          type: this.type
        };
        this.createRequestSet(bodyRequest);
        this.$refs.form.reset();
        this.$emit("closeModal");
      }
    },
    showClassColor(name) {
      if (name === "Very low") {
        return "#512DA8";
      } else if (name === "Very high") {
        return "#FF6F00";
      } else if (name === "Low") {
        return "#76FF03";
      } else if (name === "Normal") {
        return "#F50057";
      } else if (name === "High") {
        return "#00C853";
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/project/members", ["members"])
  }
};
</script>
