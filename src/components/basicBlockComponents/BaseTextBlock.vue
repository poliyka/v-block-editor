<template>
  <BaseInput
    :style="customStyle"
    :BlocksIndex="BlocksIndex"
    v-model="mValue.text"
    :placeholder="placeholder"
    @keypress.enter.prevent.native="addNewTextBlock($event, BlocksIndex)"
  ></BaseInput>
</template>

<script>
import BaseInput from "@/components/basicBlockComponents/BaseInput";

export default {
  name: "BaseTextBlock",
  props: {
    value: Object,
    BlocksIndex: Number,
    customStyle: Object,
    placeholder: String,
  },
  components: {
    BaseInput,
  },
  data() {
    return {
      mValue: this.value,
    };
  },
  watch: {
    value(val) {
      this.mValue = val;
    },
  },
  methods: {
    addNewTextBlock(event, index) {
      let dom = document.getElementsByClassName("block");
      let currInput = dom[index].getElementsByTagName("textarea")[0];
      let startPos = currInput.selectionStart;

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

      // 获取光标位置，处理回车时字符串换行问题
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
      this.$nextTick(() => {
        let currInput = dom[index + 1].getElementsByTagName("textarea")[0];
        currInput.focus();
      });
    },
  },
  computed: {},
};
</script>

<style lang="less">
</style>>