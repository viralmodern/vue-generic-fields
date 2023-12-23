<template>
  <div>
    <v-row
      v-if="isShowTitleUserMessage"
      no-gutters
      class="align-center comment__title"
    >
      <a href="#" class="mr-2 text-body-2 comment__title-name">{{ nameUser }}</a>
      <TimerLabel class="comment__title-time" :time="commentDate" />
    </v-row>
    <v-row no-gutters class="mt-1 align-center comment__content flex-nowrap">
      <div class="comment__content-text" v-html="content"></div>
      <v-btn
        class="pa-0 ma-0 comment__content-action-more"
        small
        icon
        v-if="isShowActionMore"
      >
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-icon small v-on="on">mdi-dots-horizontal</v-icon>
            </template>
            <v-list>
              <template v-for="(item, index) in actions">
                <v-list-item
                  v-if="isTurnOfSomeAction.includes(item.action) ? false : true"
                  style="min-height:27px"
                  :key="index"
                  @click="$emit(item.event)"
                >
                  <v-list-item-title class="text-caption"
                    ><div class="d-flex align-center">
                      <v-icon small class="mr-2">{{ item.icon }}</v-icon
                      >{{ item.title }}
                    </div></v-list-item-title
                  >
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </div>
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import TimerLabel from "../../labels/TimerLabel";

export default {
  components: {
    TimerLabel
  },
  props: {
    nameUser: String,
    commentDate: String,
    content: String,
    isShowActionMore: Boolean,
    isShowTitleUserMessage: {
      type: Boolean,
      default: () => true
    },
    isTurnOfSomeAction: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      actions: [
        {
          title: "Edit...",
          event: "onEditMessage",
          icon: "mdi-pencil",
          action: "Edit"
        },
        {
          title: "Delete...",
          event: "onDeleteComment",
          icon: "mdi-delete",
          action: "Delete"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
$color-blue: #385898;

.comment {
  &__title {
    &-name {
      color: $color-blue;
      font-weight: 600;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    &-title {
      color: #606770;
    }
    &-time {
      padding-top: 2px;
    }
  }
  &__content {
    &:hover &-action-more {
      display: block;
    }

    &-text {
      background-color: #f2f3f5;
      border-radius: 18px;
      padding: 5px 10px;
      color: #1c1e21;
      margin-right: 1px;
      max-width: calc(100% - 29px);
      word-break: break-word;
    }

    &-action-more {
      display: none;
    }
  }
}
</style>
