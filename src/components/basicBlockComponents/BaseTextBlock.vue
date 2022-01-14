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

      // 新建text-item到vuex裏
      let addBlockInfo = {
        index: index,
        blockItem: {
          type: "text",
          data: {
            text: "",
          },
        },
      };

      // 獲取光標位置，處理回車時字符串換行問題
      if (startPos != this.mValue.text.length) {
        // 如果光標的位置不在最末尾的時候
        // 對光標之後的內容進行截取，並傳遞給新建的字符串
        addBlockInfo.blockItem.data.text = this.mValue.text.slice(
          startPos,
          this.mValue.text.length
        );
        this.mValue.text = this.mValue.text.slice(0, startPos);
      }
      // 提交數據到vuex
      this.$store.dispatch("mainStore/setAddCurrentPageBlocks", addBlockInfo);
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
