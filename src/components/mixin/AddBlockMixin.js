import { getNextInputIndex } from "@/common.js";

const AddBlockMixin = {
  methods: {
    addBlock(type, data = {}) {
      let blockInfo = this.addBlockInfoOject[type];
      let addBlockInfo = {
        index: this.currentBlockIndex,
        blockItem: {},
      };
      if (this._.isEmpty(data)) {
        addBlockInfo.blockItem = {
          type: type,
          data: blockInfo.data,
        };
      } else {
        addBlockInfo.blockItem = {
          type: type,
          data: data,
        };
      }
      this.$store.dispatch("mainStore/setAddCurrentPageBlocks", addBlockInfo);

      this.$nextTick(() => {
        // 如果是觸發添加內容的面板是從text模塊顯示的模塊添加彈窗頁面的，並且內容為空
        let dom = document.getElementsByClassName("block");
        if (
          this.currentPageBlocks[this.currentBlockIndex].type == "text" &&
          this.currentPageBlocks[this.currentBlockIndex].data.text == ""
        ) {
          // 處理游標的顯示問題，在當前模塊顯示
          this.$store.dispatch(
            "mainStore/setDeletePageBlock",
            this.currentBlockIndex
          );
          this.$nextTick(() => {
            let currInput = dom[this.currentBlockIndex].getElementsByTagName(
              "textarea"
            )[0];
            currInput.focus();
          });
        } else {
          // 處理游標的顯示問題，新建後，遊標也到新建欄
          let nextInputIndex = getNextInputIndex(
            this.currentBlockIndex,
            this.currentPageBlocks
          );
          let nextInput = dom[nextInputIndex].getElementsByTagName(
            "textarea"
          )[0];
          nextInput.focus();
        }
      });
    },
  },
};
export default AddBlockMixin;
