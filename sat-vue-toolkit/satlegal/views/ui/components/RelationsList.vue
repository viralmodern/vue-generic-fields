<template>
  <div class="w-100">
    <template v-if="items.length">
      <div class="d-flex flex-wrap box_list_hover">
        <template v-for="(item, index) in items">
          <template v-if="index <= cst">
            <div class="item mt-1 mr-1" :key="index">
              <RelationsListItem :color="color"
                                 :title="item | l_title"/>
            </div>
          </template>
        </template>
        <v-btn small
               @click="addItem"
               text
               class="mt-2 mr-1 link_add text-caption text-capitalize"
               color="primary">
          <v-icon x-small>mdi-plus</v-icon>
          {{labelAdd}}
        </v-btn>
        <template v-if="items.length > cst">
          <v-chip label color="primary" small class="mt-1">
            +{{items.length - cst}}
          </v-chip>
        </template>
      </div>
    </template>
    <template v-else>
      <v-btn small
             @click="addItem"
             depressed
             class="mt-2 mr-1 link_add text-caption text-capitalize">
        <v-icon x-small left>mdi-plus</v-icon>
        {{labelAdd}}
      </v-btn>
    </template>
  </div>
</template>

<script>
    import RelationsListItem from "@/sat-vue-toolkit/satlegal/views/ui/components/RelationsListItem.vue";
    import {hexToRgbA} from "@/sat-vue-toolkit/functions";
    export default {
        name: "RelationsList",
        components: {RelationsListItem},
        props: {

            colorAdd: {
                type: String,
                default: () => '#1976d2'
            },
            labelAdd: {
                type: String,
                default: () => 'new item'
            },
            cst: {
                type: Number,
                default: () => 100
            },
            items: {
                type: [Array],
                default: () => []
            },
            color: {
                type: [String],
                default: () => {
                    return '#ff0000'
                }
            },
        },
        methods:{
            addItem() {
                this.$emit('add-item')
            }
        },
        filters: {
            l_title(v) {
                try {
                    return v.name || v.description || 'N/A'
                } catch (e) {
                    return '-'
                }
            },
            hexToRgbA
        }
    }
</script>

<style scoped lang="scss">
  .box_list_hover {
    .link_add {
      opacity: 0;
      pointer-events: none;
    }

    &:hover {
      .link_add {
        opacity: 1;
        pointer-events: visible;
      }
    }
  }
</style>
