<template>
  <div class="pa-2">
    <v-dialog v-model="dialog" width="650" persistent>
      <template v-slot:activator="{ on }">
        <v-btn fab color="primary" @click="isShowModelCreate = true" v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <div class="primary">
          <v-row no-gutters class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">
              Create Evidences
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
            append-icon="announcement"
          ></v-text-field>

          <div class="pa-1">
            <v-select
              :items="favorables"
              :rules="[v => !!v || 'This field is required']"
              label="Provided By"
              item-text="name"
              item-value="id"
              return-object
              @change="changeProvidedBy"
            ></v-select>
          </div>

          <div>
            <span>Tags</span>
            <MenuListTags
              :tag="tag"
              :tags="tag"
              keyText="name"
              keyColor="color"
              title="List Tags"
              nameAdd="Add new Tag"
              lengthDisplay="3"
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

          <v-textarea
            v-model="description"
            label="Description..."
            rows="3"
          ></v-textarea>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="createEvidences">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import MenuListTags from "../menus/MenuListTags";
import { favorables } from "../../config";
export default {
  components: {
    MenuListTags
  },
  data() {
    return {
      dialog: false,
      valid: false,
      name: "",
      description: "",
      tag: [],
      providedBy: null,
      favorables
    };
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/evidences", ["createItemEvidences"]),
    ...mapActions("ht_store/matter/tags", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),
    changeProvidedBy(value) {
      this.providedBy = value.id;
    },
    createEvidences() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          description: this.description,
          tags: this.tag,
          providedBy: this.providedBy,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          groupType: this.$route.params.groupType
        };
        this.$refs.form.reset();
        this.dialog = false;
        this.createItemEvidences(data);
        this.tag = [];
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/matter/tags", ["tag"])
  }
};
</script>
