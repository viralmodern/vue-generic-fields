<template>
  <v-dialog persistent :value="isShow" @input="close" width="500">
    <v-card>
      <div class="primary">
        <v-row no-gutters class="pa-3 justify-center align-center">
          <div class="title font-weight-regular white--text">
            Add feelings of fact
          </div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="close">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-card-text>
        <v-col class="px-2">
          <v-form ref="form">
            <v-col cols="12">
              <span class="text--secondary subheading">Add Characters</span>
              <ProcessTheMemberMenu
                :listMembers="character"
                :detailMembers="characterJoin"
                nameSlot="message"
                title="Characters"
                labelSearch="Search characters..."
                messageFilter="characters"
                @selectMember="removeCharacter"
                @addMembers="addCharacers"
              />
              <span v-if="requireCharacter" class="red--text"
                >Character is required</span
              >
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="comment"
                auto-grow
                rows="1"
                :rules="[v => !!v || 'Feelings is required']"
                label="Enter Feelings"
                required
                append-icon="sentiment_satisfied"
              ></v-textarea>
            </v-col>
          </v-form>
        </v-col>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn class="v-btn theme--light primary" @click="add">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

import ProcessTheMemberMenu from "@/sat-vue-toolkit/satlegal/ht_components/menus/ProcessTheMemberMenu";

export default {
  components: {
    ProcessTheMemberMenu
  },
  props: {
    isShow: Boolean
  },
  computed: {
    characterJoin() {
      return (this.character || []).filter(e => {
        return (this.characters || []).includes(e.id);
      });
    },
    ...mapGetters("ht_store/matter/character", ["character"])
  },
  data() {
    return {
      comment: "",
      characters: [],
      requireCharacter: false
    };
  },
  methods: {
    removeCharacter(data) {
      this.characters = this.characters.filter(id => id !== data.id);
    },
    addCharacers(data) {
      this.requireCharacter = false;
      this.characters.push(data.id);
    },
    clear() {
      this.comment = "";
      this.characters = [];
    },
    add() {
      if (!this.characters.length) return (this.requireCharacter = true);
      if (this.$refs.form.validate()) {
        const data = {
          comment: this.comment,
          characters: this.characters
        };
        this.$emit("submit", data);
        this.close();
      }
    },
    close() {
      this.clear();
      this.$refs.form.resetValidation();
      this.$emit("closeModel");
    }
  }
};
</script>
