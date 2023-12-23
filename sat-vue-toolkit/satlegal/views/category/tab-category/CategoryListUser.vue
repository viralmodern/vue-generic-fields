<template>
  <v-list three-line>
    <v-row no-gutters>
      <AddCategoryCalause
        :btnBlock="true"
        @createCategoryUser="data => $emit('createCategoryUser', data)"
      />
      <template v-for="(item, index) in dataUserByList">
        <div :key="index">
          <v-list-item
            avatar
            @click="filterListUser(item)"
            v-if="dataUserByList.length > 0"
          >
            <v-list-item-avatar>
              <UserAvatar
                v-if="item.creator"
                :avatarSize="40"
                :imageUrl="item.creator.avatar.imageUrl"
                :name="item.creator.avatar.name || ''"
                class
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                :class="item.isActive === true ? 'primary--text' : ''"
                >{{ item.clauseName }}</v-list-item-title
              >
              <v-list-item-subtitle>{{ item.desc }}</v-list-item-subtitle>
              <v-row
                no-gutters
                class="justify-center align-center"
                style="width:100%"
              >
                <v-chip
                  v-for="n in item.tags.slice(0, 1)"
                  :key="n.id"
                  style="height: 20px"
                  :color="n.color"
                  text-color="white"
                  >{{ n.text }}</v-chip
                >
                <v-row no-gutters class="justify-end">
                  <v-btn
                    small
                    icon
                    @click="$emit('removeUserInCateogry', item)"
                  >
                    <v-icon>mdi-delete_outline</v-icon>
                  </v-btn>
                </v-row>
              </v-row>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>
        </div>
      </template>
      <span class="title" v-if="dataUserByList.length === 0"
        >No clause category !</span
      >
    </v-row>
  </v-list>
</template>
<script>
import UserAvatar from "../../../ht_components/avatars/UserAvatar";
import AddCategoryCalause from "../../../ht_components/dialogs/AddCategoryCalause";
export default {
  components: {
    UserAvatar,
    AddCategoryCalause
  },
  data() {
    return {
      dataUserByList: []
    };
  },
  props: {
    userByList: Array
  },
  methods: {
    filterListUser(item) {
      this.dataUserByList = this.dataUserByList.map(x => {
        if (item.id === x.id) {
          return { ...x, isActive: true };
        } else {
          return { ...x, isActive: false };
        }
      });
      this.$emit("showContentCategory", item);
    }
  },
  watch: {
    userByList(val) {
      if (val) {
        this.dataUserByList = val.map(x => {
          if (val[0].id === x.id) {
            return { ...x, isActive: true };
          } else {
            return { ...x, isActive: false };
          }
        });
      }
      this.$emit("showContentCategory", this.dataUserByList[0]);
    }
  }
};
</script>
