<template>
  <div class="TodoBlock">
    <BaseListBlock
      :value="value"
      :BlocksIndex="BlocksIndex"
      placeholder="输入待办项"
    >
      <el-checkbox v-model="value.isChecked"></el-checkbox>
    </BaseListBlock>
  </div>
</template>

<script>
import BaseListBlock from "@/components/basicBlockComponents/BaseListBlock";
// TODO: 在某个列表下按回车新建列表后再删除，有bug
export default {
  name: "todo",
  props: ["value", "BlocksIndex"],
  components: {
    BaseListBlock,
  },
  data() {
    return {};
  },
  watch: {},
  methods: {},
  computed: {},
};
</script>

<style lang="less">
.el-checkbox__inner {
  width: 16px;
  height: 16px;
}
.el-checkbox__inner::after {
  height: 9px;
  left: 5px;
}
</style>