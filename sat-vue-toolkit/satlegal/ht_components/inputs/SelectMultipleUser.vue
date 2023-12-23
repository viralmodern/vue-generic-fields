<template>
  <v-autocomplete
    :rules="rules"
    :value="user"
    @change="$emit('change', $event)"
    :items="users"
    :label="label"
    :item-value="itemValue"
    :item-text="itemText"
    :multiple="multiple"
    :prepend-icon="prependIcon"
    :placeholder="placeholder"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip pill v-if="index === 0" class="chip--select-multi" :close="close" @input="remove(item)">
        <UserAvatar left :name="eval(item,itemText)" :imageUrl="eval(item,itemImg)" :avatarSize="30"/>
        <span>{{eval(item,itemText)}}</span>
      </v-chip>
      <span v-if="index === 1" class="grey--text caption">(+{{ user.length - 1 }} others)</span>
    </template>
    <template slot="item" slot-scope="{item}">
      <UserAvatar :name="eval(item,itemText)" :imageUrl="eval(item,itemImg)" :avatarSize="35"/>&nbsp;
      <span>{{eval(item,itemText)}}</span>
    </template>
  </v-autocomplete>
</template>

<script>
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    users: Array,
    itemValue: String,
    itemText: String,
    itemImg: String,
    user: [Array, String, Number],
    label: String,
    multiple: Boolean,
    rules: Array,
    prependIcon: String,
    placeholder: String,
    close: Boolean
  },
  methods: {
    eval(context, string) {
      try {
        const item = context; // eslint-disable-line no-unused-vars
        return eval("item." + string);
      } catch (error) {
        try {
          return eval(string);
        } catch (errorWithoutThis) {
          console.warn("Error en script: " + string, errorWithoutThis); /* eslint-disable-line no-console */
          return null;
        }
      }
    },
    remove(item) {
      this.$emit("remove", item);
    }
  }
};
</script>
