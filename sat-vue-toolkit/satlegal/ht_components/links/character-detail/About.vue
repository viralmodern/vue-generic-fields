<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-row class="py-4 px-2">
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">
              mdi-rename-box
            </v-icon>
            <v-text-field
              :value="characterDetail.first_name"
              label="Fist Name"
              placeholder="Fist Name"
              :rules="[v => !!v || 'This field is required']"
              @change="updateCharacterDetail('first_name', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="px-3">
            <v-icon class="mr-2">
              mdi-rename-box
            </v-icon>
            <v-text-field
              :value="characterDetail.last_name"
              label="Last Name"
              placeholder="Last Name"
              :rules="[v => !!v || 'This field is required']"
              @change="updateCharacterDetail('last_name', $event)"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <p>Date of Birth:</p>
          <ChooseBirthday
            :max="new Date().toISOString()"
            :date="characterDetail.birthday"
            title="Birthday"
            :isActions="true"
            @update="updateCharacterDetail('birthday', $event)"
          />
        </v-col>
        <v-col cols="6">
          <p>Age:</p>
          <span class="text-no-wrap text-caption">{{
            characterDetail.birthday
              ? new Date().getFullYear() -
                new Date(characterDetail.birthday).getFullYear()
              : "-"
          }}</span>
        </v-col>
        <v-col cols="6">
          <p>Deposition:</p>
          {{characterDetail.deposition.length}}
          <AddIcon
            @onClickIcon="$emit('onClickDeposition')"
            icon="mdi-view-list"
          />
        </v-col>
        <v-col cols="6">
          <p>Discovery Request:</p>
          {{characterDetail.request_sets ? characterDetail.request_sets.length : 0}}
          <AddIcon
            @onClickIcon="$emit('onClickDiscoveryRequest')"
            icon="mdi-view-list"
          />
        </v-col>
        <v-col cols="6">
          <p>Members:</p>
          <Members
            textTooltip="Assigned Members"
            :value="characterDetail.members"
            @update="updateCharacterDetail('members', $event)"
            @onOpenMenu="$emit('openMenuMember')"
          />
        </v-col>
        <v-col cols="6">
          <p>Phone:</p>
          <Phones
            class="detail-character"
            :listPhone="characterDetail.phone"
            @update="updateCharacterDetailAsync"
            :isLoading="isLoadingUpdate"
          />
        </v-col>
        <v-col cols="6">
          <p>Email:</p>
          <Emails
            class="detail-character"
            :listEmail="characterDetail.emails"
            @update="updateCharacterDetailAsync"
            :isLoading="isLoadingUpdate"
          />
        </v-col>
        <v-col cols="6">
          <p>Related to Legal Issue:</p>
          <Issue
            lengthDisplay="2"
            class="custom-chip"
            :value="characterDetail.legal_issues"
            @update="updateCharacterDetail('legal_issues', $event)"
          />
        </v-col>
        <v-col cols="6">
          <p>Tag:</p>
          <Tags
            lengthDisplay="2"
            class="custom-chip"
            :value="characterDetail.tags"
            @update="updateCharacterDetail('tags', $event)"
          />
        </v-col>
        <v-col cols="6">
          <p>Note:</p>
          <Notes :totalNotes="characterDetail.total_notes" :characterId="characterDetail.pk" />
        </v-col>
        <v-col cols="6">
          <p>Character Type:</p>
          <SelectLabel
            textTooltip="Add type"
            title="Character Type"
            :lengthDisplay="2"
            :value="characterDetail.character_types"
            :labels="appConfigs.characterType"
            multiple
            @chooseLabel="updateCharacterDetail('character_types', $event)"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.CHARACTER_FAVORABLE]"
            label="Favorable"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="characterDetail.favorable"
            @change="updateCharacterDetail('favorable', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.CHARACTER_DISCLOSEDBY]"
            label="Disclosed By"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="characterDetail.disclosed_by"
            @change="updateCharacterDetail('disclosed_by', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
            label="Credibility"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="characterDetail.credibility"
            @change="updateCharacterDetail('credibility', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.CHARACTER_POSITION]"
            label="Character Position"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="characterDetail.position"
            @change="updateCharacterDetail('position', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.CHARACTER_LOCATED]"
            label="Located"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="characterDetail.located"
            @change="updateCharacterDetail('located', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.CHARACTER_AVAILABILITY]"
            label="Availablility"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="characterDetail.availability"
            @change="updateCharacterDetail('availability', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.CHARACTER_SERVED]"
            label="Served"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="characterDetail.served"
            @change="updateCharacterDetail('served', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
            label="Value Level"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="characterDetail.value_level"
            @change="updateCharacterDetail('value_level', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <v-col cols="6">
          <SelectChip
            :items="appConfigChoices[appConfigConstants.COMMON_LEVEL]"
            label="Relevant Level"
            item-text="label"
            item-value="value"
            icon="mdi-format-indent-increase"
            item-color="color"
            :value="characterDetail.relevant_level"
            @change="updateCharacterDetail('relevant_level', $event)"
            :rules="[v => !!v || 'This field is required']"
          />
        </v-col>
        <!-- <v-col cols="6">
          <SelectChip
            :items="appConfigs.factBolean"
            label="Key character"
            item-text="name"
            item-value="id"
            icon="toggle_on"
            item-color="color"
            :value="characterDetail.key_character"
            @change="characterDetail.key_character = $event"
            :rules="[
              v => ![null, undefined].includes(v) || 'This field is required'
            ]"
          />
        </v-col> -->
        <v-col cols="12">
          <p>Value Important Index:</p>
          <v-slider
            prepend-icon="mdi-swap-horizontal"
            :value="characterDetail.important"
            @change="updateCharacterDetail('important', $event)"
            :thumb-size="20"
            thumb-label="always"
            class="pt-3"
          ></v-slider>
        </v-col>
        <v-col cols="12">
          <p>Relevant Index:</p>
          <v-slider
            prepend-icon="mdi-swap-horizontal"
            :value="characterDetail.relevant"
            @change="updateCharacterDetail('relevant', $event)"
            :thumb-size="20"
            thumb-label="always"
            class="pt-3"
          ></v-slider>
        </v-col>
        <v-col cols="12">
          <v-textarea
            prepend-icon="mdi-map-marker"
            name="input-7-1"
            label="Location"
            rows="2"
            :value="characterDetail.location"
            @change="updateCharacterDetail('location', $event)"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-textarea
            prepend-icon="mdi-format-list-bulleted"
            rows="2"
            name="input-7-1"
            label="Background"
            :value="characterDetail.background"
            @change="updateCharacterDetail('background', $event)"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";

