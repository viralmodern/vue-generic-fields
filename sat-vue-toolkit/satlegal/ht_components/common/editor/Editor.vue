<template>
  <v-row no-gutters>
    <v-col sm="12" v-show="isPreview" @click="isPreview = false">
      <div v-html="item"></div>
    </v-col>
    <v-col sm="12" v-show="!isPreview">
      <div class="editor">
        <editor-menu-bar :editor="editor">
          <div class="menubar" slot-scope="{ commands, isActive }">
            <v-btn
              class="ma-0"
              icon
              :color="isActive.bold() ? 'primary' : 'default'"
              @click="commands.bold"
            >
              <v-icon>mdi-format-bold</v-icon>
            </v-btn>
            <v-btn
              class="ma-0"
              icon
              :color="isActive.italic() ? 'primary' : 'default'"
              @click="commands.italic"
            >
              <v-icon>mdi-format-italic</v-icon>
            </v-btn>

            <v-btn
              class="ma-0"
              icon
              :color="isActive.strike() ? 'primary' : 'default'"
              @click="commands.strike"
            >
              <v-icon>mdi-format-strikethrough</v-icon>
            </v-btn>

            <v-btn
              class="ma-0"
              icon
              :color="isActive.underline() ? 'primary' : 'default'"
              @click="commands.underline"
            >
              <v-icon>mdi-format-underline</v-icon>
            </v-btn>

            <v-btn
              class="ma-0"
              icon
              :color="isActive.code() ? 'primary' : 'default'"
              @click="commands.code"
            >
              <v-icon>mdi-xml</v-icon>
            </v-btn>

            <v-btn
              class="ma-0"
              icon
              :color="isActive.paragraph() ? 'primary' : 'default'"
              @click="commands.paragraph"
            >
              <v-icon>mdi-format-size</v-icon>
            </v-btn>

            <v-btn
              class="ma-0"
              icon
              :color="isActive.heading({ level: 1 }) ? 'primary' : 'default'"
              @click="commands.heading({ level: 1 })"
              >H1</v-btn
            >

            <v-btn
              class="ma-0"
              icon
              :color="isActive.heading({ level: 2 }) ? 'primary' : 'default'"
              @click="commands.heading({ level: 2 })"
              >H2</v-btn
            >

            <v-btn
              class="ma-0"
              icon
              :color="isActive.heading({ level: 3 }) ? 'primary' : 'default'"
              @click="commands.heading({ level: 3 })"
              >H3</v-btn
            >

            <v-btn
              class="ma-0"
              icon
              :color="isActive.bullet_list() ? 'primary' : 'default'"
              @click="commands.bullet_list"
            >
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>

            <v-btn
              class="ma-0"
              icon
              :color="isActive.ordered_list() ? 'primary' : 'default'"
              @click="commands.ordered_list"
            >
              <v-icon>format_list_numbered</v-icon>
            </v-btn>

            <v-btn
              class="ma-0"
              icon
              :color="isActive.blockquote() ? 'primary' : 'default'"
              @click="commands.blockquote"
            >
              <v-icon>format_quote</v-icon>
            </v-btn>

            <v-btn
              class="ma-0"
              icon
              :color="isActive.code_block() ? 'primary' : 'default'"
              @click="commands.code_block"
            >
              <v-icon>mdi-xml</v-icon>
            </v-btn>

            <v-btn class="ma-0" icon @click="commands.horizontal_rule">
              <v-icon>mdi-window-minimize</v-icon>
            </v-btn>

            <v-btn class="ma-0" icon @click="commands.undo">
              <v-icon>mdi-undo</v-icon>
            </v-btn>

            <v-btn class="ma-0" icon @click="commands.redo">
              <v-icon>mdi-redo</v-icon>
            </v-btn>
            <v-btn class="ma-0" icon @click="showImagePrompt(commands.image)">
              <v-icon size="20">mdi-image-area</v-icon>
            </v-btn>
            <v-btn
              class="ma-0"
              :color="isActive.todo_list() ? 'primary' : 'default'"
              icon
              @click="commands.todo_list"
            >
              <font-awesome-icon icon="tasks" />
            </v-btn>
            <TableTiptap :commands="commands" :isActive="isActive" />
            <slot name="editorBar" />
          </div>
        </editor-menu-bar>
        <editor-menu-bubble :editor="editor">
          <div
            slot-scope="{ commands, isActive, getMarkAttrs, menu }"
            class="menububble"
            :class="{ 'is-active': menu.isActive }"
            :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
          >
            <v-btn
              icon
              small
              class="my-0 mx-1"
              :class="{ 'menububble__button is-active': isActive.bold() }"
              @click="commands.bold"
            >
              <v-icon small color="white">mdi-format-bold</v-icon>
            </v-btn>

            <v-btn
              icon
              small
              class="my-0 mx-1"
              :class="{ 'menububble__button is-active': isActive.italic() }"
              @click="commands.italic"
            >
              <v-icon small color="white">mdi-format-italic</v-icon>
            </v-btn>

            <v-btn
              icon
              small
              class="my-0 mx-1"
              :class="{ 'menububble__button is-active': isActive.code() }"
              @click="commands.code"
            >
              <v-icon small color="white">mdi-xml</v-icon>
            </v-btn>
            <LinksTiptap
              :commands="commands"
              :isActive="isActive"
              :getMarkAttrs="getMarkAttrs"
              :editor="editor"
              @focusEditor="editor.focus()"
            />
          </div>
        </editor-menu-bubble>
        <editor-content
          class="pa-2 elevation-2 content-editor"
          :editor="editor"
        />
      </div>
    </v-col>
    <v-col sm="12">
      <div class="suggestion-list" v-show="showSuggestions" ref="suggestions">
        <template v-if="hasResults">
          <div
            v-for="(user, index) in filteredUsers"
            :key="user.id"
            class="suggestion-list__item"
            :class="{ 'is-selected': navigatedUserIndex === index }"
            @click="selectUser(user)"
          >
            {{ user.fullName }}
          </div>
        </template>
        <div v-else class="suggestion-list__item is-empty">No users found</div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Fuse from "fuse.js";
