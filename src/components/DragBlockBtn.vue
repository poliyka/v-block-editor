<template>
  <a
    class="drag-btn handle" @click="openMenuShow($event)"
  >
    <i class="iconfont icondrag"></i>
  </a>
</template>

<style lang="less">
.drag-btn {
  padding: 2px 5px;
  border-radius: 2px;
  color: #999999;
  .icondrag {
    font-size: 14px;
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

      this.$store.commit("mutationAddMenuContentLayerXY", location);
      this.$store.commit("mutationCurrentBlockIndex", this.BlocksIndex);
      this.$store.commit("mutationIsShowDragMenu", true);
    },
  },
};
</script>


