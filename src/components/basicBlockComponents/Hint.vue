<template>
  <div class="hint">
    <div class="hint-bg" :id="BlocksIndex">
      <BaseTextBlock
        :value="value"
        :BlocksIndex="BlocksIndex"
        placeholder="输入需要提示的内容"
        :allowNewLine="true"
      ></BaseTextBlock>
    </div>
  </div>
</template>

<script>
// 两次回车才是新建text，一次回车是换行（即不需要prevent）
import BaseTextBlock from "@/components/basicBlockComponents/BaseTextBlock";
export default {
  name: "hint",
  props: ["value", "BlocksIndex"],
  components: {
    BaseTextBlock,
  },
  data() {
    return { isLastKeyEnter: false };
  },
  watch: {},
  methods: {},
  computed: {},
};
</script>

<style lang="less">
.hint {
  display: flex;
  align-items: center;
  margin: 10px;
  .hint-bg {
    padding: 20px;
    background: #f2f6fc;
    width: 100%;
    border-radius: 2px;
    border-left: 3px solid #409eff;
  }

  .el-textarea__inner {
    border: none;
    outline: none;
    font-size: 16px;
    width: 100%;
    resize: none;
    padding: 5px 0;
    color: #303133;
    background: #f2f6fc;
  }
  textarea::-webkit-input-placeholder {
    color: #f2f6fc;
  }
  textarea:focus::-webkit-input-placeholder {
    color: #999999;
  }
}
</style>