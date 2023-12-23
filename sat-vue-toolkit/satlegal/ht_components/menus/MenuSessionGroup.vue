<template>
  <v-navigation-drawer stateless value="true">
    <v-list>
      <v-list-item class="pb-2">
        <v-btn
          block
          color="primary text-capitalize"
          @click="isShowCreateSection = true"
        >
          <span>Add New Session Group</span>
          <v-icon class="pl-1" size="20">mdi-add_circle</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-if="loading">
        <v-progress-linear height="2" :indeterminate="true"></v-progress-linear>
      </v-list-item>
      <v-list-group
        v-else
        v-for="item in dataSectionExhibits"
        :key="item.id"
        value="true"
      >
        <v-list-item v-slot:activator="{ on }">
          <v-list-item-title v-on="on">
            <h4 class="text-uppercase">{{ item.name }}</h4>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-for="child in item.list" :key="child.id">
          <v-list-item-title>
            <router-link
              :to="`/project/${projectId}/exhibits/session/${child.id}`"
              active-class="active"
              style="text-decoration: none; color: rgba(0,0,0,0.54)"
              >{{ child.name }}</router-link
            >
          </v-list-item-title>
        </v-list-item>
        <v-btn
          color="primary"
          class="pl-2"
          @click="openAddNewSubSectionModal(item.id)"
        >
          <span class="text-capitalize">Add new session</span>
          <v-icon class="pl-1">mdi-add_circle</v-icon>
        </v-btn>
      </v-list-group>
    </v-list>
    <ModalCreateSectionNotebook
      title="Add session group"
      :isShow="isShowCreateSection"
      @closeModal="isShowCreateSection = false"
    />
    <ModalCreateSubSectionNotebook
      title="Add sub session"
      :isShow="isShowCreateSubSection"
      @closeModal="isShowCreateSubSection = false"
      @addSubSection="onAddSubSection"
    />
  </v-navigation-drawer>
</template>

<script>
import ModalCreateSectionNotebook from "../notebook/CreateSectionNotebook";
import ModalCreateSubSectionNotebook from "../notebook/CreateSubSectionNotebook";

export default {
  components: {
    ModalCreateSectionNotebook,
    ModalCreateSubSectionNotebook
  },
  props: {
    loading: Boolean,
    dataSectionExhibits: Array
  },
  data() {
    return {
      isShowCreateSection: false,
      isShowCreateSubSection: false
    };
  },
  methods: {
    onAddSubSection(name) {
      const data = {
        name,
        id: this.$route.params.id,
        parentId: this.parentId
      };
      this.$emit("emitDataSubSection", data);
    },
    openAddNewSubSectionModal(parentId) {
      this.parentId = parentId;
      this.isShowCreateSubSection = true;
    }
  },
  computed: {
    projectId() {
      return this.$route.params.matter || this.$route.params.projectId;
    }
  }
};
</script>

<style scoped>
.active {
  background: #6d42c7;
  border-radius: 8px;
  color: white !important;
  padding: 3px 10px;
}
</style>
