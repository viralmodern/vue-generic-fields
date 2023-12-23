<template>
  <v-row no-gutters class="right-border-solid">
    <v-col cols="12">
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-list class="div-list">
          <v-row no-gutters class="justify-center align-center">
            <v-col cols="2" class="div-tag">
              <span :style="{ color: color }" class="span-tag font-weight-bold">
                <span
                  :style="{ backgroundColor: color }"
                  class="background-tag"
                ></span>
                <span class="content">@</span>
              </span>
            </v-col>
            <v-col cols="1" 0>
              <div>
                <div :style="{ color: color }" class="caption font-weight-bold">
                  {{ team.name }}
                </div>
                <div class="caption text--secondary">@{{ team.code }}</div>
              </div>
            </v-col>
          </v-row>
        </v-list>
        <v-divider class="divider-top"></v-divider>
      </v-row>

      <div v-for="(item, index) in team.resources" :key="index">
        <v-list class="div-list">
          <v-row no-gutters>
            <v-row no-gutters class="justify-center align-center">
              <v-col cols="2" class="div-tag">
                <UserAvatar
                  :avatarSize="30"
                  :imageUrl="(item.avatar || {}).imageUrl"
                  :name="item.resource.name"
                />
              </v-col>
              <v-col cols="1" 0>
                <div>
                  <div class="caption font-weight-bold">
                    {{ item.resource.name }}
                  </div>
                  <div class="caption text--secondary">
                    @{{ item.resource.code }}
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-divider
              v-if="index + 1 < team.resources.length"
              :key="index"
              class="divider"
            ></v-divider>
          </v-row>
        </v-list>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import UserAvatar from "../avatars/UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    team: Object,
    color: String
  }
};
</script>
<style scoped>
.div-list {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.span-tag {
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 16px;
  font-size: 22px;
  position: relative;
  overflow: hidden;
}
.span-tag .background-tag {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: brightness(2.1);
}
.span-tag .content {
  z-index: 2;
}
.div-tag {
  justify-content: center;
  display: flex;
}
.divider {
  margin-bottom: -5px;
}
.divider-top {
  margin-bottom: -1px;
}
.right-border-solid {
  border-right: 1px solid silver;
}
</style>