import tippy from "tippy.js";
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from "tiptap";
import TableTiptap from "./TableTiptap";
import LinksTiptap from "./LinksTiptap";
import MentionNode from "./MentionNode";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Placeholder,
  Image,
  Table,
  TableHeader,
  TableCell,
  TableRow
} from "tiptap-extensions";
import TodoItem from "./TodoItemNode";

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
    TableTiptap,
    LinksTiptap
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
        new Image(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new MentionNode({
          items: [],
          onEnter: ({ items, query, range, command, virtualNode }) => {
            this.query = query;
            this.filteredUsers = items;
            this.suggestionRange = range;
            this.renderPopup(virtualNode);
            this.insertMention = command;
          },
          onChange: ({ items, query, range, virtualNode }) => {
            this.query = query;
            this.filteredUsers = items;
            this.suggestionRange = range;
            this.navigatedUserIndex = 0;
            this.renderPopup(virtualNode);
          },
          onExit: () => {
            this.query = null;
            this.filteredUsers = [];
            this.suggestionRange = null;
            this.navigatedUserIndex = 0;
            this.destroyPopup();
          },
          onKeyDown: ({ event }) => {
            if (event.keyCode === 38) {
              this.upHandler();
              return true;
            }
            if (event.keyCode === 40) {
              this.downHandler();
              return true;
            }
            if (event.keyCode === 13) {
              this.enterHandler();
              return true;
            }
            return false;
          },
          onFilter: (items, query) => {
            if (!query) {
              return items;
            }
            const fuse = new Fuse(items, {
              threshold: 0.2,
              keys: ["fullName"]
            });
            return fuse.search(query);
          }
        })
      ].concat(
        this.placeholder
          ? [
              new Placeholder({
                emptyClass: "is-empty",
                emptyNodeText: this.placeholder,
                showOnlyWhenEditable: true
              })
            ]
          : []
      ),
      content: this.item,
      onUpdate: obj => {
        this.$emit("change", obj.getHTML());
        this.$emit("clearContent", () => this.editor.clearContent());
      }
    });
  },
  computed: {
    hasResults() {
      return this.filteredUsers.length;
    },
    showSuggestions() {
      return this.query || this.hasResults;
    }
  },
  data() {
    return {
      editor: null,
      query: null,
      suggestionRange: null,
      filteredUsers: [],
      navigatedUserIndex: 0,
      insertMention: () => {},
      observer: null,
      isPreview: false
    };
  },
  props: {
    item: String,
    placeholder: String,
    users: Array,
    editable: Boolean
  },
  methods: {
    clearContent() {
      this.editor.clearContent();
    },
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
    upHandler() {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + this.filteredUsers.length - 1) %
        this.filteredUsers.length;
    },
    downHandler() {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + 1) % this.filteredUsers.length;
    },
    enterHandler() {
      const user = this.filteredUsers[this.navigatedUserIndex];
      if (user) {
        this.selectUser(user);
      }
    },
    selectUser(user) {
      this.insertMention({
        range: this.suggestionRange,
        attrs: {
          id: user.id,
          label: user.fullName
        }
      });
      this.editor.focus();
    },
    renderPopup(node) {
      if (this.popup) {
        return;
      }
      this.popup = tippy(node, {
        content: this.$refs.suggestions,
        trigger: "mouseenter",
        interactive: true,
        theme: "dark",
        placement: "top-start",
        inertia: true,
        duration: [400, 200],
        showOnInit: true,
        arrow: true,
        arrowType: "round"
      });
      if (MutationObserver) {
        this.observer = new MutationObserver(() => {
          this.popup.popperInstance.scheduleUpdate();
        });
        this.observer.observe(this.$refs.suggestions, {
          childList: true,
          subtree: true,
          characterData: true
        });
      }
    },
    destroyPopup() {
      if (this.popup) {
        this.popup.destroy();
        this.popup = null;
      }
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  watch: {
    item(v) {
      this.isPreview = this.editable;
      if (v !== this.editor.getHTML()) {
        this.editor.setContent(v, false);
      }
    },
    users(items) {
      this.editor.extensions.extensions[25].plugins[0].setItems(items);
    }
  }
};
</script>
<style scoped>
.editor /deep/ .menubar__button {
  margin: 4px;
  width: 30px;
  height: 26px;
  font-weight: bold;
  font-size: 20px;
}
.editor /deep/ div {
  outline: none;
}
.content-editor {
  min-height: 150px;
}
.content-editor /deep/ table {
  border-collapse: collapse;
  table-layout: fixed;
  margin: 0;
  overflow: hidden;
}
.content-editor /deep/ table td {
  min-width: 1em;
  border: 2px solid #ddd;
  padding: 3px 5px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}
