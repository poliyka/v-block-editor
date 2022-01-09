<template>
  <div
    class="addBlock-content"
    v-if="isShowAddMenu == true"
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
      <div v-for="(item, index) in addBlockInfoArray" :key="index">
        <span class="block-type-tip" v-if="index == 0">基礎模組</span>
        <span class="block-type-tip" v-if="index == 7">媒體和數據</span>
        <div class="block-item" @click="addBlock(item.type)" v-if="item.name != 'Delete'">
          <div class="block-item-img">
            <img :src="getImgUrl(item.type)" style="width: 100%" />
          </div>
          <div class="block-item-intro">
            <h4>{{ item.name }}</h4>
            <span>{{ item.tip }}</span>
          </div>
        </div>
        <div class="block-item" @click="deleteBlock(currentBlockIndex)" v-if="item.name == 'Delete'">
          <div class="block-item-img">
            <img :src="getImgUrl(item.type)" style="width: 100%" />
          </div>
          <div class="block-item-intro">
            <h4>{{ item.name }}</h4>
            <span>{{ item.tip }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  watch: {
    isShowAddMenu: function (value) {
      if (value == true) {
        document.addEventListener("click", e => {
          if (event.target.getAttribute("class") != "el-icon-plus") {
            if (event.target.getAttribute("class") != "dropdown-menu") {
              this.$store.commit("mutationIsShowAddMenu", false);
            }
          }
        });
      }
    },
  },
  computed: {
    isShowAddMenu() {
      return this.$store.state.isShowAddMenu;
    },
    currentBlockIndex() {
      return this.$store.state.currentBlockIndex;
    },
    getterMenuContentLayerXY() {
      return this.$store.getters.getterMenuContentLayerXY(320, 360);
    },
    currentPageBlocks() {
      return this.$store.state.currentPageBlocks;
    },
    addBlockInfoArray() {
      return this.$store.state.addBlockInfoArray;
    },
    addBlockInfoOject() {
      return this.$store.getters.getterAddBlockInfoObject;
    },
  },
  methods: {
    getImgUrl(type) {
      return require("@/assets/" + type + ".png");
    },
    deleteBlock(index){
      this.$store.commit("mutationDeletePageBlock", index);
    }
  },
};
</script>

<style lang="less">
.addBlock-content {
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
