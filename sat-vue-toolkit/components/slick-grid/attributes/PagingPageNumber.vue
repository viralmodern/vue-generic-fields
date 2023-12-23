<template>
  <v-card class="grid_paging" flat tile>
    <div class="grid_paging--content">
      <v-pagination v-model="page"
                    :length="length"
                    :total-visible="totalVisible"
      ></v-pagination>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: "PagingPageNumber",
    props: {
      totalItems: {
        type: Number,
        default: () => 0
      },
      loading: {
        type: Boolean,
        default: () => false
      },
      itemsPerPage: {
        type: Number,
        default: () => 20
      },
      totalVisible: {
        type: Number,
        default: () => 20
      },

      value: {}
    },
    data () {
      return {

      }
    },
    computed: {
      page: {
        get() {
          return this.value
        },
        set(page) {
          if(this.loading) return
          this.$emit('input', page)
        }
      },
      isLatestPage () {
        return this.itemsPerPage * this.page >= this.totalItems
      },
      length () {
        let realRow = parseInt(this.totalItems / this.itemsPerPage)
        let isSurplusRow = this.totalItems % this.itemsPerPage > 0
        realRow = isSurplusRow ? realRow + 1 : realRow
        return realRow
      },
      hasPaging () {
        return this.length > 1
      }
    },
    methods: {
        getX() {
          let queryParams = {
            ungroup: false,
            group_items: ['Published', 0],
            group_by: "cluster__precedential_status",
            pages: ["cluster__precedential_status: 1", "entry_type: 2"]
          }
          return {
            ungroup: 'http://two.localhost:3000/odt/opinions?ungroup=true&page=2',
            group: 'http://two.localhost:3000/odt/opinions?ungroup=false&group_items=Published,0&group_by=cluster__precedential_status',
          }
        }
    }
  }
</script>

<style scoped lang="scss">
  .grid_paging {
    padding: 0px 0px 0px 35px;
    display: block;

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
        color: blue !important;
        background: transparent !important;
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

  .base_table {
    .task-list-group--footer {
      /*position: sticky;*/
      bottom: 5px;
      /*border: solid 1px red;*/
    }
  }

  .base_columns {
    .grid_paging {
      padding: 0px 0px 0px 0px;
    }
  }
</style>
