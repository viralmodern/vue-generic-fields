<template>
  <div no-gutters class="align-center" style="position: relative">
    <div v-if="disabled" class="disabled-comment-input"></div>
    <div class="comment-container">
      <label class="attachment_box" v-if="attachment">
        <v-icon>attach_file</v-icon>
        <input
          type="file"
          @change="updaloadFile"
          hidden
          class="hidden"
          :multiple="multiple"
        />
      </label>
      <vue-tribute ref="refTribute" class="v-tribute--input" :options="options">
        <div
          :contenteditable="disabled ? false : true"
          ref="inputArea"
          :data-ph="placeholder"
          class="input-area"
          v-html="value"
          @mouseup="getCaret"
          @blur="getCaret"
          @keypress="keyHandler"
          @keyup="keyUpHandler"
          @input="getCaret"
        ></div>
      </vue-tribute>
      <div>
        <div>
          <v-menu
            :nudge-width="200"
            offset-x
            left
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on" @click="onClickEmoji" icon small class="my-0">
                <v-icon small>tag_faces</v-icon>
              </v-btn>
            </template>

            <v-card flat>
              <Picker
                title="Pick your emoji…"
                emoji="point_up"
                @select="emojiPickup"
              />
            </v-card>
          </v-menu>
          <v-btn
            class="ma-0"
            depressed
            icon
            x-small
            text
            @click="sendClick"
            :loading="isLoadingSend"
          >
            <!--Add comment-->
            <v-icon small>send</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <!-- <v-layout v-if="attachment" :class="`ma-2 ${arrFile.length > 0 ? 'div-select' : ''}`">
      <v-icon v-if="arrFile.length > 0" @click="arrFile = []" class="icon-closed">close</v-icon>
      <v-flex xs2 row v-for="item in arrFile.slice(0,5)" :key="item.id" class="ml-2">
        <v-card
          v-if="convertFileToUrl(item.file).type === 'files'"
          :color="'grey lighten-1'"
          class="card mt-1"
          height="70"
          width="120"
        >
          <v-icon>file_copy</v-icon>
          <span class="numberOfLine">{{convertFileToUrl(item.file).name}}</span>
        </v-card>
        <ImageCard
          v-else
          :imageUrl="convertFileToUrl(item.file)"
          maxWidth="120"
          maxHeight="70"
          style="border-radius: 5px"
          class="mb-1 ma-1"
        />
      </v-flex>
      <ImageCard
        v-if="arrFile.length > 5"
        :imageUrl="convertFileToUrl(arrFile[5].file)"
        maxWidth="120"
        maxHeight="70"
        style="border-radius: 5px"
        class="ma-1 mt-3 ml-3 image-more"
      >
        <template slot="cardImageText">
          <span class="text-h3 text-more">+{{arrFile.length - 5}}</span>
        </template>
      </ImageCard>
    </v-layout> -->
  </div>
</template>

