<template>
  <div class="addBlock">
    <a class="add-block-btn" @click="openMenuShow($event)">
      <i class="iconfont iconplus"></i>
    </a>
  </div>
</template>

<style lang="less">
.addBlock {
  .add-block-btn {
    padding: 2px 6px 4px 6px;
    border-radius: 2px;
    .iconplus {
      font-size: 12px;
      color: #999999;
    }
    cursor: pointer;
  }
  .add-block-btn:hover {
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

      this.$store.commit("mutationAddMenuContentLayerXY", location);
      this.$store.commit("mutationCurrentBlockIndex", this.BlocksIndex);
      setTimeout(() => {
        this.$store.commit("mutationIsShowAddMenu", true);
      }, 50);
    },
  },
};
</script>


