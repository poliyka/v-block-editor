import _ from "lodash";

const state = {
  currentBlockIndex: 0,
  currentPageBlocks: [],
  dialogFormVisible: false,
  menuContentLayerXY: {
    x: 0,
    y: 0,
  },
  initBlocks: [
    {
      type: "text",
      data: {
        text: "",
      },
    },
  ],
};

const getters = {
  getterMenuContentLayerXY: state => (contentWidth, contentHeight) => {
    let a = state.menuContentLayerXY;

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
};

// actions
const actions = {
  setCurrentBlockIndex({ commit, state }, data) {
    commit("mutationCurrentBlockIndex", data);
  },
  setMenuContentLayerXY({ commit, state }, data) {
    commit("mutationMenuContentLayerXY", data);
  },
  setDeletePageBlock({ commit, state }, data) {
    commit("mutationDeletePageBlock", data);
  },
  setDeletePageBlock({ commit, state }, data) {
    commit("mutationDeletePageBlock", data);
  },
  setUpdateCurrentPageBlocks({ commit, state }, data) {
    commit("mutationUpdateCurrentPageBlocks", data);
  },
  setUpdateOneBlock({ commit, state }, data) {
    commit("mutationUpdateOneBlock", data);
  },
  setUpdateInputBlockText({ commit, state }, data) {
    commit("mutationUpdateInputBlockText", data);
  },
  setUpdateDialogFormVisible({ commit, state }, data) {
    commit("mutationUpdateDialogFormVisible", data);
  },
  setAddCurrentPageBlocks({ commit, state }, data) {
    commit("mutationAddCurrentPageBlocks", data);
  },
};

const mutations = {
  mutationCurrentBlockIndex(state, index) {
    state.currentBlockIndex = index;
  },
  mutationMenuContentLayerXY(state, menuContentLayerXY) {
    state.menuContentLayerXY = menuContentLayerXY;
  },
  mutationDeletePageBlock(state, index) {
    state.currentPageBlocks.splice(index, 1);
    // if PageBlocks is Empty insert base textarea block
    if (_.isEmpty(state.currentPageBlocks)) {
      state.currentPageBlocks = [...state.initBlocks];
    }
  },
  mutationUpdateCurrentPageBlocks(state, blocks) {
    // if PageBlocks is Empty insert base textarea block
    if (_.isEmpty(blocks)) {
      blocks = [...state.initBlocks];
    }
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
  mutationAddCurrentPageBlocks(state, addBlockInfo) {
    let index = addBlockInfo.index + 1;
    state.currentPageBlocks.splice(index, 0, addBlockInfo.blockItem);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
