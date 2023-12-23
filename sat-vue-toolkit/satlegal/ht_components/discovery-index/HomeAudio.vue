<template>
  <v-row no-gutters>
    <v-col cols="12" v-for="item in dataAudio" :key="item.id">
      <v-row
        no-gutters
        class="justify-center align-center"
        :style="`border-left: 3px solid ${showColor(item.color)};`"
      >
        <MenuSelectColor :items="item" @selectColor="selectColor" :arrColor="listColorCommon" />
        <v-col>
          <v-row no-gutters>
            <v-text-field
              :rules="[
                v => !!v || 'This field is required',
                v => (v && v.length) >= 4 || 'wrong format'
              ]"
              :value="item.timeFrom"
              label="Time from"
              @input="changeTimeStart(item)"
              mask="##:##"
              class="pa-2 custom-text-field"
            ></v-text-field>
            <v-text-field
              :rules="[
                v => !!v || 'This field is required',
                v => (v && v.length) >= 4 || 'wrong format'
              ]"
              :value="item.timeEnd"
              label="Time to"
              @input="changeTimeEnd(item)"
              mask="##:##"
              class="pa-2 custom-text-field"
            ></v-text-field>
          </v-row>
          <v-textarea
            style="color: red;"
            hide-details
            name="input-7-1"
            :value="item.text"
            class="ma-0 pa-0 mt-1 custom-text-field input-size"
            rows="3"
            @input="updateAudio(item, $event)"
          ></v-textarea>
        </v-col>
        <v-btn icon @click="openModal(item)">
          <v-icon>mdi-delete_outline</v-icon>
        </v-btn>
      </v-row>
      <v-divider class="mt-2 mb-2"></v-divider>
    </v-col>
    <div>
      <v-btn class="primary" v-if="!isShow" @click="showTextarea">
        <v-icon class="mr-2">add</v-icon>Add a piece of text audio
      </v-btn>
      <div v-else>
        <AddInlineTextArea
          class="py-2"
          placeholder="Enter to add new piece of text audio..."
          @add="add"
          @close="closeAdd"
        />
      </div>
    </div>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteConfirm"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this item?"
    />
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
import ConfirmItem from "../dialogs/ConfirmItem";
import MenuSelectColor from "../menus/MenuSelectColor";
import AddInlineTextArea from "../inputs/AddInlineTextArea";
import { listColorCommon } from "../../config";

export default {
  components: {
    ConfirmItem,
    MenuSelectColor,
    AddInlineTextArea
  },
  props: {
    dataAudio: Array
  },
  data() {
    return {
      isShowPopup: false,
      itemDelete: null,
      listColorCommon,
      isShow: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/index/detailIndex", [
      "deleteItemAudio",
      "selectColor",
      "updateAudioText",
      "createNewAudioText",
      "changeTimeStart",
      "changeTimeEnd"
    ]),
    showColor(e) {
      return this.listColorCommon.filter(x => x.id === e)[0].text;
    },
    showTextarea() {
      this.isShow = true;
    },
    add(e) {
      const data = {
        id: Math.random(),
        timeFrom: e.startTime,
        timeEnd: e.endTime,
        text: e.text,
        color: 1
      };
      this.createNewAudioText(data);
    },
    closeAdd() {
      this.isShow = false;
    },
    updateAudio(e, v) {
      this.updateAudioText({ e, v });
    },
    deleteConfirm() {
      this.isShowPopup = false;
      this.deleteItemAudio(this.itemDelete);
    },
    openModal(val) {
      this.isShowPopup = true;
      this.itemDelete = val;
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.input-size {
  width: 100%;
  font-size: 13px;
}
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
</style>
