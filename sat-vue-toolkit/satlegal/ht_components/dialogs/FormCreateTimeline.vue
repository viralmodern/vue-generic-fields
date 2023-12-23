<template>
  <v-dialog persistent :value="isShowPopup" @input="closeDialog" width="500">
    <v-card>
      <div class="primary">
        <v-row no-gutters class=" justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">
            Create timeline
          </div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeDialog">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-form ref="form" v-model="valid">
        <v-row no-gutters class="px-3 py-2">
          <v-col cols="12">
            <v-text-field
              v-model="name"
              label="Timeline name"
              :rules="[v => !!v || 'This field is required']"
              append-icon="border_color"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="creator"
              :items="members"
              label="Characters"
              item-text="name"
              item-value="id"
              return-object
              multiple
              :rules="[v => !!v || 'This field is required']"
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
                  <span>{{ item.avatar.nickName }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption"
                  >(+{{ creator.length - 1 }} others)</span
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
              :rules="[v => !!v || 'This field is required']"
              v-model="description"
              label="Description timeline..."
              rows="3"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-select
              :items="tags"
              label="Tag timeline"
              item-text="name"
              item-value="id"
              class="pa-1"
              return-object
              v-model="tag"
              multiple
              chips
              small-chips
              :rules="[v => !!v || 'This field is required']"
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn class="v-btn theme--light primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import UserAvatar from "../avatars/UserAvatar";
export default {
  props: {
    isShowPopup: Boolean,
    tags: Array
  },
  data() {
    return {
      valid: false,
      name: "",
      description: "",
      tag: "",
      creator: ""
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
          members: this.creator.map(x => x.id),
          desc: this.description,
          tags: this.tag.map(x => x.id),
          matterId: this.$route.params.matter || this.$route.params.projectId
        };
        this.$emit("addTimeline", data);
        this.$refs.form.reset();
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/member", ["members"])
  }
};
</script>
