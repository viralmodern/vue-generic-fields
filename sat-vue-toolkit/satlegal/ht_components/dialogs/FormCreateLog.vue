<template>
  <v-dialog :value="isShowPopup" @input="closeDialog" width="500" persistent>
    <v-card>
      <div class="primary">
        <v-row no-gutters class=" justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">Add log</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeDialog">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-form ref="form" v-model="valid">
        <v-row no-gutters class="px-3 py-2">
          <v-col cols="12">
            <v-text-field
              v-model="name"
              label="Log name"
              :rules="[v => !!v || 'This field is required']"
              append-icon="speaker_notes"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="member"
              :items="members.filter(x => x.id !== currentUser.pk)"
              label="Member"
              item-text="name"
              item-value="id"
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" class="chip--select-multi" small>
                  <v-avatar>
                    <UserAvatar
                      :name="item.avatar.name"
                      :imageUrl="item.avatar.imageUrl"
                      :avatarSize="30"
                    />
                  </v-avatar>
                  <span>{{ item.avatar.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption"
                  >(+{{ member.length - 1 }} others)</span
                >
              </template>
              <template slot="item" slot-scope="{ item }">
                <UserAvatar
                  :name="item.avatar.name"
                  :imageUrl="item.avatar.imageUrl"
                  :avatarSize="35"
                />&nbsp;
                <span>{{ item.avatar.name }}</span>
              </template>
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="description"
              label="Description..."
              rows="3"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-select
              :items="types"
              label="Log type"
              item-text="name"
              item-value="id"
              class="pa-1"
              v-model="type"
              chips
              small-chips
              :rules="[v => !!v || 'This field is required']"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-select
              :items="tag"
              label="Log tag"
              item-text="name"
              item-value="id"
              class="pa-1"
              v-model="dataTag"
              multiple
              chips
              small-chips
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import UserAvatar from "../avatars/UserAvatar";
export default {
  props: {
    isShowPopup: Boolean
  },
  data() {
    return {
      valid: false,
      name: "",
      member: "",
      description: "",
      dataTag: "",
      type: ""
    };
  },
  components: {
    UserAvatar
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          members: this.member,
          description: this.description,
          tags: this.dataTag,
          type: this.type
        };
        this.$emit("addLog", data);
        this.$refs.form.reset();
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/user", ["currentUser"]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/workspace/logType", ["types"]),
    ...mapGetters("ht_store/matter/tags", ["tag"])
  }
};
</script>
