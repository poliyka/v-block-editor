<template>
  <div class="BaseListBlock">
    <slot></slot>
    <el-input
      type="textarea"
      autosize
      v-model="mValue.text"
      :placeholder="placeholder"
      @keypress.enter.prevent.native="addNewTextBlock($event, BlocksIndex)"
      @keyup.native="nextFocus($event, BlocksIndex)"
    ></el-input>
  </div>
</template>

<script>
// TODO: 在一行头无法直接删除
import NextFoucsMixin from "@/components/mixin/NextFoucsMixin";
import ListBlockMixin from "@/components/mixin/ListBlockMixin";
export default {
  name: "BaseListBlock",
  props: ["value", "BlocksIndex", "placeholder"],
  mixins: [NextFoucsMixin, ListBlockMixin],
  data() {
    return {
      mValue: this.value,
      isEmptyDelete: true,
      paremtName: this.$options.parent.$options.name,
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
.BaseListBlock {
  display: flex;
  align-items: center;

  .left-Symbol {
    font-size: 50px;
    height: 25px;
  }

  .el-textarea__inner {
    border: none;
    outline: none;
    font-size: 16px;
    width: 100%;
    resize: none;
    padding: 5px 0;
    margin-left: 5px;
  }
  textarea::-webkit-input-placeholder {
    color: #ffffff;
  }
  textarea:focus::-webkit-input-placeholder {
    color: #999999;
  }
}
</style>