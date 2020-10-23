<template>
  <el-input
    type="textarea"
    autosize
    v-model="mValue.text"
    :placeholder="placeholder"
    @keypress.enter.prevent.native="addNewTextBlock($event, BlocksIndex)"
    @keyup.native="nextFocus($event, BlocksIndex)"
    :style="customStyle"
  ></el-input
></template>

<script>
import TextBlockMixin from "@/components/mixin/TextBlockMixin";
import NextFoucsMixin from "@/components/mixin/NextFoucsMixin";

export default {
  name: "BaseTextBlock",
  props: ["value", "BlocksIndex", "customStyle", "placeholder"],
  mixins: [TextBlockMixin, NextFoucsMixin],
  data() {
    return {
      mValue: this.value,
      isEmptyDelete: true,
    };
  },
  watch: {
    mValue(val) {
      //本地值改变传给父组件
      this.$emit("input", val);
    },
    value(val) {
      this.mValue = val;
    },
  },
  methods: {},
  computed: {
    currentPageBlocks() {
      return this.$store.state.currentPageBlocks;
    },
  },
};
</script>

<style lang="less">
</style>>