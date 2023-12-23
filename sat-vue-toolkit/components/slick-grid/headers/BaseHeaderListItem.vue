<template>
  <div class="task-list-header--parent d-flex align-center">
    <div class="task-list-header" style="min-height: 25px;" v-if="totalTask">
      <div class="header--row--action">
        <v-btn icon :outlined="false" x-small @click.stop="clickCollapse"
               :color="itemStatus | colorStatusLabel">
          <v-icon small :color="itemStatus | colorStatusLabel">
            <template v-if="isExpanded">
              mdi-chevron-double-down
            </template>
            <template v-else>
              mdi-chevron-double-right
            </template>
          </v-icon>
        </v-btn>
      </div>
      <div class="mx-1"></div>
      <div class="header--row--main">
        <keep-alive>
          <slot name="main-group-by" v-show="isGrouped">
            <GroupByHeaderBase :group-type="groupType"
                               v-if="!noGroup"
                               :list="getAttributeList"
                               :attributeType="getAttributeType"
                               :info="childInfo"/>
          </slot>
        </keep-alive>
        <div>
          <v-chip small label v-if="totalTask" filter>
            <strong>{{labelCountTotalTask}}</strong>
          </v-chip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import GroupByHeaderBase from "../attributes/headers/GroupByHeaderBase";
    import mxBaseHeaderSlickGrid from "~/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxBaseHeaderSlickGrid"

    export default {
        name: "BaseHeaderListItem",
        components: {GroupByHeaderBase},
        mixins: [mxBaseHeaderSlickGrid],

    }
</script>

<style lang="scss">
  .chip-header.v-chip .v-chip__content {
    display: flex;
  }
</style>
<style scoped lang="scss">
  .task-list-header--parent {
    padding-left: 34px;
    padding-left: 0px;
    /*position: sticky;*/
    top: 0;
    z-index: 4;
  }

  .task-list-header {
    display: inline-flex;
    flex-grow: 1;
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: -10px;
    left: 0;
    z-index: 1;
    height: auto;
    /*color: transparent;*/
    align-items: flex-end;
  }

  .header--row--action {
    transition: opacity .2s cubic-bezier(.785, .135, .15, .86) 0s;
    width: 20px;
    margin-left: 9px;

  }

  .header--row--main {
    flex-grow: 1;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    z-index: 1;
    /*max-width: 350px;*/
    min-width: 350px;
    /*background: #eee;*/
    /*border: solid 1px red;*/
    display: flex;
    align-items: flex-end;

    /*border: solid 1px red;*/
  }

  .header--row--fields {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  .header--row--settings {
    display: flex;
    justify-content: flex-end;
    width: 74px;
    padding-right: 15px;
    flex-shrink: 0;
    position: absolute;
    right: 0px;
    right: 0px;
  }

  .header--cell {
    padding: 0 1px;
    /*border: solid 1px red;*/
    &:last-child {
      padding-right: 0px;
    }
  }

  .header-cell {
    /*border: solid 1px red;*/
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /*flex-grow: 1;*/
    text-align: center;

    font-size: 12px !important;
    line-height: 1.3em;
    text-transform: capitalize !important;
    text-align: left;
    white-space: normal;
  }
</style>
