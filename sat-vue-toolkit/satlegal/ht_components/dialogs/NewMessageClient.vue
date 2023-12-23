<template>
  <v-dialog v-model="dialog" width="650">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon color="primary">add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5 lighten-2" primary-title
        >New message</v-card-title
      >
      <v-divider></v-divider>
      <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
        <div>
          <v-combobox
            :value="client"
            :items="dataClient"
            @change="selectClient"
            :rules="[v => !!v || 'This field is required']"
            item-text="name"
            item-value="id"
            placeholder="Select client"
            return-object
            label="To Client"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0" class="chip--select-multi" small>
                <v-avatar>
                  <UserAvatar
                    :name="item.name"
                    :imageUrl="item.avatar"
                    :avatarSize="30"
                  />
                </v-avatar>
                <span>{{ item.username }}</span>
              </v-chip>
            </template>
            <template slot="item" slot-scope="{ item }">
              <UserAvatar
                :name="item.name"
                :imageUrl="item.avatar"
                :avatarSize="35"
              />&nbsp;
              <span>{{ item.username }}</span>
            </template>
          </v-combobox>
        </div>

        <div>
          <v-text-field :value="username" label="From" disabled></v-text-field>
        </div>

        <div>
          <v-select
            :items="character"
            item-text="email"
            item-value="id"
            label="CC"
            return-object
            placeholder="Members"
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
              <span v-if="index === 1" class="grey--text text-caption"
                >(+{{ countMember.value.length - 1 }} others)</span
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
        </div>

        <div>
          <v-select
            :items="dataMatter"
            :rules="[v => !!v || 'This field is required']"
            label="List Matter"
            item-text="title"
            item-value="id"
            return-object
            @change="selectMatter"
          ></v-select>
        </div>

        <div>
          <span>Tags</span>
          <ProjectLabels
            :labels="newTags"
            :listLabels="tags"
            keyText="name"
            keyColor="color"
            title="List Tags"
            nameAdd="Add new Tag"
            @addLabel="addTags"
            @updateLabel="updateTagsRequest"
            @removeLabel="removeTagsRequest"
            @choseLabel="choseTags"
          />
        </div>
        <div>
          <v-text-field
            :rules="[v => !!v || 'This field is required']"
            label="Title"
            v-model="title"
          ></v-text-field>
        </div>
        <div class="mt-4">
          <NotebookEditor
            placeholder="Type your message here..."
            @change="changeMessage"
          />
        </div>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="newMessage">Send</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ProjectLabels from "../cards/ProjectLabels";
import UserAvatar from "../avatars/UserAvatar";
import NotebookEditor from "../editor/NotebookEditor";

export default {
  components: {
    ProjectLabels,
    UserAvatar,
    NotebookEditor
  },
  data() {
    return {
      dialog: false,
      valid: false,
      newTags: [],
      client: null,
      matter: null,
      text: "",
      oClient: null,
      oMatter: null,
      title: "",
      countMember: {
        value: []
      },
      memebers: []
    };
  },
  methods: {
    ...mapActions("ht_store/project/research/timeline/detail/activities/tag", [
      "getDataTagsRequest",
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),
    ...mapActions("ht_store/workspace/client/message", [
      "createNewRoomMessage",
      "getDataChatRoom"
    ]),
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"]),
    changeType(value) {
      this.type = value.id;
    },
    selectMembers(arr) {
      this.countMember.value = arr;
      this.memebers = arr.map(x => x.id);
    },
    newMessage() {
      if (this.$refs.form.validate() && this.text.length > 0) {
        const data = {
          created_at: new Date().toISOString(),
          created_by: this.oClient.uuid,
          uuid: this.oClient.uuid,
          tags: this.newTags.map(x => x.id),
          matter: this.oMatter.id,
          memebers: this.memebers,
          messages: [
            {
              created_at: new Date().toISOString(),
              text: this.text,
              user: {
                avatar: this.avatar,
                name: this.username
              }
            }
          ],
          title: this.title,
          user: this.oClient,
          from: this.username
        };
        this.createNewRoomMessage(data);
        this.dialog = false;
        this.$refs.form.reset();
      }
    },
    selectClient(o) {
      this.oClient = o;
    },
    selectMatter(matter) {
      this.oMatter = matter;
    },
    changeMessage(e) {
      this.text = e;
    },
    choseTags(value) {
      var elementExists = this.newTags.some(x => x.id === value.id);
      if (elementExists) {
        this.newTags = this.newTags.filter(x => x.id !== value.id);
      } else {
        this.newTags = [...this.newTags, value];
      }
    },
    cancel() {
      this.isShowAddLabel = false;
    },
    addTags(e) {
      const data = {
        id: Math.random(),
        name: e.labelName,
        color: e.colorValue,
        createAt: new Date().toISOString()
      };
      this.addTagsRequest(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter", ["dataMatter"]),
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/workspace/client", ["dataClient"]),
    ...mapGetters("ht_store/project/research/timeline/detail/activities/tag", ["tags"]),
    ...mapState({
      username: ({ user }) =>
        user.currentUser ? user.currentUser.username : "",
      avatar: ({ user }) => (user.currentUser ? user.currentUser.avatar : null)
    })
  },
  mounted() {
    this.getDataTagsRequest();
    this.getDataClientRequest();
  }
};
</script>
