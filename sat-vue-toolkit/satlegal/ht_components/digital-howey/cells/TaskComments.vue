<template>
  <td>
    <a href="#" @click="getComment">{{dataRow[column.name]}} comment(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <TicketComments :comments="dataComment" :mentions="[]" @send="sendTicketComment"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TicketComments from "../../messages/TicketComments";

export default {
  data() {
    return {
      showDialog: false
    };
  },
  components: {
    TicketComments
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task/comment", ["dataComment"])
  },
  methods: {
    getComment() {
      this.showDialog = true;
      this.getDataCommentRequest();
    },
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
      const result = await this.addCommentRequest(data);
      if (result) {
        this.$emit("update", this.dataRow[this.column.name] + 1);
      }
    },
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task/comment", [
      "getDataCommentRequest",
      "addCommentRequest",
      "removeCommentRequest"
    ])
  }
};
</script>
