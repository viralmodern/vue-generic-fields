<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <router-link
          class="link_wp_mb"
          @click.native="$emit('click', $event)"
          target="_blank"
          :to="`/mb/${ID}`"
        >
          <slot>
            {{ $_labelMember(ID) }}
          </slot>
        </router-link>
      </span>
    </template>
    <span>{{ $_labelMember(ID) }}</span>
  </v-tooltip>
</template>
<script>
import workspaceMemberMixin from '@/mixins/mx_workspace-member'

export default {
  name: 'LinkMember',
  mixins: [workspaceMemberMixin],
  props: {
    ID: {
      // type: String,
      required: true,
      default: () => 1234
    }
  }
}
</script>

<style scoped lang="scss">
a.link_wp_mb {
  font-weight: 900;
  color: #6d42c7;

  &:before {
    /*content: "@";*/
  }
}
</style>
<style lang="scss">
.no_content {
  text-decoration: none !important;
  cursor: pointer !important;
}

.no_content:before,
.no_content a.link_wp_mb:before {
  content: '' !important;
}

.no_content.font-weight-normal {
  font-weight: normal !important;
}
</style>
