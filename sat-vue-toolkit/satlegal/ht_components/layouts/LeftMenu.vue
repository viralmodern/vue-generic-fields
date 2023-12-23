<template>
  <v-list dense>
    <v-container fluid class="pt-0">
      <UserInfo :name="username" :avatar="avatar" />
      <v-text-field
        solo
        label="Search"
        prepend-inner-icon="search"
        hide-details
      ></v-text-field>
    </v-container>
    <v-row no-gutters class="justify-center align-center">
      <v-col cols="10" class="text-lg-center">
        <router-link to="/" style="text-decoration:none">
          <v-btn icon>
            <v-icon medium>home</v-icon>
          </v-btn>
        </router-link>
        <v-btn icon :to="`/private-message${idMessageChat}`">
          <v-icon medium>sms</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon medium>calendar_today</v-icon>
        </v-btn>
        <router-link to="/notebook" style="text-decoration:none">
          <v-btn icon>
            <v-icon medium>book</v-icon>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
    <v-container>
      <v-list>
        <template>
          <v-list-item @click="123" to="/announcements">
            <v-list-item-content>
              <v-list-item-title class="text--secondary"
                >Announcement</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action @click="isShowCreateAnnouncement = true">
              <v-icon>mdi-add_circle</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item @click="123">
            <v-list-item-content>
              <v-list-item-title class="text--secondary"
                >Matter</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action>
              <router-link
                :to="{ name: 'CreateProject' }"
                style="text-decoration:none"
              >
                <v-icon>mdi-add_circle</v-icon>
              </router-link>
            </v-list-item-action>
          </v-list-item>
          <v-list-item
            v-for="matter in dataMatter"
            :key="matter.id"
            :to="{ name: 'Detail', params: { projectId: matter.id } }"
          >
            <v-icon v-if="matter.status == 1">public</v-icon>
            <v-icon v-else>lock</v-icon>
            <v-list-item-content>
              <v-list-item-title class="text--secondary pl-1">{{
                matter.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'DocumentRequest' }">
            <v-list-item-content>
              <v-list-item-title class="text--secondary"
                >Document requests</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/clients">
            <v-list-item-content>
              <v-list-item-title class="text--secondary"
                >Client</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-container>
    <v-row no-gutters>
      <v-col cols="10" class="text-md-center">
        <v-btn icon>
          <v-icon medium>bar_chart</v-icon>
        </v-btn>
        <v-btn icon to="/settings">
          <v-icon medium>settings</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon medium>logout</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <ModalCreateAnnouncement
      title="Create New Announcement"
      :isShow="isShowCreateAnnouncement"
      @closeModal="isShowCreateAnnouncement = false"
    />
  </v-list>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import UserInfo from "../cards/UserInfo";
import ModalCreateAnnouncement from "./CreateAnnouncement";

export default {
  components: {
    UserInfo,
    ModalCreateAnnouncement
  },
  data() {
    return {
      isShowCreateAnnouncement: false,
      arr: [],
      idMessageChat: ""
    };
  },
  methods: {
    ...mapActions("ht_store/leftMenu", ["getdataLeftMenu"]),
    ...mapActions("ht_store/user", ["getCurrentUser"]),
    ...mapActions("ht_store/matter", ["getDataMatterRequest"])
  },
  mounted() {
    this.getdataLeftMenu();
    this.getCurrentUser();
    this.getDataMatterRequest();
    // this.$store.dispatch("ht_store/user/getCurrentUser");
  },
  computed: {
    ...mapState({
      // username1: ({ user }) => user.currentUser ? user.currentUser.username : "",
      username: state => {
        try {
            return state['ht_store/user'].currentUser.username
        }catch(e) {
          return ''
        }
      },
      // avatar1: ({ user }) => (user.currentUser ? user.currentUser.avatar : null),
      avatar: state => {
        try {
          return state['ht_store/user'].currentUser.avatar
        }catch(e) {
          return null
        }
      }
    }),
    ...mapGetters("ht_store/leftMenu", ["dataLeftMenu"]),
    ...mapGetters("ht_store/matter", ["dataMatter"])
  }
};
</script>
