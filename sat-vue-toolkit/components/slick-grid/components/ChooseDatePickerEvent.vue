<template>
  <v-menu ref="menu"
          bottom offset-y
          :close-on-content-click="false">
    <template v-slot:activator="{on}">
      <v-btn class="caption text-capitalize"
             rounded
             text
             :input-value="true"
             color="primary"
             small v-on="on">
        <v-icon left small>mdi-calendar</v-icon>
        {{picker}}
        <v-icon right small>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-date-picker v-model="picker"></v-date-picker>
    <!--<v-list dense>
      <template v-for="type in types">
        <v-list-item @click="$refs.menu.save(type)" dense>
          <v-list-item-content>
            <span>{{type}}</span>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>-->
  </v-menu>

</template>

<script>
  export default {
    name: "ChooseDatePickerEvent",
    props: {
      value: {
        default: () => new Date().toISOString().substr(0, 10),
      }
    },
    computed: {
      picker: {
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
