<template>
  <v-row no-gutters fill-height>
    <v-list class="px-2">
      <div>
        <v-btn block color="primary" @click="$emit('createLog')">
          <span>Add log</span>
          <v-icon class="pl-1">mdi-add_circle</v-icon>
        </v-btn>
        <v-divider></v-divider>
      </div>
      <div v-for="item in filters " :key="item.id">
        <v-list-item @click="filterLog('type',item.id)">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <v-divider></v-divider>
      <h3 class="ml-3 my-2">TAGS</h3>
      <div class="filterCheckbox">
        <v-list-item v-for="item in tags" :key="item.id" @click="filterLog('tag',item.id)">
          <v-list-item-action>
            <v-checkbox></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-chip small :color="item.color" class="white--text pb-1">
                <span>{{item.name}}</span>
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </div>
      <v-divider></v-divider>
      <h3 class="ml-3 my-2">LINKED RECORD</h3>
    </v-list>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      filters: [
        {
          id: 0,
          name: "All",
          icon: "format_list_bulleted"
        },
        {
          id: 1,
          name: "Privilege",
          icon: "perm_contact_calendar"
        },
        {
          id: 2,
          name: "Exhibit",
          icon: "contact_phone"
        },
        {
          id: 3,
          name: "Communication",
          icon: "vpn_key"
        },
        {
          id: 4,
          name: "Chain of Custody",
          icon: "chrome_reader_mode"
        }
      ],
      filterTags: []
    };
  },
  methods: {
    filterLog(type, value) {
      const data = {
        type: type
      };
      if (type === "tag") {
        let checkTag = this.filterTags.some(id => id === value);
        if (checkTag) {
          this.filterTags = this.filterTags.filter(x => x !== value);
        } else {
          this.filterTags.push(value);
        }
        data.value = [...this.filterTags];
      }
      if (type === "type") {
        data.value = value;
      }
      this.$emit("filterLog", data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/log/tag", ["tags"])
  }
};
</script>
