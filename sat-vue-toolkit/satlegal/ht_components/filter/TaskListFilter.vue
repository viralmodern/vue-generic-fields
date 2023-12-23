<template fragment>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-row no-gutters class="filter align-center">
      <v-col md10 cols="12">
        <v-row no-gutters>
          <v-col cols="12" md4 class="px-2">
            <v-select
              v-model="selectProject"
              :items="listMatters"
              item-text="title"
              item-value="id"
              :menu-props="{ maxHeight: '300' }"
              label="Project"
            ></v-select>
          </v-col>
          <v-col cols="12" md4 class="px-2">
            <v-select
              v-model="selectDue"
              item-text="name"
              return-object
              :items="dues"
              :menu-props="{ maxHeight: '300' }"
              label="Due"
            ></v-select>
          </v-col>
          <v-col cols="12" md4 class="px-2">
            <v-select
              v-model="selectLabel"
              :items="listLabels"
              item-text="text"
              item-value="id"
              :menu-props="{ maxHeight: '300' }"
              label="Labels"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-col md2 cols="12" text-xs-right>
        <v-btn color="primary" @click="apply">Apply</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      selectProject: null,
      selectDue: null,
      selectLabel: null
    };
  },
  created() {
    this.selectDue = this.dues[0];
  },
  props: {
    matters: {
      type: Array,
      default: () => []
    },
    labels: {
      type: Array,
      default: () => []
    },
    dues: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    listMatters() {
      const clone = this.matters.slice();
      clone.unshift({ id: null, title: "All" });
      return clone;
    },
    listLabels() {
      const clone = this.labels.slice();
      clone.unshift({ id: null, text: "No label" });
      return clone;
    }
  },
  methods: {
    apply() {
      if (this.$refs.form.validate()) {
        const { selectProject, selectDue, selectLabel } = this;
        const filter = { selectProject, selectDue, selectLabel };
        this.$emit("apply", filter);
      }
    }
  },
  mounted() {
    const { selectProject, selectDue, selectLabel } = this;
    const filter = { selectProject, selectDue, selectLabel };
    this.$emit("apply", filter);
  }
};
</script>
