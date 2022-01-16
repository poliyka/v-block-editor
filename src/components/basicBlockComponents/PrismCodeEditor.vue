<template>
  <div :id="joinBlockIdPrefix(BlocksIndex)">
    <div :class="joinClassPrefix({code: {join: true},})">

      <prism-editor
        :class="joinClassPrefix({
          'prism-code-editor': {join: true},
          'code': {join: false},
          'disabled': {join: false, show: readonly},
        })"
        v-model="code"
        :highlight="highlighter"
        :tab-size="formData.tabSize"
        line-numbers
        :readonly="readonly"
      ></prism-editor>
    </div>

    <el-dialog
      title="編輯"
      :visible.sync="visible"
    >
      <el-form :model="formData">
        <el-form-item
          label="語言"
          label-width="120px"
        >

          <el-select
            v-model="formData.language"
            filterable
            placeholder="選擇語言"
          >
            <el-option
              v-for="(lang, index) in languageOptions"
              :key="index"
              :label="lang.label"
              :value="lang.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="縮排長度"
          label-width="120px"
        >
          <el-input-number
            v-model="formData.tabSize"
            :step="2"
            step-strictly
          ></el-input-number>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateBlock(formData)"
        >確 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor';
import PrefixMixin from '../mixin/PrefixMixin'
import Prism from 'prismjs'

import 'vue-prism-editor/dist/prismeditor.min.css';
Prism.manual = false;


export default {
  name: "PrismCodeEditor",
  mixins: [PrefixMixin],
  props: ["value", "BlocksIndex", "readonly"],
  components: {
    PrismEditor,
  },
  data() {
    return {
      code: this.value.text,
      formData: {
        language: this.value.language || "js",
        tabSize: this.value.tabSize || 2,
      },
      languageOptions: Object.entries(Prism.languages).map(([k, v]) => { return { label: k, value: k } }),
    };
  },
  watch: {
    code: {
      handler(val) {
        //在地值改變傳給父組件
        let blockItem = {
          language: this.formData.language,
          tabSize: this.formData.tabSize,
          text: val,
        }
        this.$emit("input", blockItem);

        let blockInfo = {
          index: this.BlocksIndex,
          text: val,
        };
        this.$store.dispatch("mainStore/setUpdateInputBlockText", blockInfo);
      },
    },
    value(val) {
      this.code = val.text;
      this.formData.language = val.language;
      this.formData.tabSize = val.tabSize;
    },
  },
  methods: {
    updateBlock(formData) {
      let blockInfo = {
        index: this.BlocksIndex,
        blockItem: {
          type: this.$options.name,
          data: {
            text: this.code,
            language: formData.language,
            tabSize: formData.tabSize,
          },
        },
      };
      this.$store.dispatch("mainStore/setUpdateOneBlock", blockInfo);
      this.visible = false;
    },
    highlighter(code) {
      return Prism.highlight(code, Prism.languages[this.formData.language]);
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
.__vne_code {
  margin-right: 10px;
  padding: 10px;
}
/* required class */
.__vne_prism-code-editor {
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
