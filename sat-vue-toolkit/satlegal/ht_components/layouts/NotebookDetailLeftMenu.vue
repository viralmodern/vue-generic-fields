<template>
  <v-list class="v-list-custom">
    <v-list-item class="pb-2">
      <AddNewInline
        hint="Enter to add new section"
        classTextField="my-3"
        block
        actionName="Add New Session Group"
        @submit="onAddSection"
      />
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item v-if="loadingDataSectionNotebook">
      <v-progress-linear height="2" :indeterminate="true"></v-progress-linear>
    </v-list-item>
    <draggable
      v-else
      class="list-group"
      tag="div"
      v-model="dataSection"
      v-bind="dragOptions"
    >
      <transition-group type="transition" name="'flip-list'">
        <v-list-group
          v-for="item in dataSectionNotebook"
          :key="item.id"
          value="true"
          class="custom-leftmenu-notebook"
        >
          <v-list-item v-slot:activator="{ on }">
            <SectionRow
              v-on="on"
              :name="item.name"
              @submit="save({ id: item.id, category: 'section', name: $event })"
              @remove="remove({ id: item.id, category: 'section' })"
            />
          </v-list-item>
          <div :id="item.id">
            <v-list-item v-for="child in item.list" :key="child.id">
              <ArticleRow
                :to="`/notebook/${notebookId}/session/${child.id}`"
                :name="child.name"
                @submit="
                  save({
                    sectionId: item.id,
                    id: child.id,
                    category: 'article',
                    name: $event
                  })
                "
                @remove="
                  remove({
                    sectionId: item.id,
                    category: 'article',
                    id: child.id
                  })
                "
              />
            </v-list-item>
          </div>
          <AddNewInline
            hint="Enter to add new sub section"
            class="pb-2 pl-2"
            classTextField="pl-3"
            actionName="Add new session"
            @submit="onAddSubSection(item.id, $event)"
          />
        </v-list-group>
      </transition-group>
    </draggable>
  </v-list>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Sortable from "sortablejs";
import draggable from "vuedraggable";
import AddNewInline from "../inputs/AddNewInline";
import SectionRow from "../list/ItemVlist";
import ArticleRow from "../list/ItemVlist";

export default {
  components: {
    AddNewInline,
    SectionRow,
    ArticleRow,
    draggable
  },
  computed: {
    ...mapGetters("ht_store/notebookDetail", [
      "dataSectionNotebook",
      "loadingDataSectionNotebook"
    ]),
    notebookId() {
      return this.$route.params.id;
    },
    dragOptions() {
      return {
        animation: 200,
        group: "section",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    dataSection: {
      get() {
        return this.dataSectionNotebook.map(x => x.id);
      },
      set(value) {
        this.moveSection(value);
      }
    }
  },
  methods: {
    ...mapActions("ht_store/notebookDetail", [
      "getDataSectionNotebookDetailRequest",
      "addSectionNotebookDetailRequest",
      "addSubSectionNotebookDetailRequest",
      "updateSectionNotebookDetailRequest",
      "updateSubSectionNotebookDetailRequest",
      "deleteSectionNotebookDetailRequest",
      "deleteSubSectionNotebookDetailRequest"
    ]),
    ...mapMutations("ht_store/notebookDetail", ["moveSection", "moveArticle"]),
    async onAddSection(name) {
      const data = {
        id: new Date().getTime(),
        name,
        list: []
      };
      this.addSectionNotebookDetailRequest(data);
    },
    async onAddSubSection(parentId, name) {
      const id = this.$route.params.id;
      const addResult = await this.addSubSectionNotebookDetailRequest({
        name,
        id,
        parentId
      });
      this.$router.push(`/notebook/${id}/session/${addResult.newItem.id}`);
    },
    save(data) {
      if (data.category === "section") {
        this.updateSectionNotebookDetailRequest(data);
      }
      if (data.category === "article") {
        this.updateSubSectionNotebookDetailRequest(data);
      }
    },
    remove(data) {
      if (data.category === "section") {
        this.deleteSectionNotebookDetailRequest(data);
      }
      if (data.category === "article") {
        this.deleteSubSectionNotebookDetailRequest(data);
      }
    },
    dragArticle() {
      const _self = this;
      this.dataSectionNotebook.forEach(x => {
        const article = document.getElementById(x.id);
        const sectionId = x.id;
        Sortable.create(article, {
          onEnd(event) {
            let data = {
              fromId: sectionId,
              toId: parseInt(event.to.id),
              newIndex: event.newIndex,
              oldIndex: event.oldIndex
            };
            if (event.from.id !== event.to.id) {
              data.otherArray = true;
            }
            _self.moveArticle(data);
          },
          onStart() {},
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        });
      });
    }
  },
  mounted() {
    this.getDataSectionNotebookDetailRequest();
  },
  updated() {
    this.dragArticle();
  }
};
</script>

<style scoped>
.v-list-custom /deep/ .v-list__tile {
  font-size: 14px;
  font-weight: 500;
}
.custom-leftmenu-notebook /deep/ .v-list__tile {
  height: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
