<template>
  <div class="grid_paging" v-if="queryParams">
    <div class="grid_paging--content">
      <v-btn class="caption text-transform-unset"
             depressed
             text
             color="primary"
             small
             :disabled="loading"
             :loading="loading"
             @click="loadMore">
        <v-icon x-small left>mdi-sync</v-icon>
        Load more
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PaginationGrid",
    props: {
      loading: {
        type: Boolean,
        default: () => false
      },
      options: {
        type: Object,
        default: () => ({})
      }

    },
    computed: {
      queryParams () {
        try {
          let { next } = this.options
          if (!next) {
            return false
          }
          let queryParams = {}
          let url = new URL(next)
          for (const [param, value] of url.searchParams) {
            queryParams[param] = value
          }
          return queryParams
        } catch (e) {
          console.log(e.message)
          return false
        }
      }
    },
    methods: {
      loadMore () {
        this.$emit("change", {
          queryParams: this.queryParams
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .grid_paging {
    padding: 0px 0px 0px 35px;
    position: sticky;
    left: 74vw;
    left: calc(100% - 143px);
    /*border: solid 1px red;*/
    &--content {
      .pagination--custom {
        width: auto;
        position: sticky;
        left: 0px;
      }
    }
  }
</style>
<style lang="scss">
  .grid_paging {
    .v-pagination__item {
      width: unset;
      height: 25px;
      min-width: unset;
      font-size: 12px;
      box-shadow: unset;
      background: unset !important;

      &.v-pagination__item--active {
        /*color: blue !important;*/
        /*color: #ffffff !important;*/
        /*background: blue !important;*/
        font-weight: bold;
        text-decoration: underline;
      }
    }

    .v-pagination__navigation {
      width: unset;
      height: 25px;
      min-width: unset;
      box-shadow: unset;
      background: unset !important;

      .v-icon {
        font-size: 16px;
      }
    }
  }

  .base_columns {
    .grid_paging {
      padding: 0px 0px 0px 0px;
    }
  }
</style>