.editor /deep/ p.is-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
.content-editor /deep/ .column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: 0;
  width: 4px;
  z-index: 20;
  background-color: #adf;
  cursor: col-resize;
}
.menububble {
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  z-index: 20;
  background: #000;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity 0.2s, visibility 0.2s;
  transition: opacity 0.2s, visibility 0.2s;
}
.menububble.is-active {
  opacity: 1;
  visibility: visible;
}
.menububble__button.is-active {
  background-color: hsla(0, 0%, 100%, 0.2);
}
.suggestion-list {
  text-align: left;
  font-size: 1rem;
  font-weight: 700;
}
.suggestion-list__item {
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  margin-bottom: 0.2rem;
  cursor: pointer;
}
.suggestion-list__item:hover,
.suggestion-list__item.is-selected {
  background-color: hsla(0, 0%, 100%, 0.2);
}
.editor /deep/ .mention {
  background: rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  white-space: nowrap;
}
.content-editor /deep/ ul[data-type="todo_list"] {
  padding-left: 0;
}

.content-editor /deep/ li[data-type="todo_item"] {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}

.content-editor /deep/ .todo-checkbox {
  border: 2px solid #000;
  height: 0.9em;
  width: 0.9em;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-right: 10px;
  margin-top: 0.3rem;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  border-radius: 0.2em;
  background-color: rgba(0, 0, 0, 0);
  -webkit-transition: background 0.4s;
  transition: background 0.4s;
}

.content-editor /deep/ .todo-content {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.content-editor /deep/ li[data-done="true"] {
  text-decoration: line-through;
}

.content-editor /deep/ li[data-done="true"] .todo-checkbox {
  background-color: #000;
}

.content-editor /deep/ li[data-done="false"] {
  text-decoration: none;
}
</style>
