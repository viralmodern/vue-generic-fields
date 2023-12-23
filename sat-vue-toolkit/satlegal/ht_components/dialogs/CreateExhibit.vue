<template>
  <v-dialog :value="isShow" @input="cancel" width="500" persistent>
    <v-card class="pa-3">
      <v-card-title>
        <span class="text-h5">Add log exhibit</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="name"
              :rules="[v => !!v || 'Privilege name is required']"
              label="Exhibit name"
              required
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-text-field
              class="py-1"
              v-model="number"
              :rules="[v => !!v || 'Number is required']"
              label="Number"
              mask="##"
              required
            ></v-text-field>
          </v-row>
          <v-row class="my-1">
            <v-textarea
              v-model="description"
              label="Description..."
              :rules="[v => !!v || 'This field is required']"
            ></v-textarea>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="tag"
              :items="tags"
              item-text="name"
              label="Tags"
              item-value="id"
              multiple
              :rules="[v => !!v || 'This field is required']"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" small>
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption"
                  >(+{{ tag.length - 1 }} others)</span
                >
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="source"
              :items="sourceExhibit"
              item-text="name"
              label="Source of Exhibit"
              item-value="id"
              :rules="[v => !!v || 'This field is required']"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" small>
                  <span>{{ item.name }}</span>
                </v-chip>
              </template>
            </v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="stage"
              :items="stageExhibit"
              item-text="name"
              label="Stage Exhibit"
              item-value="id"
              :rules="[v => !!v || 'This field is required']"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" small>
                  <span>{{ item.name }}</span>
                </v-chip>
              </template>
            </v-select>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default darken-1" @click="cancel">Cancel</v-btn>
        <v-btn color="primary darken-1" @click="add">add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { sourceExhibit, stageExhibit } from "../../config.js";
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      sourceExhibit,
      stageExhibit,
      name: "",
      number: "",
      description: "",
      tag: "",
      source: "",
      stage: ""
    };
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
          date: this.date,
          time: this.time,
          description: this.description,
          tags: this.tag,
          source: this.source,
          stage: this.stage
        };
        this.$emit("addLogType", data);
        this.$refs.form.reset();
        this.cancel();
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/log/tag", ["tags"]) // eslint-disable-line
  }
};
</script>
