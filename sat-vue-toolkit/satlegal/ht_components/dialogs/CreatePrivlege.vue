<template>
  <v-dialog :value="isShow" @input="cancel" width="500" persistent>
    <v-card class="pa-3">
      <v-card-title>
        <span class="text-h5">Add log privilege</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="name"
              :rules="[v => !!v || 'Privilege name is required']"
              label="Privilege name"
              required
            ></v-text-field>
          </v-row>
          <v-row no-gutters>
            <v-menu
              v-model="menuStartDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="startDate"
                  readonly
                  label="Start date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="startDate"
                @input="menuStartDate = false"
              ></v-date-picker>
            </v-menu>
          </v-row>
          <v-row no-gutters>
            <v-menu
              v-model="menuEndDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="endDate"
                  readonly
                  label="End date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                :min="startDate"
                v-model="endDate"
                @input="menuEndDate = false"
              ></v-date-picker>
            </v-menu>
          </v-row>
          <v-row no-gutters class="my-1">
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
              v-model="type"
              :items="privilegeType"
              item-text="name"
              label="Types"
              item-value="id"
              multiple
              :rules="[v => !!v || 'This field is required']"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" small>
                  <span>{{ item.name }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption"
                  >(+{{ type.length - 1 }} others)</span
                >
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
import { privilegeType } from "../../config.js";
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      privilegeType,
      name: "",
      menuStartDate: false,
      menuEndDate: false,
      startDate: "",
      endDate: "",
      description: "",
      tag: "",
      type: ""
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
          startDate: this.startDate,
          endDate: this.endDate,
          description: this.description,
          tags: this.tag,
          type: this.type
        };
        this.$emit("addLogType", data);
        this.$refs.form.reset();
        this.cancel();
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/log/tag", ["tags"])
  },
  watch: {
    startDate(e) {
      if (e != null) {
        this.endDate = "";
      }
    }
  }
};
</script>
