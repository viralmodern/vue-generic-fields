<template>
  <v-row no-gutters>
    <v-row no-gutters class="pl-2 pb-2">
      <a
        v-if="stage && inputAddCardOfStage !== stage"
        href
        @click.prevent="$emit('showInputAddCard', stage)"
        >+ Add a card</a
      >
    </v-row>
    <v-row no-gutters class="px-1 pb-1" v-if="inputAddCardOfStage === stage">
      <v-text-field
        label="Enter a title for this card"
        single-line
        solo
        hide-details
        v-model="cardTitle"
      ></v-text-field>
      <v-row no-gutters class="pt-2">
        <v-btn
          class="ma-0 primary text-capitalize"
          @click="addCard(stage, cardTitle)"
          >Add Card</v-btn
        >
        <v-btn class="ma-0" icon @click="hideInputAdd">
          <v-icon small class="white--text">mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-row>
    </v-row>
  </v-row>
</template>
<script>
export default {
  props: {
    addCardMenuItems: Array,
    inputAddCardOfStage: String,
    stage: String
  },
  data() {
    return {
      cardTitle: ""
    };
  },
  methods: {
    clearData() {
      this.cardTitle = "";
    },
    hideInputAdd() {
      this.clearData();
      this.$emit("emitHideInputAdd");
    },
    addCard(stage, cardTitle) {
      this.clearData();
      this.$emit("emitAddCard", stage, cardTitle);
    }
  }
};
</script>
