import {
  isEmptyObject
} from "@/utils.js"

const AddBlockMixin = {
  methods: {
    addBlock(type, data = {}) {
      let blockInfo = this.addBlockInfoOject[type];
      let addBlockInfo = {
        index: this.currentBlockIndex,
        blockItem: {},
      };
      if (isEmptyObject(data)) {
        addBlockInfo.blockItem = {
          type: type,
          data: data,
        };
      } else {
        addBlockInfo.blockItem = {
          type: type,
          data: blockInfo.data,
        };
      }
      this.$store.commit("mutationAddCurrentPageBlocks", addBlockInfo);

      // 如果是触发添加内容的面板是从text模块显示的模块添加弹窗页面的，并且内容为空
      let dom = document.getElementsByClassName("block");
      if (
        this.currentPageBlocks[this.currentBlockIndex].type == "text" &&
        this.currentPageBlocks[this.currentBlockIndex].data.text == ""
      ) {
        // 处理光标的显示问题，在当前模块显示
        this.$store.commit("mutationDeletePageBlock", this.currentBlockIndex);
        setTimeout(() => {
          let currInput = dom[this.currentBlockIndex].getElementsByTagName(
            "textarea"
          )[0];
          currInput.focus();
        }, 300);
      } else {
        // 处理光标的显示问题，新建后，光标也到新建栏
        setTimeout(() => {
          let nextInputIndex = getNextInputIndex(
            this.currentBlockIndex,
            this.currentPageBlocks
          );
          let nextInput = dom[nextInputIndex].getElementsByTagName(
            "textarea"
          )[0];
          nextInput.focus();
        }, 300);
      }
    },
  },
}
export default AddBlockMixin