<template>
  <div>
    <v-navigation-drawer
      :value="isShow"
      @input="$emit('closeMenuRight', $event)"
      :right="true"
      fixed
      class="fill-height"
      temporary
      width="45%"
    >
      <v-row class="header-right">
        <v-col cols="10" class="pl-7">
          <span >Fields</span>
        </v-col>
        <v-col cols="2 text-right">
          <v-btn
            text
            icon
            color="white"
            @click="$emit('closeMenuRight', false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div class="phong">
        <v-list dense>
          <v-form ref="form" v-model="valid">
            <v-row class="py-4 px-2">
              <v-col cols="6">
                <p>Provided by:</p>
                <CharacterSingles
                  textTooltip="Provided by"
                  :value="detailEvidences.provided_by"
                  @update="detailEvidences.provided_by = $event"
                />
              </v-col>
              <v-col cols="6">
                <p>Tags:</p>
                <Tags
                  :value="detailEvidences.tags"
                  @update="detailEvidences.tags = $event"
                  @onOpenMenu="$emit('openMenuTag')"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="detailEvidences.name"
                  label="Name"
                  placeholder="Name"
                  :rules="[v => !!v || 'This field is required']"
                >
                  <v-icon slot="prepend" color="red">mdi-create</v-icon>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <SelectChip
                  :items="appConfigs.factBolean"
                  label="Disputed"
                  item-text="name"
                  icon="toggle_on"
                  item-value="id"
                  item-color="color"
                  :value="detailEvidences.disputed"
                  @change="detailEvidences.disputed = $event"
                  :rules="[
                    v =>
                      ![null, undefined].includes(v) || 'This field is required'
                  ]"
                />
              </v-col>
              <v-col cols="6">
                <SelectChip
                  :items="appConfigs.favorableEvidences"
                  label="Favorable"
                  item-text="label"
                  icon="equalizer"
                  item-value="value"
                  item-color="color"
                  :value="detailEvidences.favorable"
                  @change="detailEvidences.favorable = $event"
                  :rules="[
                    v =>
                      ![null, undefined].includes(v) || 'This field is required'
                  ]"
                />
              </v-col>
              <v-col cols="6">
                <SelectChip
                  :items="appConfigs.level"
                  label="Relevant level"
                  item-text="name"
                  icon="mdi-format-indent-increase"
                  item-value="id"
                  item-color="color"
                  :value="detailEvidences.relevance_level"
                  @change="detailEvidences.relevance_level = $event"
                  :rules="[v => !!v || 'This field is required']"
                />
              </v-col>
              <v-col cols="6">
                <SelectChip
                  :items="appConfigs.level"
                  label="Materiality level"
                  item-text="name"
                  icon="credit_card"
                  item-value="id"
                  item-color="color"
                  :value="detailEvidences.materiality_level"
                  @change="detailEvidences.materiality_level = $event"
                  :rules="[v => !!v || 'This field is required']"
                />
              </v-col>
              <v-col cols="6">
                <SelectChip
                  :items="appConfigs.level"
                  label="Admissibility level"
                  item-text="name"
                  icon="label_important"
                  item-value="id"
                  item-color="color"
                  :value="detailEvidences.admissibility_level"
                  @change="detailEvidences.admissibility_level = $event"
                  :rules="[v => !!v || 'This field is required']"
                />
              </v-col>
              <v-col cols="12">
                <p>Relevance:</p>
                <v-slider
                  prepend-icon="mdi-swap-horizontal"
                  v-model="detailEvidences.relevance"
                  :thumb-size="20"
                  thumb-label="always"
                  class="pt-3"
                ></v-slider>
              </v-col>

              <v-col cols="12">
                <p>Materiality:</p>
                <v-slider
                  prepend-icon="mdi-swap-horizontal"
                  v-model="detailEvidences.materiality"
                  :thumb-size="20"
                  thumb-label="always"
                  class="pt-3"
                ></v-slider>
              </v-col>
              <v-col cols="12">
                <p>Admissibility:</p>
                <v-slider
                  prepend-icon="mdi-swap-horizontal"
                  v-model="detailEvidences.admissibility"
                  :thumb-size="20"
                  thumb-label="always"
                  class="pt-3"
                ></v-slider>
              </v-col>
            </v-row>
          </v-form>
        </v-list>
      </div>
      <div class="save_button">
        <v-btn
          @click="save"
          class="ma-2"
          :loading="loadingUpdate"
          tile
          color="indigo"
          dark
          >Save</v-btn
        >
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SelectChip from "../inputs/SelectChip";
import CharacterSingles from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/CharacterSingles";
import Tags from "../common/menus/Tags";

export default {
  props: {
    isShow: Boolean,
    title: String
  },
  components: {
    SelectChip,
    CharacterSingles,
    Tags
  },
  data() {
    return {
      valid: false,
      showEvidenceDetail: false,
      detailEvidences: {
        name: "",
        disputed: null,
        relevance_level: null,
        materiality_level: null,
        relevance: null,
        admissibility_level: null,
        favorable: null,
        materiality: null,
        admissibility: null,
        provided_by: null,
        provided_by_character: 1,
        tags: []
      },
      loadingUpdate: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/evidences", ["updateEvidencesDetailRequest"]),
    ...mapActions("ht_store/matter/character2", ["getAllDataCharacterRequest"]),
    save() {
      if (this.$refs.form.validate()) {
        this.loadingUpdate = true;
        const data = {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          item: this.detailEvidences,
          pk: this.evidencesDetail.pk
        };
        this.updateEvidencesDetailRequest(data).then(() => {
          this.loadingUpdate = false;
        });
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/evidences", ["evidencesDetail"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs", "appConfigChoices", "appConfigConstants"]),
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    this.getAllDataCharacterRequest({matterId});
  },
  watch: {
    evidencesDetail: {
      handler(val) {
        if (val) {
          this.detailEvidences = {
            name: val.name,
            disputed: val.disputed,
            relevance_level: val.relevance_level,
            materiality_level: val.materiality_level,
            relevance: val.relevance,
            admissibility_level: val.admissibility_level,
            favorable: val.favorable,
            materiality: val.materiality,
            admissibility: val.admissibility,
            provided_by: val.provided_by,
            provided_by_character: 1,
            tags: val.tags
          };
        }
      }
    },
    isShow: {
      handler(val) {
        if (val) {
          this.showEvidenceDetail = val;
        }
      }
    },
    showEvidenceDetail: {
      handler(val) {
        if (!val) {
          this.$emit("closeMenuRight");
        }
      }
    }
  }
};
</script>
<style scoped>
.save_button {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.header-right {
  background-color: #6d42c7;
  color: white;
  display: flex;
  align-items: center;
}
</style>
