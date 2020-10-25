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
      @keyup.enter.prevent.native="enterMethod($event, BlocksIndex)"
    ></el-input>
  </div>
</template>

<script>
import NextFoucsMixin from "@/components/mixin/NextFoucsMixin";
import ListBlockMixin from "@/components/mixin/ListBlockMixin";
export default {
  name: "BaseListBlock",
  props: ["value", "BlocksIndex", "placeholder"],
  mixins: [NextFoucsMixin, ListBlockMixin],
  data() {
    return {
      mValue: this.value,
      deleteFlag: true,
      paremtName: this.$options.parent.$options.name,
      toLastInputFlag: true,
      toNextFlag: true,
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
  methods: {
    enterMethod(event, index) {
      let dom = document.getElementsByTagName("textarea");
      let nextInput = dom[index + 1];
      nextInput.focus();
    },
  },
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