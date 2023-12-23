<template>
  <v-card>
    <v-card-text>
      <v-row no-gutters class="flex-nowrap">
        <div class="mr-3 mt-2">
          <UserAvatar :name="peopleWrite" :imageUrl="avatar" :avatarSize="40" />
        </div>
        <v-col cols="11">
          <v-row no-gutters="" class="align-center">
            <span class="title mr-2">{{ title }}</span>
            <TimerLabel :time="createdAt" />
            <v-spacer></v-spacer>
            <ByzantineNoteActions
              @edit="$emit('edit')"
              @remove="$emit('remove')"
            />
          </v-row>
          <div v-html="content"></div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import UserAvatar from "../avatars/UserAvatar";
import TimerLabel from "../labels/TimerLabel";
import ByzantineNoteActions from "../menus/ByzantineNoteActions";

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
    title: String
  }
};
</script>
