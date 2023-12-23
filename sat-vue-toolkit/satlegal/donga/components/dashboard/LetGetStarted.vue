<template>
  <div>
    <!--<div class="text-h5 font-weight-bold text-xs-center">
      Let's Get Started
    </div>-->
    <v-card-title class="text-h5 text-xs-center justify-center"
      >Let's Get Started</v-card-title
    >
    <div class="container fluid grid-list-xl px-0">
      <div class="layout">
        <div v-for="(item, index) in cards" :key="index" class="flex">
          <v-card class="fill-height pointer_cusor" color="rgba(0,0,0,0)">
            <v-row no-gutters>
              <v-col cols="12" pa-0>
                <div
                  class="layout justify-center border_mid"
                  :class="{
                    last_border_mid: index === cards.length - 1,
                    first_border_mid: index === 0
                  }"
                >
                  <v-badge color="green" right overlap class="pointer_cusor">
                    <template v-slot:badge>
                      <v-icon v-if="item.done" dark small>
                        done
                      </v-icon>
                    </template>
                    <v-avatar color="primary">
                      <v-icon dark>{{ item.icon }}</v-icon>
                    </v-avatar>
                  </v-badge>
                </div>
              </v-col>
              <v-col cols="12" pa-0>
                <v-card-title
                  primary-title
                  class="py-2 px-0 pointer_cusor"
                  color="#839eb4"
                >
                  <div
                    class="text-body-2 d-block text-xs-center"
                    style="width: 100%; white-space: nowrap; color: #839eb4;"
                  >
                    {{ item.title }}
                  </div>
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LetGetStarted",
  data() {
    return {
      cards: [
        {
          title: "Add Notebook",
          icon: "note_add",
          done: true
        },
        {
          title: "Add Announcement",
          icon: "announcement",
          done: true
        },
        {
          title: "Add Timer",
          icon: "timer",
          done: true
        },
        {
          title: "Invite Member",
          icon: "group",
          done: true
        },
        {
          title: "Add Project",
          icon: "create_new_folder",
          done: false
        },
        {
          title: "Add Group Chat",
          icon: "person_add",
          done: false
        },
        {
          title: "Add Meeting",
          icon: "notifications_active",
          done: false
        }
      ],
      avatar: ""
    };
  }
};
</script>

<style scoped>
.grey.lighten-3 {
  background-color: #eee !important;
  border-color: #eee !important;
}
.container.grid-list-xl *:not(:only-child) .layout:last-child {
  margin-bottom: 0;
}
.container.grid-list-xl *:not(:only-child) .layout:first-child {
  margin-top: 0;
}
.border_mid {
  /*border: solid 1px red;*/
  position: relative;
}
.border_mid:before {
  content: "";
  height: 1px;
  width: 100%;
  background: #cadade;
  display: block;
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
}
.first_border_mid:before {
  width: 50%;
}
.last_border_mid:before {
  width: 50%;
  right: auto;
  left: 0;
}
</style>
<style>
.pointer_cusor {
  cursor: pointer !important;
}
</style>
