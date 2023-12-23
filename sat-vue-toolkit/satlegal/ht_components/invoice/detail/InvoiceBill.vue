<template>
  <div>
    <SelectInline
      :item="joinClient"
      :items="dataClient"
      keyText="name"
      keyColor="color"
      nudge-width="250"
      @select="$emit('update', {client: $event.id})"
    >
      <template slot="section">
        <div class="title">
          <v-row no-gutters class="align-center">
            <span>Bill to</span>
            <v-btn icon>
              <v-icon>mdi-autorenew</v-icon>
            </v-btn>
          </v-row>
        </div>
      </template>
      <template slot="menu" slot-scope="props">
        <UserAvatar
          :avatarSize="32"
          :imageUrl="props.item.user.imageUrl || null"
          :name="props.item.user.name || ''"
        />
        <span>&nbsp;&nbsp;&nbsp;&nbsp;{{props.item.user.name}}</span>
        <v-spacer></v-spacer>
        <v-icon v-if="props.item.id === joinClient.id">done</v-icon>
      </template>
    </SelectInline>

    <v-row class="py-1" no-gutters>
      <v-col cols="3" class="font-weight-medium">Name</v-col>
      <v-col cols="1" class="font-weight-medium">:</v-col>
      <v-col cols="8">{{(joinClient.user || {}).name}}</v-col>
    </v-row>
    <v-row class="py-1" no-gutters>
      <v-col cols="3" class="font-weight-medium">Gender</v-col>
      <v-col cols="1" class="font-weight-medium">:</v-col>
      <v-col cols="8">{{(joinClient.address || {}).gender}}</v-col>
    </v-row>
    <v-row class="py-1" no-gutters>
      <v-col cols="3" class="font-weight-medium">City</v-col>
      <v-col cols="1" class="font-weight-medium">:</v-col>
      <v-col cols="8">{{(joinClient.address || {}).city}}</v-col>
    </v-row>
    <v-row class="py-1" no-gutters>
      <v-col cols="3" class="font-weight-medium">Street</v-col>
      <v-col cols="1" class="font-weight-medium">:</v-col>
      <v-col cols="8">{{(joinClient.address || {}).street}}</v-col>
    </v-row>
  </div>
</template>

<script>
import UserAvatar from "../../avatars/UserAvatar";
import SelectInline from "../../menus/SelectInline";

export default {
  components: {
    UserAvatar,
    SelectInline
  },
  props: {
    joinClient: Object,
    dataClient: Array
  }
};
</script>
