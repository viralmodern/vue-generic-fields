<template>
  <v-dialog :value="true" width="1000" @input="cancel">
    <v-list class="pa-3" style="height:100%">
      <div>
        <v-row no-gutters>
          <v-col cols="6">
            <div>
              <v-text-field
                :value="detailCommunication.name"
                hide-details
                @change="
                  updateDetailCommunication({ name: $event, type: 'name' })
                "
                class="ma-0 pa-0 custom-text-field fontSize"
              ></v-text-field>
            </div>
            <Date
              class="mt-2"
              name="Date"
              :creataAt="detailCommunication.date"
              @change="
                updateDetailCommunication({ date: $event, type: 'date' })
              "
            />
            <Tags :tag="detailCommunication.tags" />
            <v-row no-gutters class="align-center">
              <span class="font-weight-medium subheading mr-3 ml-2">Initiator</span>
              <Initiator
                name="Initiator"
                :listCharacters="character"
                :initiator="detailCommunication.initiator"
                @update="
                  updateDetailCommunication({
                    initiator: $event,
                    type: 'initiator'
                  })
                "
              />
            </v-row>
            <v-row no-gutters class="align-center">
              <span class="font-weight-medium subheading mr-3 ml-2">Responder</span>
              <Responder
                name="Responder"
                :listCharacters="character"
                :responder="detailCommunication.responder"
                @update="
                  updateDetailCommunication({
                    responder: $event,
                    type: 'responder'
                  })
                "
              />
            </v-row>
          </v-col>
          <v-col cols="6">
            <div class="mt-2">
              <div class="font-weight-medium subheading">Description</div>
              <v-textarea
                hide-details
                auto-grow
                :value="detailCommunication.desc"
                class="ma-0 pa-2 custom-text-field fieldDes"
                rows="2"
                @change="
                  updateDetailCommunication({ desc: $event, type: 'desc' })
                "
              ></v-textarea>
            </div>
            <div>
              <Methods
                @updateDetailCommunication="
                  updateDetailCommunication({
                    methods: $event,
                    type: 'methods'
                  })
                "
                :itemMethods="detailCommunication.methods"
              />
            </div>
          </v-col>
        </v-row>
      </div>
      <div>
        <TableComDetail :items="detailCommunication.Childrend" />
      </div>
    </v-list>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Date from "../../ht_components/partient/profile/communication/Date";
import Tags from "../../ht_components/partient/profile/communication/Tags";
import Initiator from "../../ht_components/partient/profile/communication/Initiator";
import Responder from "../../ht_components/partient/profile/communication/Responder";
import Methods from "../../ht_components/partient/profile/communication/Methods";
import TableComDetail from "../../ht_components/partient/profile/communication/TableComDetail";
export default {
  components: {
    Initiator,
    Responder,
    Date,
    Methods,
    Tags,
    TableComDetail
  },
  computed: {
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/matter/partient/profile/detail/communication", [
      "detailCommunication"
    ])
  },
  methods: {
    ...mapActions("ht_store/matter/partient/profile/detail/communication", [
      "getDetailCommunication",
      "updateDetailCommunication"
    ]),
    cancel() {
      this.$router.push({ name: "Communication" });
    }
  },
  mounted() {
    this.getDetailCommunication();
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.fontSize /deep/ .v-text-field__slot {
  font-size: 25px;
}
.fieldDes {
  background: #eceff1;
}
</style>
