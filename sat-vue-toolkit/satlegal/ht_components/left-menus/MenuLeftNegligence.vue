<template>
  <v-list
    :class="{ 'small-menu': $vuetify.breakpoint.xs || $vuetify.breakpoint.sm }"
  >
    <v-list>
      <div v-for="(item, index) in dataLeftMenu" :key="index">
        <v-list-item v-if="!item.subs" exact :to="{ name: item.link }">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-menu v-else offset-y>
          <template v-slot:activator="{ on }">
            <v-list-item avatar v-on="on">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title v-html="item.name"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon class="icon_sub">keyboard_arrow_down</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
          <v-list>
            <v-list-item
              v-for="(val, e) in item.subs"
              :key="e"
              exact
              :to="{ name: val.link }"
            >
              <v-list-item-content>
                <v-list-item-title>{{ val.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-list>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      dataLeftMenu: [
        {
          name: "Negligence",
          icon: "desktop_mac",
          link: "MedWarPartientNegligence"
        },
        {
          name: "Injury",
          icon: "extension",
          link: "MedWarPartientInjury"
        },
        {
          name: "Proof",
          icon: "picture_in_picture",
          subs: [
            {
              name: "Practice Standard",
              link: "MedWarPractice"
            },
            {
              name: "Physician Deviation or Negligence",
              link: "MedWarPhysician"
            }
          ]
        }
      ]
    };
  },
  methods: {
    showContent() {}
  }
};
</script>
<style scoped>
.small-menu {
  width: 60px;
}
.icon_sub {
  margin-left: 160px;
}
</style>
