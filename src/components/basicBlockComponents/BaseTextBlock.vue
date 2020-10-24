<template>
  <el-input
    type="textarea"
    autosize
    v-model="mValue.text"
    :placeholder="placeholder"
    @keydown.native="calNewLineFlag($event, BlocksIndex)"
    @keypress.enter.native="addNewTextBlock($event, BlocksIndex)"
    @keyup.native="nextFocus($event, BlocksIndex)"
    @keyup.enter.prevent.native="enterMethod($event, BlocksIndex)"
    :style="customStyle"
  ></el-input>
</template>

<script>
import TextBlockMixin from "@/components/mixin/TextBlockMixin";
import NextFoucsMixin from "@/components/mixin/NextFoucsMixin";

export default {
  name: "BaseTextBlock",
  props: {
    value: Object,
    BlocksIndex: Number,
    customStyle: Object,
    placeholder: String,
    allowNewLine: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
  mixins: [TextBlockMixin, NextFoucsMixin],
  data() {
    return {
      mValue: this.value,
      deleteFlag: true,
      toLastInputFlag: true, // 判断键盘方向键的Flag
      // 判断是否 Enter 连续按了两次
      toNextBlockFlag: !this.allowNewLine,
      isLastKeyEnter: false,
      v: "",
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
  methods: {
    enterMethod(event, index) {
      if (this.toNextBlockFlag == true) {
        let dom = document.getElementsByTagName("textarea");
        let nextInput = dom[index + 1];
        nextInput.focus();
        console.log(dom[index].value);
        this.v = dom[index].value;
      }
    },
    // 计算是否连续按了两次 Enter 键，如果是创建下一个block，如果没有直接换行
    calNewLineFlag(event, index) {
      if (event.key === "Enter" && this.isLastKeyEnter === true) {
        this.toNextBlockFlag = true;
      }
      if (event.key === "Enter") {
        this.isLastKeyEnter = true;
      } else {
        this.isLastKeyEnter = false;
      }
    },
  },
  computed: {
    currentPageBlocks() {
      return this.$store.state.currentPageBlocks;
    },
  },
};
</script>

<style lang="less">
</style>>