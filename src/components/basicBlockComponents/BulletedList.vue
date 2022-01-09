<template>
  <div class="BulletedList" :id="BlocksIndex">
    <!-- 這個符號需要更新 -->
    <BaseListBlock
      :value="value"
      :BlocksIndex="BlocksIndex"
      placeholder="輸入列表內容"
    >
      <span class="left-Symbol">·</span>
    </BaseListBlock>
  </div>
</template>

<script>
import BaseListBlock from "@/components/basicBlockComponents/BaseListBlock";
// TODO: 在一行頭無法直接刪除
// TODO: 將一塊無序列表打包在一起
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
