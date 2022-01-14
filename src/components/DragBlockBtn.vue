<template>
  <a
    class="drag-btn handle"
    @click="openMenuShow($event)"
  >
    <i class="el-icon-s-fold"></i>
  </a>
</template>

<style lang="less">
.drag-btn {
  padding: 5px;
  border-radius: 2px;
  .el-icon-s-fold {
    // font-weight: bold;
    font-size: 16px;
  }
}
.drag-btn:hover {
  background: #eeeeee;
  cursor: pointer;
}
</style>


<script>
export default {
  name: "DragBlock",
  props: ["BlocksIndex"],
  data() {
    return {};
  },
  methods: {
    openMenuShow(e) {
      let location = { x: e.clientX, y: e.clientY };

      this.$store.dispatch("mainStore/setMenuContentLayerXY", location);
      this.$store.dispatch("mainStore/setCurrentBlockIndex", this.BlocksIndex);
      this.$store.dispatch("dragMenuStore/setIsShowDragMenu", true);
    },
  },
};
</script>


