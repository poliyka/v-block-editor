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
        v-for="(item, index) in dragBlockActionArray"
        :key="index"
      >
        <div
          class="block-item"
          @click="blockOnClickAction(item.action, currentBlockIndex)"
          :style="{'color': item.color}"
        >
          <div :class="getItemIntroClass(item.type)">
            <i :class="item.iconClass">{{ item.name }}</i>
            <span v-if="item.type == 'button'">{{ item.cmd }}</span>
            <i
              class="el-icon-caret-right"
              v-if="item.type == 'list'"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "dragBlock-content",
  data() {
    return {
      isShowMenu: this.isShowDragMenu,
    };
  },
  watch: {
    isShowDragMenu: function (value) {
      if (value == true) {
        document.addEventListener("click", e => {
          if (event.target.getAttribute("class") != "el-icon-s-fold") {
            if (event.target.getAttribute("class") != "dropdown-menu") {
              this.$store.dispatch("dragMenuStore/setIsShowDragMenu", false);
            }
          }
        });
      }
    },
  },
  computed: {
    isShowDragMenu() {
      return this.$store.state.dragMenuStore.isShowDragMenu;
    },
    currentBlockIndex() {
      return this.$store.state.mainStore.currentBlockIndex;
    },
    getterMenuContentLayerXY() {
      let contentWeight = 245
      let contentHeight = this.dragBlockActionArray.length * 14 + 16
      return this.$store.getters["mainStore/getterMenuContentLayerXY"](contentWeight, contentHeight);
    },
    currentPageBlocks() {
      return this.$store.state.dragMenuStore.currentPageBlocks;
    },
    dragBlockActionArray() {
      return this.$store.state.dragMenuStore.dragBlockActionArray;
    },
    dragBlockActionObject() {
      return this.$store.getters["drag/getterDragBlockActionObject"];
    },
  },
  methods: {
    getIconUrl(type) {
      return require("@/assets/" + type + ".png");
    },
    blockOnClickAction(action, index) {
      switch (action) {
        case "delete":
          this.$store.dispatch("mainStore/setDeletePageBlock", index);
          break
      }
    },
    getItemIntroClass(type) {
      return `block-item-intro block-type-${type}`
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
    padding: 8px 0px 8px 0px;
    background: #ffffff;
    position: absolute;
    // margin-left: 58px;
    width: 245px;
    min-width: 180px;
    max-width: calc(100vw - 24px);
    max-height: 70vh;
    z-index: 2002;
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
      padding: 8px 20px 8px 20px;
      background: #ffffff;
      .block-item-intro {
        display: flex;
        justify-content: space-between;
        i {
          margin: 0;
          font-weight: bold;
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
