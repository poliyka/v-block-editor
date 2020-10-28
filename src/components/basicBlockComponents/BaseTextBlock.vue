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
  mixins: [NextFoucsMixin],
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
        // console.log(dom[index].value);
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
    addNewTextBlock(event, index) {
      if (this.toNextBlockFlag === true) {
        event.preventDefault();
        let dom = document.getElementsByTagName("textarea");
        let currInput = dom[index];
        let startPos = currInput.selectionStart;

        // 新建text-item到vuex里
        let addBlockInfo = {
          index: index,
          blockItem: {
            type: "text",
            data: {
              text: "",
            },
          },
        };

        // 获取光标位置，处理回车时字符串换行问题
        if (startPos != this.mValue.text.length) {
          // 如果光标的位置不在最末尾的时候
          // 对光标之后的内容进行截取，并传递给新建的字符串
          addBlockInfo.blockItem.data.text = this.mValue.text.slice(
            startPos,
            this.mValue.text.length
          );
          this.mValue.text = this.mValue.text.slice(0, startPos);
        }

        // 提交数据到vuex
        this.$store.commit("mutationAddCurrentPageBlocks", addBlockInfo);
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