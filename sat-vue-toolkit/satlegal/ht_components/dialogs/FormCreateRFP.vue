<template>
  <v-dialog
    :value="isShowPopup"
    scrollable
    @input="closeDialog"
    persistent
    width="450"
  >
    <v-card>
      <div class="primary">
        <v-row no-gutters class="pa-3 justify-center align-center">
          <div class="title font-weight-regular white--text">{{ header }}</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="closeDialog">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-text id="content" class="pa-1">
        <v-form ref="form" v-model="valid">
          <v-row class="px-3 py-2" no-gutters>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                label="Name"
                :rules="[v => !!v || 'This field is required']"
                append-icon="person_outline"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="my-2" v-if="stageAdd.field !== 'sources'">
              <div class="text--secondary subheading">Source</div>
              <div>
                <MenuListSource
                  :tag="sources"
                  :tags="dataSource"
                  keyText="name"
                  title="List source"
                  nameAdd="Add new source"
                  @add="addSource"
                  @update="updateSource"
                  @remove="removeSource"
                  @chose="sources = $event"
                />
              </div>
            </v-col>
            <v-col cols="12" class="my-2">
              <v-row no-gutters class="align-center">
                <span class="text--secondary subheading">Produced</span>
                &nbsp;&nbsp;
                <v-switch
                  hide-details
                  class="ma-0"
                  v-model="produced"
                ></v-switch>
              </v-row>
            </v-col>
            <v-col cols="12">
              <SelectMultipleUser
                label="Characters"
                :user="docs_characters"
                :users="dataCharacters"
                @change="docs_characters = $event"
                item-value="id"
                itemText="avatar.name"
                itemImg="avatar.imageUrl"
                multiple
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="step_to_locate"
                label="Step to locate"
                auto-grow
                rows="1"
                append-icon="description"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <SelectChip
                :items="appConfigs.destroyedType.filter(x => x.value !== null)"
                label="Destroyed"
                item-text="name"
                item-value="value"
                item-color="color"
                :value="destroyed"
                @change="destroyed = $event"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="add" :loading="isLoadingAdd">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MenuListSource from "../menus/MenuListSource";
import SelectChip from "../inputs/SelectChip";
import SelectMultipleUser from "../inputs/SelectMultipleUser";

export default {
  components: {
    MenuListSource,
    SelectChip,
    SelectMultipleUser
  },
  props: {
    isShowPopup: Boolean,
    header: String,
    stageAdd: Object,
    appConfigs: Object,
    dataSource: Array,
    dataCharacters: Array,
    isLoadingAdd: Boolean,
  },
  data() {
    return {
      valid: false,
      name: "",
      sources: [],
      produced: false,
      step_to_locate: "",
      destroyed: null,
      docs_characters: []
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [
      "dataDepositionDetail"
    ])
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.name,
          sources: this.sources,
          produced: this.produced,
          step_to_locate: this.step_to_locate,
          destroyed: this.destroyed,
          docs_characters: this.docs_characters
        };
        this.$emit("submit", data);
      }
    },
    clear() {
      this.name = "";
      this.sources = [];
      this.produced = false;
      this.step_to_locate = "";
      this.destroyed = null;
      this.docs_characters = [];
      this.$refs.form.resetValidation();
    },
    // Source
    addSource({ name }) {
      const data = {
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk
        },
        body: {
          sources: name
        }
      };
      this.addSourceRequest(data);
    },
    updateSource({ id: sourceId, name }) {
      const data = {
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
          sourceId
        },
        body: {
          sources: name
        }
      };
      this.updateSourceRequest(data);
    },
    removeSource(sourceId) {
      const data = {
        matterId: this.dataDepositionDetail.matter,
        depositionId: this.dataDepositionDetail.pk,
        sourceId
      };
      this.removeSourceRequest(data);
    },
    ...mapActions("ht_store/matter/discovery/deposition/source", [
      "addSourceRequest",
      "updateSourceRequest",
      "removeSourceRequest"
    ])
  },
  watch: {
    isShowPopup(isOpen) {
      if (this.stageAdd.field !== "all") {
        if (isOpen) {
          if (Array.isArray(this[this.stageAdd.field])) {
            this[this.stageAdd.field] = [this.stageAdd.value];
          } else {
            this[this.stageAdd.field] = this.stageAdd.value;
          }
        } else {
          if (Array.isArray(this[this.stageAdd.field])) {
            this[this.stageAdd.field] = [];
          } else {
            this[this.stageAdd.field] = "";
          }
          this.$refs.form.resetValidation();
        }
      }
    }
  }
};
</script>
