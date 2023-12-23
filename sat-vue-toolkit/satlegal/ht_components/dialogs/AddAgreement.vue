<template>
  <div class="pa-2">
    <v-dialog persistent v-model="dialog" width="650">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="primary" v-on="on">
          Add new
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <div class="primary">
          <v-row no-gutters class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">
              Create Agreement
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="dialog = false">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            :rules="[v => !!v || 'This field is required']"
            label="Name"
            v-model="name"
            append-icon="create"
          ></v-text-field>

          <v-select
            :value="defendant.value"
            :items="character"
            item-text="name"
            item-value="id"
            label="Defendant Party"
            return-object
            multiple
            @change="changeDefendant"
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
                >(+{{ defendant.value.length - 1 }} others)</span
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

          <v-select
            :value="plaintiff.value"
            :items="character"
            item-text="name"
            item-value="id"
            label="Plaintiff party"
            return-object
            multiple
            @change="changePlaintiff"
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
                >(+{{ plaintiff.value.length - 1 }} others)</span
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
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancel</v-btn>
          <v-btn class="v-btn theme--light primary" @click="AddNew"
            >Create</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ProjectLabels from "../cards/ProjectLabels";
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    ProjectLabels,
    UserAvatar
  },
  data() {
    return {
      dialog: false,
      valid: false,
      name: "",
      newTags: [],
      providedBy: null,
      plaintiff: {
        value: []
      },
      defendant: {
        value: []
      }
    };
  },
  methods: {
    ...mapActions("ht_store/matter/partient/profile/detail", ["createNewAgreement"]),
    ...mapActions("ht_store/project/research/timeline/detail/activities/tag", [
      "getDataTagsRequest",
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),
    changeDefendant(val) {
      this.defendant.value = val;
    },
    changePlaintiff(val) {
      this.plaintiff.value = val;
    },
    AddNew() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          name: this.name,
          defendantParty: this.defendant.value.map(x => x.id),
          plaintiffParty: this.plaintiff.value.map(x => x.id),
          tags: this.newTags.map(x => x.id),
          date: new Date().toISOString()
        };
        this.$refs.form.reset();
        this.dialog = false;
        this.createNewAgreement(data);
        this.newTags = [];
      }
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
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/project/research/timeline/detail/activities/tag", ["tags"])
  }
};
</script>
