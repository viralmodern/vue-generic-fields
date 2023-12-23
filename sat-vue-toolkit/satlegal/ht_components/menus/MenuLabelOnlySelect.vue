<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
    offset-x
    top
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="ma-0" icon small>
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
          <v-text-field
            v-model="searchQuery"
            :placeholder="placeholder"
            single-line
            outlined
          ></v-text-field>
          <CitationsRow
            v-for="(item, index) in arrLabels"
            :key="index"
            :color="item[keyColor]"
            :text="item[keyText]"
            :check="item.check"
            @choseLabel="$emit('choseLabel', item)"
          />
        </v-card-text>
      </v-card>
    </div>
  </v-menu>
</template>

<script>
import CitationsRow from "../labels/CitationsRow";
export default {
  components: {
    CitationsRow
  },
  props: {
    listLabels: Array,
    labels: Array,
    title: String,
    keyColor: String,
    keyText: String,
    placeholder: String
  },
  computed: {
    arrLabels() {
      if (this.searchQuery) {
        return (
          this.list &&
          this.list.filter(item => {
            return (
              item.text &&
              item.text.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
          })
        );
      } else {
        return this.list && this.list;
      }
    },
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
      menu: false,
      searchQuery: ""
    };
  }
};
</script>
