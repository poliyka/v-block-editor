<template>
  <div
    class="textBlock"
    :id="BlocksIndex"
  >
    <BaseTextBlock
      :value="value"
      :BlocksIndex="BlocksIndex"
      placeholder="點選 Alt 鍵快速插入內容"
      @keydown.alt.exact.prevent.native="quickAddBlock($event, BlocksIndex)"
      @paste.native="onPaste($event)"
    ></BaseTextBlock>
  </div>
</template>

<script>
import BaseTextBlock from "@/components/basicBlockComponents/BaseTextBlock";
import AddBlockMixin from "@/components/mixin/AddBlockMixin.js";

export default {
  name: "textBlock",
  props: ["value", "BlocksIndex"],
  mixins: [AddBlockMixin],
  components: {
    BaseTextBlock,
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    quickAddBlock(event, index) {
      let dom = document.getElementsByClassName("block");
      let currInput = dom[index].getElementsByTagName("textarea")[0];
      currInput.disabled = true;
      let e = currInput.getBoundingClientRect();
      let location = { x: e.left - 48, y: e.top + 20 };

      this.$store.dispatch("mainStore/setMenuContentLayerXY", location);
      this.$store.dispatch("mainStore/setCurrentBlockIndex", index);
      setTimeout(() => {
        this.$store.dispatch("addMenuStore/setIsShowAddMenu", true);
      }, 50);
      currInput.disabled = false;
    },
    // 劫持黏貼事件
    onPaste(event) {
      if (event.clipboardData.files[0] !== undefined) {
        event.preventDefault();
        let file = event.clipboardData.files[0];
        let addBlockInfo = {
          index: this.BlocksIndex - 1,
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
          addBlockInfo.blockItem.data.src = imgBase64;
          this.$store.dispatch("mainStore/setAddCurrentPageBlocks", addBlockInfo);
          this.$nextTick(() => {
            let dom = document.getElementsByClassName("block");
            let currInput = dom[this.BlocksIndex + 1].getElementsByTagName(
              "textarea"
            )[0];
            console.log(currInput);
            currInput.focus();
          });
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
