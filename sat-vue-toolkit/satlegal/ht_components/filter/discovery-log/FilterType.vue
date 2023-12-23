<template>
  <v-select
    v-model="type"
    :items="filters"
    label="Select type"
    placeholder="Select type"
    item-text="name"
    item-value="id"
    prepend-icon="mdi-magnify"
    @change="changeType"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip v-if="index === 0" small>
        <span>{{ item.name }}</span>
      </v-chip>
      <span v-if="index === 1" class="grey--text text-caption">(+{{ type.length - 1 }} others)</span>
    </template>
  </v-select>
</template>
<script>
export default {
  data() {
    return {
      type: "",
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
      ]
    };
  },
  methods: {
    changeType() {
      const data = {
        type: "type",
        value: this.type
      };
      this.$emit("filterLog", data);
    }
  }
};
</script>
