<template>
  <div>
    <FilingRoomStatus
      v-if="status !== 'Not Signed'"
      :color="color"
      :status="status"
    />
    <v-menu offset-y left v-else>
      <template v-slot:activator="{ on }">
        <FilingRoomStatus :color="color" :status="status" v-on="on" />
      </template>
      <v-list>
        <v-list-item @click="$emit('upload')">
          <v-list-item-title>
            <v-row no-gutters class="align-center">
              <v-icon>backup</v-icon>&nbsp;Upload Manual
            </v-row>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="$emit('send')">
          <v-list-item-title>
            <v-row no-gutters class="align-center">
              <v-icon>send</v-icon>&nbsp;Send Request
            </v-row>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import FilingRoomStatus from "../chips/FilingRoomStatus";

export default {
  components: {
    FilingRoomStatus
  },
  props: {
    color: String,
    status: String
  }
};
</script>
