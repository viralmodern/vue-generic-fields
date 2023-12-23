<template>
  <v-menu
    v-model="isShow"
    :close-on-content-click="false"
    :nudge-width="310"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <slot name="showItem" :item="val" v-on="on"></slot>
    </template>
    <v-col cols="12">
      <v-card>
        <v-row  no-gutters>
          <v-col cols="12" d-flex>
            <span class="text-xs-center text-h5 pa-1">{{ title }}</span>
            <v-icon size="20" @click="isShow = false" class="icon-close mt-1"
              >close</v-icon
            >
          </v-col>
          <v-divider></v-divider>
          <v-list style="width:100%" v-if="isShowList">
            <v-col cols="12">
              <v-row class="mt-2  justify-center" no-gutters>
                <v-col cols="11" style="height: 55px">
                  <v-text-field
                    :label="labelSearch"
                    @input="$emit('searchText', searchQuery)"
                    v-model="searchQuery"
                    single-line
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              v-for="(item, index) in items"
              :key="index"
              class="mt-1"
            >
              <v-list-item avatar ripple @click.prevent>
                <v-list-item-avatar
                  class="border"
                  @click="chooseLocation(item)"
                >
                  <v-icon v-if="item.id === (value.location || value.id)"
                    >done</v-icon
                  >
                </v-list-item-avatar>
                <v-list-item-content @click="chooseLocation(item)" class="ml-2">
                  <v-row no-gutters class="align-center">
                    <v-list-item-content v-if="type === 'location'">
                      <v-list-item-title v-html="item.name"></v-list-item-title>
                      <v-list-item-subtitle
                        v-html="item.address"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-row>
                </v-list-item-content>

                <v-list-item-action>
                  <v-menu>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">more_vert</v-icon>
                    </template>
                    <v-list>
                      <v-list-item @click.stop="edit(item)">
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click.stop="remove(item)">
                        <v-list-item-title>Delete</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
              </v-list-item>
            </v-col>
            <v-col
              cols="11"
              d-flex
              class="mt-2 ml-3 err-span"
              v-if="items.length === 0"
            >
              <v-list-item class="text-xs-center">
                <slot name="showMessageSearch"></slot>
              </v-list-item>
            </v-col>
            <v-list-item class="my-2">
              <v-btn color="primary" small block @click="addLocation"
                >Add new location</v-btn
              >
            </v-list-item>
          </v-list>
          <FormLocation
            v-if="isShowAdd"
            @addNewLocation="addNewLocation"
            @closeAdd="closeAdd"
          />
          <FormLocation
            v-if="isShowEdit"
            @closeAdd="closeAdd"
            :item="itemLocation"
            @editLocation="editLocation"
          />
        </v-row>
      </v-card>
      <ConfirmItem
        :isShowPopup="isShowPopup"
        @remove="deleteConfirm"
        @cancel="isShowPopup = false"
        messageConfirm="Are you sure you want to delete this item?"
      />
    </v-col>
  </v-menu>
</template>
<script>
import ConfirmItem from "../dialogs/ConfirmItem";
import FormLocation from "./FormLocation";
export default {
  props: {
    value: Object,
    items: Array,
    type: String,
    title: String,
    labelSearch: String
  },
  data() {
    return {
      isShow: false,
      searchQuery: "",
      newValue: {},
      isShowPopup: false,
      itemLocation: {},
      isShowList: true,
      isShowAdd: false,
      isShowEdit: false
    };
  },
  components: {
    ConfirmItem,
    FormLocation
  },
  methods: {
    chooseLocation(val) {
      this.newValue = val.id !== this.value.id ? val : {};
      this.$emit("chooseValue", this.newValue);
    },
    remove(data) {
      this.isShowPopup = true;
      this.itemLocation = data;
    },
    deleteConfirm() {
      this.$emit("deleteLocation", this.itemLocation.id);
      this.isShowPopup = false;
    },
    addLocation() {
      this.isShowList = false;
      this.isShowAdd = true;
    },
    addNewLocation(data) {
      this.$emit("addLocation", data);
      this.closeAdd();
    },
    closeAdd() {
      this.isShowList = true;
      this.isShowAdd = false;
      this.isShowEdit = false;
    },
    edit(item) {
      this.itemLocation = item;
      this.isShowEdit = true;
      this.isShowList = false;
      this.isShowAdd = false;
    },
    editLocation(data) {
      this.$emit("editLocation", data);
      this.closeAdd();
    }
  },
  computed: {
    val() {
      return (
        this.items.find(
          x => x.id === (this.value.location || this.value.id)
        ) || {
          name: "(no location)"
        }
      );
    }
  },
  mounted() {
    this.newValue = this.value;
  }
};
</script>
<style scoped>
.icon-close {
  position: absolute;
  right: 5px;
  top: 0px;
}
.err-span {
  width: 310px;
  height: 100px;
}
.border /deep/ .v-avatar {
  border: 1px solid silver;
}
</style>
