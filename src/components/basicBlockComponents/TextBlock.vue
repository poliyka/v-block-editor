<template>
  <div class="textBlock">
    <BaseTextBlock
      :value="value"
      :BlocksIndex="BlocksIndex"
      placeholder="点击 Alt 键快速插入内容"
      @keydown.alt.exact.prevent.native="click($event, BlocksIndex)"
    ></BaseTextBlock>
  </div>
</template>

<script>
// 两次回车才是新建text，一次回车是换行（即不需要prevent）
import BaseTextBlock from "@/components/basicBlockComponents/BaseTextBlock";

export default {
  name: "textBlock",
  props: ["value", "BlocksIndex"],
  components: {
    BaseTextBlock,
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    click(event, index) {
      let dom = document.getElementsByTagName("textarea");
      let currInput = dom[index];
      currInput.disabled = true;
      let e = currInput.getBoundingClientRect();
      let a = { x: e.left - 48, y: e.top + 20 };
      let b = true;
      this.$store.commit("mutationAddMenuContentLayerXY", a);
      this.$store.commit("mutationCurrentBlockIndex", index);
      setTimeout(() => {
        this.$store.commit("mutationIsShowAddMenu", b);
      }, 50);
      currInput.disabled = false;
    },
  },
  computed: {},
};
</script>

<style lang="less">
.textBlock {
  .el-textarea__inner {
    border: none;
    outline: none;
    font-size: 16px;
    width: 100%;
    resize: none;
    padding: 5px 0;
  }
  textarea::-webkit-input-placeholder {
    color: #ffffff;
  }
  textarea:focus::-webkit-input-placeholder {
    color: #999999;
  }
}
</style>