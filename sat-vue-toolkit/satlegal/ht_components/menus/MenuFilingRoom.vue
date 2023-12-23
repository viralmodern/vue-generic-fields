<template>
  <v-btn class="ma-0" color="primary" outlined>
    <v-icon>link</v-icon>TASK
  </v-btn>
</template>
<script>

export default {
  props: {
    dataProjectMembers: Array,
    dataLabelProject: Array,
    availableMentions: Array,
    ticketMessages: Array
  },
  data() {
    return {
      menu: false,
      title: "",
      description: "",
      aaaaa: null
    };
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
        mentions: [
          {
            id: 18091,
            name: "johnwilliams",
            displayName: "John Williams"
          },
          {
            id: 17801,
            name: "sarahash",
            displayName: "Sara Hashing"
          },
          {
            id: 17802,
            name: "steve_har",
            displayName: "Steve Harmiton"
          },
          {
            id: 17803,
            name: "david_jr",
            displayName: "David Gink"
          },
          {
            id: 17804,
            name: "roma_jang",
            displayName: "Roma Jangunor"
          }
        ],
        commentDate: "2019-01-20T17:00:00.000Z",
        userOnlineStatus: "online",
        comment:
          "Hi @sarahash,\nHere is latest version of today meeting.\nBig thanks to @johnwilliams for pulling it together."
      };
      newComment.commentDate = new Date().toISOString();
      newComment.comment = comment;
      this.$emit("emitDataComment", newComment);
    }
  },
  computed: {
    checkHasMore() {
      return this.dataProjectMembers.length === 10 ? 10 : 8;
    },
    nameSymbol: function() {
      let countRest = this.dataProjectMembers.length - this.checkHasMore;
      if (countRest < 99) {
        return "+" + countRest;
      }
      return 99 + "+";
    }
  }
};
</script>
