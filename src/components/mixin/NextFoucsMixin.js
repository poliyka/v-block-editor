const NextFoucsMixin = {
  methods: {
    nextFocus(event, index) {
      let dom = document.getElementsByTagName("textarea");
      let currInput = dom[index];
      let nextInput = dom[index + 1];
      let lastInput = dom[index - 1];
      let nowPos = currInput.selectionStart;
      let maxPos = currInput.value.length

      // if (event.key === "Enter") {
      //   event.preventDefault();
      //   nextInput.focus();
      // }
      if (event.key === "ArrowUp") {
        if (nowPos === 0) {
          lastInput.focus();
        }
      }
      if (event.key === "ArrowDown") {
        if (nowPos === maxPos) {
          nextInput.setSelectionRange(0, 0);
          nextInput.focus();
        }
      }
      if (event.key === "ArrowLeft") {
        if (nowPos === 0 && this.toLastInputFlag === true) {
          lastInput.focus();
        }
        if (nowPos === 0) {
          this.toLastInputFlag = true
        } else {
          this.toLastInputFlag = false
        }
      }
      if (event.key === "ArrowRight") {
        if (nowPos === maxPos && this.toNextFlag === true) {
          nextInput.setSelectionRange(0, 0);
          nextInput.focus();
        }
        if (nowPos === maxPos) {
          this.toLastInputFlag = true
        } else {
          this.toLastInputFlag = false
        }
      }
      if (event.key === "Delete" || event.key === "Backspace") {
        if (
          currInput.value === "" &&
          this.currentPageBlocks.length > 1 &&
          this.deleteFlag === true
        ) {
          this.currentPageBlocks.splice(index, 1);
          lastInput.focus();
        }
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