<script>
import VueTribute from "./CustomVueTribute";
import { Picker } from "emoji-mart-vue";
import ImageCard from "../images/ImageCard";
import "./vue-tribute.css";
export default {
  props: {
    mentions: Array,
    placeholder: {
      type: String,
      default: "#Message, @user..."
    },
    attachment: Boolean,
    multiple: Boolean,
    defaultCommentText: String,
    value: String,
    isLoadingSend: Boolean,
    currentUser: Object,
    avatarSize: Number,
    disabled: Boolean,
    autoFocusCommentInput: Boolean,
  },
  data() {
    return {
      commentText: "",
      imageData: "",
      urlAvatar: null,
      fileName: null,
      arrFile: [],
      listFile: [],
      position: null,
      regexUrl: /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/,
      fileJPEG: ""
    };
  },
  components: {
    VueTribute,
    ImageCard,
    Picker
  },
  methods: {
    onClickEmoji(){
      if(!this.commentText) {
        this.focusCommentInput();
      }
    },
    keyHandler(e) {
      if (e.code === "Enter" && !e.ctrlKey && !e.shiftKey) {
        this.sendClick();
        e.preventDefault();
      }
    },
    keyUpHandler(e) {
      if (e.code === "Escape") {
        this.$emit("cancelEditing");
        e.preventDefault();
      }
    },
    emojiPickup(emoji) {
      if (this.position) {
        const textarea = this.$refs.inputArea;
        const textNode = document.createElement("span");
        textNode.innerHTML = emoji.native;
        this.position.deleteContents();
        this.position.insertNode(textNode);
        this.$emit("change", textarea.textContent);
        this.position.setStartAfter(textNode);
      }
    },
    sendClick() {
      this.getCaret();
      this.$emit("send", this.commentText);
      this.$emit("sendFile", this.listFile);
      this.listFile = [];
      this.arrFile = [];
    },
    clearCommentInput() {
      this.$refs.inputArea.innerHTML = "";
      this.commentText = "";
      this.focusCommentInput();
    },
    focusCommentInput() {
      this.$nextTick(() =>
        {
          const el = this.$refs.inputArea;
          if(el.childNodes.length) {
            var range = document.createRange();
            var sel = window.getSelection();
            range.setStart(el, el.childNodes.length);
            range.setEnd(el, el.childNodes.length)
            sel.removeAllRanges();
            sel.addRange(range);
          }
          el.focus()
        }
      )
    },
    updaloadFile() {
      let input = event.target;
      this.listFile.push(input.files);
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      this.urlAvatar = (window.URL || window.webkitURL).createObjectURL(
        input.files[0]
      );
      this.fileName = input.files[0].name;
      if (this.multiple === true) {
        var filesConvert = Object.keys(event.target.files).map(key => {
          return event.target.files[key];
        });
        var res = filesConvert.map(x => {
          return { file: x, name: x.name, id: Math.random() };
        });
        this.arrFile = this.arrFile.concat(res);
        this.$emit("selectFiles", this.arrFile);
      } else {
        this.arrFile = [
          ...this.arrFile,
          { id: Math.random(), name: this.fileName, file: input.files[0] }
        ];
      }
    },
    removeFile(item) {
      this.arrFile = this.arrFile.filter(x => x.id !== item.id);
    },
    getCaret() {
      const sel = window.getSelection && window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        this.position = range;
      }
      let text = this.$refs.inputArea.innerHTML;
      // const list_elm_a = text.match(/<a\b[^>]*>(.*?)<\/a>/gm);

      // if (list_elm_a) {
      //   list_elm_a.forEach(a => {
      //     const userId = a.match(/@->user#\b\d+\b/gm);
      //     text = text.replace(a, userId[0]);
      //   });
      // }
      this.commentText = text;
      // const htmlObject = document.createElement("div");
      // htmlObject.innerHTML = text;
      // this.commentText = htmlObject.textContent;
      // htmlObject.remove();
    },
    convertFileToUrl(file) {
      var nameFiles = file.name.split(".")[1];
      var reader = new FileReader();
      reader.onload = e => {
        this.fileJPEG = e.srcElement.result.split(";")[0].split("/")[1];
      };
      if (nameFiles === "jpg" || nameFiles === "jpeg" || nameFiles === "png") {
        reader.readAsDataURL(file);
        return (window.URL || window.webkitURL).createObjectURL(file);
      } else {
        return {
          type: "files",
          name: file.name
        };
      }
    }
  },
  mounted() {
    if (this.defaultCommentText !== null) {
      this.commentText = this.defaultCommentText;
    }
    if (this.autoFocusCommentInput) {
      this.focusCommentInput();
    }
  },
  watch: {
    commentText(n) {
      if (n) {
        this.$emit("change", this.commentText);
      }
    },
    defaultCommentText(v) {
      this.commentText = v;
    },
    arrFile(val) {
      this.$emit("selectFiles", val);
    }
  },
  computed: {
    options() {
      const arr = this.mentions.map(x => ({
        key: x.name,
        value: `->user#${x.id}`,
        name: x.name
      }));
      return {
        trigger: "@",
        values: arr,
        selectTemplate: function(item) {
          if(!item) return this.current.trigger + "" + this.current.mentionText;
          return `<a id="@${item.original.value}" class="tribute-mention" contenteditable="false">${item.original.name}</a>`;
        }
      };
    }
  }
};
</script>
<style scoped lang="scss">
.disabled-comment-input {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, .1);
  border-radius: 16px;
}
.input-area {
  appearance: none;
  border: none;
  width: 100%;
  border-radius: 0.25rem;
  outline: none;
  resize: none;
  color: #1c1e21;
  font-size: 13px;
}
.comment-container {
  position: relative;
  border: solid 1px #cccccc;
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 3px 7px;
  background-color: #f2f3f5;
  border: 1px solid #ccd0d5;
  flex: 1 1 auto;
  border-radius: 16px;
  &.phucxo {
    border: solid 3px gainsboro;
    border-radius: 10px;
    overflow: hidden;
    .input-area {
      min-height: 40px;
      height: auto;
    }
  }
  .v-tribute--input {
    flex: 1;
  }
  .input-area {
    /*max-height: 80px;*/
    /*height: auto;*/
    /*height: 40px;*/
    // padding: 7px;
    // display: block;
    display: inline-block;
  }
  .attachment_box {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: solid 1px #ccc;
    width: 50px;
  }
}
.actions {
  width: 50px;
}
.hidden {
  display: none !important;
}
.btn-default {
  cursor: pointer;
}
.div-center {
  display: flex;
}
[contentEditable="true"]:empty:not(:focus):before {
  content: attr(data-ph);
  color: rgb(117, 117, 117);
  font-size: 12px;
}
.div-select {
  border: 1px #cccccc solid;
  position: relative;
}
.image-more {
  border-radius: 5px;
  opacity: 0.5;
  justify-content: center;
  align-items: center;
  display: flex;
}
.text-more {
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
}
.icon-closed {
  position: absolute;
  right: 0px;
  cursor: pointer;
}
.numberOfLine {
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
