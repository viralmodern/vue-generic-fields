<template>
  <div class="task-list-header--parent d-flex flex-column">
    <div class="main_group_control d-flex text-left" v-if="totalTask">
      <div class="header--row--action">
        <v-btn icon :outlined="false"
               x-small
               @click.stop="clickCollapse"
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
            <GroupByHeaderBase v-if="!noGroup"
                               :group-type="groupType"
                               :attributeType="getAttributeType"
                               :list="getAttributeList"
                               :info="childInfo"/>
          </slot>
        </keep-alive>
        <div>
          <v-chip small label v-if="totalTask">
            <strong>
              {{labelCountTotalTask}}
            </strong>
          </v-chip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GroupByHeaderBase from "../attributes/headers/GroupByHeaderBase"
  import mxBaseHeaderSlickGrid from "~/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxBaseHeaderSlickGrid"
  import { $$labelByName } from "~/sat-vue-toolkit/functions"
  export default {
    name: "BaseHeaderTableItem",
    components: { GroupByHeaderBase },
    mixins: [mxBaseHeaderSlickGrid],
    filters: {
      $$labelByName,
    }
  }
</script>

<style lang="scss">
  .chip-header.v-chip .v-chip__content {
    display: flex;
  }
</style>
<style scoped lang="scss">
  .task-list-header--parent {
    position: sticky;
    top: -25px;
    z-index: 3;
    padding-left: 14px;
  }
  .main_group_control {
    position: sticky;
    left: 0px;
    min-height: 25px;
  }
  .header--row--action {
    transition: opacity .2s cubic-bezier(.785, .135, .15, .86) 0s;
    width: 20px;
    bottom: 0px;
    position: sticky;
    left: 0px;
  }
  .header--row--main {
    /*flex-grow: 1;*/
    position: sticky;
    left: 30px;
    z-index: 1;
    min-width: 350px;
    display: flex;
    align-items: flex-end;
    padding: 0px 0px 0px 0px;
  }

</style>
