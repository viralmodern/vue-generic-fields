<template>
  <v-row no-gutters>
    <v-col>
      <h1>Comments</h1>
      <TicketComments :comments="dataComment" :mentions="[]" @send="sendTicketComment"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TicketComments from "../../messages/TicketComments";

export default {
  components: {
    TicketComments
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task/comment", ["dataComment"])
  },
  methods: {
    async sendTicketComment(comment) {
      const data = {
        id: Math.random(),
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
      this.addCommentRequest(data);
    },
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task/comment", [
      "getDataCommentRequest",
      "addCommentRequest",
      "removeCommentRequest"
    ])
  },
  mounted() {
    this.getDataCommentRequest();
  }
};
</script>

