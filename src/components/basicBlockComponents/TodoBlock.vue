<template>
  <div
    class="TodoBlock"
    :id="BlocksIndex"
  >
    <BaseListBlock
      :value="value"
      :BlocksIndex="BlocksIndex"
      placeholder="輸入待辦事項"
    >
      <el-checkbox v-model="value.isChecked"></el-checkbox>
    </BaseListBlock>
  </div>
</template>

<script>
import BaseListBlock from "@/components/basicBlockComponents/BaseListBlock";
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
