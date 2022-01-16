<template>
  <div>
    <div class="code">
      <prism-editor
        :id="BlocksIndex"
        class="prism-code-editor"
        v-model="code.text"
        :highlight="highlighter"
        line-numbers
      ></prism-editor>
    </div>

    <el-dialog
      title="編輯"
      :visible.sync="visible"
    >
      <el-select
        v-model="language"
        filterable
        placeholder="選擇語言"
      >
        <el-option
          v-for="lang in languageOptions"
          :key="lang.value"
          :label="lang.label"
          :value="lang.value"
        >
          <span style="float: left">{{ lang.label }}</span>
          <span style="float: right; font-size: 13px">{{ lang.value }}</span>
        </el-option>
      </el-select>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateBlock(language)"
        >確 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// TODO:支援自定義預設值以及顔色選擇器
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import Prism from 'prismjs'
Prism.manual = false;


export default {
  name: "hint",
  props: ["value", "BlocksIndex"],
  components: {
    PrismEditor,
  },
  data() {
    return {
      code: this.value,
      languageOptions: [
        {
          value: "js",
          label: "Javascript",
        },
        {
          value: "py",
          label: "Python",
        },
        {
          value: "java",
          label: "Java",
        },
      ],
      language: "js",
    };
  },
  watch: {
    value(val) {
      this.code = val;
    },
  },
  methods: {
    updateBlock(language) {
      let blockInfo = {
        index: this.BlocksIndex,
        blockItem: {
          type: this.$options.name,
          data: {
            text: this.value,
            language: language,
          },
        },
      };
      this.$store.dispatch("mainStore/setUpdateOneBlock", blockInfo);
      this.visible = false;
    },
    highlighter(code) {
      return Prism.highlight(code, Prism.languages.js);
    },
  },
  computed: {
    dialogFormVisible() {
      return this.$store.state.mainStore.dialogFormVisible;
    },
    currentBlockIndex() {
      return this.$store.state.mainStore.currentBlockIndex;
    },
    visible: {
      get() {
        if (
          this.currentBlockIndex === this.BlocksIndex &&
          this.dialogFormVisible === true
        ) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {
        this.$store.dispatch("mainStore/setUpdateDialogFormVisible", value);
      },
    },
  },
};
</script>

<style lang="less">
@font-face {
  font-family: "Fira code";
  src: url("../../assets/font/FiraCode.ttf");
}
.code {
  margin-right: 10px;
  padding: 10px;
}
/* required class */
.prism-code-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
