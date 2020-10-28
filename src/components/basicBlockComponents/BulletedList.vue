<template>
  <div class="BulletedList" :id="BlocksIndex">
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
// TODO: 在一行头无法直接删除
// TODO: 将一块无序列表打包在一起
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