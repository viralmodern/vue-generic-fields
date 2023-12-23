<template>
  <div>
    <v-menu
      :close-on-content-click="false"
      :close-on-click="false"
      v-model="uiShowChatBot"
      offset-y
      top
      right
    >
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on" dark small fixed bottom right fab>
          <v-icon small>mdi-message</v-icon>
        </v-btn>
      </template>
      <v-card flat>
        <keep-alive>
          <ChatRoom />
        </keep-alive>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import ChatRoom from './ChatRoom'

export default {
  name: 'TheBubbleChatBot',
  components: { ChatRoom },
  mounted() {},
  data() {
    return {
      uiShowChatBot: false,
    }
  },
  events: {
    closeChatBot(evt, param) {
      this.uiShowChatBot = false
    },
  },
}
</script>

<style scoped></style>
