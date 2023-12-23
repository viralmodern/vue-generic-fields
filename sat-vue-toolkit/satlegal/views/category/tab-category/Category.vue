<template>
  <v-row no-gutters>
    <v-col cols="3" class="right">
      <CategoryList
        @addCategory="addCategory"
        @filterUserByList="filterUserByList"
        :dataCategory="dataCategory"
      />
    </v-col>
    <v-col cols="3" class="right">
      <CategoryListUser
        @removeUserInCateogry="removeUser"
        @showContentCategory="showContentCategory"
        @createCategoryUser="addCategoryUser"
        :userByList="userByList"
      />
    </v-col>
    <v-col cols="6">
      <CategoryContent
        :contentCat="contentCat"
        :dataCategory="dataCategory"
        :itemCategory="objUser"
        @changeItemCategory="changeItemCategory"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CategoryList from "./CategoryList";
import CategoryListUser from "./CategoryListUser";
import CategoryContent from "./CategoryContent";

export default {
  components: {
    CategoryList,
    CategoryListUser,
    CategoryContent
  },
  data() {
    return {
      userByList: [],
      contentCat: null,
      objUser: null
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/category", ["dataCategory"])
  },
  methods: {
    ...mapActions("ht_store/matter/category", [
      "getDataCategory",
      "activeList",
      "removeUserInCateogry",
      "addCategory",
      "createCategoryUser"
    ]),
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]),
    changeItemCategory(data) {
      return data;
    },
    addCategoryUser(data) {
      this.createCategoryUser(data).then(() => {
        this.resetData();
      });
    },
    removeUser(item) {
      this.removeUserInCateogry({ item, objUser: this.objUser }).then(() => {
        this.resetData();
      });
    },
    filterUserByList(x) {
      this.userByList = x.children;
      this.objUser = x;
      this.activeList(x);
    },
    showContentCategory(data) {
      this.contentCat = data;
    },
    resetData() {
      this.userByList = this.dataCategory.find(
        x => x.id === this.objUser.id
      ).children;
    }
  },
  mounted() {
    this.getDataCategory().then(() => {
      this.userByList = this.dataCategory[0].children;
      this.objUser = this.dataCategory[0];
      this.activeList(this.objUser);
    });
    this.getDataMemberRequest();
  }
};
</script>
<style scoped>
.right {
  border-right: 1px solid silver;
}
.left {
  border-left: 1px solid silver;
}
</style>
