<template>
  <v-dialog :value="true" width="1300" @input="cancel">
    <v-list style="height:100%">
      <div>
        <v-row no-gutters>
          <v-col class="px-3" cols="9" style="border-right:1px solid #d8d5d5cf">
            <div>
              <v-text-field
                :value="dataAgreementDetail.name"
                @change="updateAgreementDetailRequest({ name: $event })"
                hide-details
                class="ma-0 pa-0 custom-text-field fontSize"
              ></v-text-field>
            </div>
            <div class="mt-2">
              <div class="font-weight-medium subheading">Description</div>
              <v-textarea
                hide-details
                auto-grow
                @change="updateAgreementDetailRequest({ description: $event })"
                :value="dataAgreementDetail.description"
                class="ma-0 pa-2 custom-text-field fieldDes"
                rows="2"
              ></v-textarea>
            </div>
            <div class="mt-2">
              <v-tabs>
                <v-tab key="Content">Agreement Content</v-tab>
                <v-tab key="Highlight">Highlight</v-tab>
                <v-tab key="Signature">Signature</v-tab>
                <v-tab-item class="pa-3" key="Content">
                  <AgreementContent
                    :content="dataAgreementDetail.content"
                    @change="updateAgreementDetailRequest({ content: $event })"
                  />
                </v-tab-item>
                <v-tab-item class="pa-3" key="Highlight">
                  <Highlight />
                </v-tab-item>
                <v-tab-item class="pa-3" key="Signature">
                  <SignatureList />
                </v-tab-item>
              </v-tabs>
            </div>
          </v-col>
          <v-col cols="3">
            <DateOfAgreement
              :creataAt="dataAgreementDetail.creataAt"
              @change="updateAgreementDetailRequest({ creataAt: $event })"
            />
            <Tags
              :tag="dataAgreementDetail.tags"
              @change="updateAgreementDetailRequest({ tags: $event })"
            />
            <DropdownCharacters
              name="Defendant Party"
              class="pl-2 pb-2"
              :value="dataAgreementDetail.defendantParty"
              :list="character"
              @update="updateAgreementDetailRequest({ defendantParty: $event })"
            />
            <DropdownCharacters
              name="Plaintiff Party"
              class="pl-2 pb-2"
              :value="dataAgreementDetail.plaintiffParty"
              :list="character"
              @update="updateAgreementDetailRequest({ plaintiffParty: $event })"
            />
          </v-col>
        </v-row>
      </div>
    </v-list>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DateOfAgreement from "../../ht_components/partient/profile/agreement/DateOfAgreement";
import Tags from "../../ht_components/partient/profile/agreement/Tags";
import Highlight from "../../ht_components/partient/profile/agreement/Highlight";
import AgreementContent from "../../ht_components/partient/profile/agreement/AgreementContent";
import SignatureList from "../../ht_components/partient/profile/agreement/SignatureList";
import DropdownCharacters from "../../ht_components/partient/profile/prescribes/DropdownCharacters";

export default {
  components: {
    DateOfAgreement,
    Tags,
    Highlight,
    AgreementContent,
    SignatureList,
    DropdownCharacters
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/profile/detail/agreementDetail", [
      "dataAgreementDetail"
    ]),
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  methods: {
    cancel() {
      this.$router.push({ name: "PartientAgreement" });
    },
    ...mapActions("ht_store/matter/partient/profile/detail/agreementDetail", [
      "getDataAgreementDetailRequest",
      "updateAgreementDetailRequest"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"])
  },
  mounted() {
    this.getDataAgreementDetailRequest();
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
