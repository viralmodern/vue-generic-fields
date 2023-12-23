<template>
  <v-card>
    <v-row no-gutters style="max-height: 150px;min-height: 150px;">
      <v-col cols="3" class="avatar">
        <v-row no-gutters class="fill-height align-center justify-center">
          <div>
            <UserAvatar :avatarSize="40" :imageUrl="imageUrl" :name="name" />
          </div>
          <div class="subheading">{{ name }}</div>
        </v-row>
      </v-col>
      <v-col cols="9" class="px-1" style="overflow: auto">
        <ul>
          <li v-for="item in feelings" class="py-1" :key="item.id">
            <TextAreaInline
              :value="item.comment"
              row="2"
              @onChange="
                $emit('updateComment', { id: item.id, comment: $event })
              "
            />
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import UserAvatar from "@/sat-vue-toolkit/satlegal/ht_components/avatars/UserAvatar";
import TextAreaInline from "@/sat-vue-toolkit/satlegal/ht_components/inputs/TextAreaInline";

export default {
  components: {
    TextAreaInline,
    UserAvatar
  },
  props: {
    imageUrl: String,
    name: String,
    feelings: Array
  }
};
</script>
