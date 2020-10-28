<template>
  <div class="BaseListBlock">
    <slot></slot>
    <el-input
      type="textarea"
      autosize
      v-model="mValue.text"
      :placeholder="placeholder"
      @keypress.enter.prevent.native="addNewTextBlock($event, BlocksIndex)"
      @keyup.native="nextFocus($event, BlocksIndex)"
      @keyup.enter.prevent.native="enterMethod($event, BlocksIndex)"
    ></el-input>
  </div>
</template>

<script>
import NextFoucsMixin from "@/components/mixin/NextFoucsMixin";
import ListBlockMixin from "@/components/mixin/ListBlockMixin";
export default {
  name: "BaseListBlock",
  props: ["value", "BlocksIndex", "placeholder"],
  mixins: [NextFoucsMixin],
  data() {
    return {
      mValue: this.value,
      deleteFlag: true,
      paremtName: this.$options.parent.$options.name,
      toLastInputFlag: true,
      toNextFlag: true,
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
      let dom = document.getElementsByClassName("block");
      let nextInput = dom[index + 1].getElementsByTagName("textarea")[0];
      nextInput.focus();
    },
    addNewTextBlock(event, index) {
      let addBlockInfo = {
        index: index,
        blockItem: {
          type: "text",
          data: {
            text: "",
          },
        },
      };

      // 获取光标位置
      let dom = document.getElementsByClassName("block");
      if (this.mValue.text.length == 0) {
        // 当输入的内容为空的时候
        // 点击了回车，就会先删掉当前的内容块，然后新建一个text内容块
        let lastInput = dom[index - 1].getElementsByTagName("textarea")[0]; // 上一个元素不一定是input
        lastInput.focus();
        this.$store.commit("mutationDeletePageBlock", this.currentBlockIndex);
      } else {
        let currInput = dom[index].getElementsByTagName("textarea")[0]; // 没问题
        let startPos = currInput.selectionStart;

        addBlockInfo.blockItem.type = this.paremtName;
        // 输入的内容不为空的时候
        // 新建text-item到vuex里
        // 获取光标位置，处理回车时字符串换行问题
        if (startPos != this.mValue.text.length) {
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
.BaseListBlock {
  display: flex;
  align-items: center;

  .left-Symbol {
    font-size: 50px;
    height: 25px;
  }

  .el-textarea__inner {
    border: none;
    outline: none;
    font-size: 16px;
    width: 100%;
    resize: none;
    padding: 5px 0;
    margin-left: 5px;
  }
  textarea::-webkit-input-placeholder {
    color: #ffffff;
  }
  textarea:focus::-webkit-input-placeholder {
    color: #999999;
  }
}
</style>