<template>
  <v-row no-gutters>
    <v-col cols="12">
      <HeaderCheckList @pagingFilters="evt => $emit('pagingFilters', evt)" />
    </v-col>
    <v-col cols="12">
      <v-row no-gutters>
        <v-col cols="3">
          <MenuLeftCheckList
            :dataLabels="dataLabels"
            @pagingFilters="evt => $emit('pagingFilters', evt)"
          >
            <template slot="AddCheckListMenu">
              <slot name="addCheckList"></slot>
            </template>
          </MenuLeftCheckList>
        </v-col>
        <v-col cols="9">
          <ContentCheckList
            :dataLabels="dataLabels"
            :items="dataCheckList"
            @checkboxMultipeId="e => $emit('checkboxMultipeId', e)"
            @updateLabels="$emit('updateLabels', $event)"
            @updateStar="evt => $emit('updateStar', evt)"
          />
          <v-col
            cols="12"
            class="text-xs-right pa-2"
            v-if="$route.name === 'depositionChecklist'"
          >
            <v-pagination
              v-if="totals > 1"
              v-model="page"
              :length="totals"
              :total-visible="7"
            ></v-pagination>
          </v-col>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
const pageSize = 20;
import MenuLeftCheckList from "./menu/MenuLeftCheckList";
import HeaderCheckList from "./HeaderCheckList";
import ContentCheckList from "./ContentCheckList";

export default {
  components: {
    MenuLeftCheckList,
    HeaderCheckList,
    ContentCheckList
  },
  props: {
    dataCheckList: Array,
    dataLabels: Array,
    totalPagination: Number
  },
  data() {
    return {
      page: 1
    };
  },
  computed: {
    totals() {
      return Math.ceil((this.totalPagination / pageSize).toFixed(1)) || 1;
    }
  },
  watch: {
    page: {
      handler(v) {
        this.$emit("pagingFilters", { name: "page", req: v });
      }
    }
  }
};
</script>
