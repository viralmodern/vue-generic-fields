<template>
  <v-list>
    <div class="mt-2 ml-2 mr-2">
      <v-row no-gutters class="align-center">
        <v-btn v-if="!isShow" @click="isShow = true" block color="primary">
          <v-icon>mdi-add</v-icon>
          <span>Add category</span>
        </v-btn>
        <AddInline
          @close="isShow = false"
          v-else
          outlined
          @add="
            $emit('addCategory', {
              id: Math.random(),
              name: $event,
              children: []
            })
          "
          style="width:300px"
          class="py-2"
          :hint="`Enter to add new category`"
        />
      </v-row>
      <v-text-field
        v-model="searchQuery"
        label="Search category"
        single-line
        outline
      />
    </div>
    <template v-for="(item, index) in newDataCategory">
      <v-list-item ripple @click="filterUserByList(item)" :key="item.name">
        <v-list-item-content>
          <v-row class="align-center" no-gutters>
            <v-icon
              :color="`${item.isActive === true ? 'primary' : ''}`"
              class="mr-2"
              >mdi-list</v-icon
            >
            <v-list-item-title
              align-center
              style="width: 45%;"
              :class="`${item.isActive === true ? 'primary--text' : ''}`"
              >{{ item.name }}</v-list-item-title
            >
            <span
              :class="`${item.isActive === true ? 'primary--text ml-2' : ''}`"
              >({{ item.children.length }})</span
            >
            <AddCategoryCalause
              :btnBlock="false"
              @createCategoryUser="data => $emit('createCategoryUser', data)"
            />
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-divider
        v-if="index + 1 < newDataCategory.length"
        :key="index"
      ></v-divider>
    </template>
    <span class="ml-3 text-body-2" v-if="newDataCategory.length === 0"
      >No categories found</span
    >
  </v-list>
</template>
<script>
import AddInline from "../../../ht_components/inputs/AddInline";
import AddCategoryCalause from "../../../ht_components/dialogs/AddCategoryCalause";
export default {
  components: {
    AddInline,
    AddCategoryCalause
  },
  props: {
    dataCategory: Array
  },
  data() {
    return {
      searchQuery: "",
      isShow: false
    };
  },
  methods: {
    filterUserByList(x) {
      this.$emit("filterUserByList", x);
    },
    searchText(text) {
      this.searchQuery = text;
    }
  },
  computed: {
    newDataCategory() {
      if (this.searchQuery) {
        return this.dataCategory.filter(item => {
          return item.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        });
      } else {
        return this.dataCategory;
      }
    }
  }
};
</script>
