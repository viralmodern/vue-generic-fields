<template>
  <v-row no-gutters>
    <v-col>
      <v-list subheader two-line v-for="(item, index) in dataNotifications" :key="index">
        <v-subheader v-if="item.name">{{item.name}}</v-subheader>
        <v-list-item v-for="e in item.data" :key="e.title" class="list-group-item">
          <v-row  no-gutters>
            <v-col cols="12">
              <ListItemNotification
                :active="e.active"
                :subTitle="e.subTitle"
                :title="e.title"
                @changestatusActive="value => $emit('changestatusActive', value)"
              />
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>
<script>
import ListItemNotification from "./ListItemNotification";
export default {
  components: {
    ListItemNotification
  },
  props: {
    dataNotifications: Array,
    loadingNitify: Boolean
  }
};
</script>