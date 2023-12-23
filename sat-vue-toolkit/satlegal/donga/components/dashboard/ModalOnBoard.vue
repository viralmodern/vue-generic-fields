<template>
  <v-row no-gutters class="justify-center">
    <v-dialog v-model="dialog" persistent max-width="75%">
      <v-card style="overflow-x: hidden">
        <!--<v-card-title class="text-h5">Let's Get Started</v-card-title>-->
        <v-card-text>
          <slot />
        </v-card-text>
        <v-card-actions class="px-0">
          <v-spacer></v-spacer>
          <!--<v-btn color="green darken-1"  @click.stop="modalBtnClick(false)">Disagree</v-btn>-->
          <v-btn
            color="green darken-1"
            class="text-capitalize"
            @click.stop="modalBtnClick(false)"
            >Skip now</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "ModalOnBoard",
  data() {
    return {
      dialog: false
    };
  },
  created() {
    this.$eventHub.$on(this.$eventTypes.ModalOnBoard, isOpen => {
      this.dialog = isOpen;
    });
  },
  methods: {
    modalBtnClick(isAgree) {
      return this.$eventHub.$emit(this.$eventTypes.ModalOnBoard, isAgree);
    }
  }
};
</script>

<style scoped></style>
