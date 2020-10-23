const ListBlockMixin = {
  methods: {
    addNewTextBlock(event, index) {
      /*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
      // 获取光标位置
      let dom = document.getElementsByTagName("textarea");
      let currInput = dom[index];
      let startPos = currInput.selectionStart;
      // this.cursorStart = startPos;

      let addBlockInfo = {
        index: index,
        blockItem: {
          type: "text",
          data: {
            text: "",
          },
        },
      };
      if (this.mValue.text.length == 0) {
        // 当输入的内容为空的时候
        // 点击了回车，就会先删掉当前的内容块，然后新建一个text内容块
        let lastInput = dom[index - 1];
        lastInput.focus();
        this.currentPageBlocks.splice(index, 1);
      } else {
        addBlockInfo.blockItem.type = this.name
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
      }
      // 提交数据到vuex
      this.$store.commit("mutationAddCurrentPageBlocks", addBlockInfo);
    },
  },
}
  export default ListBlockMixin