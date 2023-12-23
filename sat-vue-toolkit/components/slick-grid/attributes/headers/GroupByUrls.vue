<template>
  <div>
    <template v-for="url in l_group">
      <v-chip :key="url" small class="mb-1 mr-1">
        <v-icon left small>mdi-link-variant</v-icon>
        <a :href="url" target="_blank" class="caption font-weight-bold">{{url}}</a>
      </v-chip>
    </template>
  </div>
</template>

<script>
    export default {
        name: "GroupByUrls",
        props: {
            info: {
                type: [String, Object, Array, Date],
                default: ''
            }
        },
        computed: {
            l_group() {
                try {
                    return this.info.length ? this.info.split(',') : ''
                } catch (e) {
                    return this.info
                }
            }
        }
    }
</script>

<style scoped>
  .url_head_item {
    /*border: solid 1px red;*/
    display: inline-block;
    padding: 5px;
  }
</style>
