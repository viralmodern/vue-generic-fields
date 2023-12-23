<template>
  <div>
    <form
      class="menububble__form"
      v-if="linkMenuIsActive"
      @submit.prevent="setLinkUrl(commands.link, linkUrl)"
    >
      <input
        class="menububble__input"
        type="text"
        v-model="linkUrl"
        placeholder="https://"
        ref="linkInput"
        @keydown.esc="hideLinkMenu"
      />
      <v-btn
        icon
        small
        class="ma-0 mx-1"
        @click="setLinkUrl(commands.link, null)"
      >
        <v-icon small color="white">remove_circle_outline</v-icon>
      </v-btn>
    </form>

    <template v-else>
      <v-btn
        small
        class="my-0 mx-1"
        @click="showLinkMenu(getMarkAttrs('link'))"
        :class="{ 'is-active': isActive.link() }"
      >
        <span>{{ isActive.link() ? "Update Link" : "Add Link" }}</span>
        <v-icon small>link</v-icon>
      </v-btn>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    commands: Object,
    isActive: Object,
    getMarkAttrs: Function
  },
  data() {
    return {
      linkUrl: null,
      linkMenuIsActive: false
    };
  },
  methods: {
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
      this.$emit("focusEditor");
    }
  }
};
</script>

<style>
.menububble__form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.menububble__input {
  font: inherit;
  border: none;
  background: rgba(0, 0, 0, 0);
  color: #fff;
}
</style>
