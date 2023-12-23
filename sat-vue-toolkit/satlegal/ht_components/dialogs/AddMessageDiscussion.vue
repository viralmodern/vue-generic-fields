<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="500" persistent>
      <v-card class="px-2">
        <v-card-title class="text-h5">Add new tax rate</v-card-title>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="to"
              :items="members"
              item-text="name"
              label="Participants"
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
          <v-row no-gutters class="my-1">
            <v-textarea
              name="input-7-1"
              label="Message..."
              v-model="message"
            ></v-textarea>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="status"
              :rules="[v => !!v || 'This field is required']"
              :items="statusOfMessage"
              attach
              chips
              label="Status"
              item-value="id"
              item-text="name"
            ></v-select>
          </v-row>
          <v-row no-gutters class="my-1">
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
                  v-model="updated"
                  readonly
                  label="Create date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="updated"
                @input="menuDate = false"
              ></v-date-picker>
            </v-menu>
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
import { statusOfMessage } from "../../config";
import { mapGetters } from "vuex";
import UserAvatar from "../avatars/UserAvatar";
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      statusOfMessage,
      valid: true,
      to: "",
      message: "",
      menuDate: false,
      updated: "",
      status: ""
    };
  },
  components: {
    UserAvatar
  },
  methods: {
    cancel() {
      this.$emit("closeModal");
      this.$refs.form.reset();
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          message: this.message,
          to: this.to,
          updated: this.updated,
          status: this.status
        };
        this.$emit("addMessage", data);
        this.$refs.form.reset();
        this.$emit("closeModal");
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/member", ["members"])
  }
};
</script>
