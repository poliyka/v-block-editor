<template>
  <transition name="__ven_fade-menu">
    <div
      class="__vne_mask"
      v-if="isShowAddMenu"
      @click="closeAddMenu"
    >
      <div
        class="__vne_add-block-dropdown-menu"
        :style="{
            top: getterMenuContentLayerXY.y,
            left: getterMenuContentLayerXY.x,
          }"
        @mousewheel.stop
        @click.stop
      >
        <div
          v-for="(item, index) in addBlockInfoArray"
          :key="index"
        >
          <span
            class="__vne_block-type-tip"
            v-if="index == 0"
          >{{ $t('addMenu.group.baseBlocks') }}</span>
          <span
            class="__vne_block-type-tip"
            v-if="index == 8"
          >{{ $t('addMenu.group.media') }}</span>
          <div
            class="__vne_block-item"
            @click="addBlock(item.type)"
          >
            <div class="__vne_block-item-img">
              <img
                :src="getImgUrl(item.type)"
                style="width: 100%"
              />
            </div>
            <div class="__vne_block-item-intro">
              <h4>{{ $t(item.name) }}</h4>
              <span>{{ $t(item.tip) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import AddBlockMixin from "@/components/mixin/AddBlockMixin.js";


export default {
  name: "addBlock-content",
  mixins: [AddBlockMixin],
  data() {
    return {
      isShowMenu: this.isShowAddMenu,
    };
  },
  computed: {
    isShowAddMenu() {
      return this.$store.state.addMenuStore.isShowAddMenu;
    },
    currentBlockIndex() {
      return this.$store.state.mainStore.currentBlockIndex;
    },
    getterMenuContentLayerXY() {
      return this.$store.getters["mainStore/getterMenuContentLayerXY"](320, 360)
    },
    currentPageBlocks() {
      return this.$store.state.mainStore.currentPageBlocks;
    },
    addBlockInfoArray() {
      return this.$store.state.addMenuStore.addBlockInfoArray;
    },
    addBlockInfoObject() {
      return this.$store.getters["addMenuStore/getterAddBlockInfoObject"];
    },
  },
  methods: {
    closeAddMenu() {
      this.$store.dispatch("addMenuStore/setIsShowAddMenu", false);
    },
    getImgUrl(type) {
      return require("@/assets/img/" + type + ".png");
    },
  },
};
</script>

<style lang="less">
// transition
.__ven_fade-menu-enter-active,
.__ven_fade-menu-leave-active {
  transition: opacity 0.3s;
}
.__ven_fade-menu-enter,
.__ven_fade-menu-leave-to {
  opacity: 0;
}

.__vne_mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.__vne_add-block-dropdown-menu {
  background: #ffffff;
  position: absolute;
  // margin-left: 58px;
  width: 320px;
  height: 360px;
  overflow-y: auto;
  border: 1px solid #dcdfe6;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  border-radius: 4px;

  .__vne_block-type-tip {
    font-size: 12px;
    color: #909399;
    display: block;
    padding: 10px 20px 5px 20px;
  }
  .__vne_block-item {
    padding: 5px 20px 7px 20px;
    display: flex;
    align-items: center;
    background: #ffffff;
    .__vne_block-item-img {
      width: 45px;
      height: 45px;
      background: #ffffff;
      img {
        border-radius: 4px;
        border: 1px solid #dddddd;
      }
    }
    .__vne_block-item-intro {
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
  .__vne_block-item:hover {
    background: #eeeeee;
    cursor: pointer;
  }
}
</style>
