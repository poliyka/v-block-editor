import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  isShowAddMenu: false,
  isShowDragMenu: false,
  addMenuContentLayerXY: {
    x: 0,
    y: 0,
  },
  currentBlockIndex: 0,
  currentPageBlocks: [],
  addBlockInfoArray: [
    {
      name: "纯文本",
      tip: "用纯文本开始写内容",
      type: "text",
      data: {
        text: "",
      },
    },
    {
      name: "待办清单",
      tip: "用待办清单去追踪任务",
      type: "todo",
      data: {
        text: "",
      },
    },
    {
      name: "标题1",
      tip: "大字号标题",
      type: "heading1",
      data: {
        text: "",
      },
    },
    {
      name: "标题2",
      tip: "中字号标题",
      type: "heading2",
      data: {
        text: "",
      },
    },
    {
      name: "标题3",
      tip: "小字号标题",
      type: "heading3",
      data: {
        text: "",
      },
    },
    {
      name: "符号列表",
      tip: "大字号标题",
      type: "BulletedList",
      data: {
        text: "",
      },
    },
    {
      name: "提示栏",
      tip: "用于提示比较重要的信息",
      type: "hint",
      data: {
        text: "",
        color: "#409eff",
      },
    },
    {
      name: "图片",
      tip: "用于提示比较重要的信息",
      type: "image",
      data: {
        src: "",
        height: "200px",
      },
    },
  ],
  dragBlockConfigArray: [
    {
      name: "刪除",
      type: "delete",
    },
  ],
  dialogFormVisible: false,
};

const mutations = {
  mutationIsShowAddMenu(state, isShowAddMenu) {
    state.isShowAddMenu = isShowAddMenu;
  },
  mutationIsShowDragMenu(state, isShowDragMenu) {
    state.isShowDragMenu = isShowDragMenu;
  },
  mutationCurrentBlockIndex(state, index) {
    state.currentBlockIndex = index;
  },
  mutationAddMenuContentLayerXY(state, addMenuContentLayerXY) {
    state.addMenuContentLayerXY = addMenuContentLayerXY;
  },
  mutationAddCurrentPageBlocks(state, addBlockInfo) {
    let index = addBlockInfo.index + 1;
    state.currentPageBlocks.splice(index, 0, addBlockInfo.blockItem);
  },
  mutationDeletePageBlock(state, index) {
    state.currentPageBlocks.splice(index, 1);
  },
  mutationUpdateCurrentPageBlocks(state, blocks) {
    state.currentPageBlocks = blocks;
  },
  mutationUpdateOneBlock(state, block) {
    let index = block.index;
    state.currentPageBlocks.splice(index, 1, block.blockItem);
  },
  mutationUpdateInputBlockText(state, block) {
    let index = block.index;
    state.currentPageBlocks[index].data.text = block.text;
  },
  mutationUpdateDialogFormVisible(state, status) {
    state.dialogFormVisible = status;
  },
};

const getters = {
  getterMenuContentLayerXY(state) {
    let a = state.addMenuContentLayerXY;

    // 當目前高度大於物件高度顯示在上方
    if (a.y > 380) {
      a.y = a.y - 380;
    }
    a.y = `${a.y + 10}px`;

    // 當目前左方寬度大於物件寬度顯示在左方
    if (a.x > 330) {
      a.x = a.x - 330;
      a.x = `${a.x - 5}px`;
    } else {
      a.x = `${a.x + 5}px`;
    }

    return a;
  },
  getterAddBlockInfoObject(state) {
    let blockObject = {};
    for (let blockInfo of state.addBlockInfoArray) {
      blockObject[blockInfo.type] = blockInfo;
    }
    return blockObject;
  },
  getterDragBlockConfigObject(state) {
    let blockObject = {};
    for (let blockConfig of state.dragBlockConfigArray) {
      blockObject[blockConfig.type] = blockConfig;
    }
    return blockObject;
  },
};
const store = new Vuex.Store({
  state,
  mutations,
  getters,
});
export default store;
