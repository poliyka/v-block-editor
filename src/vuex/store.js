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
      name: "純文本",
      tip: "用純文本開始寫內容",
      type: "text",
      data: {
        text: "",
      },
    },
    {
      name: "待辦清單",
      tip: "用待辦清單去追蹤任務",
      type: "todo",
      data: {
        text: "",
      },
    },
    {
      name: "標題1",
      tip: "大字號標題",
      type: "heading1",
      data: {
        text: "",
      },
    },
    {
      name: "標題2",
      tip: "中字號標題",
      type: "heading2",
      data: {
        text: "",
      },
    },
    {
      name: "標題3",
      tip: "小字號標題",
      type: "heading3",
      data: {
        text: "",
      },
    },
    {
      name: "符號列表",
      tip: "大字號標題",
      type: "BulletedList",
      data: {
        text: "",
      },
    },
    {
      name: "提示欄",
      tip: "用於提示比較重要的信息",
      type: "hint",
      data: {
        text: "",
        color: "#409eff",
      },
    },
    {
      name: "圖片",
      tip: "用於提示比較重要的信息",
      type: "image",
      data: {
        src: "",
        height: "200px",
      },
    },
  ],
  dragBlockActionArray: [
    {
      name: "刪除",
      cmd: "Del",
      type: "button",
      action: "delete",
      iconClass: "el-icon-delete",
      color: "block",
    },
    {
      name: "複製",
      cmd: "Ctrl + D",
      type: "button",
      action: "duplicate",
      iconClass: "el-icon-copy-document",
      color: "red",
    },
    {
      name: "轉換",
      cmd: null,
      type: "list",
      action: "turnInto",
      iconClass: "el-icon-connection",
      color: "red",
    },
    {
      name: "顏色",
      cmd: null,
      type: "list",
      action: "color",
      iconClass: "el-icon-orange",
      color: "red",
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
  getterMenuContentLayerXY: state => (contentWidth, contentHeight) => {
    let a = state.addMenuContentLayerXY;

    // 當目前高度大於物件高度顯示在上方
    if (a.y > contentHeight) {
      a.y = a.y - contentHeight;
    }

    // 當目前左方寬度大於物件寬度顯示在左方
    if (a.x > contentWidth) {
      a.x = a.x - contentWidth;
    }

    a.y = `${a.y + 10}px`;
    a.x = `${a.x - 5}px`;

    return a;
  },
  getterAddBlockInfoObject(state) {
    let blockObject = {};
    for (let blockInfo of state.addBlockInfoArray) {
      blockObject[blockInfo.type] = blockInfo;
    }
    return blockObject;
  },
  getterDragBlockActionObject(state) {
    let blockObject = {};
    for (let blockAction of state.dragBlockActionArray) {
      blockObject[blockAction.type] = blockAction;
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