import { mapGetters, mapActions } from "vuex";
import SelectChip from "../../inputs/SelectChip";
import Issue from "../../common/menus/Issue";
import Tags from "../../common/menus/Tags";
import Members from "../../common/menus/Members";
import Emails from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Emails";
import Phones from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/Phones";
import SelectLabel from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/SelectLabel";
import AddIcon from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/AddIcon";
import ChooseBirthday from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/ChooseBirthday";
import Notes from "@/sat-vue-toolkit/satlegal/views/CAF/Character/components/Notes";

export default {
  mixins: [appConfigMixin],
  data() {
    return {
      valid: false,
      isLoadingUpdate: false,
    };
  },
  components: {
    SelectChip,
    Issue,
    Tags,
    Members,
    Emails,
    Phones,
    SelectLabel,
    AddIcon,
    ChooseBirthday,
    Notes,
  },
  computed: {
    ...mapGetters("ht_store/matter/character2", ["characterDetail"]), // eslint-disable-line
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]) // eslint-disable-line
  },
  methods: {
    updateCharacterDetail(name, value) {
      if (this.$refs.form.validate()) {
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            characterId: this.characterDetail.pk
          },
          body: {
            [name]: value
          }
        };
        this.updateCharacterDetailRequest(data);
      }
    },
    async updateCharacterDetailAsync(body) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          characterId: this.characterDetail.pk,
        },
        body
      };
      try {
        this.isLoadingUpdate = true;
        await this.updateCharacterDetailAsyncRequest(data);
        this.isLoadingUpdate = false;
      } catch (error) {
        this.isLoadingUpdate = false;
      }
    },
    ...mapActions("ht_store/matter/character2", ["updateCharacterDetailRequest", "updateCharacterDetailAsyncRequest"]), // eslint-disable-line
  },
};
</script>
<style scoped>
.save_button {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.custom-chip /deep/ .v-chip {
  max-width: 80px;
}
</style>
