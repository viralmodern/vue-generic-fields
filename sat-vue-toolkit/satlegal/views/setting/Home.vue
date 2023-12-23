<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-tabs>
        <v-tab v-for="(item, index) in tabsGeneral" :key="index">{{
          item.name
        }}</v-tab>
        <v-row no-gutters class="justify-end">
          <v-btn to="settings/admin" color="primary">administration</v-btn>
        </v-row>
        <v-tab-item>
          <FormGeneral />
        </v-tab-item>
        <v-tab-item>
          <ListNotifySettings
            :dataNotifications="dataNotifications"
            :loadingNitify="loadingNitify"
            @changestatusActive="changestatusActive"
          />
        </v-tab-item>
        <v-tab-item>3</v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import FormGeneral from "../../ht_components/setting/FormGeneral";
import ListNotifySettings from "../../ht_components/list/ListNotifySettings";
import {$$STORE_PREFIX} from "../../utils";
export default {
  components: {
    ListNotifySettings,
    FormGeneral
  },
  data() {
    return {
      tabsGeneral: [
        {
          name: "General "
        },
        {
          name: "Notification"
        },
        {
          name: "Profile"
        }
      ]
    };
  },
  methods: {
    ...mapActions("ht_store/adminSetting", ["getDataNotificationsRequest"]),
    changestatusActive(value) {
      return value;
    }
  },
  computed: {
    ...mapGetters("ht_store/adminSetting", ["dataNotifications", "loadingNitify"])
  },
  mounted() {
    this.getDataNotificationsRequest();
  }
};
</script>
