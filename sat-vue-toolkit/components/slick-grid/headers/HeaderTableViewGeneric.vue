<template>
  <div class="task-list-header--parent">
    <div class="header-content-attributes">
      <div class="header-content-attributes--pinned">
        <div class="task-list-header">
          <template v-for="attribute in attributesPinned">
            <CustomizeFieldGeneric :key="attribute.name"
                                   :main-cell-id="mainCellId"
                                   @sort-field="sortField"
                                   @show-context="showContext"
                                   @setRuleFilterField="setRuleFilterField"
                                   :disabled-filter-row="disabledFilterRow"
                                   :attribute="attribute">
              <template v-slot:filter-cell="{attributeLabel}">

              </template>
            </CustomizeFieldGeneric>
          </template>
        </div>
      </div>
      <div class="header-content-attributes--default">
        <div class="task-list-header">
          <template v-for="attribute in attributesFree">
            <CustomizeFieldGeneric :key="attribute.name"
                                   :main-cell-id="mainCellId"
                                   @sort-field="sortField"
                                   @show-context="showContext"
                                   @setRuleFilterField="setRuleFilterField"
                                   :disabled-filter-row="disabledFilterRow"
                                   :attribute="attribute">
              <template v-slot:filter-cell="{attributeLabel}">

              </template>
            </CustomizeFieldGeneric>
          </template>
          <template v-if="!disabledAddNewColumn">
            <slot name="header-add-field">
              <div v-ripple
                   class="cursor--pointer d-flex align-center justify-center header--cell"
                   style="width: 60px">
                <div>
                  <v-btn icon x-small
                         title="Add a column"
                         color="primary"
                         text
                         depressed>
                    <v-icon>
                      mdi-plus-circle
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </slot>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import baseHeaderProps from "@/sat-vue-toolkit/components/slick-grid/configs/props/baseHeaderProps"
  import CustomizeFieldGeneric from "~/sat-vue-toolkit/components/slick-grid/components/CustomizeFieldGeneric"

  export default {
    name: "HeaderTableViewGeneric",
    components: { CustomizeFieldGeneric },
    props: {
      ...baseHeaderProps
    },
    methods: {
      sortField (data) {
        this.$emit("sort-field", data)
      },
      showContext (data) {
        this.$emit("show-context", data)
      },
      setRuleFilterField (data) {
        this.$emit("setRuleFilterField", data)
      },


    }

  }
</script>
<style scoped lang="scss">

</style>
<style lang="scss">
  .task-list-header--parent {
    position: sticky;
    top: -3px;
    z-index: 3;
    padding-left: 14px;
    padding-left: 0px;

  }

  .header-content-attributes {
    display: flex;

    &--pinned {
      /*border: solid 1px red;*/
      position: sticky;
      left: 0px;
      z-index: 2;

      .task-list-header {
        overflow-x: hidden;

        .header--cell:last-child {
          &:after {
            content: '';
            width: 1px;
            height: 100%;
            box-shadow: 1px 0 3px 4px rgba(0, 0, 0, .05);
            background: rgba(0, 0, 0, .1);
            position: absolute;
            right: 0px;
            top: 0px;
            z-index: 2;
          }
        }
      }
    }

    &--default {
      /*border: solid 1px blue;*/

    }
  }

  .task-list-header {
    display: inline-flex;
    position: sticky;
    top: -10px;
    left: 0;
    z-index: 1;
    height: 100%;
  }

  .header--cell {
    border-right: solid 1px rgba(0, 0, 0, 0.05);
    border-top: solid 1px rgba(0, 0, 0, 0.05);
    border-bottom: solid 1px rgba(0, 0, 0, 0.05);
    /*padding: 0px 5px;*/
    position: relative;
    touch-action: pan-x;
    background: #ffffff;

    &:hover {
      .resize-handle {
        opacity: 1;
      }
    }

    &:first-child {
      border-left: solid 1px rgba(0, 0, 0, 0.05);
    }

    &:last-child {
      padding-right: 0px;
    }

    &.main_cell_row {
      position: sticky;
      left: 0;
      background: rgba(255, 255, 255, 0.8);
      padding-left: 44px;
      padding-left: 49px;
    }
  }

  .header-cell {
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize !important;
    text-align: left;
    white-space: normal;
    font-size: 12px;
  }

  .text-header-cell {
    font-size: 10px;
    white-space: nowrap;
  }

  .main-header-setting--table {
    width: 44px;
    width: 49px;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0;
    border-right: solid 1px rgba(0, 0, 0, 0.05);

  }

  .theme--dark {
    .header--cell {
      background: rgba(30, 30, 30, 0.8);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .main-header-setting--table {
      border-color: rgba(255, 255, 255, 0.1);
    }
  }
</style>
