<template>
  <div class="Heading">
    <BaseTextBlock
      :value="value"
      :BlocksIndex="BlocksIndex"
      :customStyle="customStyle"
      :placeholder="placeholder"
    ></BaseTextBlock>
  </div>
</template>

<script>
import BaseTextBlock from "@/components/basicBlockComponents/BaseTextBlock";

export default {
  name: "Heading",
  props: ["value", "BlocksIndex", "fontSize", "placeholder"],
  components: {
    BaseTextBlock,
  },
  data() {
    return {
      customStyle: {
        fontSize: this.fontSize,
      },
    };
  },
  watch: {},
  methods: {},
  computed: {},
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