<template>
  <div class="Heading">
    <el-input
      type="textarea"
      autosize
      v-model="mValue.text"
      :placeholder="placeholder"
      @keydown.native="addNewTextBlock($event, BlocksIndex)"
      @keyup.native="nextFocus($event, BlocksIndex)"
      :style="customStyle"
    ></el-input>
  </div>
</template>

<script>
import TextBlockMixin from "@/components/mixin/TextBlockMixin";
import NextFoucsMixin from "@/components/mixin/NextFoucsMixin";

export default {
  name: "Heading",
  props: ["value", "BlocksIndex", "fontSize", "placeholder"],
  mixins: [TextBlockMixin, NextFoucsMixin],
  data() {
    return {
      mValue: this.value,
      isEmptyDelete: true,
      customStyle: {
        fontSize: this.fontSize,
      },
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
.Heading {
  display: flex;
  align-items: center;

  .el-textarea__inner {
    border: none;
    outline: none;
    // font-size: 30px;
    font-weight: 600;
    width: 100%;
    resize: none;
    padding: 5px 0;
    color: #303133;
  }
  textarea::-webkit-input-placeholder {
    color: #ffffff;
  }
  textarea:focus::-webkit-input-placeholder {
    color: #999999;
  }
}
</style>