<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="500" persistent>
      <v-card>
        <div class="primary">
          <v-row no-gutters class="pa-3 justify-center align-center">
            <div class="title font-weight-regular white--text">
              Create New Task
            </div>
            <v-spacer></v-spacer>
            <v-btn class="ma-0" icon @click="cancel">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="title"
              :rules="[v => !!v || 'This field is required']"
              label="Title"
              required
            ></v-text-field>
          </v-row>
          <MenuListTags
            :tag="labels"
            :tags="
              dataLabels.map(x => ({
                ...x,
                color: x.color.length === 6 ? '#' + x.color : x.color
              }))
            "
            keyText="name"
            keyColor="color"
            title="List Tags"
            nameAdd="Add new Tag"
            lengthDisplay="3"
            @add="
              addTagsRequest({
                matterId:$route.params.matter || $route.params.projectId,
                ...$event,
                type: 'label'
              })
            "
            @update="
              updateTagsRequest({
                matterId:$route.params.matter || $route.params.projectId,
                ...$event,
                color: $event.colorValue || '#ff0000',
                type: 'label'
              })
            "
            @chose="labels = $event"
            @remove="
              removeTagsRequest({
                matterId:$route.params.matter || $route.params.projectId,
                id: $event,
                type: 'label'
              })
            "
          />

          <v-col cols="12">
            <v-row row align-center>
              <span>Status Done:</span>
              <v-switch v-model="done" class="ml-2" color="primary"></v-switch>
            </v-row>
          </v-col>

          <v-textarea
            label="Description"
            v-model="desc"
            class="ma-0 pa-2 custom-text-field fieldDes"
            rows="3"
          ></v-textarea>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn class="v-btn theme--light primary" @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import MenuListTags from "../menus/MenuListTags";

export default {
  components: {
    MenuListTags
  },
  props: {
    isShow: Boolean,
    dataLabels: Array
  },
  data() {
    return {
      valid: true,
      desc: "",
      title: "",
      labels: [],
      done: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/deposition/checklist", ["createdNewTask"]),
    ...mapActions("ht_store/matter/tags", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),
    cancel() {
      this.$emit("closeModal");
      this.$refs.form.reset();
    },
    add() {
      if (this.$refs.form.validate()) {
        const { depositionId, projectId } = this.$route.params;
        const bodyRequest = {
          title: this.title,
          desc: this.desc,
          labels: this.labels,
          done: this.done,
          depositionId,
          matterId: projectId
        };
        this.createdNewTask(bodyRequest);
        this.$refs.form.reset();
        this.$emit("closeModal");
      }
    },
    ...mapActions("ht_store/matter/labels", [
      "addLabelsRequest",
      "updateLabelsRequest",
      "removeLabelsRequest"
    ])
  }
};
</script>
