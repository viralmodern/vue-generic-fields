<template>
  <div>
    <v-card flat class="mb-4">
      <v-card-title class="py-0">
        <v-btn
          small
          class="ma-0 mr-2 white--text font-weight-bold"
          v-for="item in relationShipType"
          :key="item.id"
          :color="item.color"
          >{{ item.name }}</v-btn
        >
        <div class="flex-grow-1"></div>
        <MenuShowHideFields>
          <CustomizeFieldsTableGrid
            :fields="headers"
            :hideFieldIndex="['drag']"
            @resetFields="resetFields"
          />
        </MenuShowHideFields>
      </v-card-title>
    </v-card>
    <TableGrid
      class="custom-table"
      hide-default-header
      :isServerItemsLength="false"
      :fixedHeader="false"
      :headers="extendHeaders.filter(x => x.active)"
      :desserts="headers"
    >
      <template v-slot:headerCell="{ props }">
        <v-row
          v-if="props.header.name !== 'character'"
          no-gutters
          class="py-2 align-center flex-column"
        >
          <div>
            <UserAvatar
              :avatarSize="25"
              :imageUrl="props.header.avatarUrl"
              :name="props.header.name"
            />
          </div>
          <span class="name-character text-center">{{
            props.header.text
          }}</span>
        </v-row>
      </template>
      <template v-slot:item.character="{ props: { item } }">
        <v-row no-gutters class="align-center py-2 flex-column">
          <div>
            <UserAvatar
              :avatarSize="25"
              :imageUrl="item.avatarUrl"
              :name="item.name"
            />
          </div>
          <span class="caption font-weight-bold name-character text-center">{{ item.name }}</span>
        </v-row>
      </template>
      <template v-slot:tdCommon="{ props }">
        <TdRelationShip
          :column="props.header"
          :dataRow="props.item"
          :listRelationShipMap="listRelationship"
          @onChange="
            openMenuSelectBox({
              from_id: props.item.id,
              to_id: props.header.id,
              ...$event
            })
          "
        />
      </template>
    </TableGrid>
    <MenuSelectCheckBox
      title="Update"
      :value="menuSelectBox.value"
      :isShowMenu="menuSelectBox.isShowMenu"
      :positionX="menuSelectBox.positionX"
      :positionY="menuSelectBox.positionY"
      :dataList="relationShipType"
      @closeMenu="menuSelectBox.isShowMenu = false"
      @update="
        menuSelectBox.value = $event.id;
        menuSelectBox.isShowMenu = false;
        $emit('update', {
          from_id: menuSelectBox.from_id,
          to_id: menuSelectBox.to_id,
          value: $event.id,
          id: menuSelectBox.id,
        })
      "
    />
  </div>
</template>

<script>
import TdRelationShip from "../research/characters/cells/TdRelationShip";
import UserAvatar from "../avatars/UserAvatar";
import { relationShipType } from "../../config.js";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";
export default {
  components: {
    TdRelationShip,
    UserAvatar,
    TableGrid,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    MenuSelectCheckBox
  },
  props: {
    items: Array,
    listRelationship: Array
  },
  data() {
    return {
      headers: [],
      relationShipType,
      menuSelectBox: {
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        id: "",
        value: "",
        from_id: "",
        to_id: ""
      },
    };
  },
  computed: {
    extendHeaders() {
      const headerDefault = {
        visible: true,
        active: true,
        sortable: false,
        text: "",
        value: "character",
        name: "character"
      };
      return [headerDefault, ...this.headers];
    }
  },
  methods: {
    openMenuSelectBox(data) {
      if (this.menuSelectBox.isShowMenu) {
        this.menuSelectBox.isShowMenu = false;
      }
      setTimeout(() => {
        this.menuSelectBox = {
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          id: data.id,
          value: data.value,
          from_id: data.from_id,
          to_id: data.to_id
        };
      }, 0);
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    getHeaders(items) {
      let clone = JSON.parse(JSON.stringify(items || []));
      const arrayHeaders = clone.map(x => ({
        id: x.id,
        visible: true,
        active: true,
        sortable: false,
        text: x.name,
        value: x.id,
        name: x.id,
        ...x
      }));
      return arrayHeaders;
    }
  },
  mounted() {
    const arrayHeaders = this.getHeaders(this.items);
    this.headers = arrayHeaders;
  },
  watch: {
    items: {
      handler(items) {
        const arrayHeaders = this.getHeaders(items);
        this.headers = arrayHeaders;
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
.custom-table {
  table td:first-child {
    padding: 0px 16px;
    border: unset;
  }
   table tr {
    background: rgba(255, 255, 255, 0.1) !important;
  }
   table td {
    padding: 0px;
    border-right: 1px solid grey;
    border-bottom: 1px solid grey !important;
  }
  table th {
    padding: 0px 5px;
  }
}
.name-character {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 125px;
  white-space: nowrap;
}
</style>
