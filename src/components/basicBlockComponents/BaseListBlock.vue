<template>
  <div class="BaseListBlock">
    <slot></slot>
    <BaseInput
      :BlocksIndex="BlocksIndex"
      v-model="inputValue.text"
      :placeholder="placeholder"
      @keypress.enter.prevent.native="addNewTextBlock($event, BlocksIndex)"
      @keyup.enter.prevent.native="enterMethod($event, BlocksIndex)"
    ></BaseInput>
  </div>
</template>

<script>
import BaseInput from "@/components/basicBlockComponents/BaseInput";

export default {
  name: "BaseListBlock",
  props: ["value", "BlocksIndex", "placeholder"],
  components: { BaseInput },
  data() {
    return {
      inputValue: this.value,
      paremtName: this.$options.parent.$options.name,
      toLastInputFlag: true,
      toNextFlag: true,
    };
  },
  watch: {
    inputValue(val) {
      //在地值改變傳給父組件
      this.$emit("input", val);
    },
    value(val) {
      this.inputValue = val;
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

      // 獲取游標位置
      let dom = document.getElementsByClassName("block");
      if (this.inputValue.text.length == 0) {
        // 當輸入的內容為空的時候
        // 點選了回車，就會先刪掉當前的內容塊，然後新建一個text內容塊
        let lastInput = dom[index - 1].getElementsByTagName("textarea")[0]; // 上一個元素不一定是input
        lastInput.focus();
        this.$store.commit("mutationDeletePageBlock", this.currentBlockIndex);
      } else {
        let currInput = dom[index].getElementsByTagName("textarea")[0]; // 沒有問題
        let startPos = currInput.selectionStart;

        addBlockInfo.blockItem.type = this.paremtName;
        // 輸入的內容不為空的時候
        // 新建text-item到vuex裏
        // 獲取游標位置，處理回車時字符串換行問題
        if (startPos != this.inputValue.text.length) {
          addBlockInfo.blockItem.data.text = this.inputValue.text.slice(
            startPos,
            this.inputValue.text.length
          );
          this.inputValue.text = this.inputValue.text.slice(0, startPos);
        }
        // 提交數據到vuex
        this.$store.commit("mutationAddCurrentPageBlocks", addBlockInfo);
      }
    },
  },
  computed: {},
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
