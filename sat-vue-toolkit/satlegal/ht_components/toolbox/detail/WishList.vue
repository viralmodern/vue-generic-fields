<template>
  <div>
    <div class="font-weight-medium subheading">Wishlist</div>
    <SlickTable
      @update:pagination="updatePagination"
      :totals="totals"
      :items="dataWishList"
      :headers="headers.filter(x=> x.visible)"
      class="py-2"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateWishList(props.dataRow.id, props.column.name, $event)"
          @remove="removeWishList(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <div>
          <v-btn dark color="primary" @click="isShowCreate = true">
            Add new
            <v-icon dark>mdi-add</v-icon>
          </v-btn>
          <FormCreateWishList
            :isShowPopup="isShowCreate"
            :character="character"
            :dataTags="tag"
            :dataCharacters="character"
            header="Add new wishlist"
            @closeModal="isShowCreate = false"
            @submit="addWishlist"
          />
        </div>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdWishName from "./cells/TdWishName";
import TdWishDes from "./cells/TdWishDes";
import TdCharacters from "./cells/TdCharacters";
import TdTags from "./cells/TdTags";
import TdAction from "./cells/TdAction";
import FormCreateWishList from "../../dialogs/FormCreateWishList";

export default {
  components: {
    SlickTable,
    TdWishName,
    TdWishDes,
    TdCharacters,
    TdTags,
    TdAction,
    FormCreateWishList
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Wish name",
          value: "wishname",
          name: "wishname"
        },
        {
          visible: true,
          sortable: false,
          text: "Description",
          value: "description",
          name: "description"
        },
        {
          visible: true,
          sortable: false,
          text: "Characters",
          value: "characters",
          name: "characters"
        },
        {
          visible: true,
          sortable: false,
          text: "Tags",
          value: "tags",
          name: "tags"
        },
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action"
        }
      ],
      isShowCreate: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/wishlist", ["dataWishList", "totals"]),
    ...mapGetters("ht_store/matter/tags", ["tag"]),
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/matter/discovery/toolbox/detail", ["dataToolboxDetail"])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "wishname") {
        return TdWishName;
      }
      if (columnName === "description") {
        return TdWishDes;
      }
      if (columnName === "characters") {
        return TdCharacters;
      }
      if (columnName === "tags") {
        return TdTags;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addWishlist(dataForm) {
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id
        },
        body: dataForm
      };
      this.addWishListRequest(data);
      this.isShowCreate = false;
    },
    updateWishList(wishlistId, name, value) {
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id,
          wishlistId
        },
        body: {
          [name]: value
        }
      };
      this.updateWishListRequest(data);
    },
    removeWishList(wishlistId) {
      const data = {
        matterId: this.dataToolboxDetail.matter,
        toolboxId: this.dataToolboxDetail.id,
        wishlistId
      };
      this.removeWishListRequest(data);
    },
    updatePagination({ page }) {
      const matterId = this.dataToolboxDetail.matter;
      const toolboxId = this.dataToolboxDetail.id;
      this.getDataWishListRequest({ matterId, toolboxId, page });
    },
    ...mapActions("ht_store/matter/wishlist", [
      "getDataWishListRequest",
      "addWishListRequest",
      "updateWishListRequest",
      "removeWishListRequest"
    ])
  }
};
</script>

<style scoped>
.add {
  position: fixed;
  z-index: 10;
  right: 10px;
  bottom: 10px;
}
</style>
