<template>
  <v-list>
    <v-col cols="12" v-if="$route.params.checklistId">
      <v-list class="v-list">
        <v-row no-gutters class="align-center" style="height: 60px;">
          <v-btn icon :to="routeLinkGoBack" exact>
            <v-icon>mdi-arrow_back</v-icon>
          </v-btn>
        </v-row>
      </v-list>
      <v-divider class="mb-2" />
      <router-view></router-view>
    </v-col>

    <v-col cols="12" v-else>
      <FilterContent
        v-if="newCheckList.length > 0"
        @checkBoxItem="checkBoxItem"
        @filterCheckboxType="filterCheckboxType"
        @updateLabels="$emit('updateLabels', $event)"
        :isCheckAll="isCheckAll"
        :nameFilters="isCheckAll ? 'All' : 'None'"
        :indeterminate="indeterminate"
        :dataLabels="dataLabels"
        :arrId="arrId"
      />
      <v-divider />

      <v-list v-for="(item, index) in newCheckList" :key="index" two-line>
        <ItemCheckList
          :item="item"
          @checkBoxItem="checkBoxItem"
          @updateStar="evt => $emit('updateStar', evt)"
        />
        <v-divider />
      </v-list>

      <v-list v-if="newCheckList.length === 0">
        <span class="subheading ml-3">Do not find suitable results!</span>
      </v-list>
    </v-col>
  </v-list>
</template>
<script>
import ItemCheckList from "./ItemCheckList";
import FilterContent from "./FilterContent";
export default {
  data() {
    return {
      newCheckList: [],
      arrId: []
    };
  },
  components: {
    ItemCheckList,
    FilterContent
  },
  props: {
    items: Array,
    dataLabels: Array,
    detailCheckList: Object
  },

  computed: {
    isCheckAll() {
      return this.newCheckList.length > 0
        ? this.newCheckList.every(x => x.isCheckbox === true)
        : false;
    },

    indeterminate() {
      return this.newCheckList.every(x => x.isCheckbox === false);
    },

    routeLinkGoBack() {
      var { projectId, depositionId } = this.$route.params;
      return `/project/${projectId}/discovery-deposition/detail/${depositionId}/checklist`;
    }
  },

  mounted() {
    this.newCheckList = this.items;
  },

  methods: {
    // ___ handle checkbox by filter
    filterCheckboxType(item) {
      this.newCheckList = this.newCheckList.map(x => {
        if (item.name === "All") {
          return { ...x, isCheckbox: true };
        } else if (item.name === "None") {
          return { ...x, isCheckbox: false };
        } else if (item.name === "Starred") {
          return { ...x, isCheckbox: x.starred ? true : false };
        } else if (item.name === "Unstarred") {
          return { ...x, isCheckbox: !x.starred ? true : false };
        }
      });
      this.handleArrayId(this.newCheckList);
    },

    // ___ handle checkbox select all or random
    checkBoxItem(item) {
      this.newCheckList = this.newCheckList.map(m => {
        if (item.pk) {
          if (item.pk === m.pk) {
            return { ...m, isCheckbox: !item.isCheckbox };
          }
          return m;
        } else {
          return { ...m, isCheckbox: !item };
        }
      });
      this.handleArrayId(this.newCheckList);
    },

    // __ Get the necessary array of ids & emit
    handleArrayId(arrCheckList) {
      this.arrId = arrCheckList
        .filter(f => f.isCheckbox === true)
        .map(m => m.pk);
      this.$emit("checkboxMultipeId", this.arrId);
    }
  },
  watch: {
    items(arr) {
      this.newCheckList = arr;
    }
  }
};
</script>
