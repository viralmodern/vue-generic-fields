<template>
  <div class="px-2">
    <v-row class="pa-2 align-center" no-gutters>
      <v-col cols="6">
        <span class="subheading font-weight-bold">Litigation:</span>
      </v-col>
      <v-col cols="6" class="text-xs-center">
        <SelectInline
          :item="itemJoin"
          :items="dataMap"
          keyText="code"
          @select="$emit('update', {newValue: $event.code, columnName: 'litigation'})"
        >
          <template slot="section" slot-scope="props">
            <span>{{(props.item || {}).code}}</span>
          </template>
          <template slot="menu" slot-scope="props">
            <span>{{(props.item || {}).display}}</span>
          </template>
        </SelectInline>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <v-row class="pa-2 align-center" no-gutters>
      <v-col cols="6">
        <span class="subheading font-weight-bold">Activities:</span>
      </v-col>
      <v-col cols="6" class="text-xs-center">
        <SelectInline
          :item="itemJoinActivity"
          :items="dataMapActivity"
          keyText="code"
          @select="$emit('update', {newValue: $event.code, columnName: 'activities'})"
        >
          <template slot="section" slot-scope="props">
            <span>{{(props.item || {}).code}}</span>
          </template>
          <template slot="menu" slot-scope="props">
            <span>{{(props.item || {}).display}}</span>
          </template>
        </SelectInline>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="pa-2 align-center" no-gutters>
      <v-col cols="6">
        <span class="subheading font-weight-bold">Status:</span>
      </v-col>
      <v-col cols="6" class="text-xs-center">
        <SelectInline
          :item="itemJoinStatus"
          :items="(this.appConfigs.taskStatus || [])"
          keyText="name"
          keyColor="color"
          class="select"
          @select="$emit('update', {newValue: $event.id, columnName: 'status'})"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="pa-2 align-center" no-gutters>
      <v-col cols="6">
        <span class="subheading font-weight-bold">Time log:</span>
      </v-col>
      <v-col cols="6" class="text-xs-center">Api thiếu</v-col>
    </v-row>
    <v-divider></v-divider>
  </div>
</template>

<script>
import SelectInline from "../../../menus/SelectInline";
import { mapGetters } from "vuex";
export default {
  props: {
    items: Object
  },
  components: {
    SelectInline
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    itemJoin() {
      return (this.appConfigs.litigationCode || []).find(
        x => x.code === this.items.litigation
      );
    },
    dataMap() {
      const a = (this.appConfigs.litigationCode || []).map(x => {
        return { ...x, display: x.code + " - " + x.name };
      });
      return a;
    },
    itemJoinActivity() {
      return (this.appConfigs.activitiesCode || []).find(
        x => x.code === this.items.activities
      );
    },
    dataMapActivity() {
      const a = (this.appConfigs.activitiesCode || []).map(x => {
        return { ...x, display: x.code + " - " + x.name };
      });
      return a;
    },
    itemJoinStatus() {
      return (
        (this.appConfigs.taskStatus || []).find(
          x => x.id === this.items.status
        ) || {}
      );
    }
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.label /deep/ .label-item {
  flex-wrap: wrap;
}
</style>

