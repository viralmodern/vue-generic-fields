<template>
  <v-dialog :value="isShow" @input="$emit('closeModal')" persistent width="700">
    <v-card>
      <div class="primary">
        <v-row no-gutters class=" justify-center align-center pa-3">
          <div class="title font-weight-regular white--text">{{titlePopup}}</div>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="$emit('closeModal')">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <FormMatterHearing
        :submitName="submitName"
        @cancel="$emit('closeModal')"
        @submit="$emit('submit', $event)"
      />
    </v-card>
  </v-dialog>
</template>
<script>
import FormMatterHearing from "../forms/FormMatterHearing";

export default {
  components: {
    FormMatterHearing
  },
  props: {
    isShow: Boolean,
    titlePopup: String,
    submitName: String
  }
};
</script>

