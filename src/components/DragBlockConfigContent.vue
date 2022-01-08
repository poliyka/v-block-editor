<template>
  <div
    class="dragBlock-content"
    v-if="isShowDragMenu == true"
    style="z-index: 2001"
    @mousewheel.prevent
  >
    <div
      class="dropdown-menu"
      :style="{
        top: getterMenuContentLayerXY.y,
        left: getterMenuContentLayerXY.x,
      }"
      @mousewheel.stop
    >
      <div
        v-for="(item, index) in dragBlockConfigArray"
        :key="index"
      >
        <div
          class="block-item"
          @click="action(item.type, currentBlockIndex)"
        >
          <div class="block-item-img">
            <i>icon</i>
          </div>
          <div class="block-item-intro">
            <h4>{{ item.name }}</h4>
            <span>{{ item.type }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddBlockMixin from "@/components/mixin/AddBlockMixin.js";

export default {
  name: "dragBlock-content",
  mixins: [AddBlockMixin],
  data() {
    return {
      isShowMenu: this.isShowDragMenu,
    };
  },
  watch: {
    isShowDragMenu: function (value) {
      if (value == true) {
        document.addEventListener("click", e => {
          if (event.target.getAttribute("class") != "iconfont icondrag") {
            if (event.target.getAttribute("class") != "dropdown-menu") {
              this.$store.commit("mutationIsShowDragMenu", false);
            }
          }
        });
      }
    },
  },
  computed: {
    isShowDragMenu() {
      return this.$store.state.isShowDragMenu;
    },
    currentBlockIndex() {
      return this.$store.state.currentBlockIndex;
    },
    getterMenuContentLayerXY() {
      return this.$store.getters.getterMenuContentLayerXY;
    },
    currentPageBlocks() {
      return this.$store.state.currentPageBlocks;
    },
    dragBlockConfigArray() {
      return this.$store.state.dragBlockConfigArray;
    },
    addBlockInfoOject() {
      return this.$store.getters.getterAddBlockInfoObject;
    },
  },
  methods: {
    getImgUrl(type) {
      return require("@/assets/" + type + ".png");
    },
    action(type, index) {
      switch (type) {
        case "delete":
          this.$store.commit("mutationDeletePageBlock", index);
        break
    }
  }
},
};
</script>


<style lang="less">
// Todo: 修正成功能列表
.dragBlock-content {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  .dropdown-menu {
    background: #ffffff;
    position: absolute;
    // margin-left: 58px;
    z-index: 2002;
    width: 320px;
    height: 360px;
    overflow-y: auto;
    border: 1px solid #dcdfe6;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    border-radius: 4px;

    .block-type-tip {
      font-size: 12px;
      color: #909399;
      display: block;
      padding: 10px 20px 5px 20px;
    }
    .block-item {
      padding: 5px 20px 7px 20px;
      display: flex;
      align-items: center;
      background: #ffffff;
      .block-item-img {
        width: 45px;
        height: 45px;
        background: #ffffff;
        img {
          border-radius: 4px;
          border: 1px solid #dddddd;
        }
      }
      .block-item-intro {
        h4 {
          margin: 0;
          font-size: 14px;
        }
        span {
          font-size: 12px;
          color: #909399;
        }
        margin-left: 10px;
      }
    }
    .block-item:hover {
      background: #eeeeee;
      cursor: pointer;
    }
  }
}
</style>
