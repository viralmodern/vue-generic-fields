<template>
  <v-row no-gutters fill-height>
    <v-list>
      <div>
        <v-list-item>
          <v-btn block color="primary" @click="isShowAddService = true">
            <span>Add new service</span>
            <v-icon class="pl-1">mdi-add_circle</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
      </div>
      <div v-for="item in filters " :key="item.id">
        <v-list-item>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <h3 class="ml-3">Types</h3>
      <div class="filterCheckbox">
        <v-list-item v-for="item in serviceType" :key="item.id">
          <v-list-item-action>
            <v-checkbox></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-chip small :color="item.color" class="white--text pb-1">
                <span>{{item.name}}</span>
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
    <AddService :isShow="isShowAddService" @closeModal="isShowAddService = false"/>
  </v-row>
</template>
<script>
import { serviceType } from "../../config.js";
import AddService from "../dialogs/AddService"

export default {
  props: {
    mode: Boolean
  },
  components: {
    AddService
  },
  data() {
    return {
      isShowAddService: false,
      filters: [
        {
          id: Math.random(),
          name: "All services",
          icon: "calendar_view_day"
        },
        {
          id: Math.random(),
          name: "Priority services",
          icon: "change_history"
        },
        {
          id: Math.random(),
          name: "Served services",
          icon: "vpn_key"
        }
      ],
      serviceType
    };
  }
};
</script>

