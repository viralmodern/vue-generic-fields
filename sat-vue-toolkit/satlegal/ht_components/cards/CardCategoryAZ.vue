<template>
  <v-row no-gutters class="card-height">
    <v-col cols="12">
      <v-col cols="12" class="card-height">
        <v-card-title primary-title>
          <div style="width: 100%">
            <v-row no-gutters class="justify-space-between">
              <v-col cols="9" class="user">
                <UserAvatar
                  :avatarSize="40"
                  v-if="contentCat.creator"
                  :imageUrl="contentCat.creator.avatar.imageUrl || null"
                  :name="contentCat.creator.avatar.name || ''"
                />
                <span class="text-h5 ml-2">{{ contentCat.clauseName }}</span>
              </v-col>
              <v-col cols="3">
                <v-row class="justify-end">
                  <v-select
                    :value="itemCategory"
                    :items="dataCategory"
                    item-text="name"
                    item-value="id"
                    label="List category"
                    persistent-hint
                    return-object
                    single-line
                    @change="$emit('changeItemCategory', $event)"
                  ></v-select>
                </v-row>
              </v-col>
            </v-row>

            <div class="mt-2">
              <v-row no-gutters>
                <v-chip
                  v-for="i in contentCat.tags"
                  :key="i.id"
                  :color="i.color"
                  text-color="white"
                  >{{ i.text }}</v-chip
                >
              </v-row>
            </div>

            <div>
              <v-row no-gutters class="justify-center align-center">
                <span class="text-body-1 mr-3">Status:</span>
                <v-switch
                  color="primary"
                  v-model="status"
                  :label="status === true ? 'Public Use' : 'Private Use'"
                ></v-switch>
              </v-row>
            </div>

            <div class="mt-3">
              <v-textarea
                label="description"
                hide-details
                name="input-7-1"
                :value="contentCat.desc"
                rows="5"
              ></v-textarea>
            </div>
          </div>
        </v-card-title>
      </v-col>
    </v-col>
    <v-col cols="12" class="ml-3">
      <div>
        <NotebookEditor
          placeholder="Type your note here..."
          :item="contentCat.notes"
          @change="changeNotes"
        />
      </div>
      <v-row justify-end>
        <v-btn class="primary" @click="$emit('save')">save</v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import NotebookEditor from "../editor/NotebookEditor";
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    NotebookEditor,
    UserAvatar
  },
  props: {
    contentCat: Object,
    dataCategory: Array,
    itemCategory: Object
  },
  data() {
    return {
      description: "",
      status: false,
      menu: false
    };
  },
  methods: {
    changeNotes(e) {
      return e;
    }
  },
  mounted() {
    this.status = this.contentCat && this.contentCat.status;
  }
};
</script>
<style scoped>
.user {
  align-items: center;
  display: flex;
}
</style>
