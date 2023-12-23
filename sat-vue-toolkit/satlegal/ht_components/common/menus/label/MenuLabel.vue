<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
    offset-x
    top
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on: onMenu }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: onTooltip }">
          <AddIcon
            :on="{ ...onMenu, ...onTooltip }"
            @onClickIcon="$emit('onOpenMenu')"
            :colorIcon="valid ? 'red' : ''"
            :style="`${valid ? 'border-color:red' : ''}`"
            :icon="icon"
          />
        </template>
        <span>{{ textTooltip }}</span>
      </v-tooltip>
    </template>
    <div>
      <v-card>
        <v-card-title class="py-2">
          <span class="title">{{ title }}</span>
          <v-spacer></v-spacer>
          <v-btn @click="menu = false" class="ma-0" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pb-2">
          <EditLabel
            v-if="isEditting"
            :loading="isLoadingUpdate"
            @closeAdd="isEditting = false"
            @submit="updateLabel({ id: itemEdit[keyId], ...$event })"
            :text="itemEdit[keyText]"
            :color="itemEdit[keyColor]"
          />
          <addNewLabel
            v-else-if="isAdd"
            :loading="isLoadingAdd"
            @closeAdd="isAdd = false"
            @submit="addLabel"
          />
          <div v-else>
            <div class="search-input pb-3">
              <v-text-field
                placeholder="Search"
                autofocus
                v-model="search"
                solo
                append-icon="mdi-magnify"
                hide-details
              />
            </div>
            <div class="search-input pb-3" v-if="descForm">
              <v-textarea
                label="Description"
                :value="description"
                rows="2"
                @blur="$emit('changeDesc', $event.target.value)"
              ></v-textarea>
            </div>
            <div class="label-item px-1">
              <div v-if="!list.length" class="pt-3 black--text mx-1">
                No matching results
              </div>
              <Sniper :isLoading="isLoadingGet" />
              <LabelRow
                v-for="(item, index) in list"
                :key="index"
                :color="item[keyColor]"
                :text="item[keyText]"
                :check="item.check"
                @choseLabel="$emit('choseLabel', item)"
                @openEdit="openEdit(item)"
                @onDelete="idLabelDelete= item[keyId] ; isShowPopupDelete = true"
              />
              <ConfirmItem
               :isShowPopup="isShowPopupDelete"
               @remove="remove"
               @cancel="isShowPopupDelete= false"
               messageConfirm="Are you sure you want to delete this item?"
              />
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="mx-2">
          <v-btn
            v-if="!isAdd && !isEditting"
            class="mb-2 primary"
            block
            small
            @click="openAdd"
            >{{ nameAdd }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </v-menu>
</template>

<script>
import addNewLabel from "./FormLabel";
import EditLabel from "./FormLabel";
import LabelRow from "./LabelRow";
import AddIcon from "../../buttons/AddIcon";
import Sniper from "../../loadings/Sniper";
import ConfirmItem from "../../../dialogs/ConfirmItem";

export default {
  components: {
    addNewLabel,
    EditLabel,
    LabelRow,
    AddIcon,
    Sniper,
    ConfirmItem
  },
  props: {
    listLabels: Array,
    labels: Array,
    title: String,
    keyId: String,
    keyColor: String,
    keyText: String,
    nameAdd: String,
    icon: String,
    textTooltip: String,
    keySearch: String,
    valid: Boolean,
    isLoadingGet: Boolean,
    descForm: Boolean,
    description: String,
    isLoadingAdd: Boolean,
    isLoadingUpdate: Boolean,
  },
  computed: {
    list() {
      const checked = this.labels.reduce((result, current) => {
        result[current[this.keyId]] = { ...current };
        return result;
      }, {});
      const dataSearch = this.listLabels.filter(x => {
        const text = x[this.keySearch || this.keyText];
        return (
          (text || "").toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
      const result = dataSearch.map(x => {
        if (checked[x[this.keyId]]) {
          return { ...x, check: true };
        }
        return { ...x, check: false };
      });
      return result;
    }
  },
  data() {
    return {
      isAdd: false,
      isEditting: false,
      itemEdit: {},
      idLabelDelete: "",
      menu: false,
      search: "",
      isShowPopupDelete: false,
    };
  },
  methods: {
    addLabel(dataForm) {
      this.search = "";
      this.$emit("addLabel", {dataForm, closeAdd: this.closeAdd});
    },
    updateLabel(dataForm) {
      this.$emit("updateLabel", {dataForm, closeUpdate: this.closeUpdate});
    },
    openEdit(item) {
      this.itemEdit = { ...item };
      this.isEditting = true;
      this.isAdd = false;
    },
    openAdd() {
      this.isAdd = true;
      this.isEditting = false;
    },
    closeAdd() {
      this.isAdd = false;
    },
    closeUpdate() {
      this.isEditting = false;
    },
    remove() {
      this.$emit("removeLabel", this.idLabelDelete);
      this.isShowPopupDelete = false;
    }
  }
};
</script>

<style scoped>
.search-input /deep/ .v-input__control {
  min-height: 35px;
}
.label-item {
  max-height: 250px;
  overflow-y: auto;
}
</style>
