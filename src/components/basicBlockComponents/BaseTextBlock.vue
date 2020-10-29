<template>
  <el-input
    type="textarea"
    autosize
    v-model="mValue.text"
    :placeholder="placeholder"
    @keypress.enter.prevent.native="addNewTextBlock($event, BlocksIndex)"
    @keyup.native="nextFocus($event, BlocksIndex)"
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
  },
  mixins: [NextFoucsMixin],
  data() {
    return {
      mValue: this.value,
      deleteFlag: true,
      toLastInputFlag: true, // 判断键盘方向键的Flag
      // 判断是否 Enter 连续按了两次
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
    addNewTextBlock(event, index) {
      // event.preventDefault();
      let dom = document.getElementsByClassName("block");
      let currInput = dom[index].getElementsByTagName("textarea")[0];
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
      console.log(startPos, addBlockInfo, this.mValue.text.length, currInput);

      // 提交数据到vuex

      this.$store.commit("mutationAddCurrentPageBlocks", addBlockInfo);
      this.$nextTick(() => {
        let currInput = dom[index + 1].getElementsByTagName("textarea")[0];
        currInput.focus();
      });
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