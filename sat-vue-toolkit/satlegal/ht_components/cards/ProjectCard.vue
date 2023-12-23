<template>
  <v-card :width="'100%'" class="card-content">
    <v-img
      v-if="blockData.img"
      :src="blockData.img"
      aspect-ratio="2.75"
    ></v-img>
    <v-menu bottom right offset-x :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <v-btn small icon v-on="on" color="primary" class="btn-edit-card ma-0">
          <v-icon small>mdi-edit</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-menu bottom right offset-x>
            <template v-slot:activator="{ on }">
              <v-row no-gutters>
                <v-btn class="my-0" small icon v-on="on">
                  <v-icon small>mdi-edit</v-icon>
                </v-btn>
                <v-list-item-title class="py-1">Edit Labels</v-list-item-title>
              </v-row>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>Edit Labels content</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>

        <v-list-item>
          <v-menu bottom right offset-x>
            <template v-slot:activator="{ on }">
              <v-row no-gutters>
                <v-btn class="my-0" small icon v-on="on">
                  <v-icon>mdi-person</v-icon>
                </v-btn>
                <v-list-item-title class="py-1"
                  >Change Members</v-list-item-title
                >
              </v-row>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>Change Members content</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>

        <v-list-item>
          <v-menu bottom right offset-x>
            <template v-slot:activator="{ on }">
              <v-row no-gutters>
                <v-btn class="my-0" small icon v-on="on">
                  <v-icon>mdi-arrow_right_alt</v-icon>
                </v-btn>
                <v-list-item-title class="py-1">Move</v-list-item-title>
              </v-row>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>Move content</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>

        <v-list-item>
          <v-btn small icon @click="deleteCard(blockData.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-card-title class="pa-0">
      <v-chip
        v-for="label in blockData.label"
        :key="label.color"
        label
        :color="label.color"
      ></v-chip>
    </v-card-title>
    <v-card-title class="pa-0">{{ blockData.title }}</v-card-title>
    <v-card-title class="pa-0">
      <v-chip
        v-for="todo in blockData.todo"
        :key="todo.date"
        label
        small
        color="primary"
        class="white--text"
      >
        <v-icon left class="white--text">mdi-watch_later</v-icon>{{ todo.date }}
      </v-chip>
    </v-card-title>
    <v-card-title class="pa-0">
      <avatars-list
        :members="blockData.members"
        :isInList="true"
        :limit="limit"
      />
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-icon v-if="blockData.viewer" small>mdi-remove_red_eye</v-icon>
      <v-icon small>mdi-insert_drive_file</v-icon>
      <v-spacer></v-spacer>
      <v-icon small>mdi-attachment</v-icon><span>{{ blockData.attachment }}</span>
      <v-icon small>mdi-message</v-icon><span>{{ blockData.comments }}</span>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
import AvatarsList from "../avatars/AvatarsList";
export default {
  components: {
    AvatarsList
  },
  data() {
    return {
      limit: 4,
      open: true
    };
  },
  methods: {
    ...mapActions({
      deleteCard: "projectBoard/deleteBlock"
    })
  },
  computed: {},
  props: {
    blockData: Object
  }
};
</script>
<style scoped>
.btn-edit-card {
  position: absolute;
  top: 2px;
  right: 2px;
  display: none;
}
.card-content:hover {
  cursor: pointer;
  opacity: 0.8;
}
.card-content:hover .btn-edit-card {
  display: block;
}
</style>
