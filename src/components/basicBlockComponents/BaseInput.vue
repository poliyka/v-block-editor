<template>
  <el-input
    type="textarea"
    autosize
    v-model="mValue"
    :placeholder="placeholder"
    @keyup.native="nextFocus($event, BlocksIndex)"
  ></el-input>
</template>

<script>

import NextFoucsMixin from "@/components/mixin/NextFoucsMixin";

export default {
  name: "BaseTextBlock",
  props: {
    value: String,
    BlocksIndex: Number,
    placeholder: String,
  },
  mixins: [NextFoucsMixin],
  data() {
    return {
      mValue: this.value,
    };
  },
  watch: {
    mValue: {
      handler(val) {
        //在地值改變傳給父組件
        this.$emit("input", val);

        let blockInfo = {
          index: this.BlocksIndex,
          text: val,
        };
        this.$store.dispatch("mainStore/setUpdateInputBlockText", blockInfo);
      },
    },
    value(val) {
      this.mValue = val;
    },
  },
  methods: {},
  computed: {
    currentPageBlocks() {
      return this.$store.state.mainStore.currentPageBlocks;
    },
  },
};
</script>

<style lang="less">
.el-textarea {
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
