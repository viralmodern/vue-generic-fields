<template>
  <td>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <template v-slot:activator="{ on }">
        <a v-on="on" href="#">{{dataRow.ticketMessages.length}} comment(s)</a>
      </template>
      <v-card>
        <v-card-text>
          <TicketComments
            v-if="dataAvailableMentions.length"
            :comments="dataRow.ticketMessages"
            :mentions="dataAvailableMentions"
            @send="sendTicketComment"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TicketComments from "../messages/TicketComments";

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
    ...mapGetters("ht_store/task/detail/comment", ["dataAvailableMentions"])
  },
  methods: {
    sendTicketComment(comment) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
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
        }
      };
      this.updateTask(data);
    },
    ...mapActions("ht_store/task/list", ["updateTask"]),
    ...mapActions("ht_store/task/detail/comment", ["getDataAvailableMentionsRequest"])
  },
  mounted() {
    this.getDataAvailableMentionsRequest();
  }
};
</script>
