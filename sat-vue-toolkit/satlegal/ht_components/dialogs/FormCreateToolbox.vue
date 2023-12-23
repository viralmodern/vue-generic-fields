<template>
  <v-dialog :value="isShowPopup" @input="closeDialog" persistent width="500">
    <v-card>
      <div class="primary">
        <v-row no-gutters class=" justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">{{ header }}</div>
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
              label="Name"
              :rules="[v => !!v || 'This field is required']"
              append-icon="person_outline"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <SelectMultipleUser
              label="Members"
              :user="members"
              :users="dataMembers.filter(x => x.id !== currentUser.pk)"
              @change="members = $event"
              item-value="id"
              itemText="avatar.name"
              itemImg="avatar.imageUrl"
              multiple
            />
          </v-col>
          <v-col cols="12">
            <v-select
              :items="toolboxType"
              label="Type"
              item-text="name"
              item-value="id"
              v-model="type"
              :rules="[v => !!v || 'This field is required']"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <div class="text--secondary subheading">Tags</div>
            <div>
              <MenuListTags
                :tag="tag"
                :tags="tags"
                keyText="name"
                keyColor="color"
                title="List Tags"
                nameAdd="Add new Tag"
                @add="
                  addTagsRequest({
                    matterId:$route.params.matter || $route.params.projectId,
                    ...$event,
                    type: 'tag'
                  })
                "
                @update="
                  updateTagsRequest({
                    matterId:$route.params.matter || $route.params.projectId,
                    ...$event,
                    type: 'tag'
                  })
                "
                @remove="
                  removeTagsRequest({
                    matterId:$route.params.matter || $route.params.projectId,
                    id: $event,
                    type: 'tag'
                  })
                "
                @chose="tag = $event"
              />
            </div>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="description"
              label="Description"
              auto-grow
              rows="1"
              append-icon="description"
            ></v-textarea>
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
import { mapActions, mapGetters } from "vuex";
import { toolboxType } from "../../config";
import SelectMultipleUser from "../inputs/SelectMultipleUser";
import MenuListTags from "../menus/MenuListTags";

export default {
  props: {
    isShowPopup: Boolean,
    dataMembers: Array,
    tags: Array,
    header: String
  },
  data() {
    return {
      valid: false,
      name: "",
      members: [],
      description: "",
      tag: [],
      type: "",
      toolboxType
    };
  },
  components: {
    SelectMultipleUser,
    MenuListTags
  },
  computed: {
    ...mapGetters("ht_store/user", ["currentUser"]) // eslint-disable-line
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          members: this.members,
          description: this.description,
          tags: this.tag,
          type: this.type,
          createdAt: new Date().toISOString(),
          creator: this.currentUser.pk
        };
        this.$emit("submit", data);
        this.clear();
        this.$refs.form.resetValidation();
      }
    },
    clear() {
      this.name = "";
      this.members = [];
      this.description = "";
      this.tag = [];
      this.type = "";
    },
    ...mapActions("ht_store/matter/tags", [ // eslint-disable-line
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ])
  }
};
</script>
