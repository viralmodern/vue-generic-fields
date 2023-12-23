<template>
  <div class="mx-2 my-12">
    <MaterialPanel panelTitle="Overview deposition" :hiddenEdit="true">
      <div class="px-4 py-2" v-if="dataDepositionDetail">
        <div class="py-2">
          <v-row no-gutters>
            <v-col cols="10">
              <h4>Deposition Location</h4>
              <span class="pt-2">
                <v-text-field
                  hide-details
                  :value="dataDepositionDetail.location"
                  @change="update('location', $event)"
                  class="ma-0 pa-0 custom-text-field"
                ></v-text-field>
              </span>
            </v-col>
            <v-col cols="2">
              <MenuCharacters
                style="flex-wrap: unset;"
                :value="dataDepositionDetail.members"
                :listCharacters="dataMembersNotExitsCurrentUser"
                @select="update('members', $event)"
              />
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
        <div class="py-2">
          <v-row no-gutters class="align-items-center justify-center">
            <v-col cols="6">
              <span class="text-subtitle-1 font-weight-bold"
                >Deposition Length: </span
              >
              <v-menu top offset-y>
                <template v-slot:activator="{ on }">
                  <span v-on="on" class="pl-2">{{
                    dataDepositionDetail.length
                  }}</span>
                </template>
                <v-list class="px-3">
                  <v-slider
                    class="mt-8"
                    style="width:200px"
                    :value="dataDepositionDetail.length"
                    @change="update('length', $event)"
                    :thumb-size="24"
                    :max="7"
                    step="0.5"
                    thumb-label="always"
                  ></v-slider>
                </v-list>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <div class="py-1">
                <span class="text-subtitle-1 font-weight-bold pr-2"
                  >Deposition Method:</span
                >
                <SelectInline
                  :item="joinMethods"
                  :items="appConfigs.depositionMethod"
                  keyText="name"
                  keyColor="color"
                  class="select"
                  @select="update('method', $event.value)"
                />
              </div>
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
        <div class="py-1">
          <h4>Deposition Description</h4>
          <div class="text--secondary">
            <NotebookEditor
              placeholder="Type your description here..."
              :item="dataDepositionDetail.desc"
              @change="update('desc', $event)"
              :debonce="1000"
            />
          </div>
        </div>
      </div>
    </MaterialPanel>
  </div>
</template>
<script>
import MaterialPanel from "../../panels/MaterialPanel";
import MenuCharacters from "../../menus/MenuCharacters";
import SelectInline from "../../menus/SelectInline";
import NotebookEditor from "../../editor/EditorDebounce";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    MaterialPanel,
    MenuCharacters,
    SelectInline,
    NotebookEditor
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/deposition/detail", [
      "editDataDespositionDetailRequest"
    ]),
    update(column, value) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          despositionId: this.dataDepositionDetail.pk,
        },
        body: {
          [column]: value,
        }
      }
      this.editDataDespositionDetailRequest(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [
      "dataDepositionDetail"
    ]),
    ...mapGetters("ht_store/project/members", ["dataMembersNotExitsCurrentUser"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    joinMethods() {
      return (
        (this.appConfigs.depositionMethod || []).find(
          x => x.value === (this.dataDepositionDetail || []).method
        ) || {}
      );
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
</style>
