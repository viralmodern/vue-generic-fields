<template>
  <v-row no-gutters>
    <v-col cols="12">
      <span class="text-h5 ml-2">References</span>
      <v-btn outlined icon color="primary" @click="showDialogs">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12" class="mt-3">
      <v-row no-gutters>
        <v-col cols="12">
          <v-row class="align-center" no-gutters>
            <v-col sm="2" v-for="n in dataDocument" :key="n.id" class="mt-2">
              <v-card>
                <v-row class="align-center" no-gutters>
                  <img
                    width="50"
                    height="70"
                    src="../../assets/pdf.png"
                    alt="pdf"
                  />
                  <span>{{ n.urlName }}</span>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <AddReference
      :isShow="isShow"
      @closeDialog="closeDialog"
      @emitAddReference="data => $emit('emitAddReference', data)"
      :dataDocument="dataDocument"
    />
  </v-row>
</template>
<script>
import AddReference from "../dialogs/AddReference";
export default {
  components: {
    AddReference
  },
  props: {
    dataDocument: Array
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    showDialogs() {
      this.isShow = true;
    },
    closeDialog() {
      this.isShow = false;
    }
  }
};
</script>

<style scoped>
.v-img-pdf {
  cursor: pointer;
}
</style>
