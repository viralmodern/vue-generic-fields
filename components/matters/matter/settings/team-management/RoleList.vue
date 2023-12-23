<template>
  <div>
    <v-subheader class="px-0">
      Roles govern access and permissions for team members.
    </v-subheader>
    <v-card falt>
      <v-list dense>
        <template v-for="(item, index) in workspaceMemberRole">
          <v-list-item :key="item.value">
            <v-list-item-avatar>
              <v-icon>mdi-account-key</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.label }}</v-list-item-title>
              <v-list-item-subtitle>
                <!--                {{item.detail['description']}}-->
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-eye</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
            <!--<v-list-item-action>
              <v-btn>
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </v-list-item-action>-->
          </v-list-item>
          <v-divider
            v-if="index !== workspaceMemberRole.length - 1"
            :key="item.value + 'divider'"
            inset
          ></v-divider>
        </template>
        <!--{{workspaceMemberRole}}-->
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RoleList',
  computed: {
    ...mapGetters({
      workspaceMemberRole: 'appConfigs/workspaceMemberRole'
    })
  }
}
</script>

<style scoped></style>
