<template>
  <v-dialog :value="isShow" @input="cancel" width="500" persistent>
    <v-card>
      <div class="primary">
        <v-row no-gutters class="pa-3 justify-center align-center">
          <div class="title font-weight-regular white--text">
            Add document request
          </div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="cancel">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="name"
              :rules="[v => !!v || 'Document name is required']"
              label="Document request name"
              required
              append-icon="library_books"
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-menu
              v-model="menuDueDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="dueDate"
                  readonly
                  label="Due date"
                  v-on="on"
                  append-icon="date_range"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="dueDate"
                @input="menuDueDate = false"
              ></v-date-picker>
            </v-menu>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="requester"
              :items="members"
              item-text="name"
              label="Create by"
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
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default darken-1" @click="cancel">Cancel</v-btn>
        <v-btn class="v-btn theme--light primary" @click="add">add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import UserAvatar from "../avatars/UserAvatar";
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      name: "",
      menuDueDate: false,
      dueDate: "",
      requester: ""
    };
  },
  components: {
    UserAvatar
  },
  methods: {
    cancel() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          name: this.name,
          dueDate: this.dueDate,
          requester: this.requester
        };
        this.$emit("addDocument", data);
        this.$refs.form.reset();
        this.cancel();
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/member", ["members"])
  }
};
</script>
