<template>
  <div class="BulletedList">
    <!-- 这个符号需要更新 -->
    <BaseListBlock
      :value="value"
      :BlocksIndex="BlocksIndex"
      placeholder="输入列表内容"
    >
      <span class="left-Symbol">·</span>
    </BaseListBlock>
  </div>
</template>

<script>
import BaseListBlock from "@/components/basicBlockComponents/BaseListBlock";
// TODO: 在某个列表下按回车新建列表后再删除，光标位置错误
// TODO: 在一行头无法直接删除
export default {
  name: "BulletedList",
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
.left-Symbol {
  font-size: 50px;
  height: 25px;
}
</style>