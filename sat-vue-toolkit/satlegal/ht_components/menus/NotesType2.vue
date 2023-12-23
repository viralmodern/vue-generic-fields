<template>
  <div class="text-no-wrap">
    <v-menu
      v-model="menu"
      transition="scale-transition"
      offset-x
      top
      :close-on-content-click="false"
      max-width="500px"
      min-width="500px"
    >
      <template v-slot:activator="{ on: onMenu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: onTooltip }">
            {{ totalNotes }}
            <AddIcon
              :on="{ ...onMenu, ...onTooltip }"
              @onClickIcon="$emit('onOpenMenu', page)"
              icon="note"
            />
          </template>
          <span>{{ textTooltip }}</span>
        </v-tooltip>
      </template>
      <div>
        <v-card>
          <v-card-text class="pa-2">
            <v-col cols="12">
              <BaseNote
                ref="refBaseNote"
                :listNotes="notes"
                :isLoadingAdd="isLoadingAdd"
                :isLoadingGet="isLoadingGet"
                @create="create"
                @edit="edit"
                @remove="$emit('remove', { id: $event, page })"
              />
              <v-col
                v-if="isShowPagination"
                cols="12"
                justify-center
                align-center
                class="text-xs-center mt-2"
              >
                <v-pagination
                  v-model="page"
                  :length="totalPagination"
                  :total-visible="7"
                ></v-pagination>
              </v-col>
            </v-col>
          </v-card-text>
        </v-card>
      </div>
    </v-menu>
  </div>
</template>
<script>
import BaseNote from "../common/menus/BaseNote";
import AddIcon from "../common/buttons/AddIcon";

export default {
  props: {
    totalPagination: Number,
    isShowPagination: Boolean,
    totalNotes: Number,
    notes: Array,
    isLoadingAdd: Boolean,
    isLoadingGet: Boolean,
    textTooltip: String
  },
  components: {
    BaseNote,
    AddIcon
  },
  data() {
    return {
      page: 1,
      menu: false
    };
  },
  watch: {
    page: {
      handler(v) {
        this.$emit("paging", v);
      }
    }
  },
  methods: {
    showModal() {
      this.menu = true;
      this.$emit("showModal");
    },
    create(value) {
      const data = {
        body: {
          title: value.title,
          text: value.content
        },
        page: this.page
      };
      this.$emit("create", data);
    },
    edit(id, value) {
      const data = {
        id,
        body: {
          title: value.title,
          text: value.content
        },
        page: this.page
      };
      this.$emit("edit", data);
    },
    closeForm() {
      this.$refs.refBaseNote.closeForm();
    },
  }
};
</script>
