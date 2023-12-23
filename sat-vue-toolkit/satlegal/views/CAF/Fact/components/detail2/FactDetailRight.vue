<template>
  <div class="px-2">
    <v-row no-gutters class="pa-2">
      <v-col cols="5">
        <span class="subheading font-weight-bold">Relevant</span>
      </v-col>
      <v-col cols="7">
        <SliderPercent
          :value="items.relevant"
          type="circular"
          @onChange="change('relevant', $event)"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters class="pa-2">
      <v-col cols="5">
        <span class="subheading font-weight-bold">Important</span>
      </v-col>
      <v-col cols="7">
        <SliderPercent
          :value="items.important"
          type="circular"
          @onChange="change('important', $event)"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters class="pa-2">
      <v-col cols="5">
        <span class="subheading font-weight-bold">Disputes</span>
      </v-col>
      <v-col cols="7">
        <v-switch
          hide-details
          class="ma-0"
          @change="change('dispute', $event)"
          v-model="disputed"
        ></v-switch>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters class="pa-2">
      <v-col cols="5">
        <span class="subheading font-weight-bold">Favorable</span>
      </v-col>
      <v-col cols="7">
        <SelectMultipeFavorable
          @onChange="change('favorable', $event.id)"
          :item="favorables.find(x => x.id === items.favorable)"
          :items="favorables"
          itemText="name"
          itemid="id"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters class="pa-2">
      <v-col cols="5">
        <span class="subheading font-weight-bold">Tag</span>
      </v-col>
      <v-col cols="7" align-center class="label">
        <MenuListTags
          :tag="items.tags.map(x => x.pk)"
          :tags="tag"
          keyText="name"
          keyColor="color"
          title="List Tags"
          nameAdd="Add new Tags"
          lengthDisplay="3"
          @add="
            addTagsRequest({
              matterId:$route.params.matter || $route.params.projectId,
              ...$event,
              type: 'tag'
            })
          "
          @update="
            updateTagsRequest({
              matterId:$route.params.matter || $route.params.projectId,
              ...$event,
              type: 'tag'
            })
          "
          @remove="
            removeTagsRequest({
              matterId:$route.params.matter || $route.params.projectId,
              id: $event,
              type: 'tag'
            })
          "
          @chose="change('tags', $event)"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters class="pa-2 align-center">
      <v-col x5>
        <span class="subheading font-weight-bold mt-2">Time</span>
      </v-col>
      <v-col cols="7">
        <TimePickerInline :value="time" @submit="addTime" />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters class="pa-2 align-center">
      <v-col x5>
        <span class="subheading font-weight-bold">Location</span>
      </v-col>
      <v-col cols="7">
        <span>{{ items.location.raw || "No location" }}</span>
        <!-- <v-text-field
          class="custom-text-field ma-0 pa-0"
          hide-details
          :value="items.location"
          @change="change('location', $event)"
        />-->
        <!-- <ProcessChooseItem
          @searchText="searchText"
          :items="filterListItems"
          :value="joinLocation"
          type="location"
          title="Locations"
          labelSearch="Search location"
          @chooseValue="chooseItem('location', $event)"
          @deleteLocation="deleteLocation"
          @addLocation="addLocation"
          @editLocation="editLocation"
        >
          <template slot="showMessageSearch">
            <span class="mt-5 text-body-1">
              There is no location is matched with your search pattern.
              Consider to add new location using bellow button.
            </span>
          </template>
          <template slot="showItem" slot-scope="props">
            <span>{{ props.item.name }}</span>
          </template>
        </ProcessChooseItem>-->
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters class="pa-2">
      <v-col cols="5">
        <span class="subheading font-weight-bold">Fact type</span>
      </v-col>
      <v-col cols="7">
        <SelectMultipeFactType
          @onChange="change('type', $event.id)"
          :item="typeFacts.find(x => x.id === items.type)"
          :items="typeFacts"
          itemText="name"
          itemid="id"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters class="pa-2">
      <v-col cols="5">
        <span class="subheading font-weight-bold">Issue</span>
      </v-col>
      <v-col cols="7" class="label">
        <MenuListTags
          :tag="items.issues.map(x => x.pk)"
          :tags="issue"
          keyText="name"
          keyColor="color"
          title="List Tags"
          nameAdd="Add new Issue"
          lengthDisplay="3"
          @add="
            addTagsRequest({
              matterId:$route.params.matter || $route.params.projectId,
              ...$event,
              type: 'issue'
            })
          "
          @update="
            updateTagsRequest({
              matterId:$route.params.matter || $route.params.projectId,
              ...$event,
              type: 'issue'
            })
          "
          @remove="
            removeTagsRequest({
              matterId:$route.params.matter || $route.params.projectId,
              id: $event,
              type: 'issue'
            })
          "
          @chose="change('issues', $event)"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import moment from "moment";
import { favorables, typeFacts } from "../../../../config";
import SliderPercent from "../../../menus/SliderPercent";
import SelectMultipeFavorable from "../../../../components/menus/SelectMultipeFavorable";
import SelectMultipeFactType from "../../../../components/menus/SelectMultipeFactType";
import TimePickerInline from "../../../../components/dialogs/TimePickerInline";
import MenuListTags from "../../../../components/menus/MenuListTags";
// import ProcessChooseItem from "../../../menus/ProcessChooseItem";
export default {
  components: {
    SliderPercent,
    SelectMultipeFavorable,
    SelectMultipeFactType,
    TimePickerInline,
    MenuListTags
    // ProcessChooseItem
  },
  props: {
    items: Object
  },
  data() {
    return {
      valid: true,
      favorables,
      typeFacts,
      searchQuery: "",
      disputed: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/tags", ["tag", "issue"]),
    time() {
      return moment(this.items.time).format("HH:mm:ss");
    },
    joinLocation() {
      return this.locations.find(x => x.id === this.items.location) || {};
    },
    ...mapGetters("ht_store/matter/location", ["locations"]),
    filterListItems() {
      if (this.searchQuery) {
        return this.locations.filter(x => {
          return x.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      } else {
        return this.locations;
      }
    }
  },
  methods: {
    searchText(text) {
      this.searchQuery = text;
    },
    chooseItem(name, value) {
      const data = {
        name: name,
        value: value.id
      };
      return data;
    },
    deleteLocation(id) {
      this.removeLocation(id);
    },
    change(name, value) {
      const { projectId, factId } = this.$route.params;
      const data = {
        matterId: projectId,
        taskId: factId,
        body: {
          [name]: value
        }
      };
      this.$emit("updateFactsDetail", data);
    },
    addTime(time) {
      var date = moment(new Date()).format("YYYY-MM-DD");
      var dateTime = date + " " + time;
      this.change("time", new Date(dateTime).toISOString());
    },
    ...mapActions("ht_store/matter/tags", [
      "addTagsRequest",
      "updateTagsRequest",
      "removeTagsRequest"
    ]),
    ...mapMutations("ht_store/matter/location", [
      "removeLocation",
      "addLocation",
      "editLocation"
    ])
  },
  mounted() {
    this.disputed = this.items.dispute;
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.label /deep/ .label-item {
  col-wrap: wrap;
}
</style>
