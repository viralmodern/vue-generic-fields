<template>
  <v-row no-gutters>
    <v-col>
      <h1>Comments</h1>
      <TicketComments
        v-if="dataAvailableMentions.length"
        :comments="dataTicketMessages"
        :mentions="dataAvailableMentions"
        @send="sendTicketComment"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TicketComments from "../messages/TicketComments";
import {$$STORE_PREFIX} from "../../utils";
export default {
  components: {
    TicketComments
  },
  computed: {
    ...mapGetters("ht_store/task/detail/comment", [
      "dataTicketMessages",
      "dataAvailableMentions"
    ])
  },
  methods: {
    sendTicketComment(comment) {
      const newComment = {
        user: {
          id: 1,
          fullName: "David Kendy",
          avatar:
            "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        },
        commentDate: new Date().toISOString(),
        userOnlineStatus: "online",
        comment
      };
      this.sendComment(newComment);
    },
    ...mapMutations("ht_store/task/detail/comment", ["sendComment"]),
    ...mapActions("ht_store/task/detail/comment", [
      "getDataTicketMessagesRequest",
      "getDataAvailableMentionsRequest"
    ])
  },
  mounted() {
    this.getDataTicketMessagesRequest();
    this.getDataAvailableMentionsRequest();
  }
};
</script>

