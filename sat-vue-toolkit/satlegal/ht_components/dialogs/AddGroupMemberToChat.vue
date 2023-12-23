<template>
  <v-dialog :value="isShow" @input="cancel" max-width="500px">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title>New group chat</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            ref="inputField"
            v-model="nameGroup"
            :rules="[v => !!v || 'Name group is required']"
            label="Group name chat"
            required
          ></v-text-field>
        </v-card-text>

        <v-card-text>
          <div class="text--secondary">Invited ({{ this.users.length }})</div>
          <v-row no-gutters>
            <v-select
              v-model="users"
              :items="members"
              box
              chips
              label="Invite members"
              item-text="name"
              item-value="id"
              multiple
              return-object
            >
              <template slot="selection" slot-scope="data">
                <v-chip
                  :selected="data.selected"
                  close
                  class="chip--select-multi"
                  @input="remove(data.item)"
                >
                  <v-avatar>
                    <img :src="data.item.avatar.imageUrl" />
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template slot="item" slot-scope="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img :src="data.item.avatar.imageUrl" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.group"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-select>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-row class="ma-0">
            <v-col cols="8">
              <v-btn @click="cancel">Cancel</v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn color="primary" @click="add">Done</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import moment from "moment";
export default {
  props: {
    isShow: {
      type: Boolean
    }
  },
  data() {
    return {
      nameGroup: "",
      users: [],
      valid: true
    };
  },
  components: {},
  methods: {
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapMutations(["addGroupChat"]),

    cancel() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          type: "group",
          name: this.nameGroup,
          members: this.users,
          onlineStatus: "online",
          message: {
            text: "Yes, my fault 😅",
            time: moment(new Date()).format("hh:mm A")
          },
          avatar: {
            id: 2,
            imageUrl:
              "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          }
        };
        this.addGroupChat(data);
        this.$emit("closeModal");
      }
    },
    remove(item) {
      const index = this.users.indexOf(item.id);
      if (index >= 0) this.users.splice(index, 1);
    }
  },
  computed: {
    ...mapGetters("ht_store/project/members", ["members"])
  },
  mounted() {
    this.getDataMembersRequest({ matterId: this.$route.params.matter || this.$route.params.projectId });
  }
};
</script>
<style scoped>
.input-add-members {
  margin: 0;
}
</style>
