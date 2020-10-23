<template>
  <div class="textBlock">
    <el-input
      type="textarea"
      autosize
      placeholder="输入'/'快速插入内容"
      v-model="mValue.text"
      @keydown.native="addNewTextBlock($event, BlocksIndex)"
      @keyup.native="nextFocus($event, BlocksIndex)"
    ></el-input>
  </div>
</template>

<script>
import NextFoucsMixin from "@/components/mixin/NextFoucsMixin";

export default {
  name: "textBlock",
  props: ["value", "BlocksIndex"],
  mixins: [NextFoucsMixin],
  data() {
    return {
      mValue: this.value,
      isEmptyDelete: true, //当前输入光标的位置
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
    // 想想这里如何与BaseTextBlock重构在一起
    addNewTextBlock(event, index) {
      /*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
      // 获取光标位置，处理回车时字符串换行问题
      let dom = document.getElementsByTagName("textarea");
      let currInput = dom[index];
      let startPos = currInput.selectionStart;
      if (event.keyCode == 13) {
        event.preventDefault();

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

      // 如果内容为空的时候，并且按了 '/ '号按钮，就可以唤醒键盘上的添加内容的弹窗
      if (
        (event.keyCode == 191 || event.keyCode == 111) &&
        currInput.value == ""
      ) {
        currInput.disabled = true;
        console.log(this.mValue.text);
        let e = currInput.getBoundingClientRect();
        let a = { x: e.left - 48, y: e.top + 20 };
        let b = true;
        this.$store.commit("mutationAddMenuContentLayerXY", a);
        this.$store.commit("mutationCurrentBlockIndex", index);
        setTimeout(() => {
          this.$store.commit("mutationIsShowAddMenu", b);
        }, 50);
        currInput.disabled = false;
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
.textBlock {
  .el-textarea__inner {
    border: none;
    outline: none;
    font-size: 16px;
    width: 100%;
    resize: none;
    padding: 5px 0;
  }
  textarea::-webkit-input-placeholder {
    color: #ffffff;
  }
  textarea:focus::-webkit-input-placeholder {
    color: #999999;
  }
}
</style>