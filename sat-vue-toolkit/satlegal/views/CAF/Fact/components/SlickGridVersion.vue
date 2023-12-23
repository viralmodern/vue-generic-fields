<template>
  <v-container fluid style="min-width: 100%;max-width: 0px;">
    <v-card flat class="mb-4">
      <v-card-title>
        <!-- <SearchInput placeholder="Search fact version" /> -->
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
      hide-default-header
      :fixedHeader="false"
      hide-default-footer
      :headers="headers.filter(h => h.active)"
      :desserts="dataFactsVersion"
      :loading="isLoadingVersion"
    >
      <template v-slot:item.desc="{ props: { item } }">
        <v-row class="align-center flex-nowrap" no-gutters>
          <BookmarkOrFlag
            :valueBookmark="item.bookmarked_pk"
            :endpoint="`/api/matters/${$$$matterID}/fact-versions/${item.pk}`"
            routerMutation="ht_store/matter/facts/updateFactSlickGridVersion"
            :pk="item.pk"
            :valueFlag="item.reported_object && item.reported_object.pk"
          />
          <TextInline
            textNodata="(No description)"
            :value="item.desc"
            @onClick="
              $_toggleMenuTextArea_openMenu({
                ...$event,
                name: 'desc',
                pk: item.pk,
                value: item.desc
              })
            "
          />
        </v-row>
      </template>
      <template v-slot:item.differences="{ props: { item } }">
        <TextInline
          textNodata="(No differences)"
          :value="item.differences"
          @onClick="
            $_toggleMenuTextArea_openMenu({
              ...$event,
              name: 'differences',
              pk: item.pk,
              value: item.differences
            })
          "
        />
      </template>
      <template v-slot:item.similarities="{ props: { item } }">
        <TextInline
          textNodata="(No similarities)"
          :value="item.similarities"
          @onClick="
            $_toggleMenuTextArea_openMenu({
              ...$event,
              name: 'similarities',
              pk: item.pk,
              value: item.similarities
            })
          "
        />
      </template>

      <template slot="tdCommon" slot-scope="{ props: { item, header } }">
        <div>
          <TextInline
            textNodata="(No fact version)"
            class="mb-2 text-inline"
            :value="
              !rowItem(item.characters[header.value])
                ? item.characters[header.value].desc
                : ''
            "
            @onClick="
              openShowMenuDescription({
                ...$event,
                name: 'desc',
                item,
                header,
                value: !rowItem(item.characters[header.value])
                  ? item.characters[header.value].desc
                  : ''
              })
            "
          />
          <TagableSource
            notSource="(No fact source)"
            :tag="item.characters[header.value].sources || []"
            @onClickIcon="
              openShowMenuSource({
                ...$event,
                item,
                header,
                value: item.characters[header.value].sources || []
              })
            "
          />
        </div>
      </template>
      <template v-slot:item.action="{ props: { item } }">
        <Action :item="item" @remove="removeVersion(item.pk, $event)" />
      </template>
    </TableGrid>
    <div class="d-flex mt-2 align-center">
      <v-col cols="10" class="pa-0">
        <FormCreateVersion class="pa-2" />
      </v-col>
      <v-col cols="2 text-right">
        <ButtonLoadMore
          ref="refLoadMore"
          @onPageChanged="loadMore($event)"
          v-if="
            totals_fact_version > 20 &&
              totals_fact_version > dataFactsVersion.length
          "
        />
      </v-col>
    </div>
    <MenuSourceRefactor
      title="Fact Source"
      nameAdd="Add new fact Source"
      :labels="sourceMenu.value"
      :isShowMenu="sourceMenu.isShowMenu"
      :positionX="sourceMenu.positionX"
      :positionY="sourceMenu.positionY"
      @closeMenu="sourceMenu.isShowMenu = false"
      @update="
        sourceMenu.value = $event;
        updatedCharacter({
          name: 'sources',
          value: $event,
          characterId: sourceMenu.headerValue.value,
          versionId: sourceMenu.versionValue.pk
        });
      "
    />
    <MenuTextArea
      width="350"
      title="Fact version"
      placeholder="Enter fact version"
      :value="descriptionMenu.value"
      :isShowMenu="descriptionMenu.isShowMenu"
      :positionX="descriptionMenu.positionX"
      :positionY="descriptionMenu.positionY"
      @closeMenu="descriptionMenu.isShowMenu = false"
      @update="
        descriptionMenu.value = $event;
        updatedCharacter({
          name: descriptionMenu.name,
          value: $event,
          characterId: descriptionMenu.headerValue.value,
          versionId: descriptionMenu.versionValue.pk
        });
      "
    />
    <MenuTextArea
      width="350"
      title="Update"
      placeholder="Enter text"
      :value="textAreaMenu.value"
      :isShowMenu="textAreaMenu.isShowMenu"
      :positionX="textAreaMenu.positionX"
      :positionY="textAreaMenu.positionY"
      @closeMenu="textAreaMenu.isShowMenu = false"
      @update="
        textAreaMenu.value = $event;
        updated(textAreaMenu.pk, textAreaMenu.name, $event);
      "
    />
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
import MenuShowHideFields from "@/sat-vue-toolkit/satlegal/reuse-components/TableGrid.vue";
// import SearchInput from "@/sat-vue-toolkit/satlegal/reuse-components/SearchInput";
import CustomizeFieldsTableGrid from "@/sat-vue-toolkit/satlegal/reuse-components/CustomizeFieldsTableGrid.vue";
// import TextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/inputs/TextArea";
import FormCreateVersion from "./FormCreateVersion";
import ButtonLoadMore from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/ButtonLoadMore";
import Flag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Flag";
import Action from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/Action";
import MenuSourceRefactor from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/source/MenuSourceRefactor";
import TagableSource from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/tagables/source/TagableSource";
import TextInline from "@/sat-vue-toolkit/satlegal/ht_components/common/text/TextInline";
import MenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/MenuTextArea";
import BookmarkOrFlag from "@/sat-vue-toolkit/satlegal/ht_components/common/buttons/BookmarkOrFlag";

