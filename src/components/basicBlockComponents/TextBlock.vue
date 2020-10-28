<template>
  <div class="textBlock" :id="BlocksIndex">
    <BaseTextBlock
      :value="value"
      :BlocksIndex="BlocksIndex"
      placeholder="点击 Alt 键快速插入内容"
      @keydown.alt.exact.prevent.native="quickAddBlock($event, BlocksIndex)"
      :allowNewLine="true"
      @paste.native="onPaste($event)"
    ></BaseTextBlock>
  </div>
</template>

<script>
// 两次回车才是新建text，一次回车是换行（即不需要prevent）
import BaseTextBlock from "@/components/basicBlockComponents/BaseTextBlock";

export default {
  name: "textBlock",
  props: ["value", "BlocksIndex"],
  components: {
    BaseTextBlock,
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    quickAddBlock(event, index) {
      let dom = document
        .getElementsByClassName("block")
        .getElementsByTagName("textarea")[0];
      let currInput = dom[index];
      currInput.disabled = true;
      let e = currInput.getBoundingClientRect();
      let location = { x: e.left - 48, y: e.top + 20 };

      this.$store.commit("mutationAddMenuContentLayerXY", location);
      this.$store.commit("mutationCurrentBlockIndex", index);
      setTimeout(() => {
        this.$store.commit("mutationIsShowAddMenu", true);
      }, 50);
      currInput.disabled = false;
    },
    // 劫持黏贴事件
    onPaste(event) {
      if (event.clipboardData.files[0] !== undefined) {
        event.preventDefault();
        let file = event.clipboardData.files[0];
        let addBlockInfo = {
          index: this.BlocksIndex,
          blockItem: {
            type: "image",
            data: {
              src: "",
              height: "200px",
              // width: "",
            },
          },
        };

        let imgBase64 = "";
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
          imgBase64 = event.target.result;
          console.log("dsd", imgBase64);
          addBlockInfo.blockItem.data.src = imgBase64;
          this.$store.commit("mutationAddCurrentPageBlocks", addBlockInfo);
        };
      }
    },
  },
  computed: {},
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