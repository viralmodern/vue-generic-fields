<template>
  <div class="flex">
    <v-row no-gutters class="fill-height justify-start">
      <div class="flex">
        <CardListProject />
        <!--<CreateProjectForm/>-->
      </div>
    </v-row>
  </div>
</template>

<script>
import CardListProject from "../project/components/CardListProject";
export default {
  name: "DashBoard",
  components: { CardListProject },

  metaInfo: {
    title: "Dash Board"
  },
  data() {
    return {
      avatar: "",
      isLetGetStarted: true
    };
  },
  created() {},
  mounted() {
    this.$eventHub.$emit(this.$eventTypes.ModalOnBoard, true);
  },
  computed: {}
};
</script>

<style scoped></style>