// mixins
import toggleMenuTextArea from "@/sat-vue-toolkit/satlegal/ht_components/common/menus/textarea/mixins/toggleMenuTextArea";

export default {
  mixins: [toggleMenuTextArea],
  components: {
    TableGrid,
    // TextArea,
    CustomizeFieldsTableGrid,
    MenuShowHideFields,
    // SearchInput,
    MenuSourceRefactor,
    TagableSource,
    FormCreateVersion,
    ButtonLoadMore,
    Flag,
    Action,
    TextInline,
    MenuTextArea,
    BookmarkOrFlag
  },
  data() {
    return {
      isLoadingGetSource: false,
      headers: [
        { text: "", value: "drag", active: true },
        { text: "Fact Description ", value: "desc", active: true },
        { text: "Similarities", value: "similarities", active: true },
        { text: "Differences", value: "differences", active: true },
        { text: "Actions", value: "action", active: true }
      ],
      sourceMenu: {
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        versionValue: {},
        value: [],
        header: {}
      },
      descriptionMenu: {
        name: "",
        isShowMenu: false,
        positionX: 0,
        positionY: 0,
        versionValue: {},
        value: "",
        header: {}
      }
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/partialInfoCharacter", ["dataAllCharacter"]),
    ...mapGetters("ht_store/matter/facts", [
      "dataFactsVersion",
      "isLoadingVersion",
      "totals_fact_version"
    ])
  },
  methods: {
    openShowMenuDescription(data) {
      if (this.descriptionMenu.isShowMenu) {
        this.descriptionMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.descriptionMenu = {
          name: data.name,
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          versionValue: data.item,
          headerValue: data.header,
          value: data.value
        };
      }, 0);
    },
    openShowMenuSource(data) {
      if (this.sourceMenu.isShowMenu) {
        this.sourceMenu.isShowMenu = false;
      }
      setTimeout(() => {
        this.sourceMenu = {
          isShowMenu: true,
          positionX: data.positionX,
          positionY: data.positionY,
          versionValue: data.item,
          headerValue: data.header,
          value: data.value
        };
      }, 0);
    },
    ...mapActions("ht_store/matter/partialInfoCharacter", ["getAllCharacter"]),
    ...mapActions("ht_store/matter/source", ["getDataSourceRequest"]),
    ...mapActions("ht_store/matter/facts", [
      "getFactSlickGridVersion",
      "patchFactSlickGridVersion",
      "patchOpinionFactVersion",
      "deleteVersion"
    ]),
    async removeVersion(versionId, close) {
      await this.deleteVersion({ versionId, matterId: this.$route.params.matter || this.$route.params.projectId });
      close();
    },
    resetFields({ fields }) {
      this.headers = fields;
    },
    updated(versionId, name, value) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      this.patchFactSlickGridVersion({
        matterId,
        versionId,
        body: {
          [name]: value
        }
      });
    },
    async getDataSource() {
      this.isLoadingGetSource = true;
      await this.getDataSourceRequest({
        matterId: this.$route.params.matter || this.$route.params.projectId
      });
      this.isLoadingGetSource = false;
    },
    updatedCharacter({ characterId, versionId, name, value }) {
      const payload = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        versionId,
        characterId,
        body: {
          [name]: value
        }
      };
      this.patchOpinionFactVersion(payload);
    },
    rowItem(value) {
      return !Object.values(value === undefined ? {} : value).some(
        x => x !== null && x !== ""
      );
    },
    async loadMore({ page, setLoading }) {
      try {
        setLoading(true);
        await this.getFactSlickGridVersion({
          matterId: this.$route.params.matter || this.$route.params.projectId,
          page,
          type: "paging"
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    this.getFactSlickGridVersion({ matterId, page: 1 });
    this.getAllCharacter(matterId).then(() => {
      const lastHeader = [
        this.headers[this.headers.length - 2],
        this.headers[this.headers.length - 1]
      ];
      const valueHeaders = this.dataAllCharacter.map(m => ({
        active: true,
        text: `${m.last_name + " " + m.first_name}`,
        value: m.pk
      }));
      this.headers = [
        ...this.headers.slice(0, 3),
        ...valueHeaders,
        ...lastHeader
      ];
    });
    this.getDataSource();
  }
};
</script>

<style lang="scss" scoped>
.text-inline {
  width: 300px;
  word-break: break-word;
  white-space: unset !important;
}
</style>
