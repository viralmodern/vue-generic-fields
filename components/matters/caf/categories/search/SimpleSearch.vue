<template>
  <v-card color="basil">
    <v-card-title class="py-4 pr-12 flex-wrap">
        <v-text-field hide-details autofocus
                      class="mb-4 w-100"
                      style="font-size: 24px;"
                      background-color="transparent"
                      solo dense
                      flat rounded
                      placeholder="Search..."
                      single-line></v-text-field>
      <div class="d-flex w-100">
        <v-btn-toggle v-model="tab" tile group color="primary">
          <v-btn :value="item" @click="tab = item"
                 small
                 class="text-capitalize"
                 depressed
                 v-for="item in items" :key="item">{{item}}
          </v-btn>
        </v-btn-toggle>
        <v-spacer></v-spacer>
        <menu-matters/>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 65vh" class="overflow-y-auto">
      <results-search :items="results"/>
    </v-card-text>
  </v-card>
</template>

<script>
  import MenuMatters from "./simple/MenuMatters"
  import ResultsSearch from "./simple/ResultsSearch"

  export default {
    name: "SimpleSearch",
    components: { ResultsSearch, MenuMatters },
    data () {
      return {
        tab: "All",
        items: [
          "All",
          "Tasks",
          "Docs",
          "Docket",
          "Expense",
          "Meetings"
        ],
        results: [
          {
            title: "Multitask Toolbar: Magically manage multiple tasks",
            value: "lorem",
            ders: "ẩn đi, các CAF ẩn đi sẽ dc tìm thấy ở phần Hide (Hide sẽ nằm dưới cùng bottom sau  các active CAF. Option của 1 hide CAF thay vì Hide sẽ là Show, khi click Show thì CAF sẽ hiện ra lại ở phần active CAF)",
            color: "#37474f",
            breadcrumbs: [
              {
                text: "In wartanwu's space",
                disabled: true,
                href: "breadcrumbs_dashboard"
              },
              {
                text: "List",
                disabled: true,
                href: "breadcrumbs_link_1"
              }
            ]
          },
          {
            title: "Multitask Toolbar: Magically manage multiple tasks",
            value: "lorem",
            color: "#5e72e4"
          },
          {
            title: "Multitask Toolbar: Magically manage multiple tasks",
            value: "lorem",
            color: "#ffbb33"
          },
          {
            title: "Integrate API for taskboard",
            value: "lorem",
            color: "#ff9f1a"
          },
          {
            title: "Setting admin permission matter",
            value: "lorem",
            color: "#f5365c"
          },
          {
            title: "Document of matter in Boston",
            value: "#000000"
          },
          {
            title: "Meeting with the matter at 08:50pm",
            value: "lorem"
          },
          {
            title: "Matter",
            value: "lorem"
          },
          {
            title: "Matter",
            value: "lorem"
          },
          {
            title: "Matter",
            value: "lorem"
          },
          {
            title: "Matter",
            value: "lorem"
          },
          {
            title: "Matter",
            value: "lorem"
          }

        ]
      }
    }
  }
</script>

<style scoped>

</style>
