<template>
  <div class="hint">
    <div class="hint-bg">
      <el-input
        type="textarea"
        autosize
        v-model="mValue.text"
        placeholder="输入需要重要提示的内容"
        @keydown.native="addNewTextBlock($event, BlocksIndex)"
        @keyup.native="nextFocus($event, BlocksIndex)"
      ></el-input>
    </div>
  </div>
</template>

<script>
import TextBlockMixin from "@/components/mixin/TextBlockMixin";
import NextFoucsMixin from "@/components/mixin/NextFoucsMixin";

export default {
  name: "hint",
  props: ["value", "BlocksIndex"],
  mixins: [TextBlockMixin, NextFoucsMixin],
  data() {
    return {
      mValue: this.value,
      isEmptyDelete: true,
    };
  },
  watch: {
    mValue(val) {
      //本地值改变传给父组件
      this.$emit("input", val);
    },
    value(val) {
      this.mValue = val;
    },
  },
  methods: {},
  computed: {
    currentPageBlocks() {
      return this.$store.state.currentPageBlocks;
    },
  },
};
</script>

<style lang="less">
.hint {
  display: flex;
  align-items: center;
  .hint-bg {
    padding: 20px;
    background: #f2f6fc;
    width: 100%;
    border-radius: 2px;
    border-left: 3px solid #409eff;
  }

  .el-textarea__inner {
    border: none;
    outline: none;
    font-size: 16px;
    width: 100%;
    resize: none;
    padding: 5px 0;
    color: #303133;
    background: #f2f6fc;
  }
  textarea::-webkit-input-placeholder {
    color: #f2f6fc;
  }
  textarea:focus::-webkit-input-placeholder {
    color: #999999;
  }
}
</style>