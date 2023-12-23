<template>
  <v-dialog :value="true" width="1300" @input="cancel">
    <v-list style="height:100%">
      <div>
        <v-row no-gutters>
          <v-col class="px-3" cols="9" style="border-right:1px solid #d8d5d5cf">
            <div>
              <v-text-field
                :value="dataPrescribesDetail.name"
                @change="updatePrescribesDetailRequest({ name: $event })"
                hide-details
                class="ma-0 pa-0 custom-text-field fontSize"
              ></v-text-field>
            </div>
            <div class="mt-2">
              <div class="font-weight-medium subheading">Dosage And Time</div>
              <v-textarea
                hide-details
                auto-grow
                @change="
                  updatePrescribesDetailRequest({ dosageAndTime: $event })
                "
                :value="dataPrescribesDetail.dosageAndTime"
                class="ma-0 pa-2 custom-text-field fieldDes"
                rows="2"
              ></v-textarea>
            </div>
            <div class="mt-2">
              <div class="font-weight-medium subheading">
                Special Instructions
              </div>
              <SpecialInstructions
                :content="dataPrescribesDetail.specialInstructions"
                @update="
                  updatePrescribesDetailRequest({ specialInstructions: $event })
                "
              />
            </div>
            <div class="mt-2">
              <v-tabs>
                <v-tab key="Prescribes">Side Effects</v-tab>
                <v-tab key="LinkedRecords">Linked Records</v-tab>
                <v-tab key="Attachment">Attachment</v-tab>
                <v-tab-item class="pa-3" key="Prescribes">
                  <SideEffects />
                </v-tab-item>
                <v-tab-item class="pa-3" key="LinkedRecords"
                  >Linked Records</v-tab-item
                >
                <v-tab-item class="pa-3" key="Attachment">
                  <Attachment
                    :attachment="dataPrescribesDetail.attachment"
                    @update="
                      updatePrescribesDetailRequest({ attachment: $event })
                    "
                  />
                </v-tab-item>
              </v-tabs>
            </div>
          </v-col>
          <v-col cols="3">
            <DateStarted
              name="Date Started"
              class="pl-2 pb-2"
              :dateStarted="dataPrescribesDetail.dateStarted"
              :dateStopped="dataPrescribesDetail.dateStopped"
              @update="updatePrescribesDetailRequest({ dateStarted: $event })"
            />
            <DateStopped
              name="Date Stopped"
              class="pl-2 pb-2"
              :dateStarted="dataPrescribesDetail.dateStarted"
              :dateStopped="dataPrescribesDetail.dateStopped"
              @update="updatePrescribesDetailRequest({ dateStopped: $event })"
            />
            <DropdownCharacters
              name="Prescribing Physician"
              class="pl-2 pb-2"
              :value="dataPrescribesDetail.prescribingPhysician"
              :list="character"
              @update="
                updatePrescribesDetailRequest({ prescribingPhysician: $event })
              "
            />
            <Tags
              :tag="dataPrescribesDetail.tags"
              @change="updatePrescribesDetailRequest({ tags: $event })"
            />
            <v-row no-gutters class="pl-2 pb-2 align-center">
              <v-col cols="6">
                <span class="font-weight-medium subheading">Refill Number</span>
              </v-col>
              <v-col cols="6">{{ dataPrescribesDetail.refillNumber }}</v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-list>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Tags from "../../ht_components/partient/profile/agreement/Tags";
import DateStarted from "../../ht_components/partient/profile/prescribes/DateStarted";
import DateStopped from "../../ht_components/partient/profile/prescribes/DateStopped";
import DropdownCharacters from "../../ht_components/partient/profile/prescribes/DropdownCharacters";
import SpecialInstructions from "../../ht_components/partient/profile/prescribes/SpecialInstructions";
import SideEffects from "../../ht_components/partient/profile/prescribes/SideEffects";
import Attachment from "../../ht_components/partient/profile/prescribes/Attachment";
export default {
  components: {
    Tags,
    DateStarted,
    DateStopped,
    DropdownCharacters,
    SpecialInstructions,
    SideEffects,
    Attachment
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/profile/detail/prescribes/detail", [
      "dataPrescribesDetail"
    ]),
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    cancel() {
      this.$router.push({ name: "PartientPrescribes" });
    },
    ...mapActions("ht_store/matter/partient/profile/detail/prescribes/detail", [
      "getDataPrescribesDetailRequest",
      "updatePrescribesDetailRequest"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"])
  },
  mounted() {
    this.getDataPrescribesDetailRequest();
    this.getDataCharacterRequest();
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
