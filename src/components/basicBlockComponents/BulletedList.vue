<template>
  <div class="BulletedList">
    <!-- 这个符号需要更新 -->
    <span class="left-Symbol">·</span>
    <el-input
      type="textarea"
      autosize
      v-model="mValue.text"
      placeholder="输入列表内容"
      @keypress.enter.prevent.native="addNewTextBlock($event, BlocksIndex)"
      @keyup.native="nextFocus($event, BlocksIndex)"
    ></el-input>
  </div>
</template>

<script>
import NextFoucsMixin from "@/components/mixin/NextFoucsMixin";
import ListBlockMixin from "@/components/mixin/ListBlockMixin";

// TODO: 在某个列表下按回车新建列表后再删除，光标位置错误
// TODO: 在一行头无法直接删除
export default {
  name: "BulletedList",
  props: ["value", "BlocksIndex"],
  mixins: [NextFoucsMixin, ListBlockMixin],
  data() {
    return {
      mValue: this.value,
      isEmptyDelete: true,
      name: this.$options.name,
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
.BulletedList {
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