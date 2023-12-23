<template>
  <div class="content_group_header" v-if="groupType">
    <template v-if="groupType === $$ATTRIBUTE_FIELDS.LINK.TYPE">
      <GroupByUrls :info="info"/>
    </template>
    <template v-else-if="groupType === $$ATTRIBUTE_FIELDS.TEXT.TYPE">
      <GroupByText :info="info"/>
    </template>
    <template v-else-if="groupType === $$ATTRIBUTE_FIELDS.INTEGER.TYPE">
      <GroupByText :info="info"/>
    </template>
    <template v-else-if="groupType === $$ATTRIBUTE_FIELDS.DATE.TYPE">
      <GroupByDate :info="info"/>
    </template>
    <template v-else-if="groupType === $$ATTRIBUTE_FIELDS.CHECKBOX.TYPE">
      <GroupByCheckbox :info="info" :list="list"/>
    </template>
    <template v-else-if="attributeType === $$ATTRIBUTE_FIELDS.DROPDOWN.TYPE">
      <GroupByStatus :info="info" :list="list"/>
    </template>
    <template v-else-if="groupType === $$ATTRIBUTE_FIELDS.LIST.TYPE">
      <GroupBySelect :info="info" :list="list"/>
    </template>
    <template v-else>
      <GroupBySelect :list="list" :info="info"/>
    </template>
  </div>
</template>
<script>
    import GroupByCheckbox from "./GroupByCheckbox";
    import GroupByDate from "./GroupByDate";
    import GroupBySelect from "./GroupBySelect";
    import GroupByText from "./GroupByText";
    import GroupByUrls from "./GroupByUrls";
    import {ATTRIBUTE_FIELDS} from "../../configs/attribute";
    import GroupByStatus from "./GroupByStatus";
    export default {
        props: {
            $$ATTRIBUTE_FIELDS: {
              type: Object,
              default: () => ATTRIBUTE_FIELDS
            },
            groupType: {
                type: String,
            },
            attributeType: {
                type: String,
            },

            info: {
                type: [String, Object, Array, Date]
            },
            list: {
                type: [Array]
            },

        },
        components: {
            GroupByStatus,
            GroupByCheckbox,
            GroupByDate,
            GroupBySelect,
            GroupByText,
            GroupByUrls,
        },
        mounted() {
        },
        computed: {},


    }
</script>
<style lang="scss">
  .content_group_header {
    max-width: 350px;
    overflow: hidden;
  }
</style>
