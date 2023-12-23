<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      :items-per-page="5"
      :page.sync="page"
      hide-default-footer
      @page-count="pageCount = $event"
      :total-visible="5"
    >
      <template v-slot:item.character="{ item }">
        <UserAvatar
          class="mx-1"
          :avatarSize="30"
          :imageUrl="item.character_avatar"
          :name="item.character_name"
        />
        <span class="text-no-wrap bold--text">{{item.character_name}}</span>
      </template>
      <template v-slot:item.is_privilege_map="{ item }">
        <ChipJoinMenuSelectBox
          :value="item.is_privilege"
          keyValue="value"
          keyText="label"
          :dataList="
                appConfigChoices[appConfigConstants.PRIVILEGE_CHECK]
              "
          @onClickChip="
                $_toggleMenuSelectBox_openMenu({
                  ...$event,
                  title: 'Is Privileged',
                  name: 'is_privilege',
                  pk: item.pk,
                  keyValue: 'value',
                  keyText: 'label',
                  value: item.is_privilege,
                  dataList:
                    appConfigChoices[appConfigConstants.PRIVILEGE_CHECK],
                  detail: true
                });
                privilege_checks=item
              "
        />
      </template>
    </v-data-table>
    <div class="d-flex align-center justify-end" style="height:60px">
      <div class="pagination-custody-item">
        <v-pagination v-model="page" :length="pageCount" circle></v-pagination>
      </div>
    </div>
    <MenuSelectCheckBox
      :title="menuSelectBox.title"
      :keyValue="menuSelectBox.keyValue"
      :keyText="menuSelectBox.keyText"
      :value="menuSelectBox.value"
      :isShowMenu="menuSelectBox.isShowMenu"
      :positionX="menuSelectBox.positionX"
      :positionY="menuSelectBox.positionY"
      :dataList="menuSelectBox.dataList"
      @closeMenu="menuSelectBox.isShowMenu = false"
      @update="
        menuSelectBox.value = $event[menuSelectBox.keyValue];
        menuSelectBox.isShowMenu = false;
        $emit('update', {characterId: privilege_checks.pk, value: $event.value})
      "
    />
  </v-container>
</template>

<script>
import toggleMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/mixins/toggleMenuSelectBox";
import ChipJoinMenuSelectBox from "@/sat-vue-toolkit/satlegal/ht_components/common/chips/ChipJoinMenuSelectBox";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";
import UserAvatar from "@/sat-vue-toolkit/satlegal/ht_components/avatars/UserAvatar";
import { mapGetters } from "vuex";
import MenuSelectCheckBox from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/checkbox/MenuSelectCheckBox.vue";

export default {
  mixins: [appConfigMixin, toggleMenuSelectBox],
  props: {
    // headers: Array,
    desserts: Array,
    privilegeId: Number
  },
  components: {
    ChipJoinMenuSelectBox,
    UserAvatar,
    MenuSelectCheckBox
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", [
      "appConfigs",
      "appConfigChoices",
      "appConfigConstants"
    ])
  },
  data() {
    return {
      headers: [
        {
          text: "Character Name",
          value: "character",
          active: true
        },
        {
          text: "Is Privileged?",
          value: "is_privilege_map",
          active: true
        }
      ],
      page: 1,
      pageCount: 0,
      privilege_checks: {}
    };
  },
  methods: {}
};
</script>
