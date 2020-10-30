import {
  getNextInputIndex,
  getLastInputIndex
} from "@/common.js";

const NextFoucsMixin = {
  methods: {
    nextFocus(event, index) {
      let dom = document.getElementsByClassName("block");
      let currInput = dom[index].getElementsByTagName("textarea")[0];
      let nowPos = currInput.selectionStart;
      let maxPos = currInput.value.length

      if (event.key === "ArrowUp") {
        if (nowPos === 0 && index !== 0) {
          let lastInputIndex = getLastInputIndex(index, this.currentPageBlocks)
          let lastInput = dom[lastInputIndex].getElementsByTagName("textarea")[0];
          lastInput.focus();
        }
      }
      if (event.key === "ArrowDown") {
        if (nowPos === maxPos && index !== this.currentPageBlocks.length - 1) {
          let nextInputIndex = getNextInputIndex(index, this.currentPageBlocks)
          let nextInput = dom[nextInputIndex].getElementsByTagName("textarea")[0];
          nextInput.setSelectionRange(0, 0);
          nextInput.focus();
        }
      }
      if (event.key === "ArrowLeft") {
        if (nowPos === 0 && this.toLastInputFlag === true && index !== 0) {
          let lastInputIndex = getLastInputIndex(index, this.currentPageBlocks)
          let lastInput = dom[lastInputIndex].getElementsByTagName("textarea")[0];
          lastInput.focus();
        }
      }
      if (event.key === "ArrowRight") {
        if (nowPos === maxPos && this.toNextFlag === true && index !== this.currentPageBlocks.length - 1) {
          let nextInputIndex = getNextInputIndex(index, this.currentPageBlocks)
          let nextInput = dom[nextInputIndex].getElementsByTagName("textarea")[0];
          nextInput.setSelectionRange(0, 0);
          nextInput.focus();
        }
      }
      if (event.key === "Delete" || event.key === "Backspace") {
        if (
          currInput.value === "" &&
          this.currentPageBlocks.length > 1 &&
          this.deleteFlag === true
        ) {
          this.$store.commit("mutationDeletePageBlock", index);
          this.$nextTick(() => {
            let dom = document.getElementsByClassName("block");
            let lastInputIndex = getLastInputIndex(index, this.currentPageBlocks)
            let lastInput = dom[lastInputIndex].getElementsByTagName("textarea")[0];
            lastInput.focus();
          })

        }
      }
      if (nowPos === 0) {
        this.toLastInputFlag = true
      } else {
        this.toLastInputFlag = false
      }
      if (nowPos === maxPos) {
        this.toNextFlag = true
      } else {
        this.toNextFlag = false
      }
      // 不能直接在 currInput === "" 的时候直接操作，这样会导致删到最后一个字符的时候自动删除这一行
      // 这是不能出现的事，所以有一个 flag 值来进行判断，上面的代码也是这样
      if (currInput.value === "") {
        this.deleteFlag = true;
      } else {
        this.deleteFlag = false;
      }
    },
  },
}

export default NextFoucsMixin