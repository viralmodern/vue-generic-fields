<template>
  <v-card>
    <v-card-text class="mb-2 pa-2">
      <v-row no-gutters class="flex-nowrap">
        <v-col cols="2" class="pa-0 d-flex justify-center align-center">
          <UserAvatar :name="peopleWrite" :imageUrl="avatar" :avatarSize="40" />
        </v-col>
        <v-col cols="10">
          <v-row no-gutters class="align-center">
            <span class="text-subtitle-2 mr-2">{{ title }}</span>
            <TimerLabel :time="createdAt" />
            <v-spacer></v-spacer>
            <ByzantineNoteActions :isDisabled="isDisabled" @edit="$emit('edit')" @remove="$emit('remove')" />
          </v-row>
          <div class="text-caption" v-html="content"></div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import UserAvatar from "../../avatars/UserAvatar";
import TimerLabel from "../../labels/TimerLabel";
import ByzantineNoteActions from "../../menus/ByzantineNoteActions";

export default {
  components: {
    UserAvatar,
    TimerLabel,
    ByzantineNoteActions
  },
  props: {
    id: Number,
    avatar: String,
    peopleWrite: String,
    createdAt: String,
    content: String,
    title: String,
    isDisabled: {
      type: Boolean,
      default: () => false
    }
  }
};
</script>
