<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="500" persistent>
      <v-card>
        <div class="primary">
          <v-row no-gutters class="pa-3 justify-center align-center ">
            <div class="title font-weight-regular white--text">
              Add new service
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
          <v-row no-gutters class="my-1">
            <v-select
              v-model="by"
              :items="character"
              item-text="name"
              label="Character"
              item-value="id"
              :rules="[v => !!v || 'This field is required']"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip class="chip--select-multi" small>
                  <v-avatar>
                    <UserAvatar
                      :name="item.avatar.name"
                      :imageUrl="(item.avatar || {}).imageUrl"
                      :avatarSize="30"
                    />
                  </v-avatar>
                  <span>{{ item.avatar.name }}</span>
                </v-chip>
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
          </v-row>
          <v-row no-gutters>
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
                  :rules="[v => !!v || 'This field is required']"
                  v-model="deadline"
                  readonly
                  label="Deadline"
                  v-on="on"
                  append-icon="date_range"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="deadline"
                @input="menuDate = false"
              ></v-date-picker>
            </v-menu>
          </v-row>

          <v-row no-gutters class="my-1">
            <v-select
              v-model="type"
              :items="serviceType"
              label="Type"
              :rules="[v => !!v || 'This field is required']"
              item-value="id"
              item-text="name"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="index === 0"
                  :color="item.color"
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

          <v-row no-gutters class="my-1">
            <v-select
              v-model="status"
              :items="serviceStatus"
              :rules="[v => !!v || 'This field is required']"
              label="Service status"
              item-value="id"
              item-text="name"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="index === 0"
                  :color="item.color"
                  small
                  class="white--text"
                >
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption"
                  >(+{{ status.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="member"
              :items="members"
              item-text="name"
              label="Member managing"
              item-value="id"
              :rules="[v => !!v || 'This field is required']"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip class="chip--select-multi" small>
                  <v-avatar>
                    <UserAvatar
                      :name="item.avatar.name"
                      :imageUrl="(item.avatar || {}).imageUrl"
                      :avatarSize="30"
                    />
                  </v-avatar>
                  <span>{{ item.avatar.name }}</span>
                </v-chip>
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
          </v-row>
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
import { serviceType, serviceStatus } from "../../config.js";
export default {
  props: {
    isShow: Boolean,
    dataInvoice: Array
  },
  data() {
    return {
      valid: true,
      menuDate: false,
      serviceType,
      serviceStatus,
      by: "",
      deadline: "",
      type: "",
      status: "",
      member: "",
      name: ""
    };
  },
  components: {
    UserAvatar
  },
  methods: {
    ...mapActions("ht_store/matter/service", ["addServiceRequest"]),
    cancel() {
      this.$emit("closeModal");
      this.$refs.form.reset();
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          deadline: this.deadline,
          character: this.by,
          member: this.member,
          status: this.status,
          type: this.type,
          attachment: [3, 1]
        };
        const results = { ...data, matterId: this.$route.params.matter || this.$route.params.projectId };
        this.addServiceRequest(results);
        this.$refs.form.reset();
        this.$emit("closeModal");
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/project/members", ["members"])
  }
};
</script>
