<template>
  <v-menu :return-value.sync="type" ref="menu" bottom offset-y>
    <template v-slot:activator="{on}">
      <v-btn class="caption text-capitalize"
             rounded
             text
             :input-value="true"
             color="primary"
             small v-on="on">
        {{type}}
        <v-icon right small>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <template v-for="type in types">
        <v-list-item @click="$refs.menu.save(type)" dense>
          <v-list-item-content>
            <span>{{type}}</span>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: "ChooseCalendarTypes",
    props: {
      value: {},
      types: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      type: {
        get() {
          return this.value
        },
        set(v) {
          this.$emit('input', v)
        }
      }
    }
  }
</script>

<style scoped>

</style>
