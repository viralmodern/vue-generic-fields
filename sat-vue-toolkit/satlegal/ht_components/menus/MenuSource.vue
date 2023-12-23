<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
    offset-x
    top
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-btn class="ma-0" v-on="on" icon small @click="$emit('onOpenMenu')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <div>
      <v-card>
        <v-card-title>
          <span class="title">{{ title }}</span>
          <v-spacer></v-spacer>
          <v-btn @click="menu = false" class="ma-0" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <EditSource
            v-if="isEditting"
            @close="isEditting = false"
            @submit="updateLabel({ id: itemEdit.id, name: $event })"
            :text="itemEdit[keyText]"
          />
          <addNewSource
            v-else-if="isAdd"
            @close="isAdd = false"
            @submit="addLabel"
          />
          <SourceRow
            v-else
            v-for="(item, index) in list"
            :key="index"
            :text="item[keyText]"
            :check="item.check"
            @choseLabel="$emit('choseLabel', item)"
            @openEdit="openEdit(item)"
            @removeLabel="$emit('removeLabel', item.id)"
          />
        </v-card-text>
        <v-card-actions class="mx-2">
          <v-btn
            v-if="!isAdd && !isEditting"
            class="mb-2 primary"
            block
            small
            @click="openAdd"
            >{{ nameAdd }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </v-menu>
</template>

<script>
import addNewSource from "../forms/FormSource";
import EditSource from "../forms/FormSource";
import SourceRow from "../labels/SourceRow";
export default {
  components: {
    addNewSource,
    EditSource,
    SourceRow
  },
  props: {
    listLabels: Array,
    labels: Array,
    title: String,
    keyText: String,
    nameAdd: String
  },
  computed: {
    list() {
      const checked = this.labels.reduce((result, current) => {
        result[current.id] = { ...current };
        return result;
      }, {});
      const result = this.listLabels.map(x => {
        if (checked[x.id]) {
          return { ...x, check: true };
        }
        return { ...x, check: false };
      });
      return result;
    }
  },
  data() {
    return {
      isAdd: false,
      isEditting: false,
      itemEdit: "",
      menu: false
    };
  },
  methods: {
    addLabel(data) {
      this.$emit("addLabel", data);
      this.isAdd = false;
    },
    updateLabel(data) {
      this.isEditting = false;
      this.$emit("updateLabel", data);
    },
    openEdit(item) {
      this.itemEdit = { ...item };
      this.isEditting = true;
      this.isAdd = false;
    },
    openAdd() {
      this.isAdd = true;
      this.isEditting = false;
    }
  }
};
</script>
