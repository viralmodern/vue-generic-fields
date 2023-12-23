<template>
  <v-list>
    <v-row no-gutters>
      <v-col cols="3">
        <v-row no-gutters>
          <span class="subheading font-weight-regular pa-2"
            >Availilable List</span
          >
          <v-divider light></v-divider>
          <AvailableList
            v-if="Object.keys(dataLinkedCharacter).length"
            :items="dataLinkedCharacter && dataLinkedCharacter"
          />
        </v-row>
      </v-col>
      <v-col cols="9" class="mt-3">
        <v-row no-gutters>
          <v-row no-gutters>
            <v-col cols="6" v-for="(item, index) in userJoinCard" :key="index">
              <CardRelationship class="ma-2" :items="item" />
            </v-col>
          </v-row>
          <v-row no-gutters class="justify-end">
            <v-btn color="primary" @click="toggleExpansion">
              <v-icon class="mr-1">mdi-clear_all</v-icon>
              Toggle {{ isShowPanel === false ? "On" : "Off" }} All
            </v-btn>
          </v-row>
          <CharacterMapping
            class="ma-2"
            :nameUser="dataProfile.name"
            :characterMapping="characterIsSupported && characterIsSupported"
            :panel="panel"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-list>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AvailableList from "../../../ht_components/list/AvailableList";
import CardRelationship from "../../../ht_components/cards/CardRelationship";
import CharacterMapping from "../../../ht_components/panels/CharacterMapping";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  components: {
    AvailableList,
    CardRelationship,
    CharacterMapping
  },
  data() {
    return {
      panel: [],
      isShowPanel: false,
      userJoinCard: []
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/linkedCharacter", ["dataLinkedCharacter"]),
    ...mapGetters("ht_store/matter/character/characterProfile", [
      "listRelationship",
      "characterMapping",
      "dataProfile"
    ]),
    characterIsSupported() {
      return (
        this.characterMapping &&
        this.characterMapping.map(x => {
          const listSupported = this.dataLinkedCharacter.filter(y =>
            x.listSupported.includes(y.id)
          );
          return { ...x, listSupported };
        })
      );
    }
  },
  methods: {
    ...mapActions("ht_store/matter/linkedCharacter", ["getDataLinkedCharacter"]),
    ...mapActions("ht_store/matter/character/characterProfile", [
      "addMappingSupport",
      "getDataProfileCharacter"
    ]),
    addMapping() {
      const data = {
        id: Math.random(),
        creator: "User A support user ()",
        panel: false,
        support: [{ id: Math.random(), name: "Support", list: [] }]
      };
      this.addMappingSupport(data);
    },
    toggleExpansion() {
      this.isShowPanel = !this.isShowPanel;
      this.panel = this.characterMapping.map(x => {
        if (x) {
          return this.isShowPanel === true ? true : false;
        }
      });
    }
  },
  async mounted() {
    await this.getDataLinkedCharacter();
    await this.getDataProfileCharacter();
    this.panel = this.characterMapping.map(x => x.panel);
    this.userJoinCard = this.listRelationship.map(a => {
      const user = this.dataLinkedCharacter.filter(b =>
        a.userHasARelationship.includes(b.id)
      );
      return { ...a, user };
    });
  }
};
</script>
