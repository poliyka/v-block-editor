<template>
  <div class="__vne_add-block">
    <a
      class="__vne_add-block-btn"
      @click="openMenuShow($event)"
    >
      <i class="el-icon-plus"></i>
    </a>
  </div>
</template>

<style lang="less">
.__vne_add-block {
  .__vne_add-block-btn {
    padding: 5px;
    border-radius: 2px;
    .el-icon-plus {
      font-weight: bold;
      font-size: 16px;
    }
    cursor: pointer;
  }
  .__vne_add-block-btn:hover {
    background: #eeeeee;
  }
}
</style>


<script>
export default {
  name: "AddBlock",
  props: ["BlocksIndex"],
  data() {
    return {};
  },
  methods: {
    openMenuShow(e) {
      let location = { x: e.clientX, y: e.clientY };

      this.$store.dispatch("mainStore/setMenuContentLayerXY", location);
      this.$store.dispatch("mainStore/setCurrentBlockIndex", this.BlocksIndex);
      this.$store.dispatch("addMenuStore/setIsShowAddMenu", true);
    },
  },
};
</script>


