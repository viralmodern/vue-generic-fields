<template>
  <v-menu v-model="isShow" :close-on-content-click="false" offset-x>
    <template v-slot:activator="{ on }">
      <v-row no-gutters v-on="on">
        <v-chip class="pa-0" v-for="item in val" :key="item.id" label>{{
          item.name
        }}</v-chip>
        <v-btn icon>
          <v-icon>mdi-add_circle_outline</v-icon>
        </v-btn>
      </v-row>
    </template>
    <v-col cols="12">
      <v-card>
        <v-row no-gutters>
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
              v-for="(item, index) in list"
              :key="index"
              class="mt-1"
            >
              <v-list-item avatar ripple @click.prevent>
                <v-list-item-avatar class="border" @click="chooseSubject(item)">
                  <v-icon v-if="item.check">done</v-icon>
                </v-list-item-avatar>
                <v-list-item-content @click="chooseSubject(item)" class="ml-2">
                  <v-row no-gutters class="align-center">
                    <v-list-item-content>
                      <v-list-item-title v-html="item.name"></v-list-item-title>
                    </v-list-item-content>
                  </v-row>
                </v-list-item-content>

                <v-list-item-action>
                  <v-menu>
                    <v-icon v-slot:activator="{ on }">more_vert</v-icon>
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
              <v-btn color="primary" small block @click="addSubject"
                >Add new subject</v-btn
              >
            </v-list-item>
          </v-list>
          <FormSubject
            v-if="isShowAdd"
            @addNewSubject="addNewSubject"
            @closeAdd="closeAdd"
          />
          <FormSubject
            v-if="isShowEdit"
            @closeAdd="closeAdd"
            :item="itemSubject"
            @editSubject="editSubject"
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
import FormSubject from "./FormSubject";
export default {
  props: {
    value: Object,
    items: Array,
    type: String,
    title: String,
    labelSearch: String,
    itemlists: Array
  },
  data() {
    return {
      isShow: false,
      searchQuery: "",
      newValue: {},
      isShowPopup: false,
      itemSubject: {},
      isShowList: true,
      isShowAdd: false,
      isShowEdit: false
    };
  },
  components: {
    ConfirmItem,
    FormSubject
  },
  methods: {
    chooseSubject(val) {
      this.newValue = val;
      this.$emit("chooseValue", this.newValue);
    },
    remove(data) {
      this.isShowPopup = true;
      this.itemSubject = data;
    },
    deleteConfirm() {
      this.$emit("deleteSubject", this.itemSubject.id);
      this.isShowPopup = false;
    },
    addSubject() {
      this.isShowList = false;
      this.isShowAdd = true;
    },
    addNewSubject(data) {
      this.$emit("addNewSubject", data);
      this.closeAdd();
    },
    closeAdd() {
      this.isShowList = true;
      this.isShowAdd = false;
      this.isShowEdit = false;
    },
    edit(item) {
      this.itemSubject = item;
      this.isShowEdit = true;
      this.isShowList = false;
      this.isShowAdd = false;
    },
    editSubject(data) {
      this.$emit("editSubject", data);
      this.closeAdd();
    }
  },
  computed: {
    val() {
      return this.itemlists.filter(x =>
        this.value.subjectMatter.includes(x.id)
      );
    },
    list() {
      const result = this.items.map(x => {
        if (this.value.subjectMatter.includes(x.id)) {
          return { ...x, check: true };
        }
        return { ...x, check: false };
      });
      return result;
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
