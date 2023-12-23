<template>
  <v-col cols="12">
    <v-col cols="12">
      <v-row no-gutters class="ml-2 align-center">
        <v-col cols="9">
          <v-row no-gutters class="align-center">
            <v-col cols="4">
              <UserAvatar
                class="mb-2"
                :avatarSize="36"
                :imageUrl="imageUrl"
                :name="name"
              />
              <span class="title ml-2 mb-2">{{ name | capitalize }}</span>
            </v-col>
            <v-col cols="8">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                class="ml-2"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    v-model="date"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="changeTime"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="3" class="text-end">
          <v-btn icon @click="removeTask" :disabled="is_removed">
            <v-icon>delete_outline</v-icon>
          </v-btn>
          <v-btn icon @click="updateStar" :disabled="is_removed">
            <v-icon :color="starred ? 'primary' : ''">{{
              starred ? "star" : "star_border"
            }}</v-icon>
          </v-btn>
          <v-btn icon :disabled="is_removed">
            <v-icon :color="priority ? 'red' : ''">star_half</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-col>
</template>
<script>
import UserAvatar from "../../../avatars/UserAvatar";
import { capitalize } from "@/sat-vue-toolkit/satlegal/ht_plugins/filter"

export default {
  filters: {
    capitalize
  },
  components: {
    UserAvatar
  },
  props: {
    imageUrl: String,
    name: String,
    deadline: String,
    starred: Boolean,
    priority: Boolean,
    taskId: Number,
    is_removed: Boolean
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false
    };
  },
  mounted() {
    this.date = new Date(this.deadline).toISOString().substr(0, 10);
  },
  methods: {
    changeTime() {
      this.$emit("updateCheckList", new Date(this.date).toISOString());
      this.menu = false;
    },
    updateStar() {
      var { depositionId, projectId } = this.$route.params;
      this.$emit("updateStar", {
        taskId: this.taskId,
        matterId: projectId,
        depositionId,
        starred: !this.starred
      });
    },
    removeTask() {
      var { depositionId, projectId } = this.$route.params;
      this.$emit("removeTask", {
        taskId: this.taskId,
        matterId: projectId,
        depositionId,
        is_removed: true
      });
    }
  }
};
</script>
