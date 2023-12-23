<template>
  <div>
    <TicketComments
      v-if="dataCharacterMap.length"
      :comments="dataComments"
      :mentions="dataCharacterMap"
      @send="sendComment"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TicketComments from "../../messages/TicketComments";

export default {
  components: {
    TicketComments
  },
  computed: {
    dataCharacterMap() {
      const result = (this.character || []).map(x => ({
        ...x,
        name: x.avatar.nickName,
        displayName: x.name
      }));
      return result;
    },
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/matter/discovery/evidences/detail/comment", ["dataComments"])
  },
  methods: {
    async sendComment(comment) {
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
      this.sendCommentRequest(data);
    },
    ...mapActions("ht_store/matter/discovery/evidences/detail/comment", [
      "sendCommentRequest"
    ])
  }
};
</script>
