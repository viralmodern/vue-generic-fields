<template>
  <v-menu
    ref="startMenu"
    v-model="uiShowMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="query"
    transition="scale-transition"
    min-width="290px"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="query"
        :label="getPlaceholder"
        append-icon="mdi-calendar"
        dense
        readonly
        outlined
        hide-details
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="query" :min="min" :max="max" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="uiShowMenu = false">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="$refs.startMenu.save(date)">
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'ChooseDateUserWorkLogPicker',
  data() {
    return {
      uiShowMenu: false,
      date: this.value //  '2019-01-12'
    }
  },
  props: {
    placeholder: { type: String },
    value: String,
    preset: {
      type: String
    },
    min: {
      type: String,
      default: () => ''
    },
    max: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    // making sure value goes from our parent to <input> and back properly...
    query: {
      get() {
        return this.date
      },
      set(value) {
        this.date = value
        this.$emit('input', value)
      }
    },
    getPlaceholder() {
      return (
        // this.placeholder || 'Search label' || 'this.$t(general.label.search)'
        this.placeholder || 'Search label'
      )
    }
  }
}
</script>

<style scoped></style>
