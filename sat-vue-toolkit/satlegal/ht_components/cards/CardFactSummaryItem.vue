<template>
  <v-card class="py-3" style="border-radius: 10px;">
    <div style="text-align:center" class="subheading">
      {{ dataFilterType.name }}
    </div>
    <div class="px-3 py-2">
      <v-row no-gutters class="align-end">
        <v-col cols="12" sm="12" lg="6">
          <v-row no-gutters>
            <div class="flex-column">
              <span class="subheading text--secondary">Total</span>
              <div class="item-round" style="background: #5a4292">
                {{ total }}
              </div>
            </div>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" lg="6">
          <v-row no-gutters class="justify-end">
            <div class="px-2 flex-column">
              <span class="font-weight-bold">C</span>
              <div class="item-round2" style="background: #469454">
                {{ characters }}
              </div>
            </div>
            <div class="px-2 flex-column">
              <span class="font-weight-bold">L</span>
              <div class="item-round2" style="background: #bec136">
                {{ location }}
              </div>
            </div>
            <div class="px-2 flex-column">
              <span class="font-weight-bold">I</span>
              <div class="item-round2" style="background: #bf3f37">
                {{ issues }}
              </div>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    type: String,
    total: Number,
    characters: Number,
    location: Number,
    issues: Number
  },
  computed: {
    ...mapGetters("ht_store/matter/type", ["types"]),
    dataFilterType() {
      return this.types.find(x => x.id == this.type) || {};
    }
  }
};
</script>

<style scoped>
.item-round {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: white;
  text-align: center;
}
.item-round2 {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: white;
  text-align: center;
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
